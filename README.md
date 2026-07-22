# kaanesendemir.com

Personal brand site for **Kaan Esendemir** — Application Architect & Adjunct Professor.

Built with **Astro** (static). Hosted on **Cloudflare Pages** (free).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output: `dist/`

### Cloudflare Pages

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 22+

Optional env: `PUBLIC_BUTTONDOWN_USERNAME` for newsletter signup.

## Content

| Path | Purpose |
|------|---------|
| `src/content/projects/*.md` | Shareable project pages |
| `src/data/press.json` | Press / alumni mentions |
| `src/data/credentials.json` | Roles, teaching, education |
| `src/data/tools.json` | Personal prompts (`/tools`, noindex) |

## CTAs

- LinkedIn: https://www.linkedin.com/in/kaanesendemir/
- Newsletter: Buttondown embed (stub until username is set)

## Version

See `VERSION` and footer `vX.Y.Z`. Ship: bump → commit → push.
