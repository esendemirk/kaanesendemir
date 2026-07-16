# Brand system — colors & type

Forever visual system for Kaan Esendemir / Soft Citron / Learn with Kaan.  
Use on **all** UI in this repo unless explicitly overridden.  
(Not a Cursor skill — plain repo docs. A global brand repo can absorb this later.)

## Color tokens (locked)

| Token | Hex | CSS variable | Role |
|-------|-----|--------------|------|
| Background | `#0A0B0D` | `--bg` | Canvas (near-black, not `#000`) |
| Surface | `#12141A` | `--surface` | Panels, inputs, elevated chrome |
| Text | `#F2F4F8` | `--text` | Primary copy |
| Muted | `#8B93A7` | `--muted` | Secondary copy, labels |
| Line | `#1E2330` | `--line` | Borders, hairlines, dividers |
| Accent (Soft Citron) | `#D4E157` | `--accent` | CTAs, focus rings, signature marks |
| Accent text | `#0A0B0D` | `--accent-text` | Text/icons on accent fills |

### CSS starter

```css
:root {
  --bg: #0a0b0d;
  --surface: #12141a;
  --text: #f2f4f8;
  --muted: #8b93a7;
  --line: #1e2330;
  --accent: #d4e157;
  --accent-text: #0a0b0d;
  --font: Inter, "Open Sans", "Segoe UI", system-ui, sans-serif;
}
```

### Usage rules

- Default UI is **dark**: `--bg` canvas, `--text` on top.
- Soft Citron is the **only** chromatic accent. Do not add a second brand color.
- Primary buttons: `background: var(--accent); color: var(--accent-text)`.
- Focus rings: Soft Citron (`outline-color: var(--accent)`).
- Links in body copy may use `--accent`; keep hover subtle (brightness), no purple.
- Do **not** substitute pure black `#000000`, Spotify green, NVIDIA `#76B900`, Meta/LinkedIn blue, Discord blurple, or purple AI gradients.
- Light-mode variants are out of scope unless the user asks; if added later, keep Soft Citron as the accent.

## Typography (locked)

| Role | Font |
|------|------|
| UI / body / headings | **Inter** |
| Fallback stack | `"Open Sans", "Segoe UI", system-ui, sans-serif` |

```css
font-family: Inter, "Open Sans", "Segoe UI", system-ui, sans-serif;
```

### Type rules

- Load Inter via Google Fonts or self-host; prefer weights **400 / 500 / 600 / 700**.
- Headings: semibold (600), tight tracking (`letter-spacing: -0.02em` to `-0.035em`).
- Body: 15–16px equivalent, comfortable line-height (~1.5).
- Eyebrows / labels: smaller, uppercase or muted, letter-spacing slightly open.
- Do not introduce display serifs or alternate brand fonts unless the user asks.

## Product vibe

- Luxe minimal, Uber/Tesla-app restraint: dark canvas, one sharp accent, little chrome.
- Almost no cards; avoid purple glow, pill-stat clutter, and generic “AI SaaS” looks.
- Soft Citron should feel intentional and rare—use it for action and identity, not large washes.

## New UI checklist

1. Use the CSS variables above (see also `css/styles.css`).
2. Keep `font-family` on the Inter stack; wire Inter load if missing.
3. Map primary CTA / focus / key marks to `--accent` + `--accent-text`.
4. Use neutrals only for structure (bg, surface, text, muted, line).
5. Skip adding extra brand colors “for variety.”

## Related

- Positioning / speakable copy: [`BRAND.md`](../BRAND.md)
- Mascot face lock & poses: [`assets/mascot/CHARACTER.md`](../assets/mascot/CHARACTER.md)
