# Image sources — landing imagery

All landing images are **Pexels** photos downloaded under the **Pexels License**
(free for commercial and non-commercial use, no attribution required, modification allowed).
CDN form used: `https://images.pexels.com/photos/<ID>/pexels-photo-<ID>.jpeg?auto=compress&cs=tinysrgb&w=1600`

Originals are stored as JPEG in the session scratch area (`mm-imgs/final/`), then converted
to responsive WebP at build time into `public/` (see "Optimized files" below).

| Final name | Pexels ID | Source URL | License | Intended use |
|---|---|---|---|---|
| `hero-market.jpg` | 28536810 | https://www.pexels.com/photo/28536810/ | Pexels License | Full-bleed hero background (eager, single 1152w, dark gradient overlay) |
| `cat-produce.jpg` | 868110 | https://www.pexels.com/photo/868110/ | Pexels License | Discovery mosaic — produce category card (lazy) |
| `cat-crafts.jpg` | 33337889 | https://www.pexels.com/photo/33337889/ | Pexels License | Discovery mosaic — crafts category card (lazy) |
| `cat-electronics.jpg` | 33763153 | https://www.pexels.com/photo/33763153/ | Pexels License | Discovery mosaic — phones & accessories card (lazy) |
| `cat-fashion.jpg` | 4199526 | https://www.pexels.com/photo/4199526/ | Pexels License | Discovery mosaic — fashion & vendors card (lazy) |
| `story-mobilemoney.jpg` | 4226272 | https://www.pexels.com/photo/4226272/ | Pexels License | Narrative band — mobile money payment (lazy) |
| `story-meetup.jpg` | 14751081 | https://www.pexels.com/photo/14751081/ | Pexels License | Narrative band — in-person meetup / handing goods (lazy) |

## Optimized files (WebP)

Byte budget: the seven landing images total **302.4 KB** (309,658 B) against a ~312 KB target.
Widths/qualities were chosen by measuring quality sweeps at the planned CSS display sizes
(hero 1152 covers full-bleed up to 1x desktop; cards 560 ≈ 2x DPR for a ~270 px mosaic card;
stories 640 for the narrative band).

| WebP file | Width | Quality | Size | Source |
|---|---|---|---|---|
| `public/hero-market-1152.webp` | 1152 | 40 | 163,188 B (159.4 KB) | `hero-market.jpg` |
| `public/cat-produce-560.webp` | 560 | 55 | 28,306 B (27.6 KB) | `cat-produce.jpg` |
| `public/cat-crafts-560.webp` | 560 | 55 | 30,534 B (29.8 KB) | `cat-crafts.jpg` |
| `public/cat-electronics-560.webp` | 560 | 55 | 23,528 B (23.0 KB) | `cat-electronics.jpg` |
| `public/cat-fashion-560.webp` | 560 | 55 | 15,654 B (15.3 KB) | `cat-fashion.jpg` |
| `public/story-mobilemoney-640.webp` | 640 | 55 | 9,670 B (9.4 KB) | `story-mobilemoney.jpg` |
| `public/story-meetup-640.webp` | 640 | 55 | 38,778 B (37.9 KB) | `story-meetup.jpg` |

## Notes

- Every image carries explicit `width`/`height` attributes to prevent layout shift.
- Hero image is eager + high priority; everything else is `loading="lazy"`.
- No emails, no analytics trackers, no third-party image CDNs at runtime — images are served
  from our own `dist/` (Netlify CDN).
- Rejected candidates (handshake stock clichés, wrong locale/market, portrait mismatch) were
  discarded and never used; see session log in `AGENTS.md`.
