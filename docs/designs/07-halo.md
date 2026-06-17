# 07 — HALO (Holographic)

**Route:** `/7` · **Component:** `src/views/Halo.vue` · **Accent:** `#c084fc` (purple)

## Concept
Iridescent holographic foil on a deep plum base. Headlines shimmer through a moving rainbow gradient; cards behave like holo trading cards that tilt and catch light toward the cursor.

## Signature tech
- **Animated foil** background: a large blurred `conic-gradient` (pink→purple→indigo→cyan→gold) slowly rotating, plus an SVG-noise grain overlay (`mix-blend-mode: overlay`).
- **Holo cards** (`.holo`): per-card `@pointermove` sets `--mx/--my` CSS vars driving a `color-dodge` rainbow sheen, and applies a 3D `rotateX/Y` tilt; resets on `pointerleave`.
- Iridescent text via animated `background-clip: text`.
- **Lenis** smooth scroll; `v-reveal` for section entrances.

## Sections
Hero (`.iri` headline) → About (holo card + stats) → Services (`.grid3` holo cards) → Skills (holo cards + chips) → **How it works** (holo `.grid3`) → **Industries I serve** (holo `.grid3`) → Work (holo project cards) → Certificates (holo) → Contact (holo form).

## Animations
Foil rotation, mouse-tilt + sheen on every `.holo`, shimmer headings, magnetic buttons, `v-reveal`.

## Responsive
Grids collapse to 1 column ≤860px; tilt/sheen are pointer-driven (graceful on touch).
