# Brand — Kaan Esendemir

## Site positioning (v2)

- **Goal:** Notable personal presence — enterprise systems · AI adoption · education
- **Stack:** Astro static → Cloudflare Pages (`dist/`)
- **CTA:** LinkedIn + Buttondown newsletter (stub until username set)
- **No top-right header chrome** — CTAs live in the page body
- **Footer:** © name + `vX.Y.Z`
- **Tools:** `/tools` public for now, `noindex`; gate later
- **Vision board:** `/vision` — leadership / “how I’d run a company”; Markdown chapters; `noindex`
- **No public email/phone** on the site

## Title line

**Application Architect · Adjunct Professor**  
(AI called out in copy and `knowsAbout`, not jammed into the job title)

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
| `/projects` | All projects |
| `/projects/[slug]` | Share target — OG + LinkedIn share + copy link |
| `/tools` | Personal prompts — noindex |
| `/vision` | Running leadership vision board — Markdown chapters, noindex |
| `/vision/[slug]` | Single chapter (wiki-style deep link) — noindex |

## Versioning

- Source: [`VERSION`](VERSION)
- Sync `SITE_VERSION` in [`src/config.ts`](src/config.ts)
- Ship by default: bump → commit → push (`.cursor/rules/ship.mdc`)

## Book (offline from primary site chrome)

| Field | Value |
|-------|--------|
| Title | Careful with AI |
| Subtitle | What I've Learned Driving Adoption |
| Status | Tracked as a **project** page for LinkedIn sharing |

Book Soft Citron system: [`brand-system/COLORS-AND-TYPE.md`](brand-system/COLORS-AND-TYPE.md)

## LinkedIn

https://www.linkedin.com/in/kaanesendemir/
