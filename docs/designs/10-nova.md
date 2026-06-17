# 10 — NOVA (Hyperspace) ✦

**Route:** `/10` · **Component:** `src/views/Nova.vue` · **Accent:** `#22d3ee` (cyan) + magenta · *Space theme*

## Concept
Deep-space travel: a **hyperspace warp** of stars streaking past, **accelerating when you scroll**, over a teal/magenta nebula. The cursor draws **constellations** between nearby ambient stars.

## Signature tech
- **Canvas, two systems in one:**
  1. *Warp* — stars projected in 3D (`x/z`, `y/z`); `z` decreases each frame (speed boosted by scroll velocity) creating streaks from a centre vanishing point; recycle on pass.
  2. *Constellation* — slow 2D ambient stars; lines drawn from the cursor to nearby stars and between them.
- CSS nebula (blurred radial gradients) behind the canvas.
- `v-reveal` / `v-anim`; **Lenis** smooth scroll.

## Sections
Hero (`▚ entering hyperspace`) → About (`// about`, `AboutFacts`, stats) → Services (`.grid3`) → Skills (chips) → **How it works** (`//`, `.grid3`) → **Industries** (`//`, chips) → Work (`.grid2`) → Certificates → Contact ("Signal me across the void").

## Animations
Warp acceleration on scroll, cursor constellations, `v-anim` per section, `v-count`.

## Responsive
Grids collapse; canvas full-bleed; constellation follows touch where available.

## Lifecycle
`cancelAnimationFrame` + listeners removed on unmount.
