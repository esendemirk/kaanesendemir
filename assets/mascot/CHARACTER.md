# Mascot character bible — Soft Citron Kaan

Canonical style for **Learn with Kaan** / ***Careful with AI*** (book, website, and a future all-ages educational cartoon): **soft 3D chibi (#3)**.

This lives in the repo as plain docs/assets — not a Cursor skill. We’ll reorganize later into a shared brand/cartoon repo if needed.

## Why #3 is the master

- Reads as a storybook / series character across ages.
- Soft volume survives print, covers, and animation better than ultra-flat.
- Flatter web stickers are derived **from** this face (same geometry, less shade) — not a second unrelated design.

## Master references

**Always** use these when generating new poses or outfits:

- `canonical/hero-wave-book.png`
- `canonical/face-lock-sheet.png`
- Real likeness only: `../ref/headshot.png`

## Face lock (do not drift)

| Feature | Spec |
|---------|------|
| Proportions | Large rounded head, smaller torso/limbs (chibi ~2.5–3 heads tall for full body) |
| Skin | Fair/warm light-medium; soft subsurface feel |
| Hair | Dark brown, thick, styled **upward** (modern pompadour / textured spikes); never flat side-part |
| Brows | Dark, arched, readable |
| Eyes | Large, dark brown, friendly; clear white catchlights; defined lashes |
| Nose | Small, soft, understated |
| Mouth | Gentle confident smile / slight smirk; warm, not goofy |
| Beard | Full, well-groomed dark brown beard + mustache connected to sideburns; neat, not scruffy |
| Expression baseline | Approachable teacher — curious, kind, calm confidence |

**Identity rule:** If the beard, upward hair, or eye shape change, regenerate. Clothes/props may change; **face geometry must not.**

## Body & default wardrobe

- Soft rounded chibi body; hands slightly oversized for clarity in pop-outs.
- **Default outfit:** navy crewneck sweater over **light blue collared shirt** (collar visible).
- Khaki/tan pants + simple dark shoes when full-body.
- Optional brand prop: Soft Citron (`#D4E157`) hardcover titled **Careful with AI** (or series mark **Learn with Kaan**). Prefer plain citron book — avoid random fruit logos unless specified.

## Rendering style (canonical)

- Soft 3D / gentle ambient occlusion, smooth highlights, no harsh comic cel.
- Clean studio or transparent-ready plain background unless scene art is requested.
- Soft Citron `#D4E157` as the only loud accent (book, UI props, small badges).
- Neutrals: navy, light blue, warm skin, dark brown hair/beard, brand dark `#0A0B0D` when on website scenes.

## Book & site pose vocabulary

| Pose ID | File | Use |
|---------|------|-----|
| `hero-wave-book` | `canonical/hero-wave-book.png` | Cover / hero |
| `face-lock` | `canonical/face-lock-sheet.png` | Consistency sheet |
| `peek-popout` | `poses/peek-popout.png` | Page corner or site edge peeks |
| `quote-bust` | `poses/quote-bust.png` | Quote bubbles / callouts |
| `point-aside` | `poses/point-aside.png` | “Look here” teaching moments |
| `think` | `poses/think.png` | Tips, “pause and try” moments |

When adding poses: same face, same hair volume, same beard silhouette; only pose, hands, props, clothes change.

## Generation checklist

1. Read this file + attach `hero-wave-book` and `face-lock-sheet` as reference images.
2. Prompt must include: soft 3D chibi, upward dark hair, full dark beard, large brown eyes with catchlights, navy sweater + light blue collar, gentle smile.
3. State the pose ID and framing (full / bust / peek).
4. Reject outputs that age him up/down, remove the beard, flatten the hair, or go anime-eye extreme / photoreal.

## Future educational cartoon (Cocomelon-class)

Long-term: a short-form, all-ages animated series that teaches AI concepts the way Cocomelon-style shows teach everyday skills — simple stories, repetition, songs/hooks optional, warm teacher-guide energy.

- This bible is the **model sheet**; episodes may change wardrobe/sets, never the face lock.
- Keep language gentle for hesitant learners; celebrate small wins.
- Soft Citron stays the show accent; avoid scary “robot takeover” vibes.
- Book pop-outs and site mascot should match the same character so kids/parents recognize him across formats.

## Flatter derivatives

For stickers/web icons: regenerate from the 3D canonical references, then simplify shading only. Do not invent a second face.
