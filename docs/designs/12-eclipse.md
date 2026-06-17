# 12 — ECLIPSE (Total Eclipse)

**Route:** `/12` · **Component:** `src/views/Eclipse.vue` · **Accent:** `#fbbf24` (amber/gold) · *Space theme*

## Concept
A total solar eclipse at totality: a black disc ringed by a glowing **corona**, animated solar rays, a "diamond ring" sparkle, over a twinkling starfield. Deep black with gold/amber accents.

## Signature tech
- **CSS eclipse** — stacked layers: rotating `repeating-conic-gradient` rays (masked to a ring), a glowing corona (layered `box-shadow`), a black moon disc, and a sparkle.
- **Scroll + pointer parallax** — the eclipse drifts/scales on scroll; pointer offsets it slightly.
- CSS twinkling starfield. `v-anim` reveals; **Lenis** smooth scroll.

## Sections
Hero (`✸ totality`) → About (`01 · About`, `AboutFacts`) → Stats (stagger) → Services (`02 ·`, `.grid3`) → Skills (`03 ·`, chips) → **How it works** (`06 ·`, `.grid3`) → **Industries** (`07 ·`, chips) → Work (`04 ·`, `.grid2`) → Certificates (`05 ·`) → Contact ("Out of the shadow").

## Animations
Corona ray rotation, diamond sparkle, scroll/pointer parallax, per-section `v-anim` (slide/stagger/flip/zoom/clip/blur/rotate), `v-count`.

## Responsive
Eclipse scales with `clamp()`; grids → 1–2 col; hero offset adjusted ≤860px.
