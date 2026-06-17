# 02 — ORBIT (3D Particle Universe)

**Route:** `/2` · **Component:** `src/views/Orbit.vue` · **Accent:** `#38bdf8` (cyan)

## Concept
An immersive sci-fi space: a **3D spiral galaxy** of ~12,000 glowing particles. Scrolling flies the camera through it; the mouse parallaxes the view. A corner HUD shows scroll "depth".

## Signature tech
- **Three.js** `BufferGeometry` points (spiral-galaxy generator: branches + spin + randomized power falloff), additive blending, vertex colors (inside cyan → outside indigo), `FogExp2`.
- Render loop ties `points.rotation` and `camera` position to `window.scrollY`; mouse eases camera x/y.
- **Lenis** smooth scroll.

## Sections
Hero (HUD + galaxy) → About (glass `.panel`) → Stats row → Services (`.grid3` `.mini`) → Skills (chips) → **Process** (`.panel` `.grid3`) → **Industries** (`.panel` `.grid3`) → Work (`.grid2`) → Certificates → Contact. Content sits on translucent blurred `.panel`s + a radial scrim behind the hero text for readability over the bright galaxy core.

## Animations
Per-section `v-anim` variety (left / zoom / flip / clip / right / blur), `v-count` stats, hover lifts.

## Responsive
HUD hidden ≤860px; grids collapse; hero scaled ≤600px.

## Lifecycle
Geometry/material/renderer disposed; rAF + listeners removed on unmount.
