# KPMJ & Associates — Website

A fast, self-contained, world-class marketing site for **KPMJ & Associates**
(Tax · GST · Financial Consultants, Jaipur — formerly *Bharat Filing Company*).

Deep-navy + gold theme, cinematic hero, scroll animations, fully responsive,
no build step and no runtime dependencies (pure HTML/CSS/JS).

---

## Run it locally

```
python -m http.server 8353 --directory "D:/Apps/Clients/KPMJ & Associates/Website"
```
then open http://localhost:8353  ·  (a `kpmj-site` preview config is already registered)

---

## File map

| File | What it holds |
|------|---------------|
| `index.html` | All content & structure (10 services, reviews, about, contact, map, footer) |
| `styles.css` | Full design system (colours, type, layout, animations, responsive) |
| `script.js`  | Preloader, nav, scroll reveals, counters, hero particle canvas, WhatsApp form |
| `assets/favicon.svg` | Browser-tab icon (gold "K" monogram) |
| `assets/og-image.svg` | Social-share card (see note below) |

---

## ✅ Confirmed facts used

- **Name:** KPMJ & Associates · **Phone/WhatsApp:** +91 99505 54949
- **Address:** Office 8B, Silver Crown, Gandhi Path Rd, Block A, Lalarpura, Jaipur 302034
- **Rating:** 4.8★ from 25 Google reviews · **Since:** 2021
- **GSTIN:** 08ABPFA9680E1ZZ (registered Partnership firm)
- **Real review quote** featured: *"The service was not only professional but also very affordable."*

## ⚠️ Placeholders & things to confirm (search for these in the code)

1. **Office / team photo** — About section. Replace the `.ph--photo` block in
   `index.html` with `<img src="assets/office.jpg" alt="KPMJ & Associates office">`.
   Target ratio **4:5**.
2. **Instagram reels** — `#reels` section has 4 placeholder tiles (9:16). Swap each
   `<a class="reel ph …>` for a real reel thumbnail/embed linking to the post.
3. **Instagram handle** — currently `@ms_kpmj_associates`. **Please confirm** it's the
   correct/official handle (found via search; not verified).
4. **Business hours** — shown as *Mon–Sat 10:00 AM – 7:00 PM* and marked `(confirm)`.
   Google only lists "closes 7 pm".
5. **Email** — placeholder `info@kpmjassociates.in`, marked `(confirm)`. Replace with the real address.
6. **Positioning** — copy says "Tax · GST · Financial Consultants" (matches the Google
   "Financial consultant" category). If a **Chartered Accountant (ICAI)** is a partner and
   you want CA branding, tell me and I'll update headings/tagline accordingly.
7. **OG image** — `assets/og-image.svg` works, but some social platforms only read PNG/JPG.
   Export it to `og-image.jpg` (1200×630) for production and update the `og:image` tag.
8. **Domain** — `canonical`/OG URLs use a placeholder `https://kpmjassociates.in/`.
   Update once the real domain is chosen.

## 🎨 Higgsfield imagery (optional upgrade)

All visuals are currently bespoke CSS/SVG art (no photos needed). The connected
Higgsfield account was **out of credits** (0.22 left; ~1 credit per image), so no AI
images were generated. **Top up credits and I'll generate a cinematic hero + section
imagery** to drop straight into the labelled slots.

---

## Notes for developers

- The contact form needs **no backend** — it composes a pre-filled WhatsApp message to
  +91 99505 54949 and opens `wa.me`. (Message is fully URL-encoded so `&`/`*`/newlines are safe.)
- Fonts load from Google Fonts (Fraunces + Manrope). For a 100% offline/self-hosted build,
  download the woff2 files into `assets/fonts/` and swap the `<link>` for `@font-face`.
- Respects `prefers-reduced-motion` (animations + particle canvas disable automatically).
- The hero particle canvas pauses when the tab is hidden or scrolled out of view (perf).
