<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

const root = ref(null);
const heroSpot = ref(null);
const glow = ref(null);
const fx = ref(null);
let ctx;

const blocksOn = (level) => Math.max(1, Math.round(level / 10));
const refresh = () => ScrollTrigger.refresh();

/* ambient background — monochrome hyperspace warp + cursor constellation */
const mouse = { x: -9999, y: -9999 };
let fxRaf = null, fxCleanup = null;
function fxStart() {
  const c = fx.value;
  if (!c) return;
  const cx2d = c.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w, h, cx, cy, warp = [], amb = [];
  let lastScroll = window.scrollY;
  let boost = 0;
  const spawn = () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 0.9 + 0.1 });
  const resize = () => {
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    cx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = w / 2; cy = h / 2;
    const nW = Math.min(300, Math.floor((w * h) / 7000));
    warp = Array.from({ length: nW }, spawn);
    const nA = Math.min(90, Math.floor((w * h) / 24000));
    amb = Array.from({ length: nA }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
    }));
  };
  resize();
  window.addEventListener("resize", resize);
  fxCleanup = () => window.removeEventListener("resize", resize);
  const frame = () => {
    const dv = Math.abs(window.scrollY - lastScroll);
    lastScroll = window.scrollY;
    boost += (Math.min(dv * 0.0009, 0.02) - boost) * 0.1;
    const speed = 0.0035 + boost;

    cx2d.fillStyle = "rgba(12,13,16,0.35)";
    cx2d.fillRect(0, 0, w, h);

    // hyperspace warp (white streaks)
    const scale = Math.min(w, h) * 0.9;
    for (const s of warp) {
      const px = cx + (s.x / s.z) * scale;
      const py = cy + (s.y / s.z) * scale;
      s.z -= speed;
      if (s.z < 0.05 || px < -50 || px > w + 50 || py < -50 || py > h + 50) {
        Object.assign(s, spawn());
        continue;
      }
      const nx = cx + (s.x / s.z) * scale;
      const ny = cy + (s.y / s.z) * scale;
      const b = Math.min(1, (1 - s.z) * 1.3);
      cx2d.strokeStyle = "rgba(226,232,240," + b + ")";
      cx2d.lineWidth = (1 - s.z) * 2.2;
      cx2d.beginPath(); cx2d.moveTo(px, py); cx2d.lineTo(nx, ny); cx2d.stroke();
    }

    // ambient constellation near cursor (silver/white)
    const near = [];
    for (const a of amb) {
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0) a.x = w; if (a.x > w) a.x = 0;
      if (a.y < 0) a.y = h; if (a.y > h) a.y = 0;
      cx2d.fillStyle = "rgba(203,213,225,0.55)";
      cx2d.beginPath(); cx2d.arc(a.x, a.y, 1.3, 0, Math.PI * 2); cx2d.fill();
      if (Math.hypot(a.x - mouse.x, a.y - mouse.y) < 190) near.push(a);
    }
    for (const a of near) {
      const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      cx2d.strokeStyle = "rgba(248,250,252," + (1 - d / 190) * 0.55 + ")";
      cx2d.lineWidth = 1;
      cx2d.beginPath(); cx2d.moveTo(mouse.x, mouse.y); cx2d.lineTo(a.x, a.y); cx2d.stroke();
    }
    for (let i = 0; i < near.length; i++)
      for (let j = i + 1; j < near.length; j++) {
        const d = Math.hypot(near[i].x - near[j].x, near[i].y - near[j].y);
        if (d < 130) {
          cx2d.strokeStyle = "rgba(148,163,184," + (1 - d / 130) * 0.4 + ")";
          cx2d.beginPath(); cx2d.moveTo(near[i].x, near[i].y); cx2d.lineTo(near[j].x, near[j].y); cx2d.stroke();
        }
      }
    fxRaf = requestAnimationFrame(frame);
  };
  frame();
}
function fxStop() {
  if (fxRaf) cancelAnimationFrame(fxRaf);
  fxRaf = null;
  fxCleanup?.();
}

function onMove(e) {
  mouse.x = e.clientX; mouse.y = e.clientY;
  if (glow.value) glow.value.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  if (heroSpot.value) {
    const r = heroSpot.value.getBoundingClientRect();
    heroSpot.value.style.setProperty("--x", e.clientX - r.left + "px");
    heroSpot.value.style.setProperty("--y", e.clientY - r.top + "px");
  }
}

onMounted(() => {
  window.addEventListener("pointermove", onMove);
  fxStart();

  ctx = gsap.context(() => {
    // hero entrance
    gsap.from(".hero-inner > *", { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.2 });

    // section labels slide in with a drawn underline
    gsap.utils.toArray(".lab").forEach((l) =>
      gsap.from(l, { x: -24, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: l, start: "top 90%" } })
    );

    // ABOUT — photo opens like a curtain, bio + facts rise
    gsap.utils.toArray(".about-photo").forEach((el) =>
      gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut", scrollTrigger: { trigger: ".about", start: "top 78%" } })
    );
    gsap.from(".about-text > *", { y: 26, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".about", start: "top 74%" } });
    gsap.from(".stat", { y: 26, opacity: 0, scale: 0.85, duration: 0.6, stagger: 0.08, ease: "back.out(1.6)", scrollTrigger: { trigger: ".stats", start: "top 86%" } });

    // SERVICES — big rows wipe in from the right
    gsap.utils.toArray(".srow").forEach((row) =>
      gsap.fromTo(row, { clipPath: "inset(0 0 0 100%)", opacity: 0.2 }, { clipPath: "inset(0 0 0 0%)", opacity: 1, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 90%" } })
    );

    // SKILLS — equalizer blocks light up left→right
    gsap.utils.toArray(".eq").forEach((eq) =>
      gsap.from(eq.querySelectorAll(".blk.on"), { scaleY: 0.15, opacity: 0, transformOrigin: "bottom", stagger: 0.05, duration: 0.4, ease: "power1.out", scrollTrigger: { trigger: eq, start: "top 94%" } })
    );

    // WORK — card rises in, media does a slow cinematic zoom-out (always visible)
    gsap.utils.toArray(".wcard").forEach((card) => {
      gsap.from(card, { y: 48, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 90%" } });
      gsap.from(card.querySelector(".wmedia video"), { scale: 1.18, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 86%" } });
    });

    // CERTIFICATES — clear cascade: rise + scale in
    gsap.from(".cert", { y: 56, opacity: 0, scale: 0.9, stagger: 0.09, duration: 0.7, ease: "back.out(1.4)", scrollTrigger: { trigger: ".grid4", start: "top 86%" } });

    // PROCESS — a light beam fills across the steps, steps rise
    gsap.fromTo(".pbeam i", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: ".proc", start: "top 72%", end: "bottom 82%", scrub: true } });
    gsap.from(".pstep", { y: 34, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".proc", start: "top 78%" } });

    // CONTACT
    gsap.from(".contact h2", { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".contact", start: "top 82%" } });
    gsap.from(".contact form, .contact .socials", { y: 24, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".contact", start: "top 76%" } });
  }, root.value);

  // Re-measure trigger positions after async content (fonts, facts, images,
  // lazy media) settles — otherwise far-down reveals fire at the wrong spot.
  requestAnimationFrame(refresh);
  setTimeout(refresh, 600);
  setTimeout(refresh, 1600);
  window.addEventListener("load", refresh);
});

onBeforeUnmount(() => {
  window.removeEventListener("pointermove", onMove);
  window.removeEventListener("load", refresh);
  fxStop();
  ctx?.revert();
});
</script>

<template>
  <div class="veil" ref="root">
    <!-- ambient background — drifting particle dust -->
    <div class="veil-bg" aria-hidden="true">
      <canvas ref="fx" class="veil-fx"></canvas>
    </div>
    <div class="glow" ref="glow" aria-hidden="true"></div>

    <!-- HERO: discover the name with the flashlight -->
    <header class="hero">
      <div class="hero-inner">
        <p class="eyebrow">{{ profile.heroTagline }}</p>
        <h1>{{ profile.firstName }}<br />{{ profile.lastName }}</h1>
        <div class="stack">
          <span v-for="t in profile.stack" :key="t" class="chip">{{ t }}</span>
        </div>
        <p class="role">A front-end specialist in Vue &amp; React, I bring interfaces out of the dark — then take them full-stack with Nuxt.</p>
        <div class="cta">
          <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.3">Resume</a>
          <a
            v-for="s in socials.filter((x) => ['GitHub', 'LinkedIn'].includes(x.name))"
            :key="s.name"
            class="btn ghost"
            :href="s.url"
            target="_blank"
            v-magnetic="0.25"
            >{{ s.name }}</a
          >
        </div>
      </div>
      <div class="spot" ref="heroSpot" aria-hidden="true"></div>
    </header>

    <main class="content">
      <!-- 01 ABOUT — cinematic curtain reveal -->
      <section class="sec about-sec">
        <span class="lab">01 — About</span>
        <div class="about">
          <div class="about-photo"><img :src="profile.avatar" :alt="profile.name" /></div>
          <div class="about-text">
            <p class="bio">{{ profile.about }}</p>
            <AboutFacts />
          </div>
        </div>
        <div class="stats">
          <div v-for="s in stats" :key="s.label" class="stat">
            <span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span><span class="cap">{{ s.label }}</span>
          </div>
        </div>
      </section>

      <!-- 02 SERVICES — invert-on-hover index rows -->
      <section class="sec serv-sec">
        <span class="lab">02 — Services</span>
        <div class="srows">
          <div v-for="(srv, i) in services" :key="srv.title" class="srow">
            <span class="srow-no">{{ String(i + 1).padStart(2, "0") }}</span>
            <div class="srow-main">
              <h3>{{ srv.title }}</h3>
              <p>{{ srv.description }}</p>
            </div>
            <i :class="`fi ${srv.icon} srow-ic`"></i>
          </div>
        </div>
      </section>

      <!-- 03 SKILLS — equalizer -->
      <section class="sec skills-sec">
        <span class="lab">03 — Skills</span>
        <div class="eqgrid">
          <div v-for="g in skillGroups" :key="g.category" class="eqgroup">
            <h4>{{ g.category }}</h4>
            <div v-for="sk in g.skills" :key="sk.name" class="eqrow">
              <span class="eqname">{{ sk.name }}</span>
              <div class="eq" :data-active="blocksOn(sk.level)">
                <span v-for="n in 10" :key="n" class="blk" :class="{ on: n <= blocksOn(sk.level) }"></span>
              </div>
              <span class="eqlv">{{ sk.level }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 04 WORK — cinematic curtain cards -->
      <section id="veil-work" class="sec work-sec">
        <span class="lab">04 — Selected work</span>
        <div class="wgrid">
          <article v-for="(p, i) in projects" :key="p.title" class="wcard">
            <div class="wmedia"><video v-lazyvideo="p.video" muted loop playsinline></video></div>
            <div class="winfo">
              <span class="wno">{{ String(i + 1).padStart(2, "0") }}</span>
              <div class="tags"><span v-for="t in p.tags" :key="t">{{ t }}</span></div>
              <h3>{{ p.title }}</h3>
              <p>{{ p.description }}</p>
              <div class="links"><a v-if="p.demo" :href="p.demo" target="_blank">Live ↗</a><a v-if="p.repo" :href="p.repo" target="_blank">Code ↗</a></div>
            </div>
          </article>
        </div>
      </section>

      <!-- 05 CERTIFICATES — readable cards, grayscale→colour on hover -->
      <section class="sec">
        <span class="lab">05 — Certificates</span>
        <div class="grid4">
          <a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert">
            <div class="cert-img"><img :src="c.img" :alt="c.name" /></div>
            <div class="cert-meta">
              <b>{{ c.name }}</b>
              <span>{{ c.issuer }}</span>
            </div>
            <span class="cert-view">View certificate ↗</span>
          </a>
        </div>
      </section>

      <!-- 06 PROCESS — light-beam stepper -->
      <section class="sec proc-sec">
        <span class="lab">06 — How it works</span>
        <div class="proc">
          <div class="pbeam"><i></i></div>
          <div class="psteps">
            <div v-for="s in process" :key="s.step" class="pstep">
              <span class="pdot">{{ s.step }}</span>
              <i :class="`fi ${s.icon}`"></i>
              <h3>{{ s.title }}</h3>
              <p>{{ s.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 07 INDUSTRIES — bold two-row marquee band (no static heading) -->
      <section class="sec ind-sec">
        <div class="indband">
          <div class="indrow">
            <div class="indtrack">
              <span v-for="(i, idx) in industries" :key="'a' + i.name" class="indbig" :class="{ fill: idx % 2 === 0 }">{{ i.name }}<b>✦</b></span>
              <span v-for="(i, idx) in industries" :key="'b' + i.name" class="indbig" :class="{ fill: idx % 2 === 0 }" aria-hidden="true">{{ i.name }}<b>✦</b></span>
            </div>
          </div>
          <div class="indrow rev">
            <div class="indtrack">
              <span v-for="(i, idx) in industries" :key="'c' + i.name" class="indbig" :class="{ fill: idx % 2 === 1 }">{{ i.name }}<b>✦</b></span>
              <span v-for="(i, idx) in industries" :key="'d' + i.name" class="indbig" :class="{ fill: idx % 2 === 1 }" aria-hidden="true">{{ i.name }}<b>✦</b></span>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- CONTACT — cinematic transmission panel (outside .content so the warp shows) -->
    <footer class="sec contact">
        <div class="contact-grid">
          <div class="contact-intro">
            <span class="lab">08 — Contact</span>
            <h2>Step into<br /><span class="lit">the light.</span></h2>
            <p class="contact-sub">Have a project in mind? Let's build something striking together.</p>
            <div class="status"><span class="status-dot"></span> Available for new projects</div>
            <div class="socials">
              <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a>
              <span>{{ profile.email }}</span>
            </div>
          </div>
          <div class="contact-panel">
            <span class="cor tl"></span><span class="cor tr"></span><span class="cor bl"></span><span class="cor br"></span>
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
              <button class="btn send" type="submit" v-magnetic="0.25">Send transmission →</button>
            </form>
          </div>
        </div>
      </footer>
  </div>
</template>

<style scoped>
.veil {
  --silver: #cbd5e1;
  --bright: #f8fafc;
  --ink: #0c0d10;
  position: relative;
  background: var(--ink);
  color: var(--silver);
  font-family: "Poppins", system-ui, sans-serif;
  overflow-x: hidden;
}
.glow { position: fixed; top: 0; left: 0; z-index: 1; width: 500px; height: 500px; margin: -250px 0 0 -250px; pointer-events: none; border-radius: 50%; background: radial-gradient(circle, rgba(203,213,225,0.10), transparent 65%); mix-blend-mode: screen; }

/* ambient background — drifting particle dust */
.veil-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.veil-fx { position: absolute; inset: 0; width: 100%; height: 100%; }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 8px; background: var(--bright); color: #111; font-weight: 700; text-decoration: none; cursor: pointer; border: 1px solid var(--bright); font-size: 15px; transition: transform 0.25s; }
.btn:hover { transform: translateY(-2px); }
.btn.ghost { background: transparent; color: var(--bright); border-color: rgba(203,213,225,0.4); }
.btn.ghost:hover { border-color: var(--bright); }

/* hero flashlight */
.hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 24px; overflow: hidden; }
.hero-inner { position: relative; z-index: 1; }
.eyebrow { text-transform: uppercase; letter-spacing: 0.3em; font-size: 12px; color: #94a3b8; margin-bottom: 22px; }
.hero h1 { font-size: clamp(56px, 14vw, 200px); font-weight: 800; line-height: 0.86; letter-spacing: -0.03em; color: var(--bright); text-shadow: 0 0 60px rgba(248,250,252,0.18); }
.hero .role { margin-top: 22px; max-width: 640px; margin-left: auto; margin-right: auto; font-size: clamp(15px, 1.6vw, 19px); line-height: 1.65; color: var(--silver); }
.stack { display: flex; flex-wrap: wrap; gap: 9px; justify-content: center; margin-top: 24px; }
.stack .chip { font-size: 12px; padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(203,213,225,0.3); color: var(--silver); letter-spacing: 0.04em; }
.cta { display: flex; gap: 14px; justify-content: center; margin-top: 30px; flex-wrap: wrap; }
.spot { position: absolute; inset: 0; z-index: 2; pointer-events: none; background: radial-gradient(circle 300px at var(--x, 50%) var(--y, 40%), transparent 0, transparent 30%, rgba(8,9,12,0.62) 62%, rgba(8,9,12,0.93) 100%); transition: background 0.05s linear; }

/* content */
/* warp background shows only behind the hero (first) + contact (last);
   the middle content sits on a solid full-width backdrop that covers it */
.content { position: relative; z-index: 2; background: var(--ink); }
.sec { max-width: 1080px; margin: 0 auto; padding: 96px 24px; border-top: 1px solid rgba(203,213,225,0.1); }
.contact { position: relative; z-index: 2; }
.lab { display: inline-block; font-family: ui-monospace, monospace; letter-spacing: 0.2em; text-transform: uppercase; color: #94a3b8; font-size: 12px; margin-bottom: 38px; padding-bottom: 8px; border-bottom: 1px solid rgba(203,213,225,0.25); }

/* 01 about */
.about { display: grid; grid-template-columns: 240px 1fr; gap: 44px; align-items: start; }
.about-photo { border-radius: 16px; overflow: hidden; will-change: clip-path; }
.about-photo img { width: 240px; height: 300px; object-fit: cover; filter: grayscale(1) contrast(1.05); transition: filter 0.5s, transform 0.6s; display: block; }
.about-photo:hover img { filter: grayscale(0); transform: scale(1.04); }
.bio { font-size: clamp(14px, 1.3vw, 17px); line-height: 1.75; color: #cbd5e1; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 56px; }
.stat { text-align: center; padding: 26px 14px; border: 1px solid rgba(203,213,225,0.12); border-radius: 14px; transition: border-color 0.3s, background 0.3s; }
.stat:hover { border-color: rgba(248,250,252,0.45); background: rgba(248,250,252,0.03); }
.stat .num { display: block; font-size: clamp(30px, 4vw, 52px); font-weight: 800; color: var(--bright); }
.stat .cap { font-size: 12px; color: #94a3b8; }

/* 02 services — invert rows */
.srows { border-top: 1px solid rgba(203,213,225,0.14); }
.srow { display: grid; grid-template-columns: 84px 1fr auto; gap: 26px; align-items: center; padding: 28px 22px; border-bottom: 1px solid rgba(203,213,225,0.14); position: relative; overflow: hidden; transition: background 0.45s cubic-bezier(0.16,1,0.3,1), color 0.45s, padding 0.4s; }
.srow:hover { background: var(--bright); padding-left: 34px; }
.srow-no { font-family: ui-monospace, monospace; font-size: 30px; font-weight: 800; color: #475569; transition: color 0.45s; }
.srow:hover .srow-no { color: #0c0d10; }
.srow-main h3 { font-size: clamp(20px, 3vw, 33px); font-weight: 700; color: var(--bright); transition: color 0.45s; }
.srow:hover .srow-main h3 { color: #0c0d10; }
.srow-main p { font-size: 14px; color: #94a3b8; margin-top: 5px; max-width: 72ch; transition: color 0.45s; }
.srow:hover .srow-main p { color: #475569; }
.srow-ic { font-size: 26px; color: var(--bright); transition: transform 0.45s, color 0.45s; }
.srow:hover .srow-ic { transform: scale(1.35) rotate(-6deg); color: #0c0d10; }

/* 03 skills — equalizer */
.eqgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 44px 60px; }
.eqgroup h4 { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #94a3b8; margin-bottom: 18px; }
.eqrow { display: grid; grid-template-columns: 128px 1fr 38px; gap: 14px; align-items: center; padding: 7px 0; }
.eqname { font-size: 14px; color: var(--silver); }
.eq { display: flex; gap: 4px; }
.blk { flex: 1; height: 16px; border-radius: 2px; background: rgba(203,213,225,0.12); }
.blk.on { background: var(--bright); box-shadow: 0 0 10px rgba(248,250,252,0.45); }
.eqlv { font-size: 13px; color: var(--bright); font-weight: 700; text-align: right; }

/* 04 work — cinematic cards */
.wgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px 22px; }
.wcard { border: 1px solid rgba(203,213,225,0.12); border-radius: 16px; overflow: hidden; transition: border-color 0.4s, transform 0.4s; }
.wcard:hover { border-color: rgba(248,250,252,0.45); transform: translateY(-6px); }
.wmedia { aspect-ratio: 16 / 10; overflow: hidden; background: rgba(255,255,255,0.04); }
.wmedia video { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(1) contrast(1.06); transition: filter 0.6s, transform 0.6s; }
.wcard:hover .wmedia video { filter: grayscale(0); transform: scale(1.06); }
.winfo { position: relative; padding: 20px 20px 22px; }
.wno { position: absolute; top: -38px; right: 14px; font-size: 64px; font-weight: 800; color: rgba(248,250,252,0.07); letter-spacing: -0.03em; }
.tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 12px; }
.tags span { font-size: 11px; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(203,213,225,0.2); color: #94a3b8; }
.winfo h3 { font-size: 21px; font-weight: 700; color: var(--bright); margin-bottom: 9px; }
.winfo p { font-size: 14px; line-height: 1.65; color: #94a3b8; margin-bottom: 16px; }
.links { display: flex; gap: 18px; }
.links a { position: relative; color: var(--bright); text-decoration: none; font-weight: 600; font-size: 13.5px; }
.links a::after { content: ""; position: absolute; left: 0; bottom: -3px; width: 100%; height: 1.5px; background: var(--bright); transform: scaleX(0); transform-origin: left; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
.links a:hover::after { transform: scaleX(1); }

/* 05 certificates — readable cards */
.grid4 { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 22px; }
.cert { display: flex; flex-direction: column; text-decoration: none; color: var(--silver); border: 1px solid rgba(203,213,225,0.14); border-radius: 18px; overflow: hidden; background: rgba(255,255,255,0.02); transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s; }
.cert:hover { transform: translateY(-8px); border-color: rgba(248,250,252,0.55); box-shadow: 0 30px 60px -28px rgba(0,0,0,0.85); }
.cert-img { background: #fff; padding: 14px; }
.cert-img img { width: 100%; height: 250px; object-fit: contain; display: block; filter: grayscale(1) contrast(1.02); transition: filter 0.5s, transform 0.5s; }
.cert:hover .cert-img img { filter: grayscale(0); transform: scale(1.03); }
.cert-meta { padding: 17px 18px 4px; }
.cert-meta b { display: block; font-size: 16px; line-height: 1.3; color: var(--bright); font-weight: 700; }
.cert-meta span { display: block; font-size: 13px; color: #94a3b8; margin-top: 4px; }
.cert-view { padding: 9px 18px 18px; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #64748b; transition: color 0.35s; }
.cert:hover .cert-view { color: var(--bright); }

/* 06 process — light-beam stepper */
.proc { position: relative; padding-top: 4px; }
.pbeam { position: absolute; top: 19px; left: 6px; right: 6px; height: 2px; background: rgba(203,213,225,0.16); }
.pbeam i { display: block; height: 100%; width: 100%; background: var(--bright); transform-origin: left; box-shadow: 0 0 14px rgba(248,250,252,0.7); }
.psteps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
.pstep { position: relative; }
.pdot { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--ink); border: 2px solid rgba(203,213,225,0.35); color: var(--bright); font-family: ui-monospace, monospace; font-weight: 700; font-size: 14px; position: relative; z-index: 1; }
.pstep i { display: block; font-size: 22px; color: var(--bright); margin: 18px 0 10px; }
.pstep h3 { font-size: 16px; font-weight: 700; color: var(--bright); margin-bottom: 7px; }
.pstep p { font-size: 13px; color: #94a3b8; line-height: 1.55; }

/* 07 industries — bold two-row marquee band */
.ind-sec { max-width: none; padding-left: 0; padding-right: 0; }
.ind-sec .lab { margin-left: max(24px, calc((100vw - 1080px) / 2 + 24px)); }
.indband { display: flex; flex-direction: column; gap: 6px; padding: 26px 0; border-top: 1px solid rgba(203,213,225,0.16); border-bottom: 1px solid rgba(203,213,225,0.16); background: rgba(255,255,255,0.015); }
.indrow { overflow: hidden; }
.indtrack { display: flex; width: max-content; align-items: center; animation: indscroll 38s linear infinite; }
.indrow.rev .indtrack { animation: indscrollrev 46s linear infinite; }
.indbig { display: inline-flex; align-items: center; gap: 22px; font-size: clamp(30px, 5vw, 62px); font-weight: 800; letter-spacing: -0.02em; white-space: nowrap; padding-right: 26px; color: transparent; -webkit-text-stroke: 1.3px rgba(203,213,225,0.8); transition: color 0.3s, -webkit-text-stroke-color 0.3s; }
.indbig.fill { color: var(--bright); -webkit-text-stroke-color: var(--bright); }
.indbig:hover { color: var(--bright); -webkit-text-stroke-color: var(--bright); }
.indbig b { color: #475569; -webkit-text-stroke: 0; font-size: 0.4em; }
@keyframes indscroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes indscrollrev { from { transform: translateX(-50%); } to { transform: translateX(0); } }

/* contact */
/* contact keeps the warp visible but dimmed so content stays readable */
.contact { background: rgba(12,13,16,0.62); }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.contact-intro .lab { margin-bottom: 22px; }
.contact h2 { font-size: clamp(38px, 5.5vw, 80px); font-weight: 800; line-height: 0.95; color: var(--bright); margin-bottom: 20px; }
.lit { background: linear-gradient(100deg, var(--silver) 28%, #ffffff 50%, var(--silver) 72%); background-size: 230% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; animation: litshine 4.5s ease-in-out infinite; }
@keyframes litshine { 0% { background-position: 120% 0; } 55%, 100% { background-position: -120% 0; } }
.contact-sub { color: #94a3b8; font-size: 16px; line-height: 1.6; max-width: 42ch; margin-bottom: 22px; }
.status { display: inline-flex; align-items: center; gap: 9px; font-family: ui-monospace, monospace; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--silver); margin-bottom: 26px; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--bright); animation: pulse 2.2s ease-out infinite; }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(248,250,252,0.5); } 70% { box-shadow: 0 0 0 9px rgba(248,250,252,0); } 100% { box-shadow: 0 0 0 0 rgba(248,250,252,0); } }
.contact-panel { position: relative; border: 1px solid rgba(203,213,225,0.22); border-radius: 18px; padding: 40px 38px; background: rgba(12,13,16,0.55); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.cor { position: absolute; width: 16px; height: 16px; border: 2px solid var(--bright); }
.cor.tl { top: -1px; left: -1px; border-right: 0; border-bottom: 0; border-top-left-radius: 7px; }
.cor.tr { top: -1px; right: -1px; border-left: 0; border-bottom: 0; border-top-right-radius: 7px; }
.cor.bl { bottom: -1px; left: -1px; border-right: 0; border-top: 0; border-bottom-left-radius: 7px; }
.cor.br { bottom: -1px; right: -1px; border-left: 0; border-top: 0; border-bottom-right-radius: 7px; }
.frow { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; margin-bottom: 24px; }
.field { display: flex; flex-direction: column; gap: 7px; }
.field > span { font-family: ui-monospace, monospace; font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: #94a3b8; }
.field input, .field textarea { background: transparent; border: none; border-bottom: 1px solid rgba(203,213,225,0.28); padding: 8px 2px; color: var(--bright); font-family: inherit; font-size: 16px; transition: border-color 0.3s, box-shadow 0.3s; resize: none; }
.field input:focus, .field textarea:focus { outline: none; border-bottom-color: var(--bright); box-shadow: 0 1px 0 0 var(--bright); }
.contact .send { margin-top: 28px; width: 100%; justify-content: center; }
.socials { display: flex; gap: 18px; align-items: center; color: #64748b; flex-wrap: wrap; }
.socials a { color: var(--silver); text-decoration: none; }
.socials a:hover { color: var(--bright); }

@media (prefers-reduced-motion: reduce) {
  .lit { animation: none; }
}

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; gap: 24px; }
  .about-photo img { width: 100%; height: 320px; }
  .eqgrid { grid-template-columns: 1fr; }
  .wgrid { grid-template-columns: 1fr; }
  .grid4 { grid-template-columns: 1fr; }
  .stats { grid-template-columns: 1fr 1fr; }
  .srow { grid-template-columns: 56px 1fr; }
  .srow-ic { display: none; }
  .psteps { grid-template-columns: 1fr 1fr; }
  .pbeam { display: none; }
  .contact-grid { grid-template-columns: 1fr; gap: 36px; }
  .frow { grid-template-columns: 1fr; }
  .contact-panel { padding: 30px 24px; }
}
</style>
