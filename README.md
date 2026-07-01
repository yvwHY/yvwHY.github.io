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

## Replace the placeholders (the only thing left to do)
Every grey block is a placeholder with a mono caption naming the file it expects.

1. **Add a `media/` folder** and drop your files in. Suggested names match the captions:
   `solo-choir-hero.mp4`, `solo-choir-cover.mp4`, `choir-of-three.mp4`, `bonnet.mp4`,
   `fabri-form.mp4`, `gesture-float.mp4`, `infolution.mp4`, `draping-duet.mp4`, `popup.jpg`,
   `sc-hero.mp4`, `sc-loop.mp4`, `sc-studio.mp4`, `sc-rig.jpg`, and `process/01.jpg …`.
2. **To show a video**, replace the placeholder's inner caption with a tag, e.g.:
   ```html
   <span class="media">
     <video src="media/choir-of-three.mp4" autoplay muted loop playsinline></video>
   </span>
   ```
   or embed Vimeo/YouTube:
   ```html
   <span class="media"><iframe src="https://player.vimeo.com/video/1176254975" allow="autoplay; fullscreen" allowfullscreen></iframe></span>
   ```
3. **To show an image**: `<span class="media"><img src="media/sc-rig.jpg" alt="The rig" /></span>`
4. **CV**: drop `cv.pdf` in this folder (the Download CV button points to it).

Tip: keep videos short, muted, looping, and compressed (H.264 .mp4, < ~5 MB each) so the page stays fast.

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
