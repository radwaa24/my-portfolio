# 13 — AURORA (Northern Lights)

**Route:** `/13` · **Component:** `src/views/Aurora.vue` · **Accent:** `#4ade80` (green) · *Space theme*

## Concept
An arctic night under the aurora borealis: flowing **curtains of green/teal/violet light** over a twinkling starfield and a faint horizon glow.

## Signature tech
- **Canvas aurora** — several "curtain" bands, each a vertical gradient shape whose lower edge waves via layered sines over time, drawn with `globalCompositeOperation: "lighter"` (additive glow). Twinkling stars share the canvas.
- CSS horizon gradient at the base. `v-anim` reveals; **Lenis** smooth scroll.

## Sections
Hero (`✦ 69° north`) → About (`01 · About`, `AboutFacts`) → Stats (stagger) → Services (`02 ·`, `.grid3`) → Skills (`03 ·`, chips) → **How it works** (`06 ·`, `.grid3`) → **Industries** (`07 ·`, chips) → Work (`04 ·`, `.grid2`) → Certificates (`05 ·`) → Contact ("Let's light the sky").

## Animations
Flowing aurora curtains, twinkle, per-section `v-anim` (right/stagger/blur/flip/left/zoom/clip), `v-count`.

## Responsive
Grids collapse; canvas full-bleed.

## Lifecycle
`cancelAnimationFrame` + resize listener removed on unmount.
