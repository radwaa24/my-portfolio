# 01 — FLUX (Liquid WebGL)

**Route:** `/1` · **Component:** `src/views/Flux.vue` · **Accent:** `#a78bfa` (violet)

## Concept
A premium, dreamy hero driven by a **live WebGL fluid shader** that flows and reacts to the mouse, paired with a kinetic per-letter name reveal. Content sits on a faintly-tinted dark panel so the shader bleeds through at the hero and footer.

## Signature tech
- **Three.js** full-screen `ShaderMaterial` on an orthographic quad. Custom **GLSL fragment shader**: value-noise → domain-warped fbm → IQ cosine palette, producing flowing iridescent fields. Uniforms: `u_time`, `u_mouse` (eased), `u_res`. Pixel ratio capped at 1.5 for perf.
- **GSAP** hero animation: name split into letters, `yPercent` reveal with stagger; scroll-reveals via ScrollTrigger.
- **Lenis** smooth scroll (desktop).

## Sections
Hero (kinetic letters) → About → Stats (`v-count`) → Services → Skills (animated bars) → **Process** (`.cards`) → **Industries** (`.cards`) → Work (alternating rows) → Certificates → Contact (over the shader).

## Animations
`.reveal-up` (GSAP ScrollTrigger), letter stagger, animated skill bars, magnetic buttons, gradient-shimmer headline.

## Responsive
Single-column content ≤860px; hero font/role/tag scaled + text-shadow ≤600px. Shader runs full-bleed on all sizes.

## Lifecycle
Renderer/material disposed and `requestAnimationFrame` cancelled in `onBeforeUnmount`; GSAP context reverted.
