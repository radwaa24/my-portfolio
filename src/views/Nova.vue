<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useSmoothScroll } from "../composables/useSmoothScroll.js";
import {
  profile,
  aboutFacts,
  socials,
  skillGroups,
  projects,
  certificates,
  services,
  stats,
  process,
  industries,
} from "../data/portfolio.js";

useSmoothScroll();

const cv = ref(null);
let raf = null;
let cleanup = null;
const mouse = { x: -9999, y: -9999 };

function start() {
  const c = cv.value;
  const ctx = c.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w, h, cx, cy, warp = [], amb = [];
  let lastScroll = window.scrollY;
  let boost = 0;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const resize = () => {
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = w / 2; cy = h / 2;
    const nW = Math.min(300, Math.floor((w * h) / 7000));
    warp = Array.from({ length: nW }, () => spawn());
    const nA = Math.min(90, Math.floor((w * h) / 24000));
    amb = Array.from({ length: nA }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
    }));
  };
  const spawn = () => ({ x: (Math.random() * 2 - 1), y: (Math.random() * 2 - 1), z: Math.random() * 0.9 + 0.1, pz: 0 });
  resize();
  window.addEventListener("resize", resize);
  cleanup = () => window.removeEventListener("resize", resize);

  const frame = () => {
    // scroll velocity → warp boost
    const dv = Math.abs(window.scrollY - lastScroll);
    lastScroll = window.scrollY;
    boost += (Math.min(dv * 0.0009, 0.02) - boost) * 0.1;
    const speed = 0.0035 + boost;

    ctx.fillStyle = "rgba(3,2,12,0.35)";
    ctx.fillRect(0, 0, w, h);

    // hyperspace warp
    const scale = Math.min(w, h) * 0.9;
    for (const s of warp) {
      const px = cx + (s.x / s.z) * scale;
      const py = cy + (s.y / s.z) * scale;
      s.z -= reduce ? 0.0015 : speed;
      if (s.z < 0.05 || px < -50 || px > w + 50 || py < -50 || py > h + 50) {
        Object.assign(s, spawn());
        continue;
      }
      const nx = cx + (s.x / s.z) * scale;
      const ny = cy + (s.y / s.z) * scale;
      const r = (1 - s.z) * 2.2;
      ctx.strokeStyle = `rgba(${200 + Math.floor((1 - s.z) * 55)},${220},255,${Math.min(1, (1 - s.z) * 1.3)})`;
      ctx.lineWidth = r;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(nx, ny); ctx.stroke();
    }

    // ambient constellation near cursor
    const near = [];
    for (const a of amb) {
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0) a.x = w; if (a.x > w) a.x = 0;
      if (a.y < 0) a.y = h; if (a.y > h) a.y = 0;
      const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      ctx.fillStyle = "rgba(230,240,255,0.6)";
      ctx.beginPath(); ctx.arc(a.x, a.y, 1.3, 0, Math.PI * 2); ctx.fill();
      if (d < 190) near.push(a);
    }
    for (const a of near) {
      const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 190) * 0.6})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(a.x, a.y); ctx.stroke();
    }
    for (let i = 0; i < near.length; i++)
      for (let j = i + 1; j < near.length; j++) {
        const d = Math.hypot(near[i].x - near[j].x, near[i].y - near[j].y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(232,121,249,${(1 - d / 130) * 0.45})`;
          ctx.beginPath(); ctx.moveTo(near[i].x, near[i].y); ctx.lineTo(near[j].x, near[j].y); ctx.stroke();
        }
      }
    raf = requestAnimationFrame(frame);
  };
  frame();
}
function onMove(e) { mouse.x = e.clientX; mouse.y = e.clientY; }

onMounted(() => {
  start();
  window.addEventListener("pointermove", onMove);
});
onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  cleanup?.();
  window.removeEventListener("pointermove", onMove);
});
</script>

<template>
  <div class="nova">
    <div class="nebula" aria-hidden="true"></div>
    <canvas ref="cv" class="warp" aria-hidden="true"></canvas>

    <header class="hero">
      <p class="eyebrow">▚ entering hyperspace ▞</p>
      <h1>{{ profile.firstName }}<span class="g"> {{ profile.lastName }}</span></h1>
      <p class="role">{{ profile.role }} · {{ profile.specialty }}</p>
      <p class="tag">{{ profile.tagline }}</p>
      <div class="cta">
        <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.35">Resume</a>
        <a class="btn ghost" href="#nova-work" v-magnetic="0.25">Work ↓</a>
      </div>
      <span class="hint">scroll to jump to lightspeed · move to map constellations</span>
    </header>

    <main class="content">
      <section class="sec" v-anim="'left'">
        <span class="lab">// about</span>
        <div class="about">
          <img :src="profile.avatar" :alt="profile.name" />
          <div>
            <p class="bio">{{ profile.about }}</p>
            <div class="facts"><span v-for="f in aboutFacts" :key="f.label"><i :class="`fi ${f.icon}`"></i><b>{{ f.label }}</b> {{ f.value }}</span></div>
          </div>
        </div>
        <div class="stats"><div v-for="s in stats" :key="s.label" class="stat"><span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span><span class="cap">{{ s.label }}</span></div></div>
      </section>

      <section class="sec" v-anim="'flip'">
        <span class="lab">// services</span>
        <div class="grid3"><div v-for="srv in services" :key="srv.title" class="card"><i :class="`fi ${srv.icon}`"></i><h3>{{ srv.title }}</h3><p>{{ srv.description }}</p></div></div>
      </section>

      <section class="sec" v-anim="'zoom'">
        <span class="lab">// skills</span>
        <div class="chips"><span v-for="sk in skillGroups.flatMap(g => g.skills)" :key="sk.name">{{ sk.name }} <b>{{ sk.level }}</b></span></div>
      </section>

      <section id="nova-work" class="sec" v-anim="'clip'">
        <span class="lab">// work</span>
        <div class="grid2">
          <article v-for="p in projects" :key="p.title" class="proj">
            <div class="proj-media"><video v-lazyvideo="p.video" muted loop playsinline></video></div>
            <div class="proj-b">
              <div class="tags"><span v-for="t in p.tags" :key="t">{{ t }}</span></div>
              <h3>{{ p.title }}</h3><p>{{ p.description }}</p>
              <div class="links"><a v-if="p.demo" :href="p.demo" target="_blank">Live ↗</a><a v-if="p.repo" :href="p.repo" target="_blank">Code ↗</a></div>
            </div>
          </article>
        </div>
      </section>

      <section class="sec" v-anim="'blur'">
        <span class="lab">// certificates</span>
        <div class="grid4"><a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert"><img :src="c.img" :alt="c.name" /><b>{{ c.name }}</b><span>{{ c.issuer }}</span></a></div>
      </section>

      <section class="sec" v-anim="'zoom'">
        <span class="lab">// how it works</span>
        <div class="grid3"><div v-for="s in process" :key="s.step" class="card"><i :class="`fi ${s.icon}`"></i><h3>{{ s.step }} · {{ s.title }}</h3><p>{{ s.description }}</p></div></div>
      </section>

      <section class="sec" v-anim="'flip'">
        <span class="lab">// industries</span>
        <div class="chips"><span v-for="i in industries" :key="i.name">{{ i.name }}</span></div>
      </section>

      <footer class="sec contact" v-anim="'rotate'">
        <h2>Signal me<br /><span class="g">across the void.</span></h2>
        <form action="https://formspree.io/f/mnndnjqg" method="POST">
          <div class="row"><input type="text" name="user_name" placeholder="Name" required /><input type="email" name="user_email" placeholder="Email" required /></div>
          <div class="row"><input type="text" name="user_company" placeholder="Company" /><input type="text" name="subject" placeholder="Subject" required /></div>
          <textarea name="message" rows="3" placeholder="Message" required></textarea>
          <button class="btn" type="submit" v-magnetic="0.25">Transmit →</button>
        </form>
        <div class="socials"><a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a></div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.nova {
  --cyan: #22d3ee; --mag: #e879f9; --gold: #fde68a; --ink: #03020c;
  position: relative; background: var(--ink); color: #d6e6ff;
  font-family: "Poppins", system-ui, sans-serif; overflow-x: hidden;
}
.nebula { position: fixed; inset: 0; z-index: 0; opacity: 0.55; filter: blur(50px);
  background: radial-gradient(40% 50% at 20% 30%, rgba(34,211,238,0.25), transparent 70%),
              radial-gradient(45% 55% at 82% 65%, rgba(232,121,249,0.22), transparent 70%),
              radial-gradient(35% 45% at 55% 90%, rgba(99,102,241,0.2), transparent 70%); }
.warp { position: fixed; inset: 0; z-index: 1; width: 100%; height: 100%; }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 999px; background: var(--cyan); color: #04121f; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-size: 15px; box-shadow: 0 0 28px -5px var(--cyan); }
.btn.ghost { background: rgba(34,211,238,0.08); color: #d6e6ff; border: 1px solid rgba(34,211,238,0.45); box-shadow: none; }

.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; }
.eyebrow { letter-spacing: 0.3em; text-transform: uppercase; font-size: 12px; color: var(--cyan); margin-bottom: 18px; }
.hero h1 { font-size: clamp(48px, 12vw, 150px); font-weight: 800; line-height: 0.9; letter-spacing: -0.03em; color: #fff; text-shadow: 0 0 50px rgba(34,211,238,0.4); }
.hero .g { background: linear-gradient(110deg, var(--cyan), var(--mag)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.role { margin-top: 16px; font-size: clamp(16px, 2vw, 22px); color: #b6cdff; }
.tag { margin-top: 10px; color: rgba(214,230,255,0.6); }
.cta { display: flex; gap: 14px; margin-top: 28px; }
.hint { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: #5b6b9b; }

.content { position: relative; z-index: 2; }
.sec { max-width: 1080px; margin: 0 auto; padding: 90px 24px; }
.lab { display: block; font-family: ui-monospace, monospace; letter-spacing: 0.15em; color: var(--cyan); font-size: 13px; margin-bottom: 30px; }

.about { display: grid; grid-template-columns: 200px 1fr; gap: 36px; align-items: start; }
.about img { width: 200px; height: 240px; object-fit: cover; border-radius: 16px; border: 1px solid rgba(34,211,238,0.3); }
.bio { font-size: clamp(17px, 2vw, 24px); line-height: 1.7; color: #dbe7ff; }
.facts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 22px; font-size: 13px; }
.facts i { color: var(--cyan); margin-right: 7px; }
.facts b { color: #fff; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 50px; }
.stat { text-align: center; padding: 24px; border-radius: 16px; background: rgba(34,211,238,0.05); border: 1px solid rgba(34,211,238,0.16); }
.stat .num { display: block; font-size: clamp(30px, 4vw, 52px); font-weight: 800; color: var(--gold); }
.stat .cap { font-size: 12px; color: #8ea3d6; }

.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card { padding: 26px; border-radius: 16px; background: rgba(34,211,238,0.04); border: 1px solid rgba(34,211,238,0.16); transition: transform 0.3s, border-color 0.3s; }
.card:hover { transform: translateY(-6px); border-color: var(--mag); }
.card i { font-size: 24px; color: var(--cyan); }
.card h3 { font-size: 18px; font-weight: 700; color: #fff; margin: 12px 0 7px; }
.card p { font-size: 13.5px; line-height: 1.6; color: #8ea3d6; }

.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chips span { padding: 9px 15px; border-radius: 999px; border: 1px solid rgba(34,211,238,0.3); font-size: 13.5px; }
.chips b { color: var(--gold); }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.proj { border-radius: 16px; overflow: hidden; background: rgba(34,211,238,0.04); border: 1px solid rgba(34,211,238,0.16); transition: transform 0.3s, border-color 0.3s; }
.proj:hover { transform: translateY(-6px); border-color: var(--mag); }
.proj-media video { width: 100%; display: block; }
.proj-b { padding: 18px; }
.tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 10px; }
.tags span { font-size: 11px; padding: 4px 10px; border-radius: 999px; background: rgba(232,121,249,0.14); color: var(--mag); }
.proj-b h3 { font-size: 19px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.proj-b p { font-size: 13.5px; line-height: 1.6; color: #8ea3d6; margin-bottom: 14px; }
.links { display: flex; gap: 16px; }
.links a { color: var(--cyan); text-decoration: none; font-weight: 600; font-size: 13.5px; }

.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.cert { display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: #d6e6ff; padding: 14px; border-radius: 14px; background: rgba(34,211,238,0.04); border: 1px solid rgba(34,211,238,0.16); transition: transform 0.3s; }
.cert:hover { transform: translateY(-6px); }
.cert img { width: 100%; height: 130px; object-fit: contain; background: #fff; border-radius: 8px; padding: 7px; }
.cert b { font-size: 13.5px; color: #fff; margin-top: 5px; }
.cert span { font-size: 11.5px; color: #5b6b9b; }

.contact h2 { font-size: clamp(40px, 8vw, 100px); line-height: 0.95; font-weight: 800; color: #fff; margin-bottom: 36px; }
.contact .g { background: linear-gradient(110deg, var(--cyan), var(--mag)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.contact form { display: flex; flex-direction: column; gap: 14px; max-width: 600px; }
.contact .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.contact input, .contact textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(34,211,238,0.25); border-radius: 12px; padding: 13px 15px; color: #fff; font-family: inherit; font-size: 15px; }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--cyan); }
.contact input::placeholder, .contact textarea::placeholder { color: #5b6b9b; }
.socials { display: flex; gap: 20px; margin-top: 26px; }
.socials a { color: #8ea3d6; text-decoration: none; }
.socials a:hover { color: var(--cyan); }

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; }
  .grid3, .grid2 { grid-template-columns: 1fr; }
  .grid4, .stats, .facts { grid-template-columns: 1fr 1fr; }
  .contact .row { grid-template-columns: 1fr; }
}
</style>
