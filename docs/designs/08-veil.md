# 08 — VEIL (Spotlight Reveal)

**Route:** `/8` · **Component:** `src/views/Veil.vue` · **Accent:** `#cbd5e1` (silver)

## Concept
A noir, graphite/silver experience. The hero hides in darkness and the **cursor is a flashlight** that reveals the name; a soft light-glow trails the pointer site-wide. Content sections are an elegant silver-on-charcoal theme.

## Signature tech
- **Hero spotlight** — a `.spot` overlay with `radial-gradient(circle 300px at var(--x) var(--y), transparent, dark)`; `--x/--y` follow the pointer (default centred so it reads on load/touch).
- **Global cursor glow** — a fixed `screen`-blend radial that follows the pointer across all sections.
- `v-reveal` / `v-anim` section entrances. **Lenis** smooth scroll.

## Sections
Hero (flashlight) → About (`01 — About`, grayscale portrait, `AboutFacts`, stats) → Services (`.grid3`) → Skills (dotted-leader lines) → **How it works** (`06 —`, `.grid3` cards) → **Industries** (`07 —`, `.grid3` cards) → Work (`.grid2`, grayscale→color hover) → Certificates → Contact ("Step into the light").

## Animations
Pointer spotlight + glow, `v-anim` per section (zoom/flip/etc.), `v-count` stats, hover de-saturate.

## Responsive
Grids → 1 column; on touch (no hover) the hero stays readable via the default-centred spotlight.
