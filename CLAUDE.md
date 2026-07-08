# Bilikis Sabitu — Portfolio Site

## Who
Bilikis Sabitu. Senior product designer + AI-native builder. Lagos.
Designs AND ships production apps end-to-end: Figma → React Native/Next.js → live.
AI-native workflow throughout.
Throughline: designing for TRUST under uncertainty.

## Audience
- Recruiters/founders hiring senior-mid product designers
- Agencies buying design+build contract sprints

## Site's ONE job
Convert already-arrived visitor (LinkedIn, DM) into a reply. Not top-of-funnel discovery — conversion of warm traffic.

## Non-negotiables
- Fast load
- Mobile-first (most traffic = DM on phone)
- Real crawlable text (no text-in-images, no client-only render hiding content)
- "Bilikis Sabitu" in every title tag / H1 / meta description

## Inspiration (style refs only, not copying content)
- https://hanzo.framer.website/
- https://launchfolio.framer.website/

## Status
Migrated to **Next.js (App Router, TypeScript)**. Old single file kept at `reference/bilikis-portfolio.reference.html`.
Design mirrors hanzo.framer.website (tokens lifted from its published CSS): white base, orange #FF5E00 accent, Inter Tight / Instrument Serif italic / Fragment Mono, pill/rounded shapes.

### Structure
- `app/layout.tsx` — next/font (Inter Tight, Inter, Instrument Serif, Fragment Mono → CSS vars), metadata/OG, Person JSON-LD.
- `app/globals.css` — all styles + design tokens (`:root`). Global CSS, class-based (ported from the single file).
- `app/page.tsx` — composes sections.
- `components/` — Nav, Hero, Showcase, Intro, Process, Work, About, Contact, Footer, ScrollReveal.
  - Server Components (static, crawlable): Nav, Showcase, Intro, Process, About, Contact, Footer.
  - Client Components: Hero (GSAP hero timeline via `gsap` npm), Work (case-study cards + slide-in overlay, state), ScrollReveal (IntersectionObserver reveals for `.card`/`.step`).
- `lib/projects.ts` — typed case studies (`Project[]`). Case-study HTML fields render via `dangerouslySetInnerHTML`. Add/edit projects here.

### Sections order
nav → hero (badge, 2-line headline w/ inline tiles, sub, CTAs, vertical proof ticker) → showcase (2 vertical scrolling columns in a grey #2B2B2B contained box, animated folder CTA) → intro ("Hello") → process (3 steps) → work (case-study overlay) → about → contact (dark panel) → footer.

### Real images (from Figma)
- **Recall — DONE.** Screens exported from Figma (file `QSnV4VBOySjZQJ9zZHevcl`) to `public/images/recall/` (home, home-empty, search, search-empty). Shown via `components/PhoneFrame.tsx` (CSS phone bezel + `next/image`): Recall's Work-card thumb (`lib/projects.ts` → `thumb`) and 4 Showcase tiles (`components/Showcase.tsx`, tiles with `img`).
- **To add a project's images:** export its Figma frames as PNGs to `public/images/<project>/`, set the Project's `thumb` in `lib/projects.ts`, and set `img` on the relevant Showcase tiles. Non-filled tiles/cards stay gradient/`IMG ·` placeholders.

### Placeholders still to replace
- Telehealth / Climapt / Earthquake — Work thumbs + Showcase tiles (gradient/`IMG ·`).
- Hero headline tiles (`.htile-img`, `.htile-dark`) — generic, not project-specific.

### Dev
`npm install`, `npm run dev` (http://localhost:3000), `npm run build`. Motion is reduced-motion + no-JS safe; `/` prerenders static.
