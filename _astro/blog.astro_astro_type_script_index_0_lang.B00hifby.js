import{f as l}from"./hashnode.K6_URQn2.js";async function c(){const t=document.getElementById("blog-loading"),d=document.getElementById("blog-error"),o=document.getElementById("blog-empty"),n=document.getElementById("blog-list");if(n)try{const r=await l();if(t&&t.classList.add("hidden"),r.length===0){o&&o.classList.remove("hidden");return}n.style.display="flex",n.innerHTML=r.map(e=>{const i=new Date(e.publishedAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),a=(e.tags||[]).slice(0,3).map(s=>s.name);return`
          <a href="${e.url}" target="_blank" rel="noopener noreferrer"
             class="border border-border rounded-sm bg-card p-4 hover:border-primary/40 transition-colors no-underline cursor-pointer block mb-3">
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1 min-w-0">
                <p class="text-base font-medium text-foreground leading-snug">${e.title}</p>
                <p class="text-sm text-muted-foreground mt-1 leading-relaxed" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${e.brief}</p>
              </div>
              <div class="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                <span class="text-xs text-muted-foreground whitespace-nowrap">${i}</span>
                <span class="text-xs text-muted-foreground">${e.readTimeInMinutes} min</span>
              </div>
            </div>
            ${a.length>0?`
              <div class="flex flex-wrap gap-1.5 mt-3">
                ${a.map(s=>`<span class="text-xs text-muted-foreground bg-muted/50 border border-border rounded-sm px-1.5 py-0.5">${s}</span>`).join("")}
              </div>
            `:""}
          </a>`}).join("")}catch{t&&t.classList.add("hidden"),d&&d.classList.remove("hidden")}}document.addEventListener("astro:page-load",c);
