<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useSmoothScroll } from "../composables/useSmoothScroll.js";
import {
  profile, aboutFacts, socials, skillGroups, projects, certificates, services, stats, process, industries,
} from "../data/portfolio.js";

useSmoothScroll();

const cv = ref(null);
let raf = null, cleanup = null;

function start() {
  const c = cv.value;
  const ctx = c.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w, h, stars = [];
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const bands = [
    { col: [74, 222, 128], x0: 0.02, x1: 0.5, base: 0.22, amp: 0.05, f: 0.014, sp: 0.5, ph: 0 },
    { col: [45, 212, 191], x0: 0.25, x1: 0.8, base: 0.3, amp: 0.06, f: 0.011, sp: -0.4, ph: 2 },
    { col: [129, 140, 248], x0: 0.45, x1: 1.0, base: 0.25, amp: 0.07, f: 0.016, sp: 0.6, ph: 4 },
    { col: [134, 239, 172], x0: 0.6, x1: 1.02, base: 0.34, amp: 0.05, f: 0.012, sp: -0.55, ph: 1 },
  ];

  const resize = () => {
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: Math.min(180, Math.floor(w * h / 11000)) }, () => ({
      x: Math.random() * w, y: Math.random() * h * 0.85, r: Math.random() * 1.3 + 0.2,
      a: Math.random() * 0.5 + 0.3, sp: Math.random() * 2 + 0.5, ph: Math.random() * 6,
    }));
  };
  resize();
  window.addEventListener("resize", resize);
  cleanup = () => window.removeEventListener("resize", resize);

  let t = 0;
  const frame = () => {
    t += reduce ? 0.004 : 0.012;
    ctx.clearRect(0, 0, w, h);

    // stars
    for (const s of stars) {
      ctx.globalAlpha = Math.max(0, s.a + Math.sin(t * s.sp + s.ph) * 0.3);
      ctx.fillStyle = "#eaf6ff";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // aurora curtains
    ctx.globalCompositeOperation = "lighter";
    for (const b of bands) {
      const x0 = b.x0 * w, x1 = b.x1 * w;
      const topY = h * 0.04;
      ctx.beginPath();
      ctx.moveTo(x0, topY);
      ctx.lineTo(x1, topY);
      for (let x = x1; x >= x0; x -= 8) {
        const y = h * b.base + Math.sin(x * b.f + t * b.sp + b.ph) * h * b.amp + Math.sin(x * b.f * 2.3 - t * b.sp * 0.7) * h * b.amp * 0.4;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      const g = ctx.createLinearGradient(0, topY, 0, h * (b.base + b.amp));
      g.addColorStop(0, `rgba(${b.col[0]},${b.col[1]},${b.col[2]},0)`);
      g.addColorStop(0.2, `rgba(${b.col[0]},${b.col[1]},${b.col[2]},0.16)`);
      g.addColorStop(0.75, `rgba(${b.col[0]},${b.col[1]},${b.col[2]},0.4)`);
      g.addColorStop(1, `rgba(${b.col[0]},${b.col[1]},${b.col[2]},0)`);
      ctx.fillStyle = g;
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
    raf = requestAnimationFrame(frame);
  };
  frame();
}

onMounted(start);
onBeforeUnmount(() => { if (raf) cancelAnimationFrame(raf); cleanup?.(); });
</script>

<template>
  <div class="aurora-x">
    <canvas ref="cv" class="sky" aria-hidden="true"></canvas>
    <div class="horizon" aria-hidden="true"></div>

    <header class="hero">
      <p class="eyebrow">✦ 69° north ✦</p>
      <h1>{{ profile.firstName }}<br /><span class="grad">{{ profile.lastName }}</span></h1>
      <p class="role">{{ profile.role }} · {{ profile.specialty }}</p>
      <div class="cta">
        <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.35">Resume</a>
        <a class="btn ghost" href="#au-work" v-magnetic="0.25">Work ↓</a>
      </div>
      <span class="hint">chasing lights</span>
    </header>

    <main class="content">
      <section class="sec" v-anim="'right'">
        <span class="lab">01 · About</span>
        <div class="about">
          <img :src="profile.avatar" :alt="profile.name" />
          <div>
            <p class="bio">{{ profile.about }}</p>
            <AboutFacts />
          </div>
        </div>
      </section>

      <section class="sec">
        <div class="stats" v-anim="{ type: 'stagger', delay: 60 }">
          <div v-for="s in stats" :key="s.label" class="stat"><span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span><span class="cap">{{ s.label }}</span></div>
        </div>
      </section>

      <section class="sec" v-anim="'blur'">
        <span class="lab">02 · Services</span>
        <div class="grid3"><div v-for="srv in services" :key="srv.title" class="card"><i :class="`fi ${srv.icon}`"></i><h3>{{ srv.title }}</h3><p>{{ srv.description }}</p></div></div>
      </section>

      <section class="sec" v-anim="'flip'">
        <span class="lab">03 · Skills</span>
        <div class="chips"><span v-for="sk in skillGroups.flatMap(g => g.skills)" :key="sk.name">{{ sk.name }} <b>{{ sk.level }}</b></span></div>
      </section>

      <section id="au-work" class="sec" v-anim="'left'">
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

      <section class="sec" v-anim="'zoom'">
        <span class="lab">05 · Certificates</span>
        <div class="grid4"><a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert"><img :src="c.img" :alt="c.name" /><b>{{ c.name }}</b><span>{{ c.issuer }}</span></a></div>
      </section>

      <section class="sec" v-anim="'zoom'">
        <span class="lab">06 · How it works</span>
        <div class="grid3"><div v-for="s in process" :key="s.step" class="card"><i :class="`fi ${s.icon}`"></i><h3>{{ s.step }} · {{ s.title }}</h3><p>{{ s.description }}</p></div></div>
      </section>

      <section class="sec" v-anim="'flip'">
        <span class="lab">07 · Industries</span>
        <div class="chips"><span v-for="i in industries" :key="i.name">{{ i.name }}</span></div>
      </section>

      <footer class="sec contact" v-anim="'clip'">
        <h2>Let's light<br /><span class="grad">the sky.</span></h2>
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
.aurora-x {
  --green: #4ade80; --teal: #2dd4bf; --violet: #a78bfa; --ink: #050d14;
  position: relative; background: linear-gradient(180deg, #050d14 0%, #07121d 55%, #0a1622 100%);
  color: #dbeafe; font-family: "Poppins", system-ui, sans-serif; overflow-x: hidden;
}
.sky { position: fixed; inset: 0; z-index: 0; width: 100%; height: 100%; }
.horizon { position: fixed; left: 0; right: 0; bottom: 0; height: 26vh; z-index: 1; pointer-events: none; background: linear-gradient(180deg, transparent, rgba(74,222,128,0.06) 40%, #030a10 100%); }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 999px; background: var(--green); color: #052010; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-size: 15px; box-shadow: 0 0 30px -4px var(--green); }
.btn.ghost { background: rgba(74,222,128,0.08); color: #eafff2; border: 1px solid rgba(74,222,128,0.45); box-shadow: none; }

.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; }
.eyebrow { letter-spacing: 0.35em; text-transform: uppercase; font-size: 12px; color: var(--teal); margin-bottom: 18px; }
.hero h1 { font-size: clamp(48px, 12vw, 150px); font-weight: 800; line-height: 0.9; letter-spacing: -0.03em; color: #eaf6ff; text-shadow: 0 0 60px rgba(74,222,128,0.4); }
.hero .grad { background: linear-gradient(110deg, var(--green), var(--teal), var(--violet)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.role { margin-top: 16px; font-size: clamp(15px, 2vw, 21px); color: #b9e6d6; }
.cta { display: flex; gap: 14px; margin-top: 28px; }
.hint { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #4a7768; }

.content { position: relative; z-index: 2; }
.sec { max-width: 1080px; margin: 0 auto; padding: 90px 24px; }
.lab { display: block; letter-spacing: 0.18em; text-transform: uppercase; color: var(--green); font-size: 13px; margin-bottom: 30px; }

.about { display: grid; grid-template-columns: 200px 1fr; gap: 36px; align-items: center; }
.about img { width: 200px; height: 240px; object-fit: cover; border-radius: 16px; border: 1px solid rgba(74,222,128,0.3); }
.bio { font-size: clamp(16px, 2vw, 23px); line-height: 1.7; color: #d6f0e6; }
.facts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 20px; font-size: 13px; }
.facts i { color: var(--teal); margin-right: 7px; }
.facts b { color: #fff; }

.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat { text-align: center; padding: 28px 14px; border-radius: 18px; background: rgba(74,222,128,0.06); border: 1px solid rgba(74,222,128,0.2); }
.stat .num { display: block; font-size: clamp(30px, 4.5vw, 54px); font-weight: 800; color: var(--green); }
.stat .cap { font-size: 12px; color: #8fc7b4; }

.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card { padding: 26px; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(74,222,128,0.18); transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s; }
.card:hover { transform: translateY(-6px); border-color: var(--teal); box-shadow: 0 0 36px -12px var(--teal); }
.card i { font-size: 24px; color: var(--teal); }
.card h3 { font-size: 18px; font-weight: 700; color: #fff; margin: 12px 0 7px; }
.card p { font-size: 13.5px; line-height: 1.6; color: #8fc7b4; }

.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chips span { padding: 9px 15px; border-radius: 999px; border: 1px solid rgba(45,212,191,0.35); font-size: 13.5px; transition: box-shadow 0.3s, transform 0.3s; }
.chips span:hover { box-shadow: 0 0 20px -4px var(--teal); transform: translateY(-3px); }
.chips b { color: var(--green); }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.proj { border-radius: 16px; overflow: hidden; background: rgba(255,255,255,0.03); border: 1px solid rgba(74,222,128,0.18); transition: transform 0.3s, border-color 0.3s; }
.proj:hover { transform: translateY(-6px); border-color: var(--teal); }
.proj-media video { width: 100%; display: block; }
.proj-b { padding: 18px; }
.tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 10px; }
.tags span { font-size: 11px; padding: 4px 10px; border-radius: 999px; background: rgba(45,212,191,0.14); color: var(--teal); }
.proj-b h3 { font-size: 19px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.proj-b p { font-size: 13.5px; line-height: 1.6; color: #8fc7b4; margin-bottom: 14px; }
.links { display: flex; gap: 16px; }
.links a { color: var(--green); text-decoration: none; font-weight: 600; font-size: 13.5px; }

.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.cert { display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: #dbeafe; padding: 14px; border-radius: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(74,222,128,0.18); transition: transform 0.3s; }
.cert:hover { transform: translateY(-6px); }
.cert img { width: 100%; height: 130px; object-fit: contain; background: #fff; border-radius: 8px; padding: 7px; }
.cert b { font-size: 13.5px; color: #fff; margin-top: 5px; }
.cert span { font-size: 11.5px; color: #4a7768; }

.contact h2 { font-size: clamp(40px, 8vw, 100px); line-height: 0.95; font-weight: 800; color: #eaf6ff; margin-bottom: 36px; }
.contact .grad { background: linear-gradient(110deg, var(--green), var(--teal), var(--violet)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.contact form { display: flex; flex-direction: column; gap: 14px; max-width: 600px; }
.contact .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.contact input, .contact textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(74,222,128,0.25); border-radius: 12px; padding: 13px 15px; color: #fff; font-family: inherit; font-size: 15px; }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--green); }
.contact input::placeholder, .contact textarea::placeholder { color: #4a7768; }
.socials { display: flex; gap: 20px; margin-top: 26px; }
.socials a { color: #8fc7b4; text-decoration: none; }
.socials a:hover { color: var(--green); }

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; }
  .grid3, .grid2 { grid-template-columns: 1fr; }
  .grid4, .stats, .facts { grid-template-columns: 1fr 1fr; }
  .contact .row { grid-template-columns: 1fr; }
}
</style>
