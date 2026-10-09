# Widget

Website and brand kit of **Widget Consulting**, software studio in Sfax.

Next.js 14 (App Router) + TypeScript + three.js. French and English.

## Run it

**Windows:** double-click `start-windows.bat`. The first run installs packages, then the site opens at http://localhost:3000.

**Any system:**

```bash
npm install
npm run dev        # development, http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

Requires Node.js 18.18 or newer.

## Where things are

| What | Where |
| --- | --- |
| All texts (FR / EN) | `dictionaries/fr.ts`, `dictionaries/en.ts` — words in `*asterisks*` show in orange |
| Page layout (section order) | `app/[lang]/page.tsx` |
| SEO: titles, social tags, hreflang | `app/[lang]/layout.tsx` |
| Social preview image | `app/[lang]/opengraph-image.tsx` |
| Colors, fonts, all styles | `app/globals.css` (tokens at the top) |
| 3D hero | `components/HeroScene.tsx` |
| Project builder | `components/Builder.tsx` |
| Contact form + e-mail sending | `components/Contact.tsx`, `app/api/contact/route.ts` |
| Language redirect (`/` → `/fr` or `/en`) | `middleware.ts` |
| Sitemap, robots | `app/sitemap.ts`, `app/robots.ts` |
| Brand kit (logos, colors, social images) | `branding/` |

## Contact form e-mails

Copy `.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY` — from a free account at resend.com (verify your domain there)
- `CONTACT_TO` — the inbox that receives requests
- `CONTACT_FROM` — sender address on your verified domain

Without these, the form still works and each request is printed in the terminal.

## Before going live

- Replace every `[placeholder]` in the dictionaries (projects, prices, e-mail, WhatsApp, domain).
- Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- Deploy on Vercel (recommended for Next.js) or any Node host.
