# Brand — Kaan Esendemir

## Positioning
- **Site primary:** Kaan as a trusted tech leader — careful **enterprise AI adoption** consulting (trust → hire)
- Book 1: ***Careful with AI*** — *What I've Learned Driving Adoption*
- Book angle: personal AI adoption + driving it for others + tips/tricks (not Learn with Kaan teaching jacket)
- Slogan: **You can be careful and still begin.**
- Cred (site/press): Application Architect · Adjunct Professor · Author
- Bylines: **Gets careful people started with AI.**
- Primary CTA (site): **LinkedIn only** (no email/phone on the surface — anti-scrape)
- Secondary: book under construction
- Monetization: consulting first; book supports trust/notability
- *Learn with Kaan*: optional later media/teaching brand — **not** on this book cover

## Versioning

- Source of truth: [`VERSION`](VERSION) (semver)
- Site footer shows `vX.Y.Z` via `SITE_VERSION` in `js/main.js` (keep in sync)
- Ship by default: bump → commit → push (see `.cursor/rules/ship.mdc`)

## Book 1 (cover direction locked — manuscript open)

| Field | Value |
|-------|--------|
| Title | Careful with AI |
| Subtitle | What I've Learned Driving Adoption |
| Format | Practical nonfiction — experience, adoption stories, tips & tricks |
| Core | Adopting AI yourself + driving adoption for hesitant people/teams |
| Audience | Careful professionals, leaders, and teams |
| Outline | [`brand-system/BOOK-1.md`](brand-system/BOOK-1.md) |
| Covers | `assets/covers/cover-exp-front.png` · `cover-exp-back.png` |

Retired: picture-book / Learn with Kaan jacket; *Learn AI Without the Pressure* as subtitle; *It's Okay to Be Careful*; *AI for All* as book name.

## Forever color & type

Full tokens, CSS, and type rules: [`brand-system/COLORS-AND-TYPE.md`](brand-system/COLORS-AND-TYPE.md)

| Token | Hex | Role |
|-------|-----|------|
| Accent (Soft Citron) | `#D4E157` | CTAs, focus, signature |
| Accent text | `#0A0B0D` | Text on accent |
| Background | `#0A0B0D` | Canvas |
| Surface | `#12141A` | Inputs / stage |
| Text | `#F2F4F8` | Primary |
| Muted | `#8B93A7` | Secondary |
| Line | `#1E2330` | Hairlines |

## Mascot (canonical)
- **Style:** soft 3D chibi (#3) — master for book, site, future *Learn with Kaan* cartoon
- **Docs + assets:** [`assets/mascot/CHARACTER.md`](assets/mascot/CHARACTER.md)
- Flatter stickers are **derivatives** of this face (same geometry, less shade)

## Speakable
- Driving **careful AI adoption** (enterprises + hesitant teams)
- Personal lessons from adopting AI yourself (patterns, not secrets)
- Tips, habits, and judgment checks that help people start
- *Careful with AI* / *Learn with Kaan*
- Application Architect + Adjunct Professor titles

## Unspeakable
- Employer internals, PoCs, confidential tooling or metrics
- Research / preprint / IP callouts on this brand surface
- Workshop / membership hard-sell (not the center for now)
- Old picture-book positioning as the current book promise

## Integrations (later)
- Email list → `CONFIG.fieldNotesEndpoint` in `js/main.js` (Buttondown or similar)

## LinkedIn
Headline direction: `Careful AI Adoption · Application Architect · Adjunct Professor`  
CTA posts → `https://kaanesendemir.com/` → LinkedIn

## Notability note
ISBN + Google Books + Amazon Author Central + consistent author bio + press. Experience book on careful AI adoption + consulting presence feed the Author / Person entity for Knowledge Panel.
