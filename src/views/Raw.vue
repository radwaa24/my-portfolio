<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  techStack,
} from "../data/portfolio.js";

useSmoothScroll();

const root = ref(null);
let ctx;
let observers = [];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@!?$/<>*";
function scramble(el, finalText, dur = 800) {
  let start = null;
  const len = finalText.length;
  function frame(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const reveal = Math.floor(p * len);
    let out = "";
    for (let i = 0; i < len; i++) {
      if (i < reveal || finalText[i] === " ") out += finalText[i];
      else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = finalText;
  }
  requestAnimationFrame(frame);
}

onMounted(() => {
  // scramble headings when they enter view + on hover
  root.value.querySelectorAll(".scramble").forEach((el) => {
    const text = el.textContent.trim();
    el.dataset.text = text;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            scramble(el, text);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    observers.push(io);
    el.addEventListener("mouseenter", () => scramble(el, el.dataset.text, 500));
  });

  ctx = gsap.context(() => {
    // reveal blocks
    gsap.utils.toArray(".pop").forEach((el) => {
      gsap.from(el, {
        y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
    // scroll-velocity skew
    const proxy = { skew: 0 };
    const setter = gsap.quickSetter(".skewable", "skewY", "deg");
    const clamp = gsap.utils.clamp(-10, 10);
    ScrollTrigger.create({
      onUpdate: (self) => {
        const sk = clamp(self.getVelocity() / -190);
        if (Math.abs(sk) > Math.abs(proxy.skew)) {
          proxy.skew = sk;
          gsap.to(proxy, {
            skew: 0, duration: 0.7, ease: "power3",
            overwrite: true, onUpdate: () => setter(proxy.skew),
          });
        }
      },
    });
  }, root.value);
});

onBeforeUnmount(() => {
  observers.forEach((o) => o.disconnect());
  observers = [];
  ctx?.revert();
});
</script>

<template>
  <div class="raw" ref="root">
    <div class="grain" aria-hidden="true"></div>

    <!-- HERO -->
    <header class="hero">
      <div class="hero-top pop">
        <span>★ Front-End Developer</span>
        <span>{{ profile.location }}</span>
        <span>EST. {{ profile.graduation }}</span>
      </div>
      <h1 class="mega scramble skewable">RADWA</h1>
      <h1 class="mega out scramble skewable">KHALAF</h1>
      <div class="hero-bottom pop">
        <p>{{ profile.tagline }}</p>
        <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.3">↓ RESUME</a>
      </div>
    </header>

    <!-- MARQUEE -->
    <div class="marquee black">
      <div class="m-track">
        <span v-for="n in 2" :key="n">VUE — REACT — NUXT — NEXT — TAILWIND — FIGMA — JAVASCRIPT — </span>
      </div>
    </div>

    <!-- ABOUT -->
    <section class="block">
      <div class="num">(01)</div>
      <h2 class="head scramble skewable">ABOUT</h2>
      <div class="about pop">
        <p class="bio">{{ profile.about }}</p>
        <div class="facts">
          <div v-for="f in aboutFacts" :key="f.label" class="fact">
            <b>{{ f.label }}</b><span>{{ f.value }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats">
      <div v-for="s in stats" :key="s.label" class="stat skewable pop">
        <span class="big" v-count="{ to: s.value, suffix: s.suffix }">0</span>
        <span class="cap">{{ s.label }}</span>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="block">
      <div class="num">(02)</div>
      <h2 class="head scramble skewable">WHAT I DO</h2>
      <ul class="services pop">
        <li v-for="(srv, i) in services" :key="srv.title">
          <span class="s-no">{{ String(i + 1).padStart(2, "0") }}</span>
          <span class="s-title">{{ srv.title }}</span>
          <span class="s-desc">{{ srv.description }}</span>
        </li>
      </ul>
    </section>

    <!-- SKILLS marquee wall -->
    <section class="block">
      <div class="num">(03)</div>
      <h2 class="head scramble skewable">SKILLS</h2>
      <div class="wall pop">
        <span v-for="sk in skills" :key="sk.name" class="tag">{{ sk.name }}<sup>{{ sk.level }}</sup></span>
      </div>
    </section>

    <!-- WORK -->
    <section class="block">
      <div class="num">(04)</div>
      <h2 class="head scramble skewable">WORK</h2>
    </section>
    <section class="works">
      <article v-for="(p, i) in projects" :key="p.title" class="work skewable pop">
        <div class="w-index">{{ String(i + 1).padStart(2, "0") }}</div>
        <div class="w-media"><video v-lazyvideo="p.video" muted loop playsinline></video></div>
        <div class="w-info">
          <h3>{{ p.title }}</h3>
          <p>{{ p.description }}</p>
          <div class="w-tags"><span v-for="t in p.tags" :key="t">{{ t }}</span></div>
          <div class="w-links">
            <a v-if="p.demo" :href="p.demo" target="_blank">LIVE ↗</a>
            <a v-if="p.repo" :href="p.repo" target="_blank">CODE ↗</a>
          </div>
        </div>
      </article>
    </section>

    <!-- CERTS -->
    <section class="block">
      <div class="num">(05)</div>
      <h2 class="head scramble skewable">CERTIFIED</h2>
      <div class="certs pop">
        <a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert">
          <img :src="c.img" :alt="c.name" />
          <b>{{ c.name }}</b><span>{{ c.issuer }}</span>
        </a>
      </div>
    </section>

    <!-- CONTACT -->
    <section class="contact">
      <h2 class="mega scramble">SAY HI</h2>
      <form class="pop" action="https://formspree.io/f/mnndnjqg" method="POST">
        <input type="text" name="user_name" placeholder="NAME" required />
        <input type="email" name="user_email" placeholder="EMAIL" required />
        <input type="text" name="subject" placeholder="SUBJECT" required />
        <textarea name="message" rows="2" placeholder="MESSAGE" required></textarea>
        <button class="btn" type="submit">SEND IT →</button>
      </form>
    </section>

    <!-- FOOTER MARQUEE -->
    <div class="marquee yellow">
      <div class="m-track rev">
        <span v-for="n in 2" :key="n">
          {{ socials.map((s) => s.name).join(" — ") }} — {{ profile.email }} —
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.raw {
  --paper: #edebe2;
  --ink: #100f0c;
  --acid: #ffe000;
  position: relative;
  background: var(--paper);
  color: var(--ink);
  font-family: "Poppins", system-ui, sans-serif;
  overflow-x: hidden;
}
.grain { position: fixed; inset: 0; z-index: 50; pointer-events: none; opacity: 0.06; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

.btn { display: inline-flex; align-items: center; padding: 14px 26px; background: var(--ink); color: var(--paper); font-weight: 800; text-decoration: none; cursor: pointer; border: none; font-size: 14px; letter-spacing: 0.05em; border-radius: 0; transition: background 0.2s, color 0.2s; }
.btn:hover { background: var(--acid); color: var(--ink); }

/* hero */
.hero { padding: 130px 5vw 40px; }
.hero-top { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; border-bottom: 3px solid var(--ink); padding-bottom: 16px; font-weight: 700; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; }
.mega { font-family: "Poppins", sans-serif; font-weight: 900; font-size: clamp(64px, 19vw, 320px); line-height: 0.82; letter-spacing: -0.03em; }
.mega.out { -webkit-text-stroke: 2px var(--ink); color: transparent; }
.hero-bottom { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px; margin-top: 30px; border-top: 3px solid var(--ink); padding-top: 20px; }
.hero-bottom p { max-width: 36ch; font-size: 18px; font-weight: 500; }

/* marquee */
.marquee { overflow: hidden; white-space: nowrap; border-block: 3px solid var(--ink); }
.marquee.black { background: var(--ink); color: var(--paper); }
.marquee.yellow { background: var(--acid); color: var(--ink); }
.m-track { display: inline-flex; font-weight: 900; font-size: clamp(28px, 4vw, 56px); letter-spacing: -0.01em; padding: 14px 0; animation: scrollL 24s linear infinite; }
.m-track.rev { animation-direction: reverse; }
@keyframes scrollL { to { transform: translateX(-50%); } }

/* blocks */
.block { padding: 80px 5vw 20px; position: relative; }
.num { font-weight: 800; font-size: 14px; letter-spacing: 0.1em; }
.head { font-weight: 900; font-size: clamp(40px, 9vw, 150px); line-height: 0.9; letter-spacing: -0.03em; margin: 6px 0 30px; }

.about { display: grid; grid-template-columns: 1.3fr 1fr; gap: 50px; border-top: 3px solid var(--ink); padding-top: 30px; }
.bio { font-size: clamp(18px, 2.2vw, 30px); line-height: 1.45; font-weight: 600; }
.facts { display: flex; flex-direction: column; }
.fact { display: flex; justify-content: space-between; gap: 16px; border-bottom: 1.5px solid var(--ink); padding: 12px 0; font-size: 14px; }
.fact b { text-transform: uppercase; letter-spacing: 0.06em; }
.fact span { text-align: right; opacity: 0.75; }

/* stats */
.stats { display: grid; grid-template-columns: repeat(4, 1fr); border-block: 3px solid var(--ink); margin: 40px 0; }
.stat { padding: 40px 20px; text-align: center; border-right: 3px solid var(--ink); }
.stat:last-child { border-right: none; }
.big { display: block; font-weight: 900; font-size: clamp(46px, 7vw, 110px); line-height: 1; }
.cap { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }

/* services list */
.services { list-style: none; border-top: 3px solid var(--ink); }
.services li { display: grid; grid-template-columns: 70px 1fr 2fr; gap: 20px; align-items: baseline; padding: 22px 0; border-bottom: 1.5px solid var(--ink); transition: padding-left 0.3s, background 0.3s; }
.services li:hover { padding-left: 24px; background: var(--acid); }
.s-no { font-weight: 800; }
.s-title { font-size: clamp(20px, 3vw, 38px); font-weight: 800; }
.s-desc { font-size: 14px; line-height: 1.5; opacity: 0.8; }

/* skills wall */
.wall { display: flex; flex-wrap: wrap; gap: 12px; border-top: 3px solid var(--ink); padding-top: 30px; }
.tag { border: 2.5px solid var(--ink); padding: 12px 20px; font-weight: 800; font-size: clamp(16px, 2vw, 26px); cursor: default; transition: background 0.2s, color 0.2s, transform 0.2s; }
.tag sup { font-size: 0.5em; margin-left: 4px; }
.tag:hover { background: var(--ink); color: var(--paper); transform: translateY(-4px) rotate(-2deg); }

/* works */
.works { padding: 20px 5vw 60px; display: flex; flex-direction: column; }
.work { display: grid; grid-template-columns: 90px 1.1fr 1fr; gap: 32px; align-items: center; border-top: 3px solid var(--ink); padding: 40px 0; }
.w-index { font-weight: 900; font-size: clamp(40px, 6vw, 90px); line-height: 1; }
.w-media { overflow: hidden; border: 3px solid var(--ink); }
.w-media video { width: 100%; display: block; filter: grayscale(1) contrast(1.05); transition: filter 0.4s, transform 0.6s; }
.work:hover .w-media video { filter: grayscale(0) contrast(1); transform: scale(1.04); }
.w-info h3 { font-weight: 900; font-size: clamp(24px, 3.4vw, 46px); line-height: 0.95; margin-bottom: 12px; }
.w-info p { font-size: 15px; line-height: 1.6; max-width: 44ch; margin-bottom: 16px; }
.w-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.w-tags span { border: 2px solid var(--ink); padding: 4px 11px; font-size: 12px; font-weight: 700; }
.w-links { display: flex; gap: 18px; }
.w-links a { color: var(--ink); font-weight: 800; text-decoration: none; border-bottom: 3px solid var(--acid); }

/* certs */
.certs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; border-top: 3px solid var(--ink); padding-top: 30px; }
.cert { display: flex; flex-direction: column; gap: 6px; text-decoration: none; color: var(--ink); border: 3px solid var(--ink); padding: 14px; background: #fff; transition: transform 0.25s; }
.cert:hover { transform: translate(-4px, -4px); box-shadow: 8px 8px 0 var(--ink); }
.cert img { width: 100%; height: 150px; object-fit: contain; }
.cert b { font-size: 14px; font-weight: 800; margin-top: 6px; }
.cert span { font-size: 12px; opacity: 0.7; }

/* contact */
.contact { padding: 90px 5vw; border-top: 3px solid var(--ink); }
.contact .mega { font-size: clamp(60px, 16vw, 260px); }
.contact form { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 3px solid var(--ink); margin-top: 20px; }
.contact input, .contact textarea { background: transparent; border: none; border-right: 3px solid var(--ink); border-bottom: 3px solid var(--ink); padding: 20px; font-family: inherit; font-weight: 700; font-size: 15px; color: var(--ink); }
.contact textarea { grid-column: span 2; border-right: none; }
.contact input:nth-child(2) { border-right: none; }
.contact input::placeholder, .contact textarea::placeholder { color: rgba(16,15,12,0.45); }
.contact input:focus, .contact textarea:focus { outline: none; background: var(--acid); }
.contact .btn { grid-column: span 2; justify-content: center; padding: 22px; font-size: 18px; }

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; }
  .stats { grid-template-columns: 1fr 1fr; }
  .stat:nth-child(2) { border-right: none; }
  .services li { grid-template-columns: 40px 1fr; }
  .s-desc { grid-column: 2; }
  .work { grid-template-columns: 1fr; gap: 16px; }
  .certs { grid-template-columns: 1fr 1fr; }
  .contact form { grid-template-columns: 1fr; }
  .contact input { border-right: none; }
  .contact textarea, .contact .btn { grid-column: span 1; }
}
</style>
