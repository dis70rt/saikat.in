<table>
<tr>
<td width="50">

<img src="public/favicon.png" alt="Favicon" width="64" />

</td>
<td>

# saikat.in

</td>
</tr>
</table>

<p align="center">
  <img src="public/saikat.svg#gh-light-mode-only" alt="Saikat signature (light mode)" width="700" />
  <img src="public/saikat-dark.svg#gh-dark-mode-only" alt="Saikat signature (dark mode)" width="700" />
</p>

A simple personal portfolio built with **Vite + React**.

The goal of this project is to keep things minimal, fast, and easy to maintain. No unnecessary frameworks or heavy tooling — just a lightweight setup for a personal website.

---

## Requirements

- **Node.js** 18 or newer  
- **npm**

---

## Setup

Clone the repository and install dependencies:

```bash
npm install
````

---

## Run locally

Start the development server:

```bash
npm run dev
```

The site will be available at:

```
http://localhost:5173
```

---

## Build for production

```bash
npm run build
```

The production build is generated in:

```
dist/public
```

---

## Deploy

This project uses **GitHub Pages** for deployment.

Deploy the site with:

```bash
npm run deploy
```

Recommended workflow:

```bash
npm run build
npm run deploy
```

The deploy script publishes the contents of:

```
dist/public
```

to the `gh-pages` branch.

---

## Custom Domain

The custom domain is configured using:

```
public/CNAME
```

This file ensures the correct domain is applied when deploying to GitHub Pages.

---

## License

This project is for personal use.

