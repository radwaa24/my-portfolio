# 03 — REEL (Horizontal Cinema)

**Route:** `/3` · **Component:** `src/views/Reel.vue` · **Accent:** `#fb7185` (rose)

## Concept
An agency-style showreel: **vertical scrolling drives the whole portfolio sideways** through cinematic scenes. Big editorial serif type, a progress rail at the top.

## Signature tech
- **GSAP ScrollTrigger** pins the viewport and translates the `.track` horizontally by `scrollWidth - innerWidth` (`scrub`, `invalidateOnRefresh`).
- Items reveal as they enter the horizontal viewport via `containerAnimation` tween.
- **`gsap.matchMedia`** gates the horizontal rig to `≥861px`; below that it falls back to a normal **vertical** stack.
- **Lenis** smooth scroll.

## Scenes (in order)
Intro → About → Stats → Services → Skills → **Process** (`06 / how it works`, services-style row) → **Industries** (`07 / industries`, pill wall) → Work (one scene per project) → Certificates → Contact.

## Animations
`.reveal-x` (horizontal container reveals), `v-count`, nudge/scroll hints.

## Responsive
≤860px: pin/horizontal disabled, every `.scene` becomes a full-width vertical block; projects stack.

## Lifecycle
`gsap.matchMedia().revert()` + `gsap.context().revert()` on unmount.
