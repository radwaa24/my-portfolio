<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  profile,
  aboutFacts,
  socials,
  skills,
  projects,
  certificates,
  services,
  stats,
} from "../data/portfolio.js";

const WORLD_W = 2700;
const WORLD_H = 2050;

const viewport = ref(null);
const world = ref(null);
const bg = ref(null);
const cursor = ref(null);
const dragging = ref(false);

// scattered project coordinates (top-left of each card, in world space)
const projPos = [
  [520, 250], [1680, 250], [250, 760], [2000, 720], [820, 1200],
  [1520, 1180], [520, 1640], [1180, 360], [1320, 840],
  [1720, 1560], [120, 1560], [1500, 360],
];

let pos = { x: 0, y: 0 };
let vel = { x: 0, y: 0 };
let last = { x: 0, y: 0 };
let down = false;
let moved = 0;
let raf = null;

function clampPos() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const minX = Math.min(0, vw - WORLD_W) - 180;
  const maxX = 180;
  const minY = Math.min(0, vh - WORLD_H) - 180;
  const maxY = 180;
  if (pos.x < minX) { pos.x = minX; vel.x = 0; }
  if (pos.x > maxX) { pos.x = maxX; vel.x = 0; }
  if (pos.y < minY) { pos.y = minY; vel.y = 0; }
  if (pos.y > maxY) { pos.y = maxY; vel.y = 0; }
}

function tick() {
  if (!down) {
    pos.x += vel.x;
    pos.y += vel.y;
    vel.x *= 0.93;
    vel.y *= 0.93;
    if (Math.abs(vel.x) < 0.02) vel.x = 0;
    if (Math.abs(vel.y) < 0.02) vel.y = 0;
  }
  clampPos();
  if (world.value) world.value.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
  if (bg.value) bg.value.style.transform = `translate3d(${pos.x * 0.45}px, ${pos.y * 0.45}px, 0)`;
  raf = requestAnimationFrame(tick);
}

function onDown(e) {
  down = true;
  dragging.value = true;
  moved = 0;
  last = { x: e.clientX, y: e.clientY };
  vel = { x: 0, y: 0 };
}
function onMove(e) {
  if (cursor.value) {
    cursor.value.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  }
  if (!down) return;
  const dx = e.clientX - last.x;
  const dy = e.clientY - last.y;
  moved += Math.abs(dx) + Math.abs(dy);
  pos.x += dx;
  pos.y += dy;
  vel = { x: dx, y: dy };
  last = { x: e.clientX, y: e.clientY };
}
function onUp() {
  down = false;
  dragging.value = false;
}
function onClickCapture(e) {
  // if the pointer travelled (a drag, not a tap), swallow the click so
  // links/buttons inside the world don't fire after flinging the map
  if (moved > 8) {
    e.preventDefault();
    e.stopPropagation();
  }
}
function onWheel(e) {
  e.preventDefault();
  pos.x -= e.deltaX;
  pos.y -= e.deltaY;
  vel = { x: 0, y: 0 };
}
function recenter() {
  // ease back to the intro node centred
  const tx = window.innerWidth / 2 - (1080 + 190);
  const ty = window.innerHeight / 2 - (760 + 90);
  const start = { ...pos };
  const t0 = performance.now();
  const dur = 700;
  function step(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    pos.x = start.x + (tx - start.x) * e;
    pos.y = start.y + (ty - start.y) * e;
    if (p < 1) requestAnimationFrame(step);
  }
  vel = { x: 0, y: 0 };
  requestAnimationFrame(step);
}

onMounted(() => {
  pos.x = window.innerWidth / 2 - (1080 + 190);
  pos.y = window.innerHeight / 2 - (760 + 90);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  viewport.value.addEventListener("wheel", onWheel, { passive: false });
  tick();
});
onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  window.removeEventListener("pointermove", onMove);
  window.removeEventListener("pointerup", onUp);
  viewport.value?.removeEventListener("wheel", onWheel);
});
</script>

<template>
  <div class="atlas">
    <div
      class="viewport"
      ref="viewport"
      :class="{ grabbing: dragging }"
      @pointerdown="onDown"
      @click.capture="onClickCapture"
    >
      <!-- parallax background layer -->
      <div class="bg" ref="bg" aria-hidden="true">
        <div class="ghost">PORTFOLIO</div>
        <div class="ghost two">EXPLORE</div>
      </div>

      <!-- draggable world -->
      <div class="world" ref="world">
        <!-- intro -->
        <div class="node n-intro" :style="{ left: '1080px', top: '760px' }">
          <span class="tagline">drag anywhere ✦ explore the map</span>
          <h1>{{ profile.firstName }}<br />{{ profile.lastName }}</h1>
          <p>{{ profile.role }} — {{ profile.specialty }}</p>
          <a class="btn" :href="profile.resume" target="_blank">Resume ↓</a>
        </div>

        <!-- about -->
        <div class="node card n-about" :style="{ left: '230px', top: '250px' }">
          <span class="tag">// about</span>
          <img :src="profile.avatar" :alt="profile.name" class="ava" />
          <p>{{ profile.about }}</p>
        </div>

        <!-- facts -->
        <div class="node card n-facts" :style="{ left: '250px', top: '1180px' }">
          <span class="tag">// info</span>
          <div v-for="f in aboutFacts" :key="f.label" class="fact">
            <i :class="`fi ${f.icon}`"></i><b>{{ f.label }}</b><span>{{ f.value }}</span>
          </div>
        </div>

        <!-- stats -->
        <div class="node card n-stats" :style="{ left: '2030px', top: '250px' }">
          <span class="tag">// numbers</span>
          <div class="stat-grid">
            <div v-for="s in stats" :key="s.label">
              <span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span>
              <small>{{ s.label }}</small>
            </div>
          </div>
        </div>

        <!-- skills -->
        <div class="node card n-skills" :style="{ left: '2010px', top: '1120px' }">
          <span class="tag">// skills</span>
          <div class="chips">
            <span v-for="sk in skills" :key="sk.name">{{ sk.name }} <b>{{ sk.level }}</b></span>
          </div>
        </div>

        <!-- services -->
        <div class="node card n-serv" :style="{ left: '720px', top: '250px' }">
          <span class="tag">// services</span>
          <div v-for="srv in services" :key="srv.title" class="serv">
            <i :class="`fi ${srv.icon}`"></i><b>{{ srv.title }}</b>
          </div>
        </div>

        <!-- projects scattered -->
        <a
          v-for="(p, i) in projects"
          :key="p.title"
          class="node proj"
          :href="p.demo || p.repo || '#'"
          :target="p.demo || p.repo ? '_blank' : '_self'"
          :style="{ left: projPos[i][0] + 'px', top: projPos[i][1] + 'px' }"
        >
          <video v-lazyvideo="p.video" muted loop playsinline></video>
          <div class="proj-b">
            <h3>{{ p.title }}</h3>
            <div class="ptags"><span v-for="t in p.tags" :key="t">{{ t }}</span></div>
          </div>
        </a>

        <!-- certificates cluster -->
        <div class="node card n-certs" :style="{ left: '1180px', top: '1540px' }">
          <span class="tag">// certificates</span>
          <div class="cert-grid">
            <a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert">
              <img :src="c.img" :alt="c.name" /><b>{{ c.name }}</b>
            </a>
          </div>
        </div>

        <!-- contact -->
        <div class="node card n-contact" :style="{ left: '2120px', top: '1640px' }">
          <span class="tag">// say hello</span>
          <form action="https://formspree.io/f/mnndnjqg" method="POST">
            <input type="text" name="user_name" placeholder="Name" required />
            <input type="email" name="user_email" placeholder="Email" required />
            <input type="text" name="subject" placeholder="Subject" required />
            <textarea name="message" rows="2" placeholder="Message" required></textarea>
            <button class="btn" type="submit">Send →</button>
          </form>
          <div class="socials">
            <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a>
          </div>
        </div>
      </div>
    </div>

    <!-- custom cursor + HUD -->
    <div class="cursor" ref="cursor" :class="{ press: dragging }" aria-hidden="true">
      <span>{{ dragging ? "✊" : "✋" }}</span>
    </div>
    <div class="hint">✋ drag · scroll · fling — it's a map</div>
    <button class="recenter" @click="recenter">⟲ recenter</button>
  </div>
</template>

<style scoped>
.atlas {
  --emerald: #34d399;
  position: fixed;
  inset: 0;
  background: #050a08;
  color: #d7fff0;
  font-family: "Poppins", system-ui, sans-serif;
  overflow: hidden;
}
@media (pointer: fine) { .atlas { cursor: none; } }

.viewport {
  position: absolute;
  inset: 0;
  cursor: grab;
  background:
    radial-gradient(900px circle at 30% 20%, rgba(52,211,153,0.10), transparent 60%),
    radial-gradient(700px circle at 80% 80%, rgba(34,211,238,0.08), transparent 60%),
    #050a08;
}
.viewport.grabbing { cursor: grabbing; }

/* parallax bg */
.bg { position: absolute; inset: -200px; z-index: 0;
  background-image:
    linear-gradient(rgba(52,211,153,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(52,211,153,0.05) 1px, transparent 1px);
  background-size: 60px 60px; }
.ghost { position: absolute; font-weight: 900; font-size: 360px; color: rgba(52,211,153,0.035); letter-spacing: -0.03em; white-space: nowrap; }
.ghost { top: 240px; left: 240px; }
.ghost.two { top: 1280px; left: 1500px; color: rgba(34,211,238,0.035); }

.world { position: absolute; top: 0; left: 0; width: 2700px; height: 2050px; z-index: 1; will-change: transform; }

.node { position: absolute; }
.card {
  width: 340px;
  background: rgba(10,20,16,0.72);
  border: 1px solid rgba(52,211,153,0.25);
  border-radius: 20px;
  padding: 22px;
  backdrop-filter: blur(10px);
  box-shadow: 0 30px 70px -30px rgba(52,211,153,0.5);
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}
.card:hover { transform: translateY(-6px) scale(1.015); border-color: rgba(52,211,153,0.6); box-shadow: 0 40px 90px -30px rgba(52,211,153,0.7); }
.tag { display: block; font-family: ui-monospace, monospace; font-size: 12px; color: var(--emerald); letter-spacing: 0.1em; margin-bottom: 14px; }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 999px; background: var(--emerald); color: #042; font-weight: 700; text-decoration: none; border: none; cursor: pointer; font-size: 14px; box-shadow: 0 0 26px -6px var(--emerald); }

/* intro */
.n-intro { width: 380px; }
.n-intro .tagline { font-family: ui-monospace, monospace; font-size: 12px; letter-spacing: 0.2em; color: rgba(215,255,240,0.6); }
.n-intro h1 { font-size: 72px; font-weight: 800; line-height: 0.9; letter-spacing: -0.03em; margin: 14px 0; text-shadow: 0 0 50px rgba(52,211,153,0.4); }
.n-intro p { color: rgba(215,255,240,0.7); margin-bottom: 20px; }

.ava { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid var(--emerald); margin-bottom: 12px; }
.n-about p { font-size: 13.5px; line-height: 1.65; color: rgba(215,255,240,0.78); }

.fact { display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 7px 0; border-bottom: 1px solid rgba(52,211,153,0.12); }
.fact i { color: var(--emerald); }
.fact b { min-width: 84px; }
.fact span { color: rgba(215,255,240,0.6); }

.stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.stat-grid .num { font-size: 40px; font-weight: 800; color: var(--emerald); display: block; }
.stat-grid small { font-size: 12px; color: rgba(215,255,240,0.6); }

.chips { display: flex; flex-wrap: wrap; gap: 7px; }
.chips span { font-size: 12px; padding: 6px 11px; border-radius: 999px; border: 1px solid rgba(52,211,153,0.25); }
.chips b { color: var(--emerald); }

.serv { display: flex; align-items: center; gap: 10px; padding: 8px 0; font-size: 14px; font-weight: 600; border-bottom: 1px solid rgba(52,211,153,0.12); }
.serv i { color: var(--emerald); }

/* project nodes */
.proj { width: 320px; border-radius: 18px; overflow: hidden; text-decoration: none; color: #d7fff0; border: 1px solid rgba(52,211,153,0.22); background: rgba(10,20,16,0.7); box-shadow: 0 30px 70px -34px rgba(52,211,153,0.6); transition: transform 0.3s, border-color 0.3s; }
.proj:hover { transform: translateY(-8px) rotate(-1deg) scale(1.02); border-color: rgba(52,211,153,0.6); }
.proj video { width: 100%; display: block; pointer-events: none; }
.proj-b { padding: 14px 16px; }
.proj-b h3 { font-size: 17px; font-weight: 700; }
.ptags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
.ptags span { font-size: 10.5px; padding: 3px 8px; border-radius: 999px; background: rgba(52,211,153,0.12); color: var(--emerald); }

.cert-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.cert { display: flex; flex-direction: column; gap: 4px; text-decoration: none; color: #d7fff0; }
.cert img { width: 100%; height: 76px; object-fit: contain; background: #fff; border-radius: 8px; padding: 5px; }
.cert b { font-size: 11.5px; }
.n-certs { width: 380px; }

.n-contact form { display: flex; flex-direction: column; gap: 9px; }
.n-contact input, .n-contact textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(52,211,153,0.22); border-radius: 10px; padding: 10px 12px; color: #eafff6; font-family: inherit; font-size: 13px; }
.n-contact input:focus, .n-contact textarea:focus { outline: none; border-color: var(--emerald); }
.n-contact input::placeholder, .n-contact textarea::placeholder { color: rgba(215,255,240,0.4); }
.socials { display: flex; gap: 14px; margin-top: 12px; flex-wrap: wrap; }
.socials a { color: rgba(215,255,240,0.6); text-decoration: none; font-size: 12.5px; }

/* custom cursor */
.cursor { position: fixed; top: 0; left: 0; z-index: 9995; pointer-events: none; width: 46px; height: 46px; margin: -23px 0 0 -23px; border: 1.5px solid rgba(52,211,153,0.7); border-radius: 50%; display: grid; place-items: center; font-size: 16px; transition: width 0.2s, height 0.2s, background 0.2s; backdrop-filter: blur(2px); }
.cursor.press { width: 60px; height: 60px; margin: -30px 0 0 -30px; background: rgba(52,211,153,0.15); }
@media (pointer: coarse) { .cursor { display: none; } }

.hint { position: fixed; bottom: 22px; left: 50%; transform: translateX(-50%); z-index: 9995; font-family: ui-monospace, monospace; font-size: 12px; letter-spacing: 0.1em; color: rgba(215,255,240,0.55); background: rgba(10,20,16,0.6); padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(52,211,153,0.2); pointer-events: none; }
.recenter { position: fixed; bottom: 20px; right: 20px; z-index: 9996; background: rgba(10,20,16,0.7); border: 1px solid rgba(52,211,153,0.3); color: var(--emerald); font-family: ui-monospace, monospace; font-size: 13px; padding: 10px 16px; border-radius: 999px; cursor: pointer; backdrop-filter: blur(8px); }
.recenter:hover { background: rgba(52,211,153,0.15); }

@media (max-width: 700px) {
  .n-intro h1 { font-size: 52px; }
  .hint { font-size: 11px; }
}
</style>
