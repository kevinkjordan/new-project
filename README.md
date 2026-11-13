# Kenny Richardson — AI Portfolio

A responsive, static portfolio website built with **HTML, CSS, and vanilla JavaScript**. It uses a crimson, charcoal, and creamy-white visual system with subtle sci-fi motifs, responsive project cards, a theme toggle, and a rule-based portfolio assistant.

## Run locally

No backend, API key, package install, or build step is required.

1. Extract the ZIP.
2. Open `index.html` in a browser, or run a local static server from this folder:

   ```bash
   python -m http.server 8000
   ```

3. Visit `http://localhost:8000`.

## Deploy

Upload the folder to any static host, including GitHub Pages, Cloudflare Pages, Netlify, or Vercel. No server-side runtime is required.

## Portfolio assistant

The assistant in `script.js` is intentionally deterministic:

- It normalizes questions and matches them against explicit intent rules.
- It responds from a curated, editable knowledge base.
- It makes no network requests and sends no chat content anywhere.
- Unknown questions receive an honest fallback rather than invented answers.
- It is not an LLM and cannot answer arbitrary questions outside its programmed knowledge.

Edit `knowledge` and `rules` in `script.js` to add intents, aliases, or new responses. Keep claims accurate and avoid adding private contact information.

## Personalization checklist

- [ ] Add a real resume PDF and update the GitHub button/header if desired.
- [ ] Verify each project's live URL and source repository before linking directly to it.
- [ ] Add direct repository links for projects when the exact repository URLs are confirmed.
- [ ] Replace the CSS-built project previews with real screenshots when available.
- [ ] Update the stack list to reflect current, defensible skills.
- [ ] Add a verified contact method if you want one public.

## Project structure

```text
kenny-ai-portfolio/
├── index.html
├── styles.css
├── script.js
├── assets/
│   └── favicon.svg
└── README.md
```

## Design notes

- Palette: `#ED1734` crimson, `#171717` charcoal, and `#F4F0E8` creamy white.
- Responsive layout with mobile navigation.
- Light and dark themes share the same core palette.
- Reduced-motion preferences are respected.
- Project thumbnails are made in CSS, so the starter project does not depend on stock imagery.

## Important accuracy note

The project descriptions are editable portfolio copy. The current source links intentionally point to Kenny's public GitHub profile where an exact repository URL has not been verified. A resume file is not included, and the header currently links to GitHub rather than a non-existent PDF.
