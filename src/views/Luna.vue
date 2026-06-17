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

const sky = ref(null);
const moon = ref(null);
const starsLayer = ref(null);
let raf = null;
let cleanup = null;
const mouse = { x: 0, y: 0 };

function startStars() {
  const c = sky.value;
  const ctx = c.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w, h, stars = [], shooting = [];
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const resize = () => {
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(220, Math.floor((w * h) / 9000));
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.5 + 0.4,
      sp: Math.random() * 2 + 0.6,
      ph: Math.random() * Math.PI * 2,
      depth: Math.random() * 0.6 + 0.2,
    }));
  };
  resize();
  window.addEventListener("resize", resize);
  cleanup = () => window.removeEventListener("resize", resize);

  let t = 0;
  const frame = () => {
    t += 0.016;
    ctx.clearRect(0, 0, w, h);
    const off = window.scrollY;
    for (const s of stars) {
      const a = s.a + Math.sin(t * s.sp + s.ph) * 0.3;
      const yy = (s.y - off * s.depth * 0.25) % h;
      ctx.globalAlpha = Math.max(0, a);
      ctx.fillStyle = "#eaf0ff";
      ctx.beginPath();
      ctx.arc(s.x + mouse.x * s.depth * 14, (yy + h) % h, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // shooting stars
    if (!reduce && Math.random() < 0.012 && shooting.length < 3) {
      shooting.push({ x: Math.random() * w, y: Math.random() * h * 0.5, len: 0, vx: 6 + Math.random() * 4, vy: 2 + Math.random() * 2, life: 1 });
    }
    for (let i = shooting.length - 1; i >= 0; i--) {
      const sh = shooting[i];
      sh.x += sh.vx; sh.y += sh.vy; sh.life -= 0.018;
      const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 8, sh.y - sh.vy * 8);
      grad.addColorStop(0, `rgba(180,210,255,${Math.max(0, sh.life)})`);
      grad.addColorStop(1, "rgba(180,210,255,0)");
      ctx.strokeStyle = grad; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(sh.x - sh.vx * 8, sh.y - sh.vy * 8); ctx.stroke();
      if (sh.life <= 0 || sh.x > w) shooting.splice(i, 1);
    }
    raf = requestAnimationFrame(frame);
  };
  frame();
}

function onScroll() {
  const p = Math.min(window.scrollY / window.innerHeight, 1);
  if (moon.value) moon.value.style.setProperty("--phase", p);
  if (starsLayer.value) starsLayer.value.style.transform = `translateY(${window.scrollY * 0.1}px)`;
}
function onMove(e) {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  if (moon.value) moon.value.style.setProperty("--mx", mouse.x * -18 + "px");
}

onMounted(() => {
  startStars();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onMove);
});
onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  cleanup?.();
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("pointermove", onMove);
});
</script>

<template>
  <div class="luna">
    <div class="starsLayer" ref="starsLayer" aria-hidden="true"><canvas ref="sky" class="sky"></canvas></div>

    <header class="hero">
      <div class="moon" ref="moon" aria-hidden="true">
        <span class="crater c1"></span><span class="crater c2"></span><span class="crater c3"></span>
        <span class="crater c4"></span><span class="crater c5"></span>
        <span class="phase"></span>
      </div>
      <div class="hero-text">
        <p class="eyebrow">✦ under the same moon ✦</p>
        <h1>{{ profile.firstName }}<br /><span class="lit">{{ profile.lastName }}</span></h1>
        <p class="role">{{ profile.role }} · {{ profile.specialty }}</p>
        <div class="cta">
          <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.3">Resume</a>
          <a class="btn ghost" href="#luna-work" v-magnetic="0.25">Work ↓</a>
        </div>
      </div>
      <span class="hint">scroll to watch the moon wane</span>
    </header>

    <main class="content">
      <section class="sec" v-anim="'right'">
        <span class="lab">✦ About</span>
        <div class="about">
          <img :src="profile.avatar" :alt="profile.name" />
          <div>
            <p class="bio">{{ profile.about }}</p>
            <div class="facts"><span v-for="f in aboutFacts" :key="f.label"><i :class="`fi ${f.icon}`"></i><b>{{ f.label }}</b> {{ f.value }}</span></div>
          </div>
        </div>
        <div class="stats">
          <div v-for="s in stats" :key="s.label" class="stat"><span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span><span class="cap">{{ s.label }}</span></div>
        </div>
      </section>

      <section class="sec" v-anim="'blur'">
        <span class="lab">✦ Services</span>
        <div class="grid3"><div v-for="srv in services" :key="srv.title" class="card"><i :class="`fi ${srv.icon}`"></i><h3>{{ srv.title }}</h3><p>{{ srv.description }}</p></div></div>
      </section>

      <section class="sec" v-anim="'flip'">
        <span class="lab">✦ Skills</span>
        <div class="constellation">
          <span v-for="sk in skillGroups.flatMap(g => g.skills)" :key="sk.name" class="star-chip" :style="{ '--s': 0.8 + sk.level / 130 }">{{ sk.name }} <b>{{ sk.level }}</b></span>
        </div>
      </section>

      <section id="luna-work" class="sec" v-anim="'clip'">
        <span class="lab">✦ Work</span>
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

      <section class="sec" v-anim="'zoom'">
        <span class="lab">✦ Certificates</span>
        <div class="grid4"><a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert"><img :src="c.img" :alt="c.name" /><b>{{ c.name }}</b><span>{{ c.issuer }}</span></a></div>
      </section>

      <section class="sec" v-anim="'zoom'">
        <span class="lab">✦ How it works</span>
        <div class="grid3">
          <div v-for="s in process" :key="s.step" class="card">
            <i :class="`fi ${s.icon}`"></i><h3>{{ s.step }} · {{ s.title }}</h3><p>{{ s.description }}</p>
          </div>
        </div>
      </section>

      <section class="sec" v-anim="'flip'">
        <span class="lab">✦ Industries</span>
        <div class="constellation">
          <span v-for="i in industries" :key="i.name" class="star-chip" :style="{ '--s': 1 }">{{ i.name }}</span>
        </div>
      </section>

      <footer class="sec contact" v-anim="'left'">
        <h2>Reach for<br /><span class="lit">the stars.</span></h2>
        <form action="https://formspree.io/f/mnndnjqg" method="POST">
          <div class="row"><input type="text" name="user_name" placeholder="Name" required /><input type="email" name="user_email" placeholder="Email" required /></div>
          <div class="row"><input type="text" name="user_company" placeholder="Company" /><input type="text" name="subject" placeholder="Subject" required /></div>
          <textarea name="message" rows="3" placeholder="Message" required></textarea>
          <button class="btn" type="submit" v-magnetic="0.25">Send →</button>
        </form>
        <div class="socials"><a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a></div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.luna {
  --moon: #eaf0ff; --blue: #93c5fd; --ink: #060818;
  position: relative;
  background: radial-gradient(140% 100% at 80% -10%, #1a2150 0%, #0a0e27 45%, #060818 100%);
  color: #c7d2fe;
  font-family: "Poppins", system-ui, sans-serif;
  overflow-x: hidden;
}
.starsLayer { position: fixed; inset: -10% 0 0 0; z-index: 0; }
.sky { width: 100%; height: 110vh; display: block; }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 999px; background: var(--moon); color: #0a0e27; font-weight: 700; text-decoration: none; cursor: pointer; border: 1px solid var(--moon); font-size: 15px; box-shadow: 0 0 30px -6px var(--blue); }
.btn.ghost { background: transparent; color: var(--moon); border-color: rgba(147,197,253,0.5); box-shadow: none; }

/* hero + moon */
.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; }
.moon { position: absolute; top: 12vh; right: 8vw; width: clamp(150px, 22vw, 300px); height: clamp(150px, 22vw, 300px); border-radius: 50%; transform: translateX(var(--mx, 0));
  background: radial-gradient(circle at 35% 32%, #ffffff 0%, #dfe6f5 45%, #aeb8d6 100%);
  box-shadow: 0 0 70px 12px rgba(147,197,253,0.35), inset -22px -18px 50px rgba(40,50,90,0.5); overflow: hidden; }
.crater { position: absolute; border-radius: 50%; background: radial-gradient(circle at 40% 35%, rgba(120,130,165,0.7), rgba(160,170,200,0.2)); box-shadow: inset 2px 3px 5px rgba(40,50,90,0.45); }
.c1 { width: 22%; height: 22%; top: 24%; left: 26%; }
.c2 { width: 14%; height: 14%; top: 52%; left: 50%; }
.c3 { width: 10%; height: 10%; top: 30%; left: 60%; }
.c4 { width: 16%; height: 16%; top: 64%; left: 28%; }
.c5 { width: 8%; height: 8%; top: 16%; left: 50%; }
.phase { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(140% 100% at 80% -10%, #1a2150, #0a0e27); transform: translateX(calc((var(--phase, 0) - 1) * 102%)); filter: blur(2px); }

.hero-text { position: relative; z-index: 2; }
.eyebrow { letter-spacing: 0.3em; text-transform: uppercase; font-size: 12px; color: var(--blue); margin-bottom: 20px; }
.hero h1 { font-family: "Libre Baskerville", serif; font-size: clamp(50px, 12vw, 150px); font-weight: 700; line-height: 0.9; letter-spacing: -0.02em; color: #f1f5ff; }
.hero .lit { color: var(--blue); text-shadow: 0 0 40px rgba(147,197,253,0.6); }
.role { margin-top: 18px; font-size: clamp(16px, 2vw, 22px); color: #c7d2fe; }
.cta { display: flex; gap: 14px; justify-content: center; margin-top: 30px; }
.hint { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #6b76b8; }

.content { position: relative; z-index: 2; }
.sec { max-width: 1080px; margin: 0 auto; padding: 90px 24px; }
.lab { display: block; letter-spacing: 0.18em; text-transform: uppercase; color: var(--blue); font-size: 13px; margin-bottom: 32px; }

.about { display: grid; grid-template-columns: 200px 1fr; gap: 36px; align-items: start; }
.about img { width: 200px; height: 240px; object-fit: cover; border-radius: 16px; border: 1px solid rgba(147,197,253,0.3); }
.bio { font-size: clamp(17px, 2vw, 24px); line-height: 1.7; color: #dbe3ff; }
.facts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 22px; font-size: 13px; }
.facts i { color: var(--blue); margin-right: 7px; }
.facts b { color: #fff; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 50px; }
.stat { text-align: center; padding: 24px; border-radius: 16px; background: rgba(147,197,253,0.06); border: 1px solid rgba(147,197,253,0.16); }
.stat .num { display: block; font-family: "Libre Baskerville", serif; font-size: clamp(30px, 4vw, 52px); color: var(--moon); }
.stat .cap { font-size: 12px; color: #9aa6e0; }

.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card { padding: 26px; border-radius: 16px; background: rgba(147,197,253,0.05); border: 1px solid rgba(147,197,253,0.16); transition: transform 0.3s, border-color 0.3s; }
.card:hover { transform: translateY(-6px); border-color: rgba(147,197,253,0.5); }
.card i { font-size: 24px; color: var(--blue); }
.card h3 { font-size: 18px; font-weight: 700; color: #f1f5ff; margin: 12px 0 7px; }
.card p { font-size: 13.5px; line-height: 1.6; color: #9aa6e0; }

.constellation { display: flex; flex-wrap: wrap; gap: 12px; }
.star-chip { padding: 10px 16px; border-radius: 999px; border: 1px solid rgba(147,197,253,0.3); font-size: calc(12px * var(--s)); transition: transform 0.3s, box-shadow 0.3s; }
.star-chip:hover { box-shadow: 0 0 22px -4px var(--blue); transform: translateY(-3px); }
.star-chip b { color: var(--blue); }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.proj { border-radius: 16px; overflow: hidden; background: rgba(147,197,253,0.05); border: 1px solid rgba(147,197,253,0.16); transition: transform 0.3s, border-color 0.3s; }
.proj:hover { transform: translateY(-6px); border-color: rgba(147,197,253,0.5); }
.proj-media video { width: 100%; display: block; }
.proj-b { padding: 18px; }
.tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 10px; }
.tags span { font-size: 11px; padding: 4px 10px; border-radius: 999px; background: rgba(147,197,253,0.12); color: var(--blue); }
.proj-b h3 { font-size: 19px; font-weight: 700; color: #f1f5ff; margin-bottom: 8px; }
.proj-b p { font-size: 13.5px; line-height: 1.6; color: #9aa6e0; margin-bottom: 14px; }
.links { display: flex; gap: 16px; }
.links a { color: var(--blue); text-decoration: none; font-weight: 600; font-size: 13.5px; }

.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.cert { display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: #c7d2fe; padding: 14px; border-radius: 14px; background: rgba(147,197,253,0.05); border: 1px solid rgba(147,197,253,0.16); transition: transform 0.3s; }
.cert:hover { transform: translateY(-6px); }
.cert img { width: 100%; height: 130px; object-fit: contain; background: #fff; border-radius: 8px; padding: 7px; }
.cert b { font-size: 13.5px; color: #f1f5ff; margin-top: 5px; }
.cert span { font-size: 11.5px; color: #6b76b8; }

.contact h2 { font-family: "Libre Baskerville", serif; font-size: clamp(40px, 8vw, 110px); line-height: 0.95; font-weight: 700; color: #f1f5ff; margin-bottom: 36px; }
.contact form { display: flex; flex-direction: column; gap: 14px; max-width: 600px; }
.contact .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.contact input, .contact textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(147,197,253,0.25); border-radius: 12px; padding: 13px 15px; color: #f1f5ff; font-family: inherit; font-size: 15px; }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--blue); }
.contact input::placeholder, .contact textarea::placeholder { color: #6b76b8; }
.socials { display: flex; gap: 20px; margin-top: 26px; }
.socials a { color: #9aa6e0; text-decoration: none; }
.socials a:hover { color: var(--blue); }

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; }
  .grid3, .grid2 { grid-template-columns: 1fr; }
  .grid4, .stats, .facts { grid-template-columns: 1fr 1fr; }
  .contact .row { grid-template-columns: 1fr; }
  .moon { opacity: 0.5; right: -10vw; }
}
</style>
