# 00 — Home (Original)

**Route:** `/` · **Component:** `src/views/Home.vue` (+ `src/components/*`) · **Accent:** `#f87171` (light theme)

## Concept
The original portfolio — preserved intact and kept as the landing page. A classic fixed-sidebar layout with a soft red/cream palette. This is the only route built with Tailwind utility classes and the only one using AOS for reveals.

## Layout
- `Links.vue` — fixed left sidebar (avatar, name, socials, anchor nav). Hidden below `lg`.
- Main column: `Hero` → `About` → `Skills` → `Projects` → `Certificates` → **Process** → **Industries** → `Contact`.
- The wrapper is `lg:flex lg:h-screen` (flex/height only at desktop) so mobile flows as a normal full-width column.

## Sections & tech
- **Hero** (`Hero.vue`) — typed.js role cycle (`profile.roles`), cross-fading background images.
- **Skills** (`Skills.vue`) — animated SVG circular progress meters (IntersectionObserver).
- **Projects** (`Projects.vue`) — `@yeger/vue-masonry-wall` of `-web.mp4` videos.
- **Certificates** (`Certificates.vue`) — Swiper coverflow carousel.
- **Process / Industries** — inline Tailwind cards (`border-red-50`) matching the original style; Industries is 1-col mobile → 2 (`md`) → 4 (`lg`).
- **Contact** (`Contact.vue`) — Formspree form.

## Animations
AOS `data-aos="fade-up"` throughout (native scroll). No Lenis, no GSAP.

## Notes
- This file's content (skills, hero roles, projects, about title/bio) is kept in sync with `data/portfolio.js` manually since the original components hold their own inline data.
- Leave the design as-is; only content is updated here.
