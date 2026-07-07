import os
import json
import urllib.request
import urllib.parse
from html.parser import HTMLParser
from xml.etree import ElementTree as ET

# --- CONFIGURATION ---
RSS_FEED_URL = "https://blog.saikat.in/rss.xml"
OUTPUT_JSON_FILE = "blogs_data.json"
PUBLIC_BLOGS_DIR = "public/images/blogs"

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

class HTMLImageExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.first_image_url = None

    def handle_starttag(self, tag, attrs):
        if tag == "img" and not self.first_image_url:
            for attr, value in attrs:
                if attr == "src":
                    self.first_image_url = value
                    break

def fetch_with_user_agent(url):
    req = urllib.request.Request(
        url,
        data=None,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
        }
    )
    try:
        response = urllib.request.urlopen(req)
        return response.read()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def download_and_compress_image(image_url, title):
    if not image_url:
        return None
        
    os.makedirs(PUBLIC_BLOGS_DIR, exist_ok=True)
    
    # Use title for a clean filename
    clean_title = "".join([c.lower() for c in title if c.isalnum() or c.isspace()]).strip()
    clean_filename = "-".join(clean_title.split())
    
    if not clean_filename:
        # Fallback if title is empty
        parsed_url = urllib.parse.urlparse(image_url)
        original_filename = os.path.basename(parsed_url.path)
        clean_filename = "".join([c for c in os.path.splitext(original_filename)[0] if c.isalnum()]).strip() or "blog_cover"
        
    local_filename = f"{clean_filename}.webp"
    local_filepath = os.path.join(PUBLIC_BLOGS_DIR, local_filename)
    public_path = f"/images/blogs/{local_filename}" # This is the path Astro will use to serve it
    
    print(f"Downloading image: {image_url}")
    img_data = fetch_with_user_agent(image_url)
    if not img_data:
        return None
        
    try:
        import io
        from PIL import Image
        
        image = Image.open(io.BytesIO(img_data))
        if image.mode in ("RGBA", "P"):
            image = image.convert("RGB")
            
        max_width = 800
        if image.width > max_width:
            ratio = max_width / image.width
            new_height = int(image.height * ratio)
            image = image.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
        image.save(local_filepath, "WEBP", quality=80)
        print(f"Saved and compressed: {local_filepath}")
        return public_path
        
    except ImportError:
        print("Note: 'Pillow' (PIL) library not found. Saving original image without compression.")
        print("To enable compression, run: pip install Pillow")
        
        parsed_url = urllib.parse.urlparse(image_url)
        original_filename = os.path.basename(parsed_url.path)
        ext = os.path.splitext(original_filename)[1] or '.jpg'
        fallback_filename = f"{clean_filename}{ext}"
        fallback_filepath = os.path.join(PUBLIC_BLOGS_DIR, fallback_filename)
        fallback_public_path = f"/images/blogs/{fallback_filename}"
        
        with open(fallback_filepath, 'wb') as f:
            f.write(img_data)
        print(f"Saved original image to: {fallback_filepath}")
        return fallback_public_path
    except Exception as e:
        print(f"Failed to process image {image_url}: {e}")
        return None

def parse_rss_feed(feed_data):
    try:
        root = ET.fromstring(feed_data)
    except ET.ParseError as e:
        print(f"Failed to parse XML: {e}")
        return []

    blogs = []
    
    for i, item in enumerate(root.findall(".//item")):
        title = item.findtext("title")
        link = item.findtext("link")
        pub_date = item.findtext("pubDate")
        description = item.findtext("description") or ""
        
        image_url = None
        
        enclosure = item.find("enclosure")
        if enclosure is not None and "image" in enclosure.get("type", ""):
            image_url = enclosure.get("url")
            
        if not image_url:
            for child in item:
                if "content" in child.tag and child.get("medium") == "image":
                    image_url = child.get("url")
                    break
                if "thumbnail" in child.tag:
                    image_url = child.get("url")
                    break
                    
        if not image_url and description:
            parser = HTMLImageExtractor()
            parser.feed(description)
            image_url = parser.first_image_url

        import re
        clean_snippet = re.sub('<[^<]+>', '', description).strip()
        
        if len(clean_snippet) > 150:
            clean_snippet = clean_snippet[:147] + "..."

        # Extract tags
        tags = []
        for category in item.findall("category"):
            if category.text:
                tags.append(category.text.strip())
                
        # Attempt to calculate reading time (fallback to description if content:encoded is missing)
        content = ""
        for child in item:
            if "content" in child.tag and "encoded" in child.tag:
                content = child.text or ""
                break
        
        if not content:
            content = description
            
        clean_content = re.sub('<[^<]+>', '', content).strip()
        word_count = len(clean_content.split())
        reading_time_minutes = max(1, round(word_count / 200)) # Assumes ~200 wpm reading speed
        
        local_image_path = None
        if image_url:
            local_image_path = download_and_compress_image(image_url, title)

        blog_entry = {
            "title": title,
            "link": link,
            "pubDate": pub_date,
            "snippet": clean_snippet,
            "tags": tags,
            "reading_time_minutes": reading_time_minutes,
            "cover_image": local_image_path
        }
        blogs.append(blog_entry)

    return blogs

def main():
    if RSS_FEED_URL == "https://replace-with-your-rss-feed-url.com/rss.xml":
        print("Please edit the script and set your real RSS_FEED_URL at the top.")
        return

    print(f"Fetching RSS feed from: {RSS_FEED_URL}...")
    feed_data = fetch_with_user_agent(RSS_FEED_URL)
    
    if not feed_data:
        print("Failed to download RSS feed.")
        return
        
    print("Parsing RSS feed...")
    blogs = parse_rss_feed(feed_data)
    
    print(f"Found {len(blogs)} blog posts.")
    
    # Save the cleaned data to a JSON file
    with open(OUTPUT_JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(blogs, f, indent=4, ensure_ascii=False)
        
    print(f"\nSuccess! Cleaned blog data saved to: {OUTPUT_JSON_FILE}")
    print(f"Images are saved in: {PUBLIC_BLOGS_DIR}/")
    print("You can now ask the AI to read the JSON file and update your website.")

if __name__ == "__main__":
    main()
