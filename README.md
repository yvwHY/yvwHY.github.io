# Portfolio site — Yu-Ting (Harry) Liao

A self-contained static site. No build step, no dependencies (fonts load from Google Fonts).

```
site/
├── index.html        ← home (Mutis-style): identity + work grid + about + cv
├── solo-choir.html   ← flagship case study (Specimens-style long scroll)
├── styles.css        ← clean neutral design system
├── main.js           ← mobile menu + scroll-reveal
├── cv.pdf            ← (add this) your CV
└── media/            ← (add this) videos + images
```

## Preview locally
Open `index.html` in a browser. For correct relative paths, serve the folder:

```bash
cd site
python3 -m http.server 8000      # then open http://localhost:8000
```

## Status (2026-09-15)
- `media/` holds the Solo Choir stills (`sc-*.jpg`) and an Infolution screenshot; all other project videos are Vimeo embeds.
- Solo Choir hero on both pages = Vimeo 1223687812 (public). Case study rewritten to match the submitted thesis: tabletop instrument + two wearable prototypes; no latency figures.
- `cv.html` mirrors the master `PhD/Material/01_CV/YuTingLiao_CV.docx`; `cv.pdf` is generated from it with headless Chrome:
  ```bash
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf="$PWD/cv.pdf" "file://$PWD/cv.html"
  ```
- Still placeholder: the Bye Default (Pop-Up) card has no image. The Experiments section is commented out in `index.html` until there is content.

## Edit content
All copy lives directly in the two HTML files (sections are commented). Colours, type and spacing are in `styles.css` `:root`.

## Deploy
- **GitHub Pages** — push this `site/` folder to a repo; Settings → Pages → deploy from branch (root or `/docs`).
- **Vercel / Netlify** — drag the `site/` folder in, or connect the repo. No build command; output dir = the folder.
- **Custom domain** — add it in the host's domain settings once live.

## Notes
- Categories on the work grid: Research · Sound · Wearable · Robotics · Hardware · Web · Performance · Exhibition.
- The animated coloured bars are the SATB harmony lines (CSS only); they respect `prefers-reduced-motion`.
- Light theme only for now — a dark variant can be added later via `prefers-color-scheme`.
