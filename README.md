# Live Oak Safety — Website

Static marketing site for [liveoaksafety.com](https://liveoaksafety.com).

## Structure

```
liveoaksafety/
├── index.html            → Home page
├── for-employers.html    → Employer info + contact form
├── for-providers.html    → Provider info + contact form
├── css/style.css         → All styles
├── js/main.js            → Nav, animations, form AJAX
├── assets/               → Logo, favicon, images
│   ├── logo.png          ← Drop your logo here
│   └── favicon.png       ← Drop your favicon here
└── vercel.json           → Clean URLs (no .html extension)
```

---

## 1 — Add Your Logo

Place your logo file at `assets/logo.png`.

- If your logo is an SVG, rename it to `logo.svg` and update the `<img src="...">` in each HTML file's nav and footer.
- Recommended size: at least 200px wide, transparent background.
- The site will show "Live Oak Safety" as plain text if the image fails to load (fallback is already in place).

For the favicon, drop a square PNG at `assets/favicon.png` (32×32 or 64×64 works fine).

---

## 2 — Set Up Contact Forms (Formspree)

The contact forms use [Formspree](https://formspree.io) to deliver submissions to `luke@liveoaksafety.com`.

**Steps:**

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create **two forms** — one for employers, one for providers. Name them clearly.
3. Set the notification email to `luke@liveoaksafety.com` in each form's settings.
4. Copy each form's ID (looks like `xrgwabcd`).
5. In `for-employers.html`, find this line and replace `YOUR_EMPLOYER_FORM_ID`:
   ```html
   action="https://formspree.io/f/YOUR_EMPLOYER_FORM_ID"
   ```
6. In `for-providers.html`, find this line and replace `YOUR_PROVIDER_FORM_ID`:
   ```html
   action="https://formspree.io/f/YOUR_PROVIDER_FORM_ID"
   ```

Free tier: 50 submissions/month. Upgrade if volume grows.

---

## 3 — Deploy to Vercel

**First deploy:**

```bash
# From the liveoaksafety/ folder (or from the repo root if you push the whole thing)
vercel
```

Or push to GitHub and connect the repo in the [Vercel dashboard](https://vercel.com/dashboard). Vercel auto-detects static sites — no build command needed.

**Custom domain:**

1. In Vercel dashboard → your project → Settings → Domains
2. Add `liveoaksafety.com` and `www.liveoaksafety.com`
3. Update your DNS records as directed (Vercel provides the values)
4. `vercel.json` already handles clean URLs (`/for-employers` instead of `/for-employers.html`)

---

## 4 — Optional: Redirect liveoaksafety.net → .com

In your domain registrar for `.net`, set up a URL redirect (301) from `liveoaksafety.net` → `https://liveoaksafety.com`. Most registrars have a redirect setting in the DNS panel.

---

## Colors (for reference when creating assets)

| Role | Hex |
|---|---|
| Primary dark green (hero, buttons) | `#1E3A2F` |
| Mid green | `#2D5A3D` |
| Accent green | `#4A7C59` |
| Soft green (icons, checks) | `#CEEADA` |
| Warm cream (section bg) | `#F7F4EF` |

---

## Notes

- No framework, no build step — pure HTML/CSS/JS.
- All SVG icons are inline Feather icons (no external icon library).
- Google Fonts (Inter) loaded from CDN.
- Scroll animations use `IntersectionObserver` — no dependencies.
- Forms degrade gracefully: if JS fails, form still submits normally via `method="POST"`.
