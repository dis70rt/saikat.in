export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  readingTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Getting Started with Modern Web Development",
    excerpt:
      "An introduction to the tools and techniques that define modern web development in 2025.",
    content: `# Getting Started with Modern Web Development

Welcome to this placeholder post. Replace this content with your real article.

## What to Write About

Think about what you've learned recently, a problem you solved, or a tool you've been enjoying. Blog posts don't need to be long — even a short tip can be valuable to someone.

## Code Examples

You can include code snippets, diagrams, or anything else that helps your readers understand the topic.

\`\`\`ts
const hello = () => console.log("Hello, world!");
hello();
\`\`\`

Happy writing!`,
    date: "2025-11-20",
    tags: ["Web Dev", "Tools"],
    readingTime: 3,
  },
  {
    id: "post-2",
    title: "Why I Love TypeScript",
    excerpt:
      "After years of JavaScript, switching to TypeScript changed everything about how I write and think about code.",
    content: `# Why I Love TypeScript

This is another placeholder post. Add your real blog posts by editing \`src/data/blog.ts\`.

## Adding a New Post

Each post is an object in the \`blogPosts\` array. Set an \`id\`, \`title\`, \`excerpt\`, \`content\` (supports Markdown-style formatting), \`date\`, \`tags\`, and estimated \`readingTime\`.

The site will automatically list the new post in the Blog tab, sorted by date.`,
    date: "2025-08-05",
    tags: ["TypeScript", "JavaScript"],
    readingTime: 5,
  },
];
