# Radwa Khalaf — Portfolio Documentation

A Vue 3 + Vite single-page app that presents the **same portfolio data** through **16 radically different experiences**: the original Home design plus 15 themed, animated routes, each with its own concept, palette, and signature interaction.

> Everything is driven from one data file, so updating content updates every design at once.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # preview the build
```

- **Node:** 22.x (pinned via `engines` in `package.json` for Vercel)
- **Deploy:** push to `main` → Vercel auto-deploys

---

## The routes

| Route | Name | Concept | Accent | Doc |
|-------|------|---------|--------|-----|
| `/` | **Home** | Original Vue SPA (sidebar + sections) | `#f87171` | [00-home](designs/00-home.md) |
| `/1` | **FLUX** | Live WebGL fluid shader | `#a78bfa` | [01-flux](designs/01-flux.md) |
| `/2` | **ORBIT** | Three.js 3D particle galaxy | `#38bdf8` | [02-orbit](designs/02-orbit.md) |
| `/3` | **REEL** | Pinned horizontal cinematic scroll | `#fb7185` | [03-reel](designs/03-reel.md) |
| `/4` | **RAW** | Kinetic brutalist | `#facc15` | [04-raw](designs/04-raw.md) |
| `/5` | **ATLAS** | Draggable infinite canvas | `#34d399` | [05-atlas](designs/05-atlas.md) |
| `/6` | **PETAL** | Soft editorial (stacking cards) | `#ec4899` | [06-petal](designs/06-petal.md) |
| `/7` | **HALO** | Holographic foil | `#c084fc` | [07-halo](designs/07-halo.md) |
| `/8` | **VEIL** | Spotlight / flashlight reveal | `#cbd5e1` | [08-veil](designs/08-veil.md) |
| `/9` | **LUNA** | Moon + starfield | `#93c5fd` | [09-luna](designs/09-luna.md) |
| `/10` | **NOVA** | Hyperspace warp + constellations | `#22d3ee` | [10-nova](designs/10-nova.md) |
| `/11` | **SYNTH** | Retrowave neon grid | `#ff4dd2` | [11-synth](designs/11-synth.md) |
| `/12` | **ECLIPSE** | Total solar eclipse | `#fbbf24` | [12-eclipse](designs/12-eclipse.md) |
| `/13` | **AURORA** | Northern lights | `#4ade80` | [13-aurora](designs/13-aurora.md) |
| `/14` | **WORMHOLE** | Tunnel warp | `#fb923c` | [14-wormhole](designs/14-wormhole.md) |
| `/15` | **ORRERY** | Interactive solar system | `#818cf8` | [15-orrery](designs/15-orrery.md) |

---

## Project structure

```
src/
  main.js                     # app bootstrap: router + motion plugin + global components
  App.vue                     # <ExperienceSwitcher/> + <FloatingContact/> + <RouterView/>
  router/index.js             # routes (Home eager, /1–/15 lazy-loaded)
  data/portfolio.js           # SINGLE SOURCE OF TRUTH for all content
  plugins/motion.js           # global directives: v-reveal, v-anim, v-tilt, v-magnetic, v-count, v-lazyvideo
  composables/
    useSmoothScroll.js        # Lenis + GSAP ScrollTrigger (desktop only)
    useTypewriter.js          # typed text effect (used by some heroes)
  components/
    common/
      ExperienceSwitcher.vue  # floating route dock (desktop) / tap menu (mobile)
      FloatingContact.vue     # WhatsApp / Telegram / Email bubble (all routes)
      AboutFacts.vue          # shared, theme-aware "about info" cards
    Links/Hero/About/Skills/Projects/Certificates/Contact.vue   # original Home sections
  views/
    Home.vue                  # the original design
    Flux/Orbit/Reel/.../Orrery.vue   # the 15 themed designs (one file each, self-contained)
  assets/                     # images + videos (see "Videos" below)
docs/                         # you are here
```

---

## Shared systems

### 1. Data layer — `src/data/portfolio.js`
The one place to edit content. Exports:

- `profile` — name, role, specialty, `roles[]` (typed), tagline, about, email, location, languages, degree, graduation, hobbies, avatar, resume, backgrounds
- `aboutFacts[]` — `{ icon, label, value }` (rendered by `AboutFacts`)
- `socials[]` — `{ name, url, icon, brand, handle }`
- `skillGroups[]` (grouped) and `skills` (flattened)
- `projects[]` — `{ title, description, video, demo?, repo?, tags[] }`
- `certificates[]` — `{ img, name, issuer, link }`
- `services[]`, `process[]`, `industries[]` — `{ icon, title/step/name, description }`
- `stats[]` — derived counts (projects, certs, skills, languages)
- `techStack[]`
- `contact` + `contactLinks` — WhatsApp / Telegram / Email (used by `FloatingContact`)
- `experiences[]` — route registry: `{ path, label, tech, accent, light? }` (drives the switcher and per-route theming of shared components)

Icons use [Flaticon UIcons](https://www.flaticon.com/uicons) classes (`fi fi-rr-*`, `fi fi-brands-*`), loaded in `index.html`.

### 2. Motion directives — `src/plugins/motion.js`
Registered globally (`app.use(motion)`). All honor `prefers-reduced-motion`.

| Directive | Purpose |
|-----------|---------|
| `v-reveal="{ y, delay, duration }"` | fade/slide an element in on scroll (IntersectionObserver) |
| `v-anim="'type'"` | varied reveals: `up, down, left, right, zoom, flip, rotate, blur, clip, stagger` |
| `v-tilt="deg"` | 3D pointer tilt on cards |
| `v-magnetic="strength"` | element follows the pointer (buttons) |
| `v-count="{ to, suffix, duration }"` | animate a number 0→target when in view |
| `v-lazyvideo="src"` | defer video load until in view, then autoplay; pause off-screen |

### 3. Smooth scroll — `src/composables/useSmoothScroll.js`
Wires **Lenis** smooth scrolling into **GSAP ScrollTrigger**. **Disabled on touch / `≤768px` / reduced-motion** so phones use native scroll (this was essential for mobile scroll + scroll-triggered reveals). Each view calls `useSmoothScroll()`; teardown is automatic on route change.

### 4. Global UI components
- **`ExperienceSwitcher`** — floating dock of all routes (desktop); collapses to a tap-to-open menu on mobile. Reads `experiences[]`.
- **`FloatingContact`** — bottom-left bubble expanding to WhatsApp / Telegram / Email, with a pre-filled message. Reads `contactLinks`.
- **`AboutFacts`** — shared "about info" card grid; auto-themes to the current route's accent + light/dark (from `experiences[]`). Replaced the old cramped per-design facts blocks.

### 5. Libraries
`vue` · `vue-router` · `three` (WebGL: FLUX, ORBIT) · `gsap` + ScrollTrigger (FLUX, REEL, RAW, PETAL) · `lenis` (smooth scroll) · `typed.js` · `swiper` + `aos` (Home) · `@yeger/vue-masonry-wall` (Home projects) · `tailwindcss` (Home only; themed routes use scoped CSS).

`three`, `gsap`, and `lenis` are **code-split per route**, so the Home bundle stays lean.

---

## Videos
Project clips must be **mobile-safe MP4** (H.264 / `yuv420p` / faststart) — iOS Safari won't play `.webm` or unusual pixel formats. Source files are re-encoded to `*-web.mp4`:

```bash
ffmpeg -i in.mov -vf "scale='min(1280,iw)':-2" -r 30 -c:v libx264 -crf 30 \
  -preset veryfast -pix_fmt yuv420p -an -movflags +faststart out-web.mp4
```

`data/portfolio.js` and `components/Projects.vue` import the `-web.mp4` versions. The large originals (`fascano.mp4`, `reservation.mp4`) are git-ignored.

---

## Conventions
- Each themed view is **one self-contained `.vue` file** (scoped styles, own canvas/GSAP lifecycle with cleanup in `onBeforeUnmount`).
- Every route renders the full set of sections (About, Stats, Services, Skills, Process, Industries, Work, Certificates, Contact) — **styled bespoke to its theme**, never a shared generic block (except `AboutFacts`).
- New routes: add a `views/X.vue`, a lazy route in `router/index.js`, and an entry in `experiences[]`.

See [designs/](designs/) for a doc on each experience.
