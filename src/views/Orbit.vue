<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { useSmoothScroll } from "../composables/useSmoothScroll.js";
import {
  profile,
  aboutFacts,
  socials,
  skills,
  projects,
  certificates,
  services,
  stats,
  process,
  industries,
} from "../data/portfolio.js";

useSmoothScroll();

const glCanvas = ref(null);
const depth = ref(0);

let renderer, scene, camera, points, geometry, mat, clock, rafId;
const mouse = { x: 0, y: 0 };
let progress = 0;

function buildGalaxy() {
  const count = 12000;
  const radius = 6;
  const branches = 4;
  const spin = 1.0;
  const randomness = 0.3;
  const power = 2.6;
  const inside = new THREE.Color("#8be9ff");
  const outside = new THREE.Color("#3320a8");

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = Math.random() * radius;
    const branch = ((i % branches) / branches) * Math.PI * 2;
    const spinA = r * spin;
    const rx = Math.pow(Math.random(), power) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
    const ry = Math.pow(Math.random(), power) * (Math.random() < 0.5 ? 1 : -1) * randomness * r * 0.5;
    const rz = Math.pow(Math.random(), power) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
    positions[i3] = Math.cos(branch + spinA) * r + rx;
    positions[i3 + 1] = ry;
    positions[i3 + 2] = Math.sin(branch + spinA) * r + rz;

    const col = inside.clone().lerp(outside, r / radius);
    colors[i3] = col.r;
    colors[i3 + 1] = col.g;
    colors[i3 + 2] = col.b;
  }
  geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  mat = new THREE.PointsMaterial({
    size: 0.035,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
  });
  points = new THREE.Points(geometry, mat);
  scene.add(points);
}

function init() {
  renderer = new THREE.WebGLRenderer({ canvas: glCanvas.value, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x04060f, 1);
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x04060f, 0.06);
  camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 3, 8);
  buildGalaxy();
  clock = new THREE.Clock();
  resize();
  animate();
}
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}
function animate() {
  const t = clock.getElapsedTime();
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress = max > 0 ? window.scrollY / max : 0;
  depth.value = Math.round(progress * 100);

  points.rotation.y = t * 0.05 + progress * Math.PI * 1.4;
  points.rotation.x = progress * 0.5;

  camera.position.x += (mouse.x * 2 - camera.position.x) * 0.04;
  const targetY = 3 - progress * 3.5 + mouse.y * 1.2;
  camera.position.y += (targetY - camera.position.y) * 0.04;
  const targetZ = 8 - progress * 6;
  camera.position.z += (targetZ - camera.position.z) * 0.04;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  rafId = requestAnimationFrame(animate);
}
function onMove(e) {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
}

onMounted(() => {
  init();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onMove);
});
onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
  window.removeEventListener("resize", resize);
  window.removeEventListener("pointermove", onMove);
  geometry?.dispose();
  mat?.dispose();
  renderer?.dispose();
});
</script>

<template>
  <div class="orbit">
    <canvas ref="glCanvas" class="gl" aria-hidden="true"></canvas>

    <!-- sci-fi HUD -->
    <div class="hud" aria-hidden="true">
      <div class="hud-row"><span>SYS</span> radwa.khalaf // front-end</div>
      <div class="hud-row"><span>DEPTH</span> {{ depth }}%</div>
      <div class="hud-bar"><div class="hud-fill" :style="{ height: depth + '%' }"></div></div>
    </div>

    <header class="hero">
      <p class="eyebrow" v-reveal>// entering orbit</p>
      <h1 v-reveal="{ delay: 80 }">{{ profile.name }}</h1>
      <p class="role" v-reveal="{ delay: 160 }">{{ profile.role }} — {{ profile.specialty }}</p>
      <p class="tag" v-reveal="{ delay: 240 }">{{ profile.tagline }}</p>
      <div class="cta" v-reveal="{ delay: 320 }">
        <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.4">Resume</a>
        <a class="btn ghost" href="#orbit-work" v-magnetic="0.3">Explore work</a>
      </div>
    </header>

    <main class="stream">
      <section class="panel" v-anim="'left'">
        <span class="ttl">About</span>
        <div class="about">
          <img :src="profile.avatar" :alt="profile.name" />
          <p>{{ profile.about }}</p>
        </div>
        <div class="facts">
          <div v-for="f in aboutFacts" :key="f.label"><i :class="`fi ${f.icon}`"></i><b>{{ f.label }}</b> {{ f.value }}</div>
        </div>
      </section>

      <section class="stats-row">
        <div v-for="s in stats" :key="s.label" class="stat" v-reveal>
          <span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span>
          <span>{{ s.label }}</span>
        </div>
      </section>

      <section class="panel" v-anim="'zoom'">
        <span class="ttl">Services</span>
        <div class="grid3">
          <div v-for="srv in services" :key="srv.title" class="mini">
            <i :class="`fi ${srv.icon}`"></i><h3>{{ srv.title }}</h3><p>{{ srv.description }}</p>
          </div>
        </div>
      </section>

      <section class="panel" v-anim="'flip'">
        <span class="ttl">Skill constellation</span>
        <div class="chips">
          <span v-for="sk in skills" :key="sk.name" class="chip" :style="{ '--w': sk.level }">
            {{ sk.name }} <b>{{ sk.level }}</b>
          </span>
        </div>
      </section>

      <section id="orbit-work" class="panel" v-anim="'clip'">
        <span class="ttl">Work</span>
        <div class="grid2">
          <article v-for="p in projects" :key="p.title" class="proj" v-reveal>
            <video v-lazyvideo="p.video" muted loop playsinline></video>
            <div class="proj-b">
              <div class="tags"><span v-for="t in p.tags" :key="t">{{ t }}</span></div>
              <h3>{{ p.title }}</h3>
              <p>{{ p.description }}</p>
              <div class="links">
                <a v-if="p.demo" :href="p.demo" target="_blank">Live ↗</a>
                <a v-if="p.repo" :href="p.repo" target="_blank">Code ↗</a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="panel" v-anim="'right'">
        <span class="ttl">Certificates</span>
        <div class="grid4">
          <a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert">
            <img :src="c.img" :alt="c.name" /><b>{{ c.name }}</b><span>{{ c.issuer }}</span>
          </a>
        </div>
      </section>

      <section class="panel" v-anim="'zoom'">
        <span class="ttl">Process</span>
        <div class="grid3">
          <div v-for="s in process" :key="s.step" class="mini">
            <i :class="`fi ${s.icon}`"></i><h3>{{ s.step }} · {{ s.title }}</h3><p>{{ s.description }}</p>
          </div>
        </div>
      </section>

      <section class="panel" v-anim="'flip'">
        <span class="ttl">Industries I serve</span>
        <div class="grid3">
          <div v-for="i in industries" :key="i.name" class="mini">
            <i :class="`fi ${i.icon}`"></i><h3>{{ i.name }}</h3>
          </div>
        </div>
      </section>

      <section class="panel contact" v-anim="'blur'">
        <span class="ttl">Transmit a message</span>
        <form action="https://formspree.io/f/mnndnjqg" method="POST">
          <div class="row"><input type="text" name="user_name" placeholder="Name" required /><input type="email" name="user_email" placeholder="Email" required /></div>
          <div class="row"><input type="text" name="user_company" placeholder="Company" /><input type="text" name="subject" placeholder="Subject" required /></div>
          <textarea name="message" rows="3" placeholder="Message" required></textarea>
          <button class="btn" type="submit" v-magnetic="0.3">Send →</button>
        </form>
        <div class="socials">
          <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.orbit {
  --cyan: #38bdf8;
  position: relative;
  background: #04060f;
  color: #dbeafe;
  font-family: "Poppins", system-ui, sans-serif;
  overflow-x: hidden;
}
.gl { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; }

.hud { position: fixed; top: 80px; left: 20px; z-index: 4; font-family: ui-monospace, monospace; font-size: 11px; letter-spacing: 0.1em; color: rgba(56,189,248,0.8); pointer-events: none; }
.hud-row span { color: rgba(219,234,254,0.45); margin-right: 8px; }
.hud-bar { width: 4px; height: 120px; background: rgba(56,189,248,0.15); margin-top: 12px; border-radius: 4px; position: relative; }
.hud-fill { position: absolute; bottom: 0; width: 100%; background: var(--cyan); border-radius: 4px; box-shadow: 0 0 12px var(--cyan); transition: height 0.2s; }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 999px; background: var(--cyan); color: #04121f; font-weight: 700; text-decoration: none; cursor: pointer; border: 1px solid transparent; font-size: 15px; box-shadow: 0 0 30px -6px var(--cyan); transition: box-shadow 0.2s; }
.btn:hover { box-shadow: 0 0 44px 0 var(--cyan); }
.btn.ghost { background: rgba(56,189,248,0.08); color: #eaf6ff; border-color: rgba(56,189,248,0.4); box-shadow: none; backdrop-filter: blur(8px); }

.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; }
.hero::before { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; background: radial-gradient(ellipse 85% 55% at 50% 45%, rgba(4, 6, 15, 0.6), transparent 72%); }
.eyebrow { font-family: ui-monospace, monospace; letter-spacing: 0.3em; color: var(--cyan); font-size: 13px; margin-bottom: 18px; }
.hero h1 { font-size: clamp(48px, 12vw, 150px); font-weight: 800; letter-spacing: -0.03em; line-height: 0.9; text-shadow: 0 0 60px rgba(56,189,248,0.5); }
.role { margin-top: 16px; font-size: clamp(16px,2.2vw,22px); color: #bfe3ff; }
.tag { margin-top: 10px; color: rgba(219,234,254,0.6); }
.cta { display: flex; gap: 14px; margin-top: 30px; }

.stream { position: relative; z-index: 2; max-width: 1080px; margin: 0 auto; padding: 40px 24px 120px; display: flex; flex-direction: column; gap: 28px; }
.panel { padding: 38px; border-radius: 22px; border: 1px solid rgba(56,189,248,0.18); background: rgba(6,12,26,0.55); backdrop-filter: blur(10px); box-shadow: 0 30px 80px -40px rgba(56,189,248,0.5); }
.ttl { display: block; font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.22em; color: var(--cyan); font-size: 13px; margin-bottom: 26px; }

.about { display: grid; grid-template-columns: 160px 1fr; gap: 28px; align-items: center; }
.about img { width: 160px; height: 160px; border-radius: 16px; object-fit: cover; border: 1px solid rgba(56,189,248,0.4); }
.about p { line-height: 1.8; color: rgba(219,234,254,0.82); }
.facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 26px; }
.facts div { font-size: 13px; color: rgba(219,234,254,0.7); }
.facts i { color: var(--cyan); margin-right: 8px; }
.facts b { color: #fff; }

.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.stat { text-align: center; padding: 26px; border-radius: 18px; border: 1px solid rgba(56,189,248,0.16); background: rgba(6,12,26,0.5); }
.stat .num { display: block; font-size: clamp(30px,4vw,48px); font-weight: 800; color: var(--cyan); }
.stat span:last-child { font-size: 13px; color: rgba(219,234,254,0.6); }

.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.mini { padding: 22px; border-radius: 14px; background: rgba(56,189,248,0.05); border: 1px solid rgba(56,189,248,0.14); }
.mini i { font-size: 24px; color: var(--cyan); }
.mini h3 { font-size: 17px; font-weight: 700; margin: 12px 0 7px; }
.mini p { font-size: 13px; line-height: 1.55; color: rgba(219,234,254,0.65); }

.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chip { position: relative; padding: 10px 16px; border-radius: 999px; border: 1px solid rgba(56,189,248,0.3); font-size: 14px; overflow: hidden; }
.chip b { color: var(--cyan); margin-left: 6px; }
.chip::before { content: ""; position: absolute; inset: 0; background: rgba(56,189,248,0.14); width: calc(var(--w) * 1%); }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.proj { border-radius: 16px; overflow: hidden; border: 1px solid rgba(56,189,248,0.16); background: rgba(6,12,26,0.5); transition: transform 0.3s, border-color 0.3s; }
.proj:hover { transform: translateY(-6px); border-color: rgba(56,189,248,0.5); }
.proj video { width: 100%; display: block; }
.proj-b { padding: 18px; }
.tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
.tags span { font-size: 11px; padding: 4px 10px; border-radius: 999px; background: rgba(56,189,248,0.12); color: var(--cyan); }
.proj-b h3 { font-size: 19px; font-weight: 700; margin-bottom: 8px; }
.proj-b p { font-size: 13.5px; line-height: 1.6; color: rgba(219,234,254,0.68); margin-bottom: 14px; }
.links { display: flex; gap: 16px; }
.links a { color: var(--cyan); text-decoration: none; font-weight: 600; font-size: 13.5px; }

.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.cert { display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: #dbeafe; padding: 14px; border-radius: 14px; border: 1px solid rgba(56,189,248,0.16); transition: transform 0.3s, border-color 0.3s; }
.cert:hover { transform: translateY(-5px); border-color: rgba(56,189,248,0.5); }
.cert img { width: 100%; height: 130px; object-fit: contain; background: #fff; border-radius: 10px; padding: 7px; }
.cert b { font-size: 13.5px; margin-top: 5px; }
.cert span { font-size: 11.5px; color: rgba(219,234,254,0.5); }

.contact form { display: flex; flex-direction: column; gap: 14px; max-width: 560px; }
.contact .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.contact input, .contact textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(56,189,248,0.2); border-radius: 12px; padding: 12px 14px; color: #eaf6ff; font-family: inherit; font-size: 15px; }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--cyan); }
.contact input::placeholder, .contact textarea::placeholder { color: rgba(219,234,254,0.4); }
.socials { display: flex; gap: 18px; margin-top: 22px; }
.socials a { color: rgba(219,234,254,0.65); text-decoration: none; font-size: 14px; transition: color 0.2s; }
.socials a:hover { color: var(--cyan); }

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; }
  .facts, .grid3, .grid2 { grid-template-columns: 1fr 1fr; }
  .stats-row { grid-template-columns: 1fr 1fr; }
  .grid4 { grid-template-columns: 1fr 1fr; }
  .hud { display: none; }
}
@media (max-width: 540px) {
  .grid3, .grid2, .contact .row, .facts { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .hero { padding: 96px 20px 72px; }
  .hero h1 { font-size: clamp(42px, 13vw, 64px); }
  .role { font-size: 15px; margin-top: 12px; text-shadow: 0 2px 16px rgba(4, 6, 15, 0.85); }
  .tag { font-size: 14px; margin-top: 10px; text-shadow: 0 2px 16px rgba(4, 6, 15, 0.85); }
}
</style>
