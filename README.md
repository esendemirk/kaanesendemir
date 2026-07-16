# kaanesendemir.com

Static personal brand site — **AI for everybody**.  
HTML / CSS / vanilla JS for **Cloudflare Pages** (free).

## Local preview

Any static server from the repo root:

```bash
npx --yes serve .
```

Or open `index.html` directly (hash routing still works).

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub (or connect locally).
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → connect repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(empty)*
   - **Build output directory:** `/` (repo root)
4. Attach custom domain **kaanesendemir.com**.

## Contact

Primary CTA is **LinkedIn** only — no email or phone on the site (anti-scrape).

## Design tokens

Soft Citron accent `#D4E157` on near-black `#0A0B0D`. See `BRAND.md`.

## SEO

- Canonical, Open Graph, Twitter cards
- `Person` + `WebSite` JSON-LD
- `robots.txt` + `sitemap.xml`
- Content in static HTML (crawlable); panels are in-DOM, not JS-only injected
