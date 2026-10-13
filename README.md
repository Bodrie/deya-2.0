# ДЕЯ – Енергийни терапии

Presentational website for **Емилия Стефанова** – energy therapist, theta healing therapist, Reiki teacher and therapist, and massage therapist – and her studio in Pleven.

Three pages, all in Bulgarian:

| Path      | Page   | Contents                                                                  |
| --------- | ------ | ------------------------------------------------------------------------- |
| `/`       | Начало | Hero, the four offerings, about teaser, quote, approach, contacts + map   |
| `/uslugi` | Услуги | Sessions (online / in the studio), theta healing, Reiki training, massage |
| `/za-men` | За мен | Bio and Emilia's essay "Ние сме само свидетели"                           |

## Stack

- **React 19** + **React Router 8** (framework mode) on **Vite 8**, TypeScript.
- **Static output.** `ssr: false` with prerendering: every page is rendered to plain HTML at build time, then hydrated. There is no server; Firebase Hosting serves files.
- **Plain CSS**: design tokens and base styles in `app/styles/`, CSS Modules next to each component. No UI library.
- **Self-hosted fonts** via Fontsource: Noto Serif Display (headings) and Manrope (text). Both include Cyrillic.
- **Responsive images** via `vite-imagetools`: AVIF, WebP and JPEG generated at build time.
- Icons: `lucide-react` for UI icons; the service icons are custom SVGs built from the logo's leaf.

## Getting started

Requires Node **22.22+** (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                                             |
| ------------------- | ------------------------------------------------------------------------ |
| `npm run dev`       | Dev server with hot reload                                               |
| `npm run build`     | Production build + prerender into `build/client`, then writes `404.html` |
| `npm run preview`   | Serves `build/client` locally on port 4173                               |
| `npm run typecheck` | Generates route types and runs `tsc`                                     |
| `npm run lint`      | ESLint (TypeScript, React hooks, accessibility rules)                    |
| `npm run format`    | Prettier                                                                 |
| `npm run check`     | Typecheck + lint + build                                                 |
| `npm run brand`     | Regenerates favicons, app icons and the social preview image             |
| `npm run deploy`    | Builds and deploys to Firebase Hosting                                   |

## Project structure

```
app/
  root.tsx                 HTML shell, fonts, header/footer, error page
  routes.ts                Route table
  routes/                  home, services (uslugi), about (za-men), 404, sitemap.xml, robots.txt
  content/                 ALL site copy and business details (edit text here)
    site.ts                Name, phone, email, address, Facebook, navigation, disclaimer, site URL
    services.ts            The four offerings and the services page copy
    about.ts               Bio and essay
  components/
    layout/                Header (with mobile menu), Footer, StatusPage
    sections/              Page sections (Hero, ServicesOverview, ContactSection, …)
    sections/services/     Sections used only on the services page
    brand/                 Logo components (SVG masks)
    ui/                    Button, Picture, ArchFrame, Reveal, icons, lists
  assets/images/           Studio photos + index.ts (resize/format settings and alt text)
  assets/brand/            Logo as SVG (emblem, wordmark, full) and the original PNG
  styles/                  tokens.css (design tokens), base.css (reset, typography, utilities)
public/                    Favicons, app icons, web manifest, social preview image
scripts/                   Brand asset generator, post-build step
```

## Editing content

All text lives in `app/content/`. Components only lay it out, so text changes never touch markup.

- **Contacts, address, social links**: `app/content/site.ts`.
- **Services copy**: `app/content/services.ts`. The order of `services` is the order on the home page.
- **About and essay**: `app/content/about.ts`. Essay blocks marked `kind: "pull"` are set large as pull lines.
- Bulgarian typesetting is applied automatically (`app/lib/typography.ts`): one-letter words (и, в, с, а, е…) stay with the next word, and "по-"/"най-" compounds do not break at the hyphen. Wrap new content objects in `typeset(...)` the same way.
- Bind a dash to the previous word with a non-breaking space (`\u00A0–`). Very long words in headings can carry a soft hyphen (`\u00AD`) so they break cleanly on phones.

### Photos

Put the original in `app/assets/images/` and register it in `app/assets/images/index.ts` with alt text in Bulgarian. The import query sets the generated widths and formats. Keep widths at or below the original's width. The current photos are about 720 px wide, so higher-resolution photos of the studio (and a portrait of Emilia) would noticeably lift the site.

### Logo and icons

The logo SVGs in `app/assets/brand/` were vectorised from `logo-original.png`. They render through CSS masks, so the same file can be tinted deep gold on light backgrounds and bright gold on dark ones. After changing the logo, run `npm run brand` to regenerate the favicons, app icons and `public/og-image.jpg`.

## Design system

Tokens live in `app/styles/tokens.css`.

- **Palette**: pearl ground with a faint lilac bias, aubergine ink, the gold of the logo. Deep plum is reserved for the quote band, call to action and footer. Text colours meet WCAG AA contrast.
- **Type**: Noto Serif Display (light, with italic for emphasis) for headings; Manrope for text. Body text keeps the standard Cyrillic letterforms (`font-feature-settings: "locl" 0`), because Manrope otherwise switches to Bulgarian forms under `lang="bg"`. Display text uses `--weight-display`. On standard-density screens it also gets a 0.4px outline (`--display-stroke`), because the face's hairlines stay the same at every weight and are too thin to render whole there.
- **Motifs**: arched frames for photos (`ArchFrame`), the almond leaf from the logo for bullets and icons, hairline dividers.
- **Motion**: a short load sequence on page intros and gentle reveal-on-scroll. Content is always visible in the static HTML, and all motion is off for visitors who prefer reduced motion.

## SEO and accessibility

- Every page is prerendered HTML with its own title, description, canonical URL and Open Graph tags (`app/lib/seo.ts`). The home page carries schema.org `HealthAndBeautyBusiness` data.
- `sitemap.xml` and `robots.txt` are generated at build time from `site.url`.
- `lang="bg"`, a skip link, a single `h1` per page, labelled landmarks, visible focus states and a keyboard-accessible mobile menu (native `<dialog>`). The pages pass an automated axe audit with no violations.
- The Google Map is click-to-load, so no third-party requests or cookies happen until the visitor asks for the map.

## Deployment (Firebase Hosting)

The Firebase project is set in `.firebaserc` (`deya-therapy-2`). Hosting serves `build/client`.

```bash
npx firebase-tools login     # once
npm run deploy
```

`firebase.json` serves clean URLs without trailing slashes (`/uslugi`). It caches hashed assets for a year and adds basic security headers. Unknown URLs return a real `404` status with the site's "page not found" view.

**Custom domain:** if the site moves to its own domain, update `site.url` in `app/content/site.ts` so canonical URLs, social previews and the sitemap point to it.
