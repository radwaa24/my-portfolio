# 05 — ATLAS (Draggable Canvas)

**Route:** `/5` · **Component:** `src/views/Atlas.vue` · **Accent:** `#34d399` (emerald)

## Concept
Not a scrolling page — a **spatial map you explore**. The whole portfolio is scattered as cards/nodes across a 2D plane (2700×2050) that you **drag and fling** with momentum; a parallax grid + ghost text sit behind, and a custom cursor follows the pointer.

## Signature tech
- Pointer-drag pan with **inertia**: pointer deltas move `pos`; on release, velocity decays (`*0.93`) each `rAF` frame; position clamped to world bounds. Wheel also pans.
- **Parallax** background layer moves at 0.45× the world.
- **Custom cursor** ring (hidden on coarse pointers); `recenter` button eases back to the intro node.
- A **click-guard** swallows clicks after a drag (`moved > 8px`) so flinging the map doesn't trigger project links.
- No scroll / no Lenis (page is `position: fixed`).

## Nodes
Intro · About · Info(facts) · Stats · Skills · Services · Projects (scattered, `projPos[]`) · **Process** · **Industries** · Certificates · Contact.

## Responsive
`cursor: none` only on fine pointers; custom cursor + hint hidden on touch; nodes remain drag-explorable. World coords are fixed; small screens show a portion and pan.

## Lifecycle
`cancelAnimationFrame` + pointer/wheel listeners removed on unmount. Project count is data-driven; `projPos[]` has spare coordinates.
