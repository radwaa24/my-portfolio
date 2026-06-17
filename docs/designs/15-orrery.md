# 15 — ORRERY (Solar System)

**Route:** `/15` · **Component:** `src/views/Orrery.vue` · **Accent:** `#818cf8` (indigo) · *Space theme*

## Concept
An interactive **orrery**: planets orbit a glowing sun on animated rings. Each planet is a **clickable link to a section**; hovering the system pauses the orbits. Deep-space indigo with a starfield.

## Signature tech
- **CSS orbits** — concentric ring divs sized in `%` of the square system box, each `animation: spin` at a different duration; a planet sits on each ring and counter-spins so its label stays upright. `system:hover` pauses all orbits (`animation-play-state: paused`).
- Planets are `<a href="#section">` (Mercury→About, … ) for click-to-navigate; CSS starfield + sun glow.
- `v-anim` reveals; **Lenis** smooth scroll. (No canvas/WebGL.)

## Sections
Hero (split: text + live orrery) → About (`☉ About`, `AboutFacts`, stats) → Services (`☉`, `.grid3`) → Skills (`☉`, chips) → **How it works** (`☉`, `.grid3`) → **Industries** (`☉`, chips) → Work (`☉`, `.grid2`) → Certificates → Contact ("Orbit into my inbox"). Sections have `scroll-margin-top` for the planet anchors.

## Animations
Orbiting planets (pausable), label counter-rotation, twinkle, per-section `v-anim` (left/flip/zoom/clip/blur/rotate), `v-count`.

## Responsive
≤920px: hero stacks, system scales to `min(78vw, 460px)`; grids collapse ≤860px.
