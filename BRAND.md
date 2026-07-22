# Brand — Kaan Esendemir

## Site positioning (v3)

- **Goal:** Notable personal presence — enterprise systems · AI adoption · education
- **Stack:** Pure static HTML / CSS / vanilla JS → Cloudflare Pages (**no build**)
- **CTA:** LinkedIn + Buttondown newsletter (stub until username set)
- **No top-right header chrome** — CTAs live in the page body
- **Footer:** © name + `vX.Y.Z`
- **Blog:** `/blog/` — public HTML posts; SEO + breadcrumbs + LinkedIn share
- **Vision board:** `/vision/` — leadership / “how I’d run a company”; `noindex`
- **Tools:** `/tools/` public for now, `noindex`; gate later
- **No public email/phone** on the site

## Title line

**Application Architect · Adjunct Professor**  
(AI called out in copy and Person JSON-LD, not jammed into the job title)

## Site palette

| Token | Hex |
|-------|-----|
| Accent | `#ED1E45` |
| Accent text | `#FFFFFF` |
| Background | `#F6F7F9` (+ soft rays) |
| Text | `#0F1419` |
| Muted | `#5A6572` |
| Line | `#E2E6EB` |

Font: **Inter**

## Routes

| Route | Notes |
|-------|--------|
| `/` | Hero, CTAs, projects preview, credentials, press |
| `/projects/` | All projects |
| `/projects/[slug]/` | Share target — OG + LinkedIn share + copy link |
| `/blog/` | Public posts — SEO, breadcrumbs, LinkedIn share |
| `/blog/[slug]/` | Post page — OG thumbnail + title, ShareBar |
| `/vision/` | Running leadership vision board — noindex |
| `/tools/` | Personal prompts — noindex |

## Writing new pages

Add a folder with `index.html` (e.g. `blog/my-post/index.html`), link it from the index, update `sitemap.xml` for public pages, bump `VERSION` + footers, commit, push.

## Cloudflare Pages

| Setting | Value |
|---------|--------|
| Build command | *(empty)* |
| Build output directory | `/` |
| Root directory | *(empty)* |
| Production branch | `main` |

Then **Purge Everything** if an old deploy was edge-cached.

## Versioning

- Source: [`VERSION`](VERSION)
- Footer versions in HTML must match
- Ship by default: bump → commit → push (`.cursor/rules/ship.mdc`)

## Book (offline from primary site chrome)

Tracked offline for now — not listed in the public projects grid.
