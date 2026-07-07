# KPMJ & Associates — Website

A fast, self-contained, world-class marketing site for **KPMJ & Associates**
(Tax · GST · Financial Consultants, Jaipur — formerly *Bharat Filing Company*),
led by **CA Jayesh Moolchandani, FCA**.

Deep-navy + gold theme, cinematic hero, real founder & office photography,
scroll animations, fully responsive, no build step and no runtime dependencies
(pure HTML/CSS/JS).

---

## Run it locally

```
python -m http.server 8353 --directory "D:/Apps/Clients/KPMJ & Associates/Website"
```
then open http://localhost:8353  ·  (a `kpmj-site` preview config is already registered)

Live repo: **https://github.com/aucksy/KPMJ**

---

## Sections

Hero → trust marquee → 10 services → why-us + stats → process →
**Meet the founder** → our story → **office gallery** → reviews → Instagram reels →
CTA → contact + map → footer.  Plus floating WhatsApp button.

## File map

| File | What it holds |
|------|---------------|
| `index.html` | All content & structure |
| `styles.css` | Full design system + all sections + responsive + animations |
| `script.js`  | Preloader, nav, scroll reveals, counters, hero particle canvas, WhatsApp form |
| `assets/owner.png` | Founder cutout (CA Jayesh Moolchandani, background removed) |
| `assets/office/*.jpg` | Real office photos (cabin, door, meeting, team-1, team-2) |
| `assets/favicon.svg`, `assets/og-image.svg` | Brand icon + social card |

---

## ✅ Now REAL (added from your material)

- **Founder section** — cutout of **CA Jayesh Moolchandani (FCA)** + full bio
  (ICAI, B.Com Univ. of Rajasthan, 10+ yrs at Indiabulls / Hem Securities / Indian Bank).
- **Office gallery** — 5 real photos from your Google listing, cleaned of Maps UI.
- **About photo** — real meeting-room shot (replaced the placeholder).
- **Instagram reels** — your 5 real reel links wired into branded cards.
- **Reviews** — real Google reviews: Rahman Khan & Harshvardhan Rathore (named) plus
  four genuine review excerpts. The one 1-star complaint is intentionally not featured
  (the "Read all reviews" button still links to your full Google listing).
- **Map** — now points to your exact location (maps.app.goo.gl/QCkTmsWjyUQBAE7L8).
- **Second phone** — +91 91163 55949 added alongside +91 99505 54949.

## ⚠️ Still to confirm / optional

1. **Instagram handle** — using `@ms_kpmj_associates` (best guess; the individual reel
   links are correct). Confirm the profile handle for the "Follow" button.
2. **Business hours** — shown as *Mon–Sat 10 AM – 7 PM* `(confirm)`. Google only says "closes 7 pm".
3. **Email** — placeholder `info@kpmjassociates.in` `(confirm)`.
4. **Domain** — your Google-listed site is **bharat-filing.com**; the page's canonical/OG
   URLs now point there. If this new site will live at a different address, tell me and I'll update.
5. **"Chartered Accountants" branding** — the founder is a verified FCA and the office is
   branded "CA", so the site now says *"led by Chartered Accountant CA Jayesh Moolchandani."*
   The top tagline still reads "Tax · GST · Financial Consultants" per your earlier choice —
   say the word to promote it to "Chartered Accountants & Financial Consultants" firm-wide.
6. **Reel thumbnails** — cards link out to the real reels. If you want live in-page reel
   previews, I can add official Instagram embeds (loads Instagram's script).
7. **OG image** — `og-image.svg` works; export a 1200×630 `.jpg` for best social previews.

## Notes for developers

- Contact form needs **no backend** — composes a fully URL-encoded WhatsApp message to +91 99505 54949.
- Fonts: Google Fonts (Fraunces + Manrope). Respects `prefers-reduced-motion`.
- Founder cutout was produced with `rembg` (u2net_human_seg); office photos optimized with Pillow.
- Preview screenshots: the live hero canvas + Google-Maps iframe can hang the screenshot
  tool — pause rAF and remove the iframe before capturing.
