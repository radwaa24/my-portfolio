# 04 — RAW (Kinetic Brutalist)

**Route:** `/4` · **Component:** `src/views/Raw.vue` · **Accent:** `#facc15` (acid yellow) · **Light theme**

## Concept
A bold anti-corporate brutalist editorial: off-white paper, heavy black borders, huge 900-weight type, acid-yellow accents, film grain. The deliberate counterpoint to the dark/glowy routes.

## Signature tech
- **Text scramble/decode** — a custom JS effect scrambles each `.scramble` heading into place on scroll-in and on hover (IntersectionObserver-driven).
- **Scroll-velocity skew** — GSAP reads `ScrollTrigger.getVelocity()` and skews `.skewable` elements, easing back to 0 (springy reactive feel).
- Infinite CSS **marquees**; SVG-noise grain overlay; `mix-blend-mode`.
- **Lenis** smooth scroll.

## Sections
Hero (mega outline type) → marquee → About → Stats (bordered) → Services (numbered list) → Skills (tag wall) → **Process** (`(06) HOW IT WORKS`, numbered list, scramble heading) → **Industries** (`(07) INDUSTRIES`, tag wall) → Work (bordered rows, grayscale→color video on hover) → Certificates (offset-shadow cards) → Contact (bordered form) → footer marquee.

## Animations
`.pop` GSAP reveals, scramble headings, velocity skew, hover invert on tags/links.

## Responsive
Grids → 1–2 col; works/services restructure; contact form single column.

## Note
The About facts here use `AboutFacts` (theme-aware); the rest is bespoke brutalist. Light theme is flagged via `experiences[].light`.
