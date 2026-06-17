# 11 — SYNTH (Retrowave)

**Route:** `/11` · **Component:** `src/views/Synth.vue` · **Accent:** `#ff4dd2` (neon) + cyan/orange

## Concept
80s retro-futurism: a **neon perspective grid** racing toward a striped, glowing **sun**, chrome typography, scanlines, deep-purple sky with stars. Pure CSS (no canvas/WebGL).

## Signature tech
- **CSS 3D grid floor** — a plane with `transform: perspective() rotateX()` and a moving grid `background-position` animation (the "racing" effect), neon glow via `drop-shadow`.
- **Striped sun** — gradient circle with a repeating-linear-gradient mask cutting horizontal bands.
- Chrome headline via layered `background-clip: text` + drop-shadows; scanline overlay; subtle mouse parallax on the scene.
- `v-reveal` / `v-anim`; **Lenis** smooth scroll.

## Sections
Hero (`◈ press start`, chrome name over sun) → About (`AboutFacts`, stats) → Services (neon `.panel` cards) → Skills (chips) → **How it works** (`.panel` cards) → **Industries** (chips) → Work (`.panel` cards) → Certificates → Contact ("GAME ON").

## Animations
Grid race, sun glow, chrome shimmer, scanlines, `v-anim` per section, `v-count`.

## Responsive
≤600px: scene parallax off, sun shrunk/raised, chrome name sized down + shadow so it doesn't collide with the sun; grids collapse.
