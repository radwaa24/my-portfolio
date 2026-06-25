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

// realistic clouds via fractal-noise (rasterized once → scrolls smoothly).
// two seeds/densities give parallax depth between the near + far bands.
function cloudTexture(seed, freqX, freqY, mul, off) {
  // low octaves + low frequency => big smooth cloud masses (not grainy);
  // low feColorMatrix contrast (mul/off) => gentle, diffuse edges, not hard-cut.
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>` +
    `<filter id='c' x='0' y='0' width='100%' height='100%'>` +
    `<feTurbulence type='fractalNoise' baseFrequency='${freqX} ${freqY}' numOctaves='4' seed='${seed}' stitchTiles='stitch'/>` +
    `<feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 ${mul} ${off}'/>` +
    `</filter><rect width='1200' height='800' filter='url(#c)'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
const cloudNear = cloudTexture(14, 0.0034, 0.0085, 4, -2.35);
const cloudFar = cloudTexture(31, 0.0052, 0.012, 3.4, -2.05);

const gh = socials.find((s) => s.name === "GitHub");
const li = socials.find((s) => s.name === "LinkedIn");

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    // hero entrance
    gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 })
      .from(".hero .kicker", { y: 20, opacity: 0, duration: 0.7 })
      .from(".hero .thin", { y: 24, opacity: 0, duration: 0.7 }, "-=0.4")
      .from(".hero .serif", { y: 40, opacity: 0, duration: 1, scale: 0.96 }, "-=0.4")
      .from(".hero-stack > *", { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.4")
      .from(".hero .lede", { y: 20, opacity: 0, duration: 0.7 }, "-=0.3")
      .from(".hero-cta > *", { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=0.4")
      .from(".move-hint", { opacity: 0, duration: 0.8 }, "-=0.3");

    // generic entrance (section labels, about card, contact)
    gsap.utils.toArray(".reveal-self").forEach((el) =>
      gsap.from(el, { y: 46, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } })
    );
    // STATS — pop in with a soft overshoot
    gsap.utils.toArray(".stats").forEach((grp) =>
      gsap.from(grp.children, { y: 30, opacity: 0, scale: 0.8, duration: 0.7, ease: "back.out(1.6)", stagger: 0.1, scrollTrigger: { trigger: grp, start: "top 85%" } })
    );
    // SERVICES — cards drift in from alternating sides, like clouds
    gsap.utils.toArray(".svc-card").forEach((el, i) =>
      gsap.from(el, { x: i % 2 ? 80 : -80, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } })
    );
    // SKILLS — bars fill to their level
    gsap.utils.toArray(".bar-fill").forEach((fill) =>
      gsap.fromTo(fill, { width: "0%" }, { width: fill.dataset.level + "%", duration: 1.3, ease: "power3.out", scrollTrigger: { trigger: fill, start: "top 95%" } })
    );
    // CERTIFICATES — tilt + rise in
    gsap.utils.toArray(".cert").forEach((el, i) =>
      gsap.from(el, { y: 54, rotateZ: i % 2 ? 5 : -5, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" } })
    );
    // PROCESS — timeline line draws as you scroll, steps rise in
    gsap.utils.toArray(".tl-line").forEach((line) =>
      gsap.from(line, { scaleY: 0, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: ".timeline", start: "top 78%", end: "bottom 80%", scrub: true } })
    );
    gsap.utils.toArray(".tl-item").forEach((el) =>
      gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%" } })
    );
    // WORK — stacking cards scale + dim as the next slides over
    gsap.utils.toArray(".stack-card").forEach((card) =>
      gsap.to(card, { scale: 0.93, filter: "brightness(0.92)", scrollTrigger: { trigger: card, start: "top 12%", end: "bottom 12%", scrub: true } })
    );
  }, root.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<template>
  <div class="petal" ref="root">
    <!-- sky + drifting clouds (fixed backdrop) -->
    <div class="sky" aria-hidden="true"></div>
    <div class="cloudscape" aria-hidden="true">
      <span class="sun"></span>
      <div class="cloud-bg far" :style="{ backgroundImage: cloudFar }"></div>
      <div class="cloud-bg near" :style="{ backgroundImage: cloudNear }"></div>
    </div>

    <!-- HERO -->
    <header class="hero">
      <p class="kicker">{{ profile.heroTagline }}</p>
      <h1>
        <span class="thin">the work of</span>
        <span class="serif">{{ profile.firstName }}<em> {{ profile.lastName }}</em></span>
      </h1>
      <div class="hero-stack">
        <span v-for="t in profile.stack" :key="t">{{ t }}</span>
      </div>
      <p class="lede">A front-end specialist drifting between Vue &amp; React, I shape light, airy interfaces — and build complete full-stack apps in Nuxt.</p>
      <div class="hero-cta">
        <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.3"><i class="fi fi-rr-document"></i> Résumé</a>
        <a v-if="gh" class="btn ghost" :href="gh.url" target="_blank" v-magnetic="0.25"><i :class="`fi ${gh.brand}`"></i> GitHub</a>
        <a v-if="li" class="btn ghost" :href="li.url" target="_blank" v-magnetic="0.25"><i :class="`fi ${li.brand}`"></i> LinkedIn</a>
      </div>
      <span class="move-hint">drift your cursor ✦</span>
    </header>

    <!-- ABOUT — floating cloud card -->
    <section class="sec about">
      <span class="lab reveal-self">( About )</span>
      <div class="about-wrap reveal-self">
        <div class="cloud-card about-card">
          <div class="about-avatar"><img :src="profile.avatar" :alt="profile.name" /></div>
          <p class="bio">{{ profile.about }}</p>
          <div class="about-facts">
            <div v-for="f in aboutFacts" :key="f.label" class="fact">
              <i :class="`fi ${f.icon}`"></i>
              <span class="fl">{{ f.label }}</span>
              <span class="fv">{{ f.value }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="stats reveal-stagger">
        <div v-for="s in stats" :key="s.label" class="stat">
          <span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span>
          <span class="cap">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="sec">
      <span class="lab reveal-self">( What I do )</span>
      <ul class="serv">
        <li v-for="(srv, i) in services" :key="srv.title" class="svc-card">
          <span class="s-no">0{{ i + 1 }}</span>
          <div><i :class="`fi ${srv.icon} s-ic`"></i><h3>{{ srv.title }}</h3><p>{{ srv.description }}</p></div>
        </li>
      </ul>
    </section>

    <!-- SKILLS — animated level bars -->
    <section class="sec">
      <span class="lab reveal-self">( Skills )</span>
      <div class="skills">
        <div v-for="g in skillGroups" :key="g.category" class="skgroup reveal-self">
          <h4>{{ g.category }}</h4>
          <div v-for="sk in g.skills" :key="sk.name" class="bar">
            <div class="bar-top"><span>{{ sk.name }}</span><span class="bar-pct">{{ sk.level }}%</span></div>
            <div class="bar-track"><div class="bar-fill" :data-level="sk.level"></div></div>
          </div>
        </div>
      </div>
    </section>

    <!-- WORK — sticky stacking cards -->
    <section id="petal-work" class="sec sec-tight">
      <span class="lab reveal-self">( Selected work )</span>
    </section>
    <div class="stack">
      <article v-for="(p, i) in projects" :key="p.title" class="stack-card" :style="{ top: 80 + i * 6 + 'px' }">
        <div class="sc-media"><video v-lazyvideo="p.video" muted loop playsinline></video></div>
        <div class="sc-info">
          <span class="sc-no">{{ String(i + 1).padStart(2, "0") }} / {{ String(projects.length).padStart(2, "0") }}</span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.description }}</p>
          <div class="sc-tags"><span v-for="t in p.tags" :key="t">{{ t }}</span></div>
          <div class="sc-links">
            <a v-if="p.demo" :href="p.demo" target="_blank">Live ↗</a>
            <a v-if="p.repo" :href="p.repo" target="_blank">Code ↗</a>
          </div>
        </div>
      </article>
    </div>

    <!-- CERTIFICATES -->
    <section class="sec">
      <span class="lab reveal-self">( Certificates )</span>
      <div class="certs">
        <a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert">
          <img :src="c.img" :alt="c.name" />
          <b>{{ c.name }}</b><span>{{ c.issuer }}</span>
        </a>
      </div>
    </section>

    <!-- PROCESS — vertical timeline that draws on scroll -->
    <section class="sec">
      <span class="lab reveal-self">( How it works )</span>
      <div class="timeline">
        <span class="tl-line"></span>
        <div v-for="s in process" :key="s.step" class="tl-item">
          <span class="tl-dot"><i :class="`fi ${s.icon}`"></i></span>
          <div class="tl-card">
            <span class="tl-step">Step {{ s.step }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- INDUSTRIES — continuous marquee -->
    <section class="sec">
      <span class="lab reveal-self">( Industries I serve )</span>
      <div class="marquee">
        <div class="marquee-track">
          <span v-for="i in industries" :key="'a' + i.name" class="ind-chip"><i :class="`fi ${i.icon}`"></i> {{ i.name }}</span>
          <span v-for="i in industries" :key="'b' + i.name" class="ind-chip" aria-hidden="true"><i :class="`fi ${i.icon}`"></i> {{ i.name }}</span>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <footer class="sec contact">
      <div class="sunset" aria-hidden="true"></div>
      <h2 class="reveal-self">Let's make<br /><em>something in the clouds.</em></h2>
      <div class="cloud-card contact-card reveal-self">
        <form action="https://formspree.io/f/mnndnjqg" method="POST">
          <div class="row"><input type="text" name="user_name" placeholder="Name" required /><input type="email" name="user_email" placeholder="Email" required /></div>
          <div class="row"><input type="text" name="user_company" placeholder="Company" /><input type="text" name="subject" placeholder="Subject" required /></div>
          <textarea name="message" rows="3" placeholder="Message" required></textarea>
          <button class="btn" type="submit" v-magnetic="0.3">Send →</button>
        </form>
      </div>
      <div class="socials reveal-self">
        <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a>
        <span>{{ profile.email }}</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.petal {
  --sky-top: #5fb0e8;
  --sky-mid: #93cdf3;
  --sky-low: #e7f5fe;
  --accent: #2f8fd8;
  --accent-2: #5bb0ea;
  --ink: #2b4257;
  --muted: #6d8499;
  --line: #d8ecfb;
  position: relative;
  background: var(--sky-low);
  color: var(--ink);
  font-family: "Poppins", system-ui, sans-serif;
  overflow-x: hidden;
}

/* sky + clouds */
.sky { position: fixed; inset: 0; z-index: 0; background: linear-gradient(180deg, var(--sky-top) 0%, #82c4f0 26%, #b6e0fa 56%, var(--sky-low) 100%); }
.cloudscape { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.sun { position: absolute; top: -12%; right: -6%; width: 46vw; height: 46vw; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,247,224,0.5) 35%, transparent 68%); filter: blur(8px); }
/* fractal-noise cloud bands tiled across the sky, scrolled left→right.
   each band shifts by exactly one tile width per loop → seamless, and only
   background-position animates over a static raster → smooth. */
.cloud-bg { position: absolute; inset: 0; background-repeat: repeat-x; will-change: background-position; }
.cloud-bg.near { background-size: 1180px 100%; opacity: 0.78; animation: cloudScroll 120s linear infinite; }
.cloud-bg.far { background-size: 820px 100%; opacity: 0.4; animation: cloudScrollFar 210s linear infinite; }
@keyframes cloudScroll { from { background-position-x: 0; } to { background-position-x: 1180px; } }
@keyframes cloudScrollFar { from { background-position-x: 0; } to { background-position-x: 820px; } }

/* content above sky */
.hero, .sec, .stack { position: relative; z-index: 1; }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px; border-radius: 999px; background: var(--accent); color: #fff; font-weight: 600; text-decoration: none; cursor: pointer; border: 1px solid var(--accent); font-size: 15px; box-shadow: 0 16px 32px -14px rgba(47,143,216,0.7); transition: transform 0.25s, background 0.25s, box-shadow 0.25s; }
.btn:hover { transform: translateY(-3px); background: var(--accent-2); box-shadow: 0 22px 40px -14px rgba(47,143,216,0.8); }
.btn.ghost { background: rgba(255,255,255,0.85); color: var(--accent); border-color: #fff; backdrop-filter: blur(6px); box-shadow: 0 16px 32px -18px rgba(70,120,165,0.5); }
.btn.ghost:hover { background: #fff; }

/* hero */
.hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; }
.kicker { text-transform: uppercase; letter-spacing: 0.28em; font-size: 12px; color: #3a6f9c; margin-bottom: 22px; }
.hero h1 { display: flex; flex-direction: column; gap: 6px; line-height: 0.92; }
.hero .thin { font-size: clamp(18px, 3vw, 30px); font-weight: 300; letter-spacing: 0.04em; color: #4a7aa3; }
.hero .serif { font-family: "Libre Baskerville", serif; font-weight: 700; font-size: clamp(54px, 12vw, 172px); letter-spacing: -0.02em; color: #173a57; text-shadow: 0 14px 34px rgba(40,90,140,0.25); animation: bob 8s ease-in-out infinite; }
.hero .serif em { font-style: italic; color: var(--accent); margin-left: 0.18em; }
.hero-stack { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 22px; }
.hero-stack span { padding: 7px 16px; border-radius: 999px; background: rgba(255,255,255,0.82); border: 1px solid var(--line); color: var(--accent); font-size: 13px; font-weight: 600; box-shadow: 0 12px 26px -18px rgba(40,90,140,0.5); }
.lede { margin-top: 22px; max-width: 56ch; color: #436a8c; font-size: 17px; line-height: 1.65; }
.hero-cta { display: flex; gap: 14px; margin-top: 30px; flex-wrap: wrap; justify-content: center; }
.hero-cta .btn i { font-size: 15px; }
.move-hint { position: absolute; bottom: 28px; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #4a7aa3; }
@keyframes bob { 50% { transform: translateY(-14px); } }

/* sections */
.sec { max-width: 1080px; margin: 0 auto; padding: 100px 28px 40px; }
.sec-tight { padding-bottom: 8px; }
.lab { display: block; font-style: italic; font-family: "Libre Baskerville", serif; color: var(--accent); font-size: 18px; margin-bottom: 36px; }

/* cloud card base */
.cloud-card { background: rgba(255,255,255,0.92); border-radius: 36px; box-shadow: 0 50px 100px -46px rgba(40,90,140,0.55); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.8); }

/* about */
.about-wrap { padding-top: 60px; }
.about-card { position: relative; max-width: 860px; margin: 0 auto; padding: 76px 56px 44px; text-align: center; animation: bob 7s ease-in-out infinite; }
.about-avatar { position: absolute; top: -60px; left: 50%; transform: translateX(-50%); width: 124px; height: 124px; border-radius: 50%; overflow: hidden; border: 6px solid #fff; box-shadow: 0 24px 44px -18px rgba(40,90,140,0.6); }
.about-avatar img { width: 100%; height: 100%; object-fit: cover; }
.about-card .bio { font-family: "Libre Baskerville", serif; font-size: clamp(18px, 2.2vw, 27px); line-height: 1.6; color: var(--ink); }
.about-facts { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 32px; }
.fact { display: flex; flex-direction: column; align-items: center; gap: 3px; background: var(--sky-low); border: 1px solid var(--line); border-radius: 18px; padding: 14px 20px; min-width: 130px; transition: transform 0.3s, box-shadow 0.3s; }
.fact:hover { transform: translateY(-5px); box-shadow: 0 18px 34px -20px rgba(40,90,140,0.5); }
.fact i { color: var(--accent); font-size: 17px; }
.fl { font-size: 10.5px; letter-spacing: 0.13em; text-transform: uppercase; color: var(--muted); font-weight: 700; }
.fv { font-size: 13px; color: var(--ink); font-weight: 600; }

.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 64px; }
.stat { text-align: center; padding: 32px 14px; border-radius: 28px; background: rgba(255,255,255,0.85); box-shadow: 0 34px 64px -38px rgba(40,90,140,0.5); transition: transform 0.4s; }
.stat:hover { transform: translateY(-8px); }
.stat .num { display: block; font-family: "Libre Baskerville", serif; font-size: clamp(34px, 5vw, 60px); color: var(--accent); }
.stat .cap { font-size: 13px; color: var(--muted); }

/* services / process */
.serv { list-style: none; display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
.serv li { display: grid; grid-template-columns: 54px 1fr; gap: 18px; align-items: start; background: rgba(255,255,255,0.9); border-radius: 24px; padding: 28px 30px; box-shadow: 0 34px 66px -42px rgba(40,90,140,0.5); border: 1px solid rgba(255,255,255,0.8); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s; }
.serv li:hover { transform: translateY(-10px); box-shadow: 0 44px 80px -40px rgba(40,90,140,0.6); }
.serv .s-no { font-family: "Libre Baskerville", serif; color: var(--accent); font-size: 24px; }
.serv .s-ic { color: var(--accent); font-size: 22px; display: block; margin-bottom: 12px; }
.serv h3 { font-size: clamp(19px, 2.4vw, 26px); font-weight: 600; margin-bottom: 8px; }
.serv p { color: var(--muted); line-height: 1.65; font-size: 14.5px; }

/* skills — level bars */
.skills { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px 56px; }
.skgroup h4 { font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 18px; }
.bar { margin-bottom: 16px; }
.bar:last-child { margin-bottom: 0; }
.bar-top { display: flex; justify-content: space-between; align-items: baseline; font-size: 14px; margin-bottom: 7px; color: var(--ink); font-weight: 500; }
.bar-pct { color: var(--accent); font-weight: 700; font-size: 13px; }
.bar-track { height: 9px; border-radius: 999px; background: rgba(255,255,255,0.7); border: 1px solid var(--line); overflow: hidden; }
.bar-fill { width: 0; height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--accent-2), var(--accent)); box-shadow: 0 0 16px -2px var(--accent-2); }

/* industries — marquee */
.marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
.marquee-track { display: flex; gap: 14px; width: max-content; animation: marquee 34s linear infinite; }
.marquee:hover .marquee-track { animation-play-state: paused; }
.ind-chip { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; padding: 13px 22px; border-radius: 999px; background: rgba(255,255,255,0.85); border: 1px solid var(--line); font-size: 14.5px; font-weight: 500; box-shadow: 0 16px 32px -22px rgba(40,90,140,0.5); }
.ind-chip i { color: var(--accent); font-size: 15px; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }

/* process — timeline */
.timeline { position: relative; padding-left: 60px; }
.tl-line { position: absolute; left: 19px; top: 8px; bottom: 8px; width: 2px; background: linear-gradient(var(--accent), var(--accent-2)); border-radius: 2px; }
.tl-item { position: relative; padding-bottom: 26px; }
.tl-item:last-child { padding-bottom: 0; }
.tl-dot { position: absolute; left: -60px; top: 2px; width: 40px; height: 40px; border-radius: 50%; background: #fff; border: 1px solid var(--line); display: grid; place-items: center; color: var(--accent); font-size: 16px; box-shadow: 0 14px 28px -16px rgba(40,90,140,0.55); }
.tl-card { background: rgba(255,255,255,0.9); border-radius: 20px; padding: 20px 26px; box-shadow: 0 32px 62px -44px rgba(40,90,140,0.5); border: 1px solid rgba(255,255,255,0.8); transition: transform 0.35s, box-shadow 0.35s; }
.tl-card:hover { transform: translateX(6px); box-shadow: 0 40px 70px -40px rgba(40,90,140,0.6); }
.tl-step { font-family: ui-monospace, monospace; font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); }
.tl-card h3 { font-size: clamp(18px, 2.2vw, 25px); font-weight: 600; margin: 6px 0 8px; }
.tl-card p { color: var(--muted); line-height: 1.65; font-size: 14.5px; }

/* stacking work cards */
.stack { max-width: 1080px; margin: 0 auto; padding: 0 28px 120px; }
.stack-card { position: sticky; display: grid; grid-template-columns: 1fr 1.15fr; gap: 40px; align-items: center; background: rgba(255,255,255,0.95); border-radius: 28px; padding: 26px; margin-bottom: 40px; box-shadow: 0 56px 100px -46px rgba(40,90,140,0.6); border: 1px solid #eaf4fc; }
.sc-media { border-radius: 18px; overflow: hidden; }
.sc-media video { width: 100%; display: block; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
.stack-card:hover .sc-media video { transform: scale(1.05); }
.sc-no { font-family: ui-monospace, monospace; color: var(--accent); font-size: 13px; }
.sc-info h3 { font-family: "Libre Baskerville", serif; font-size: clamp(26px, 3.4vw, 44px); font-weight: 700; margin: 10px 0 14px; color: #173a57; }
.sc-info p { color: var(--muted); line-height: 1.8; margin-bottom: 18px; font-size: 16px; max-width: 60ch; }
.sc-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
.sc-tags span { font-size: 12px; padding: 5px 12px; border-radius: 999px; background: var(--sky-low); color: var(--accent); }
.sc-links { display: flex; gap: 20px; }
.sc-links a { position: relative; color: var(--ink); font-weight: 600; text-decoration: none; }
.sc-links a::after { content: ""; position: absolute; left: 0; bottom: -3px; width: 100%; height: 2px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
.sc-links a:hover::after { transform: scaleX(1); }

/* certificates */
.certs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.cert { display: flex; flex-direction: column; gap: 6px; text-decoration: none; color: var(--ink); padding: 16px; border-radius: 20px; background: rgba(255,255,255,0.9); border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 30px 60px -42px rgba(40,90,140,0.5); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s; }
.cert:hover { transform: translateY(-10px) rotate(-1.2deg); box-shadow: 0 44px 80px -40px rgba(40,90,140,0.6); }
.cert img { width: 100%; height: 150px; object-fit: contain; background: #fff; border-radius: 12px; padding: 8px; }
.cert b { margin-top: 8px; font-size: 14px; }
.cert span { font-size: 12px; color: var(--muted); }

/* contact */
.contact { position: relative; padding-bottom: 90px; }
.sunset { position: absolute; left: 0; right: 0; bottom: 0; height: 60%; z-index: 0; background: linear-gradient(180deg, transparent, rgba(255,214,170,0.45) 60%, rgba(255,180,170,0.55)); pointer-events: none; }
.contact h2 { position: relative; z-index: 1; font-family: "Libre Baskerville", serif; font-size: clamp(40px, 8vw, 104px); line-height: 0.98; font-weight: 700; margin-bottom: 38px; color: #173a57; }
.contact h2 em { color: var(--accent); font-style: italic; }
.contact-card { position: relative; z-index: 1; max-width: 640px; padding: 32px; }
.contact form { display: flex; flex-direction: column; gap: 14px; }
.contact .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.contact input, .contact textarea { background: var(--sky-low); border: 1px solid var(--line); border-radius: 12px; padding: 14px 16px; font-family: inherit; font-size: 15px; color: var(--ink); }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--accent); background: #fff; }
.contact input::placeholder, .contact textarea::placeholder { color: #93a9bd; }
.socials { position: relative; z-index: 1; display: flex; gap: 20px; align-items: center; flex-wrap: wrap; margin-top: 30px; color: var(--muted); }
.socials a { color: var(--ink); text-decoration: none; font-weight: 600; }
.socials a:hover { color: var(--accent); }

@media (prefers-reduced-motion: reduce) {
  .cloud-bg, .hero .serif, .about-card { animation: none; }
}

@media (max-width: 860px) {
  .serv, .skills { grid-template-columns: 1fr; }
  .stack-card { grid-template-columns: 1fr; }
  .stats { grid-template-columns: 1fr 1fr; }
  .certs { grid-template-columns: 1fr 1fr; }
  .contact .row { grid-template-columns: 1fr; }
  .about-card { padding: 70px 26px 36px; }
}
</style>
