# 14 — WORMHOLE (Tunnel Warp)

**Route:** `/14` · **Component:** `src/views/Wormhole.vue` · **Accent:** `#fb923c` (orange) + cyan

## Concept
Falling through a wormhole: glowing **rings spiral toward a vanishing point**, the dive **accelerating as you scroll**, with a bright orange core and a cyan-tinted rim. Mouse bends the tunnel.

## Signature tech
- **Canvas tunnel** — a set of rings with depth `z`; each frame `z` decreases (speed boosted by scroll velocity), radius = perspective/`z`; ring centres spiral via an angular offset (the "warp" twist); colour lerps cyan→orange by depth; additive blending + a radial core glow; trails via a translucent fill each frame.
- Pointer offsets the vanishing point. `v-anim` reveals; **Lenis** smooth scroll.

## Sections
Hero (`▸ event horizon ◂`) → About (`01 · About`, `AboutFacts`) → Stats (stagger) → Services (`02 ·`, `.grid3`) → Skills (`03 ·`, chips) → **How it works** (`06 ·`, `.grid3`) → **Industries** (`07 ·`, chips) → Work (`04 ·`, `.grid2`) → Certificates (`05 ·`) → Contact ("Bend space. Say hello").

## Animations
Spiraling ring warp + scroll acceleration, pointer bend, per-section `v-anim` (zoom/stagger/rotate/left/flip/right/clip), `v-count`.

## Responsive
Grids collapse; canvas full-bleed; hero scaled + spacing ≤600px.

## Lifecycle
`cancelAnimationFrame` + listeners removed on unmount.
