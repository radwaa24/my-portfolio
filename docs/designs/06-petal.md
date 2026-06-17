# 06 — PETAL (Soft Editorial)

**Route:** `/6` · **Component:** `src/views/Petal.vue` · **Accent:** `#ec4899` (pink) · **Light theme**

## Concept
A high-fashion lookbook: blush-pink/cream, elegant Libre Baskerville display type, lots of whitespace, italic accents.

## Signature tech
- **Image-trail cursor** in the hero — moving the pointer spawns project/cert thumbnails from a pooled set that scale + fade out along the cursor path (GSAP).
- **Scroll-stacking work cards** — project cards are `position: sticky` and gently scale/dim as the next slides over them (GSAP scrub).
- **GSAP** reveals + **Lenis** smooth scroll.

## Sections
Hero (image trail) → About (editorial two-col + stats) → Services (`( What I do )` numbered list) → Skills (pills) → **Process** (`( How it works )`, numbered list) → **Industries** (`( Industries I serve )`, pill row) → Work (sticky stacking cards) → Certificates → Contact.

## Animations
`.reveal` / `.reveal-self` GSAP, sticky-card scale/brightness on scroll, image trail, magnetic buttons.

## Responsive
Grids → single column; stacking cards become a normal stack; trail still works on fine pointers. Light theme flagged via `experiences[].light`.
