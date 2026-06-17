<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useSmoothScroll } from "../composables/useSmoothScroll.js";
import {
  profile, aboutFacts, socials, skillGroups, projects, certificates, services, stats,
} from "../data/portfolio.js";

useSmoothScroll();

const cv = ref(null);
let raf = null, cleanup = null;
const mouse = { x: 0, y: 0 };

function start() {
  const c = cv.value;
  const ctx = c.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w, h, rings = [];
  let lastScroll = window.scrollY, boost = 0;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const N = 46;

  const resize = () => {
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  rings = Array.from({ length: N }, (_, i) => ({ z: 0.02 + (i / N) * 0.98 }));
  window.addEventListener("resize", resize);
  cleanup = () => window.removeEventListener("resize", resize);

  const lerp = (a, b, t) => a + (b - a) * t;
  let t = 0;
  const frame = () => {
    t += 0.01;
    const dv = Math.abs(window.scrollY - lastScroll); lastScroll = window.scrollY;
    boost += (Math.min(dv * 0.00006, 0.006) - boost) * 0.08;
    const speed = (reduce ? 0.0016 : 0.0034) + boost;

    ctx.fillStyle = "rgba(4,3,8,0.28)";
    ctx.fillRect(0, 0, w, h);

    const vpx = w / 2 + mouse.x * 40;
    const vpy = h / 2 + mouse.y * 30;
    const minDim = Math.min(w, h);

    // core glow
    const cg = ctx.createRadialGradient(vpx, vpy, 0, vpx, vpy, minDim * 0.22);
    cg.addColorStop(0, "rgba(255,237,213,0.9)");
    cg.addColorStop(0.4, "rgba(251,146,60,0.35)");
    cg.addColorStop(1, "rgba(251,146,60,0)");
    ctx.fillStyle = cg;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = "lighter";
    rings.sort((a, b) => b.z - a.z);
    for (const ring of rings) {
      ring.z -= speed;
      if (ring.z <= 0.02) ring.z += 1;
      const persp = (minDim * 0.62) / ring.z;
      const ang = ring.z * 9 + t * 1.4;
      const disp = (1 - ring.z) * minDim * 0.10;
      const cx = vpx + Math.cos(ang) * disp;
      const cy = vpy + Math.sin(ang) * disp;
      const alpha = Math.min(1, (1 - ring.z) * 1.4) * Math.min(1, ring.z * 6);
      const mixT = ring.z;
      const r = Math.round(lerp(34, 251, 1 - mixT));
      const g = Math.round(lerp(211, 146, 1 - mixT));
      const b = Math.round(lerp(238, 60, 1 - mixT));
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.lineWidth = (1 - ring.z) * 3 + 0.4;
      ctx.beginPath();
      ctx.arc(cx, cy, persp, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
    raf = requestAnimationFrame(frame);
  };
  frame();
}
function onMove(e) { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5; }

onMounted(() => { start(); window.addEventListener("pointermove", onMove); });
onBeforeUnmount(() => { if (raf) cancelAnimationFrame(raf); cleanup?.(); window.removeEventListener("pointermove", onMove); });
</script>

<template>
  <div class="worm-x">
    <canvas ref="cv" class="tunnel" aria-hidden="true"></canvas>

    <header class="hero">
      <p class="eyebrow">▸ event horizon ◂</p>
      <h1>{{ profile.firstName }}<br /><span class="grad">{{ profile.lastName }}</span></h1>
      <p class="role">{{ profile.role }} · {{ profile.specialty }}</p>
      <div class="cta">
        <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.35">Resume</a>
        <a class="btn ghost" href="#wh-work" v-magnetic="0.25">Work ↓</a>
      </div>
      <span class="hint">scroll to fall through</span>
    </header>

    <main class="content">
      <section class="sec" v-anim="'zoom'">
        <span class="lab">01 · About</span>
        <div class="about">
          <img :src="profile.avatar" :alt="profile.name" />
          <div>
            <p class="bio">{{ profile.about }}</p>
            <div class="facts"><span v-for="f in aboutFacts" :key="f.label"><i :class="`fi ${f.icon}`"></i><b>{{ f.label }}</b> {{ f.value }}</span></div>
          </div>
        </div>
      </section>

      <section class="sec">
        <div class="stats" v-anim="{ type: 'stagger', delay: 60 }">
          <div v-for="s in stats" :key="s.label" class="stat"><span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span><span class="cap">{{ s.label }}</span></div>
        </div>
      </section>

      <section class="sec" v-anim="'rotate'">
        <span class="lab">02 · Services</span>
        <div class="grid3"><div v-for="srv in services" :key="srv.title" class="card"><i :class="`fi ${srv.icon}`"></i><h3>{{ srv.title }}</h3><p>{{ srv.description }}</p></div></div>
      </section>

      <section class="sec" v-anim="'left'">
        <span class="lab">03 · Skills</span>
        <div class="chips"><span v-for="sk in skillGroups.flatMap(g => g.skills)" :key="sk.name">{{ sk.name }} <b>{{ sk.level }}</b></span></div>
      </section>

      <section id="wh-work" class="sec" v-anim="'flip'">
        <span class="lab">04 · Work</span>
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

      <section class="sec" v-anim="'right'">
        <span class="lab">05 · Certificates</span>
        <div class="grid4"><a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert"><img :src="c.img" :alt="c.name" /><b>{{ c.name }}</b><span>{{ c.issuer }}</span></a></div>
      </section>

      <footer class="sec contact" v-anim="'clip'">
        <h2>Bend space.<br /><span class="grad">Say hello.</span></h2>
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
.worm-x {
  --orange: #fb923c; --cyan: #22d3ee; --ink: #040308;
  position: relative; background: #040308; color: #ffe9d6;
  font-family: "Poppins", system-ui, sans-serif; overflow-x: hidden;
}
.tunnel { position: fixed; inset: 0; z-index: 0; width: 100%; height: 100%; }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 999px; background: var(--orange); color: #1a0c02; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-size: 15px; box-shadow: 0 0 30px -4px var(--orange); }
.btn.ghost { background: rgba(34,211,238,0.08); color: #d6f7ff; border: 1px solid rgba(34,211,238,0.45); box-shadow: none; }

.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; }
.eyebrow { letter-spacing: 0.3em; text-transform: uppercase; font-size: 12px; color: var(--cyan); margin-bottom: 18px; }
.hero h1 { font-size: clamp(48px, 12vw, 150px); font-weight: 800; line-height: 0.9; letter-spacing: -0.03em; color: #fff; text-shadow: 0 0 60px rgba(251,146,60,0.5); }
.hero .grad { background: linear-gradient(110deg, var(--orange), #fde68a, var(--cyan)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.role { margin-top: 16px; font-size: clamp(15px, 2vw, 21px); color: #f3c9a8; }
.cta { display: flex; gap: 14px; margin-top: 28px; }
.hint { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8a6a4a; }

.content { position: relative; z-index: 2; }
.sec { max-width: 1080px; margin: 0 auto; padding: 90px 24px; }
.lab { display: block; letter-spacing: 0.18em; text-transform: uppercase; color: var(--orange); font-size: 13px; margin-bottom: 30px; }

.about { display: grid; grid-template-columns: 200px 1fr; gap: 36px; align-items: center; }
.about img { width: 200px; height: 240px; object-fit: cover; border-radius: 16px; border: 1px solid rgba(251,146,60,0.3); }
.bio { font-size: clamp(16px, 2vw, 23px); line-height: 1.7; color: #f5ddc8; }
.facts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 20px; font-size: 13px; }
.facts i { color: var(--cyan); margin-right: 7px; }
.facts b { color: #fff; }

.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat { text-align: center; padding: 28px 14px; border-radius: 18px; background: rgba(251,146,60,0.06); border: 1px solid rgba(251,146,60,0.2); }
.stat .num { display: block; font-size: clamp(30px, 4.5vw, 54px); font-weight: 800; color: var(--orange); }
.stat .cap { font-size: 12px; color: #c79c79; }

.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card { padding: 26px; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(251,146,60,0.18); transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s; }
.card:hover { transform: translateY(-6px); border-color: var(--cyan); box-shadow: 0 0 36px -12px var(--cyan); }
.card i { font-size: 24px; color: var(--orange); }
.card h3 { font-size: 18px; font-weight: 700; color: #fff; margin: 12px 0 7px; }
.card p { font-size: 13.5px; line-height: 1.6; color: #c79c79; }

.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chips span { padding: 9px 15px; border-radius: 999px; border: 1px solid rgba(34,211,238,0.35); font-size: 13.5px; transition: box-shadow 0.3s, transform 0.3s; }
.chips span:hover { box-shadow: 0 0 20px -4px var(--cyan); transform: translateY(-3px); }
.chips b { color: var(--orange); }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.proj { border-radius: 16px; overflow: hidden; background: rgba(255,255,255,0.03); border: 1px solid rgba(251,146,60,0.18); transition: transform 0.3s, border-color 0.3s; }
.proj:hover { transform: translateY(-6px); border-color: var(--cyan); }
.proj-media video { width: 100%; display: block; }
.proj-b { padding: 18px; }
.tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 10px; }
.tags span { font-size: 11px; padding: 4px 10px; border-radius: 999px; background: rgba(34,211,238,0.14); color: var(--cyan); }
.proj-b h3 { font-size: 19px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.proj-b p { font-size: 13.5px; line-height: 1.6; color: #c79c79; margin-bottom: 14px; }
.links { display: flex; gap: 16px; }
.links a { color: var(--orange); text-decoration: none; font-weight: 600; font-size: 13.5px; }

.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.cert { display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: #ffe9d6; padding: 14px; border-radius: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(251,146,60,0.18); transition: transform 0.3s; }
.cert:hover { transform: translateY(-6px); }
.cert img { width: 100%; height: 130px; object-fit: contain; background: #fff; border-radius: 8px; padding: 7px; }
.cert b { font-size: 13.5px; color: #fff; margin-top: 5px; }
.cert span { font-size: 11.5px; color: #8a6a4a; }

.contact h2 { font-size: clamp(40px, 8vw, 100px); line-height: 0.95; font-weight: 800; color: #fff; margin-bottom: 36px; }
.contact .grad { background: linear-gradient(110deg, var(--orange), var(--cyan)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.contact form { display: flex; flex-direction: column; gap: 14px; max-width: 600px; }
.contact .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.contact input, .contact textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(251,146,60,0.25); border-radius: 12px; padding: 13px 15px; color: #fff; font-family: inherit; font-size: 15px; }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--cyan); }
.contact input::placeholder, .contact textarea::placeholder { color: #8a6a4a; }
.socials { display: flex; gap: 20px; margin-top: 26px; }
.socials a { color: #c79c79; text-decoration: none; }
.socials a:hover { color: var(--cyan); }

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; }
  .grid3, .grid2 { grid-template-columns: 1fr; }
  .grid4, .stats, .facts { grid-template-columns: 1fr 1fr; }
  .contact .row { grid-template-columns: 1fr; }
}
</style>
