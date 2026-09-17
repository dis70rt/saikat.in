# Portfolio audit: saikat.in

Date: 15 September 2026

## Assessment

Your engineering work is stronger than its presentation. The highest-return changes are to expose it sooner on mobile, make content visible immediately, and give important projects substantive, shareable pages. Keep the developer/editor aesthetic; a wholesale visual rewrite is unnecessary.

This audit covers Astro/TypeScript/JavaScript/CSS source, generated HTML and assets, production HTTP responses, browser screenshots, automated accessibility checks, and mobile Lighthouse runs. It does not include Search Console, private analytics, verified search volumes, real-user Core Web Vitals, or an exhaustive security/dependency audit. Rankings and conversion improvements cannot be inferred from Lighthouse scores.

## Measured baseline

| Check | Local production build | Public homepage |
|---|---:|---:|
| Lighthouse performance | 86 | 76 |
| Accessibility | 95 | 95 |
| Best practices | 100 | 100 |
| SEO checklist | 100 | 100 |
| First Contentful Paint | 2.6 s | 3.3 s |
| Largest Contentful Paint | 3.6 s | 3.9 s |
| Total Blocking Time | 70 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |

Lighthouse 13.4.1, default mobile simulation, one run per environment. These are directional lab measurements, affected by machine load, network conditions, and random theme selection. They are not field percentiles; Total Blocking Time is not INP. The live performance score can be low even with no blocking time because content appears late.

`npm run build` passed, with a warning about a JavaScript chunk exceeding 500 KB. `tsc --noEmit` passed, but this does not fully validate `.astro` templates. The project has no dedicated check, lint, or test scripts.

### Existing strengths

- Static HTML contains the actual content and ordinary crawlable links.
- Unique page titles/descriptions, canonical tags, English language declaration, viewport, and social metadata exist.
- Astro generates WebP images with dimensions; most non-avatar images are lazy-loaded.
- HTTPS and www-to-apex redirects work. The résumé PDF returns HTTP 200.
- The visual language is consistent and distinctive. Project metrics and technical writing provide useful evidence.
- Icons have accessible link names; external links use appropriate `rel` values.

## Priority findings

### 1. High: content visibility depends on JavaScript

**Evidence:** `src/layouts/Layout.astro:114` starts the entire application at `opacity-0`. Browser testing with JavaScript disabled left the shell at opacity 0 and the loader present. The 3-second timeout is inside the same script, so it cannot recover from a failed script download or disabled JavaScript. Image visibility also depends on adding `.loaded` in JavaScript (`src/styles/global.css:328`).

The eight-path signature animation deliberately precedes content. `loader-seen` is written to session storage but never read; full reloads repeat the intro. A normal project-page navigation captured after one second still showed the signature.

**Change:** Render content and images visible by default. Make the signature a small optional animation that does not cover content. If an intro remains, explicitly respect reduced motion, read the session flag, and make failure leave the page usable.

**Acceptance:** Content and contact links work with scripts disabled or blocked; no overlay delays reading.

### 2. High: mobile downloads a desktop-only effect

**Evidence:** `src/components/PixelBlast.astro:32` statically imports the implementation before checking viewport width. Its comment claims the check avoids downloading dependencies, but the browser network log proves otherwise: mobile downloads the approximately 141 KB compressed effect chunk. Its minified size is 566,383 bytes, with Three.js and postprocessing bundled together.

**Change:** Put `import()` inside the desktop eligibility branch, after checking reduced motion. Load it after meaningful content, ideally during idle time. Consider a CSS pattern for this subtle background; if retained, omit unused liquid/postprocessing features, handle WebGL failures, and respond to viewport changes.

`autoPauseOffscreen` currently checks a `visible` property that is only set to true. Crossing below the desktop breakpoint does not destroy an existing renderer. Browser hidden-tab throttling exists, but this implementation has no explicit visibility lifecycle.

**Acceptance:** No effect bundle requested on mobile or reduced-motion mode. Desktop visual failure never affects the page.

### 3. High: mobile navigation and evidence are buried

**Evidence:** At 375 × 812, the Projects navigation link begins at y ≈ 997px. All sidebar blocks precede every page's main content (`src/components/Sidebar.astro:31`). The first screen primarily shows identity, contact, stack, and social information; visitors must scroll before even choosing a page. Tabs overflow horizontally, with later destinations initially out of view.

**Change:** Mobile order: compact identity → navigation → concise positioning and contact action → selected work → experience → supporting skills/interests. Make all four destinations visible or provide an obvious menu. Keep the sidebar on desktop if desired.

**Acceptance:** At 375px width, navigation and a clear action are available in the first viewport; primary content does not follow a full repeated sidebar.

### 4. High: insufficient contrast across every theme

Calculated `muted-foreground` contrast against the card surface:

| Theme | Ratio |
|---|---:|
| Midnight | 3.65:1 |
| One Dark Pro | 4.05:1 |
| Catppuccin | 4.28:1 |
| Dracula | 4.37:1 |

All fall below 4.5:1 for normal text. Axe confirmed contrast failures on real rendered text, including location, contact details, and descriptions. See `src/styles/global.css:32` and corresponding theme definitions. Dracula also uses a subdued blue for important role/contact accents, requiring separate verification.

**Change:** Brighten secondary text, test each actual background and accent, and choose a stable default theme. If multiple themes remain, provide an explicit preference control. Random themes make the experience and audit results inconsistent.

### 5. High opportunity: projects lack dedicated landing pages

**Evidence:** Build produces four content routes plus a 404. Project cards have no individual internal URLs; homepage previews all lead to `/projects`. Important details are collapsed, and visitors cannot directly share a specific case study.

**Change:** Start with `/projects/tradeorders/` and `/projects/bluppi/`, using the existing IDs. Each needs a clear problem, your contribution, architecture, tradeoffs, measured outcome, benchmark conditions, limitations, and relevant repository/article links. Add unique title, description, canonical, and social image. Link cards and related articles directly to these pages.

This improves both visitor evaluation and the number of useful topics search engines can understand. It does not guarantee rankings.

### 6. Medium: GSAP is downloaded twice

**Evidence:** `src/layouts/Layout.astro:57` includes a parser-blocking CDN script; line 146 also imports GSAP into the local bundle. Browser logs show both. The CDN copy transfers about 29 KB, while the layout bundle including GSAP transfers about 28 KB. Lighthouse flags the CDN request as render-blocking.

**Change:** Remove the unused global CDN copy. If the intro is removed, reassess whether GSAP is needed at all. Avoid adding preconnects to compensate for a redundant dependency.

### 7. Medium: images and fonts are larger than their use requires

**Evidence:** Avatar is 800 × 800, rendered around 49–58 CSS pixels wide. Lighthouse estimates about 41 KiB of image savings on the homepage. Blog thumbnails also use full image dimensions without responsive candidates. Six font files transfer roughly 96 KB combined in the desktop browser sample.

**Change:** Generate avatar variants appropriate for 1×/2× displays; set image widths, `srcset`, and `sizes` for cards and thumbnails. Keep above-fold images eager only where justified. Reduce font weights after checking actual typography needs; do not preload every font.

### 8. Medium: navigation and motion accessibility need finishing

- Add a skip link to route content, a named `<nav>`, and `aria-current="page"` (`NavTabs.astro`).
- Give each route a meaningful primary heading. Currently the only h1 is the repeated sidebar name; projects jump to h3, and blog titles are paragraphs. This is a structure/usability issue, not proof of a ranking penalty.
- Provide clearly visible keyboard focus. The browser default is not explicitly removed, but the designed states emphasize hover.
- The marquee duplicates real focusable links, pauses only on hover, and clips overflow. Offer pause/stop or make it static; remove duplicate copies from focus and accessibility exposure. Reduced-motion CSS currently stops movement but leaves clipped content.
- CSS reduced-motion rules do not stop GSAP or the WebGL loop; the browser still created a canvas in reduced-motion mode.
- Social targets measure about 40px because of root scaling; 44px is a useful usability target, not a claim that every smaller link fails WCAG 2.2's 24px minimum.
- Axe flagged `scrollable-region-focusable` on the desktop journey page. Make its inner scroll region keyboard accessible with an appropriate accessible name, or use normal document scrolling.

### 9. Medium: desktop presentation makes evidence harder to scan

The full-height, separately scrolling sidebar and content pane hide continuation below the viewport. Project columns flow vertically rather than as conventional left-to-right rows. Dense borders, tiny 10px section labels, muted body copy, and detailed experience bullets compete with selected projects.

**Change:** Increase section-heading prominence, use one primary page scroll where practical, and feature two projects with visible outcome summaries. Keep the editor tabs and restrained accent colors. Make project summaries understandable before expanding technical details. A consistent grid is easier to compare than long CSS columns.

### 10. Medium/low: publishing and content consistency

- “Latest Projects” takes the first two array entries, not the newest dates (`src/pages/index.astro:14`). Rename to “Selected projects” for editorial ordering or sort by date. `const sorted = [...projects]` does not sort.
- Navigation URLs omit trailing slashes; production redirects `/projects` to `/projects/`. Align internal URLs with canonical URLs to avoid extra redirects.
- No sitemap is generated, and production `/robots.txt`, `/sitemap.xml`, and `/sitemap-index.xml` return 404. Missing robots.txt does **not** block crawling, and a small linked site can be discovered without a sitemap. Add these as inexpensive maintenance improvements, not a major ranking cure.
- Shared layout marks the 404 as `index,follow` and generates a `/404/` canonical. Real missing-path status codes matter most; make the error template metadata intentional and exclude it from the sitemap.
- README describes Vite + React, port 5173, and `dist/public`; the actual app is Astro and emits `dist/`.
- Add Astro-aware checking and a build check in CI. No CI workflow is present in this checkout. Avoid imposing a large unit-test suite on static presentation; browser smoke checks of route visibility and navigation are more valuable here.

## SEO growth strategy

### Choose specific search goals

“Top of Google” needs a query and audience. Start with branded discovery and technical searches aligned with your evidence. These are candidate topics, not verified search-volume or difficulty estimates:

| Intent | Candidate query | Best destination |
|---|---|---|
| Identity | Saikat Das backend engineer | Homepage |
| Project research | Go Kafka order matching engine | TradeOrders case study |
| Technical solution | online presence service Go gRPC | Existing article + Bluppi case study |
| Troubleshooting | gRPC Cloudflare Tunnel configuration | Existing article |
| Technical evaluation | local MCP RAG hybrid search | A measured ClosedBook case study |

Google explicitly says there is no automatic first-place formula. Search visibility depends on useful content and discovery, and changes can take weeks or months. [Google SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

### Build from your existing technical evidence

The [order-book article](https://blog.saikat.in/i-had-no-idea-what-an-order-book-was-now-i-ve-built-one-that-handles-18k-rps) already includes hardware, architectural reasoning, benchmark results, and limitations. Surface a concise project summary on the portfolio and link to the full article. Do not duplicate the whole article just to create another URL.

For each claim, link to reproducible evidence where available. “Zero hallucination” and “eliminating all I/O bottlenecks” are broader than a finite evaluation can establish. State what was tested and under which constraints. Clearly distinguish accepted-request throughput from completed end-to-end work. First-hand detail and transparent authorship are aligned with [Google's helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

### Keep a coherent site and author identity

The blog subdomain is not inherently an SEO problem. Keep it if publishing works well. Strengthen contextual links between articles, projects, and your profile. Only migrate to subdirectories for a concrete reason and with an old-to-new URL plan. For any syndicated copies, inspect actual canonical tags and choose a preferred original. [Google canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

Add accurate `ProfilePage` / `Person` JSON-LD to the appropriate profile page with stable identity and genuine `sameAs` links. Validate with Rich Results Test. This helps describe the author; it is not a ranking boost or guaranteed rich result. [Google profile markup guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page).

### Measure discovery and outcomes

Verify a Search Console Domain property to cover apex and blog. Submit the sitemap, inspect important URLs, and examine Google's selected canonicals and indexing reasons. Separate branded from non-branded queries. Review impressions, clicks, click-through rate, and landing pages over comparable periods; use position as context, not the only success measure.

If analytics are added, track résumé opens, contact clicks, project-case-study visits, and repository clicks. A contact click is not a confirmed inquiry. Do not capture message content or email addresses in event payloads.

Earn relevant links through useful repositories, technical articles, and genuine community participation. Connect GitHub and professional profiles back to the portfolio. Avoid bulk low-value articles, keyword repetition, bought links, or unsupported claims.

## Recommended sequence

| Phase | Work | Definition of done |
|---|---|---|
| First 1–2 days | Visible-by-default content, remove duplicate GSAP, conditionally load effect, fix contrast | No-JS usable; no mobile effect request; themes pass contrast |
| Next 2–4 days | Mobile header/navigation, clearer headings, keyboard/motion fixes, image sizing | 375/768/1440px checks; accessible navigation; first-screen action |
| Following week | Two substantial project pages, contextual links, sitemap and identity markup | Unique URLs and metadata; valid sitemap/schema; evidence linked |
| Following 4–8 weeks | Improve existing articles using Search Console findings; publish useful follow-ups | Compare search visibility and qualified engagement with baseline |

Estimates assume existing project evidence is available. Content research may take longer.

Target field Core Web Vitals at the 75th percentile: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. Lab tests guide implementation; real-user data determines field performance. Good scores alone do not ensure top rankings. [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals).

## Artifacts and limits

- `lighthouse-live.json`: production mobile lab run.
- `lighthouse-mobile.json`: local production-build mobile lab run.
- `browser-results.json`: desktop/mobile/no-JS/reduced-motion observations and axe findings.
- `desktop.png`, `mobile.png`: local screenshots after the loader finishes.
- `followup.json`, `projects-ready.png`: all four routes checked at 375/768/1440px with a fixed Midnight theme, plus a projects screenshot. No document-wide horizontal overflow occurred. Contrast failures persisted; desktop journey also had a keyboard-inaccessible scroll region. Soft tab navigation removed the loader successfully at all three widths.

The earlier web crawler snapshot showed a different homepage project ordering; direct production HTML subsequently matched the local Bluppi/TradeOrders preview. Treat this as snapshot freshness, not a confirmed deployment defect.

Only audit documentation/artifacts were added. No site implementation or deployment changes were made. A pre-existing `.astro/types.d.ts` modification was present before the audit.
