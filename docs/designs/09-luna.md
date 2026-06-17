# 09 — LUNA (Moonlight) 🌙

**Route:** `/9` · **Component:** `src/views/Luna.vue` · **Accent:** `#93c5fd` (moon blue) · *Space theme*

## Concept
A serene night sky: a glowing **cratered moon**, a twinkling starfield with **shooting stars**, and the moon **waning through phases as you scroll**. Midnight-indigo background, silver/blue accents.

## Signature tech
- **Canvas starfield** — twinkling stars (sine alpha), depth parallax, randomly-spawned shooting stars with gradient trails.
- **CSS moon** — layered radial gradients + crater spans + glow; a `.phase` overlay slides across (driven by a `--phase` CSS var tied to scroll) to simulate lunar phases. Mouse parallaxes the moon.
- `v-reveal` / `v-anim` reveals; **Lenis** smooth scroll.

## Sections
Hero (moon + stars) → About (`✦ About`, `AboutFacts`, stats) → Services (`.grid3`) → Skills ("constellation" star-chips) → **How it works** (`✦`, `.grid3`) → **Industries** (`✦`, star-chips constellation) → Work (`.grid2`) → Certificates → Contact ("Reach for the stars").

## Animations
Canvas twinkle + shooting stars, scroll-driven moon phase + parallax, `v-anim` per section, `v-count`.

## Responsive
Moon shrinks / shifts off-edge ≤860px; grids collapse; canvas full-bleed.

## Lifecycle
`cancelAnimationFrame` + resize/scroll/pointer listeners removed on unmount.
