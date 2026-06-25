<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "../composables/useSmoothScroll.js";
import {
  profile, aboutFacts, socials, skillGroups, projects, certificates, services, stats, process, industries,
} from "../data/portfolio.js";

useSmoothScroll();

const gh = socials.find((s) => s.name === "GitHub");
const li = socials.find((s) => s.name === "LinkedIn");
const allSkills = skillGroups.flatMap((g) => g.skills);

const root = ref(null);
const cv = ref(null);
let raf = null, cleanup = null, ctxAnim = null;
const mouse = { x: 0, y: 0 };
const refresh = () => ScrollTrigger.refresh();

/* ------- wormhole tunnel (unchanged signature animation) ------- */
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

onMounted(() => {
  start();
  window.addEventListener("pointermove", onMove);

  ctxAnim = gsap.context(() => {
    // hero intro
    gsap.from(".hero .eyebrow, .hero h1, .hero .stack, .hero .role, .hero .cta, .hero .hint", {
      y: 28, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.15,
    });
    // section labels
    gsap.utils.toArray(".lab").forEach((l) =>
      gsap.from(l, { y: 16, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: l, start: "top 92%" } })
    );
    // ABOUT — dossier rises
    gsap.from(".about-card", { y: 54, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".about-card", start: "top 86%" } });
    // STATS — elastic pop
    gsap.utils.toArray(".stat").forEach((el, i) =>
      gsap.from(el, { y: 30, opacity: 0, scale: 0.7, duration: 0.7, ease: "back.out(1.7)", delay: i * 0.08, scrollTrigger: { trigger: ".stats", start: "top 88%" } })
    );
    // SERVICES — zoom in (flying toward you)
    gsap.utils.toArray(".orb-card").forEach((el) =>
      gsap.from(el, { scale: 0.78, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" } })
    );
    // SKILLS — constellation pops in
    gsap.from(".star-chip", { scale: 0.6, opacity: 0, duration: 0.5, ease: "back.out(1.6)", stagger: 0.025, scrollTrigger: { trigger: ".constell", start: "top 90%" } });
    // WORK — rows rise, media zooms
    gsap.utils.toArray(".work-row").forEach((el) => {
      gsap.from(el, { y: 54, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
      gsap.from(el.querySelector(".work-media video"), { scale: 1.16, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%" } });
    });
    // CERTIFICATES — cascade
    gsap.from(".cert", { y: 46, opacity: 0, scale: 0.92, stagger: 0.08, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: ".certs-grid", start: "top 88%" } });
    // PROCESS — nodes light up along the trajectory
    gsap.from(".tnode", { y: 38, opacity: 0, stagger: 0.13, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: ".trajectory", start: "top 84%" } });
    // INDUSTRIES — cluster ignites
    gsap.from(".orbit-chip", { scale: 0.6, opacity: 0, stagger: 0.04, duration: 0.5, ease: "back.out(1.6)", scrollTrigger: { trigger: ".orbit-cluster", start: "top 90%" } });
    // CONTACT — console arrives
    gsap.from(".console", { y: 54, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".console", start: "top 86%" } });
  }, root.value);

  requestAnimationFrame(refresh);
  setTimeout(refresh, 600);
  setTimeout(refresh, 1600);
  window.addEventListener("load", refresh);
});

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  cleanup?.();
  window.removeEventListener("pointermove", onMove);
  window.removeEventListener("load", refresh);
  ctxAnim?.revert();
});
</script>

<template>
  <div class="worm-x" ref="root">
    <canvas ref="cv" class="tunnel" aria-hidden="true"></canvas>

    <header class="hero">
      <p class="eyebrow">{{ profile.heroTagline }}</p>
      <h1>{{ profile.firstName }}<br /><span class="grad">{{ profile.lastName }}</span></h1>
      <div class="stack">
        <span v-for="tech in profile.stack" :key="tech">{{ tech }}</span>
      </div>
      <p class="role">I bend front-end into shape with Vue &amp; React, then warp clean through to full-stack apps engineered in Nuxt.</p>
      <div class="cta">
        <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.35">Resume</a>
        <a v-if="gh" class="btn ghost" :href="gh.url" target="_blank" v-magnetic="0.25">GitHub</a>
        <a v-if="li" class="btn ghost" :href="li.url" target="_blank" v-magnetic="0.25">LinkedIn</a>
      </div>
      <span class="hint">scroll to fall through</span>
    </header>

    <main class="content">
      <!-- 01 ABOUT — orbital dossier -->
      <section class="sec">
        <span class="lab">01 · About</span>
        <div class="about-card glass">
          <div class="portal">
            <span class="portal-ring r1"></span>
            <span class="portal-ring r2"></span>
            <img :src="profile.avatar" :alt="profile.name" />
          </div>
          <div class="about-body">
            <p class="bio">{{ profile.about }}</p>
            <AboutFacts />
          </div>
        </div>
      </section>

      <!-- 02 STATS — glowing readouts -->
      <section class="sec">
        <div class="stats">
          <div v-for="s in stats" :key="s.label" class="stat glass">
            <span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span>
            <span class="cap">{{ s.label }}</span>
          </div>
        </div>
      </section>

      <!-- 03 SERVICES — cosmic nodes -->
      <section class="sec">
        <span class="lab">02 · Services</span>
        <div class="orb-grid">
          <article v-for="srv in services" :key="srv.title" class="orb-card glass">
            <span class="orb-ic"><i :class="`fi ${srv.icon}`"></i></span>
            <h3>{{ srv.title }}</h3>
            <p>{{ srv.description }}</p>
          </article>
        </div>
      </section>

      <!-- 04 SKILLS — constellation (sized by level) -->
      <section class="sec">
        <span class="lab">03 · Skills</span>
        <div class="constell">
          <span v-for="sk in allSkills" :key="sk.name" class="star-chip" :style="{ '--lv': sk.level }">
            {{ sk.name }}<b>{{ sk.level }}</b>
          </span>
        </div>
      </section>

      <!-- 05 WORK — portholes -->
      <section id="wh-work" class="sec">
        <span class="lab">04 · Selected work</span>
        <div class="work-list">
          <article v-for="(p, i) in projects" :key="p.title" class="work-row glass">
            <div class="work-media"><video v-lazyvideo="p.video" muted loop playsinline></video></div>
            <div class="work-info">
              <span class="work-no">{{ String(i + 1).padStart(2, "0") }}</span>
              <div class="tags"><span v-for="t in p.tags" :key="t">{{ t }}</span></div>
              <h3>{{ p.title }}</h3>
              <p>{{ p.description }}</p>
              <div class="links"><a v-if="p.demo" :href="p.demo" target="_blank">Live ↗</a><a v-if="p.repo" :href="p.repo" target="_blank">Code ↗</a></div>
            </div>
          </article>
        </div>
      </section>

      <!-- 06 CERTIFICATES -->
      <section class="sec">
        <span class="lab">05 · Certificates</span>
        <div class="certs-grid">
          <a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert glass">
            <div class="cert-img"><img :src="c.img" :alt="c.name" /></div>
            <div class="cert-meta"><b>{{ c.name }}</b><span>{{ c.issuer }}</span></div>
          </a>
        </div>
      </section>

      <!-- 07 PROCESS — trajectory -->
      <section class="sec">
        <span class="lab">06 · How it works</span>
        <div class="trajectory">
          <div class="traj-line" aria-hidden="true"></div>
          <div v-for="s in process" :key="s.step" class="tnode">
            <span class="tnode-dot">{{ s.step }}</span>
            <div class="tnode-card glass">
              <i :class="`fi ${s.icon}`"></i>
              <h3>{{ s.title }}</h3>
              <p>{{ s.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 08 INDUSTRIES — floating cluster -->
      <section class="sec">
        <span class="lab">07 · Industries</span>
        <div class="orbit-cluster">
          <span v-for="i in industries" :key="i.name" class="orbit-chip"><i :class="`fi ${i.icon}`"></i> {{ i.name }}</span>
        </div>
      </section>

      <!-- CONTACT — transmission console -->
      <footer class="sec contact-sec">
        <div class="console glass">
          <span class="lab">08 · Transmission</span>
          <h2>Bend space.<br /><span class="grad">Say hello.</span></h2>
          <p class="console-sub">Send a signal — I usually respond within a day.</p>
          <form action="https://formspree.io/f/mnndnjqg" method="POST">
            <div class="frow">
              <label class="field"><span>Name</span><input type="text" name="user_name" required /></label>
              <label class="field"><span>Email</span><input type="email" name="user_email" required /></label>
            </div>
            <div class="frow">
              <label class="field"><span>Company</span><input type="text" name="user_company" /></label>
              <label class="field"><span>Subject</span><input type="text" name="subject" required /></label>
            </div>
            <label class="field"><span>Message</span><textarea name="message" rows="3" required></textarea></label>
            <button class="btn transmit" type="submit" v-magnetic="0.25">Transmit signal →</button>
          </form>
          <div class="socials"><a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a></div>
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.worm-x {
  --orange: #fb923c; --cyan: #22d3ee; --amber: #fde68a; --ink: #040308;
  --muted: #c79c79;
  position: relative; background: #040308; color: #ffe9d6;
  font-family: "Poppins", system-ui, sans-serif; overflow-x: hidden;
}
.tunnel { position: fixed; inset: 0; z-index: 0; width: 100%; height: 100%; }

/* shared cosmic glass panel (no backdrop blur — keeps the animated tunnel smooth) */
.glass { background: rgba(9,6,15,0.62); border: 1px solid rgba(251,146,60,0.2); border-radius: 20px; box-shadow: 0 30px 70px -34px rgba(0,0,0,0.85); }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 999px; background: var(--orange); color: #1a0c02; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-size: 15px; box-shadow: 0 0 30px -4px var(--orange); transition: transform 0.25s, box-shadow 0.25s; }
.btn:hover { transform: translateY(-2px); box-shadow: 0 0 40px -2px var(--orange); }
.btn.ghost { background: rgba(34,211,238,0.08); color: #d6f7ff; border: 1px solid rgba(34,211,238,0.45); box-shadow: none; }
.btn.ghost:hover { box-shadow: 0 0 26px -6px var(--cyan); }

/* hero */
.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; }
.eyebrow { letter-spacing: 0.3em; text-transform: uppercase; font-size: 12px; color: var(--cyan); margin-bottom: 18px; }
.hero h1 { font-size: clamp(48px, 12vw, 150px); font-weight: 800; line-height: 0.9; letter-spacing: -0.03em; color: #fff; text-shadow: 0 0 60px rgba(251,146,60,0.5); }
.hero .grad { background: linear-gradient(110deg, var(--orange), var(--amber), var(--cyan)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.stack { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 22px; }
.stack span { padding: 7px 14px; border-radius: 999px; border: 1px solid rgba(34,211,238,0.35); font-size: 13px; color: #d6f7ff; background: rgba(34,211,238,0.06); transition: box-shadow 0.3s, transform 0.3s; }
.stack span:hover { box-shadow: 0 0 20px -4px var(--cyan); transform: translateY(-3px); }
.role { margin-top: 16px; font-size: clamp(15px, 1.7vw, 19px); color: #f3c9a8; max-width: 680px; line-height: 1.6; text-shadow: 0 2px 16px rgba(4,3,8,0.8); }
.cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 28px; }
.hint { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8a6a4a; }

/* layout */
.content { position: relative; z-index: 2; }
.sec { max-width: 1080px; margin: 0 auto; padding: 84px 24px; }
.lab { display: block; letter-spacing: 0.18em; text-transform: uppercase; color: var(--orange); font-size: 13px; margin-bottom: 30px; text-shadow: 0 2px 14px rgba(4,3,8,0.9); }

/* 01 about — orbital dossier */
.about-card { display: grid; grid-template-columns: 250px 1fr; gap: 44px; align-items: center; padding: 36px; }
.portal { position: relative; width: 230px; height: 230px; display: grid; place-items: center; justify-self: center; }
.portal img { width: 190px; height: 190px; object-fit: cover; border-radius: 50%; border: 1px solid rgba(251,146,60,0.4); box-shadow: 0 0 50px -10px rgba(251,146,60,0.5); }
.portal-ring { position: absolute; border-radius: 50%; }
.portal-ring.r1 { inset: 0; border: 1px dashed rgba(34,211,238,0.55); animation: spin 22s linear infinite; }
.portal-ring.r2 { inset: 18px; border: 1px solid rgba(251,146,60,0.3); animation: spin 16s linear infinite reverse; }
@keyframes spin { to { transform: rotate(360deg); } }
.bio { font-size: clamp(14px, 1.4vw, 17px); line-height: 1.75; color: #f5ddc8; }

/* 02 stats — readouts */
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat { text-align: center; padding: 30px 14px; }
.stat .num { display: block; font-size: clamp(30px, 4.5vw, 54px); font-weight: 800; color: var(--orange); text-shadow: 0 0 26px rgba(251,146,60,0.55); }
.stat .cap { font-size: 12px; color: var(--muted); letter-spacing: 0.04em; }

/* 03 services — cosmic nodes */
.orb-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.orb-card { padding: 28px; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s, box-shadow 0.35s; }
.orb-card:hover { transform: translateY(-8px); border-color: rgba(34,211,238,0.6); box-shadow: 0 0 44px -14px var(--cyan); }
.orb-ic { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(251,146,60,0.35), rgba(251,146,60,0.06)); border: 1px solid rgba(251,146,60,0.4); color: var(--orange); font-size: 22px; box-shadow: 0 0 24px -8px var(--orange); }
.orb-card h3 { font-size: 18px; font-weight: 700; color: #fff; margin: 16px 0 8px; }
.orb-card p { font-size: 13.5px; line-height: 1.65; color: var(--muted); }

/* 04 skills — constellation */
.constell { display: flex; flex-wrap: wrap; gap: 12px 14px; align-items: center; }
.star-chip { display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; border-radius: 999px; border: 1px solid rgba(34,211,238,0.3); background: rgba(34,211,238,0.05); color: #eafaff; font-size: calc(13px + (var(--lv, 85) - 80) * 0.5px); transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; }
.star-chip b { color: var(--orange); font-size: 0.78em; }
.star-chip:hover { transform: translateY(-4px) scale(1.05); border-color: var(--cyan); box-shadow: 0 0 22px -4px var(--cyan); }

/* 05 work — portholes */
.work-list { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.work-row { overflow: hidden; transition: transform 0.35s, border-color 0.35s, box-shadow 0.35s; }
.work-row:hover { transform: translateY(-8px); border-color: rgba(34,211,238,0.6); box-shadow: 0 0 50px -16px var(--cyan); }
.work-media { aspect-ratio: 16 / 10; overflow: hidden; background: rgba(255,255,255,0.03); }
.work-media video { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
.work-row:hover .work-media video { transform: scale(1.06); }
.work-info { position: relative; padding: 22px 22px 24px; }
.work-no { position: absolute; top: -30px; right: 16px; font-size: 52px; font-weight: 800; color: rgba(251,146,60,0.18); }
.tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 12px; }
.tags span { font-size: 11px; padding: 4px 10px; border-radius: 999px; background: rgba(34,211,238,0.14); color: var(--cyan); }
.work-info h3 { font-size: 21px; font-weight: 700; color: #fff; margin-bottom: 9px; }
.work-info p { font-size: 14px; line-height: 1.65; color: var(--muted); margin-bottom: 16px; }
.links { display: flex; gap: 18px; }
.links a { position: relative; color: var(--orange); text-decoration: none; font-weight: 600; font-size: 13.5px; }
.links a::after { content: ""; position: absolute; left: 0; bottom: -3px; width: 100%; height: 1.5px; background: var(--orange); transform: scaleX(0); transform-origin: left; transition: transform 0.35s; }
.links a:hover::after { transform: scaleX(1); }

/* 06 certificates */
.certs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 18px; }
.cert { display: flex; flex-direction: column; overflow: hidden; text-decoration: none; color: #ffe9d6; transition: transform 0.35s, border-color 0.35s, box-shadow 0.35s; }
.cert:hover { transform: translateY(-8px); border-color: rgba(34,211,238,0.6); box-shadow: 0 0 44px -16px var(--cyan); }
.cert-img { background: #fff; padding: 13px; }
.cert-img img { width: 100%; height: 210px; object-fit: contain; display: block; }
.cert-meta { padding: 15px 17px 17px; }
.cert-meta b { display: block; font-size: 15px; color: #fff; font-weight: 700; }
.cert-meta span { display: block; font-size: 12.5px; color: var(--muted); margin-top: 4px; }

/* 07 process — trajectory */
.trajectory { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
.traj-line { position: absolute; top: 23px; left: 8%; right: 8%; height: 2px; background: repeating-linear-gradient(90deg, var(--orange) 0 7px, transparent 7px 16px); opacity: 0.55; animation: flow 0.9s linear infinite; }
@keyframes flow { to { background-position: 16px 0; } }
.tnode { position: relative; text-align: center; }
.tnode-dot { position: relative; z-index: 1; display: inline-grid; place-items: center; width: 48px; height: 48px; border-radius: 50%; background: var(--ink); border: 2px solid var(--orange); color: var(--orange); font-weight: 800; font-size: 15px; box-shadow: 0 0 26px -4px var(--orange); }
.tnode-card { margin-top: 18px; padding: 20px 18px; text-align: left; height: calc(100% - 66px); }
.tnode-card i { font-size: 20px; color: var(--cyan); }
.tnode-card h3 { font-size: 16px; font-weight: 700; color: #fff; margin: 10px 0 7px; }
.tnode-card p { font-size: 13px; line-height: 1.55; color: var(--muted); }

/* 08 industries — floating cluster */
.orbit-cluster { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }
.orbit-chip { display: inline-flex; align-items: center; gap: 9px; padding: 13px 22px; border-radius: 999px; border: 1px solid rgba(251,146,60,0.3); background: rgba(251,146,60,0.05); font-size: 14.5px; color: #ffe9d6; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; }
.orbit-chip i { color: var(--orange); }
.orbit-chip:hover { transform: translateY(-5px); border-color: var(--cyan); box-shadow: 0 0 26px -6px var(--cyan); }

/* contact — transmission console */
.contact-sec { padding-bottom: 110px; }
.console { max-width: 760px; margin: 0 auto; padding: 44px 42px; }
.console h2 { font-size: clamp(34px, 5.5vw, 64px); line-height: 0.98; font-weight: 800; color: #fff; margin-bottom: 14px; }
.console .grad { background: linear-gradient(110deg, var(--orange), var(--cyan)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.console-sub { color: var(--muted); font-size: 15px; margin-bottom: 30px; }
.console form { display: flex; flex-direction: column; gap: 22px; }
.frow { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.field { display: flex; flex-direction: column; gap: 7px; }
.field > span { font-family: ui-monospace, monospace; font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--cyan); }
.field input, .field textarea { background: rgba(4,3,8,0.55); border: 1px solid rgba(251,146,60,0.28); border-radius: 12px; padding: 12px 14px; color: #fff; font-family: inherit; font-size: 15px; resize: none; transition: border-color 0.3s, box-shadow 0.3s; }
.field input:focus, .field textarea:focus { outline: none; border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(34,211,238,0.14), 0 0 22px -6px var(--cyan); }
.field input::placeholder, .field textarea::placeholder { color: #8a6a4a; }
.transmit { margin-top: 6px; width: 100%; justify-content: center; }
.socials { display: flex; gap: 20px; margin-top: 26px; flex-wrap: wrap; }
.socials a { color: var(--muted); text-decoration: none; }
.socials a:hover { color: var(--cyan); }

@media (prefers-reduced-motion: reduce) {
  .portal-ring, .traj-line { animation: none; }
}

@media (max-width: 860px) {
  .about-card { grid-template-columns: 1fr; gap: 28px; padding: 28px; }
  .orb-grid { grid-template-columns: 1fr; }
  .stats { grid-template-columns: 1fr 1fr; }
  .work-list { grid-template-columns: 1fr; }
  .certs-grid { grid-template-columns: 1fr; }
  .trajectory { grid-template-columns: 1fr; gap: 14px; }
  .traj-line { display: none; }
  .tnode-card { height: auto; }
  .frow { grid-template-columns: 1fr; }
  .console { padding: 32px 22px; }
}
@media (max-width: 600px) {
  .hero { padding: 96px 20px 72px; }
  .hero h1 { font-size: clamp(42px, 13vw, 64px); }
}
</style>
