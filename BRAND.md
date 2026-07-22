# Brand - Kaan Esendemir

## Site positioning (v3)

- **Goal:** Notable personal presence: enterprise systems, AI adoption, education
- **Stack:** Pure static HTML / CSS / vanilla JS on Cloudflare Pages (**no build**)
- **CTA:** LinkedIn (primary) + See projects
- **No top-right header chrome:** CTAs live in the page body
- **Footer:** © name + `vX.Y.Z`
- **Home:** Hero + CTAs only (centered); sticky footer; no newsletter
- **Layout:** Centered nav and page content
- **Vision:** `/vision/` future-company rules (meetings + vacation); `noindex`
- **Tools:** `/tools/` category capsules + search; public for now, `noindex`; gate later
- **No Experience / blog / press pages** on the site
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
| `/` | Hero + LinkedIn / projects CTAs only |
| `/projects/` | All projects |
| `/projects/[slug]/` | Share target: OG + LinkedIn share + copy link |
| `/vision/` | Future-company setup (meetings + vacation); noindex |
| `/tools/` | Personal prompts with category capsules + search; noindex |

## Writing new pages

Add a folder with `index.html`, link it from nav/indexes as needed, update `sitemap.xml` for public pages, bump `VERSION` + footers, commit, push.

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
- Ship by default: bump, commit, push (`.cursor/rules/ship.mdc`)

## Book (offline from primary site chrome)

Tracked offline for now - not listed in the public projects grid.
