import{f as d}from"./hashnode.K6_URQn2.js";async function i(){const t=document.getElementById("blog-loading-about"),r=document.getElementById("blog-list-about"),n=document.getElementById("blog-error-about");if(r)try{const s=(await d()).slice(0,2);if(t&&t.classList.add("hidden"),!s.length){n&&n.classList.remove("hidden");return}r.style.display="flex",r.innerHTML=s.map(e=>{const a=new Date(e.publishedAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});return`
          <a href="${e.url}" target="_blank" rel="noopener noreferrer"
             class="border border-border rounded-sm bg-card p-3 flex items-start justify-between gap-3 hover:border-primary/40 transition-colors no-underline cursor-pointer block">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-foreground">${e.title}</p>
              <p class="text-xs text-muted-foreground mt-0.5 line-clamp-1">${e.brief}</p>
            </div>
            <div class="flex flex-col items-end gap-0.5 flex-shrink-0">
              <span class="text-xs text-muted-foreground">${a}</span>
              <span class="text-[11px] text-muted-foreground">${e.readTimeInMinutes}m read</span>
            </div>
          </a>`}).join("")}catch{t&&t.classList.add("hidden"),n&&n.classList.remove("hidden")}}document.addEventListener("astro:page-load",i);
