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
} from "../data/portfolio.js";

useSmoothScroll();

const root = ref(null);
const hero = ref(null);
const trailLayer = ref(null);

// image-trail set (real assets: avatar + certificate art)
const trailImages = [profile.avatar, ...certificates.map((c) => c.img)];

let ctx;
let pool = [];
let poolIdx = 0;
let last = { x: 0, y: 0 };

function spawn(x, y) {
  const el = pool[poolIdx % pool.length];
  poolIdx++;
  el.src = trailImages[poolIdx % trailImages.length];
  gsap.killTweensOf(el);
  gsap.set(el, { left: x, top: y, xPercent: -50, yPercent: -50, opacity: 1, scale: 0.45, rotation: gsap.utils.random(-12, 12) });
  gsap.to(el, { scale: 1, duration: 0.5, ease: "power2.out" });
  gsap.to(el, { opacity: 0, duration: 0.9, delay: 0.35, ease: "power2.in" });
}
function onHeroMove(e) {
  const r = hero.value.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  if (Math.hypot(x - last.x, y - last.y) > 55) {
    spawn(x, y);
    last = { x, y };
  }
}

onMounted(() => {
  pool = Array.from(trailLayer.value.querySelectorAll("img"));
  hero.value.addEventListener("pointermove", onHeroMove);

  ctx = gsap.context(() => {
    gsap.from(".reveal", {
      y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.08,
      scrollTrigger: { trigger: ".reveal", start: "top 90%" },
    });
    gsap.utils.toArray(".reveal-self").forEach((el) =>
      gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } })
    );
    // stacking cards: gently scale + dim each card as the next slides over
    gsap.utils.toArray(".stack-card").forEach((card) => {
      gsap.to(card, {
        scale: 0.92, filter: "brightness(0.82)",
        scrollTrigger: { trigger: card, start: "top 12%", end: "bottom 12%", scrub: true },
      });
    });
  }, root.value);
});
onBeforeUnmount(() => {
  hero.value?.removeEventListener("pointermove", onHeroMove);
  ctx?.revert();
});
</script>

<template>
  <div class="petal" ref="root">
    <!-- HERO -->
    <header class="hero" ref="hero">
      <div class="trail" ref="trailLayer" aria-hidden="true">
        <img v-for="n in 14" :key="n" alt="" />
      </div>
      <p class="kicker">Front-End Developer — {{ profile.location }}</p>
      <h1>
        <span class="thin">the work of</span>
        <span class="serif">{{ profile.firstName }}<em> {{ profile.lastName }}</em></span>
      </h1>
      <p class="lede">{{ profile.tagline }}</p>
      <div class="hero-cta">
        <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.3">Résumé</a>
        <a class="btn ghost" href="#petal-work" v-magnetic="0.25">View work ↓</a>
      </div>
      <span class="move-hint">move your cursor ✦</span>
    </header>

    <!-- ABOUT -->
    <section class="sec about">
      <span class="lab reveal">( About )</span>
      <div class="about-grid">
        <p class="bio reveal">{{ profile.about }}</p>
        <div class="about-side reveal">
          <img :src="profile.avatar" :alt="profile.name" />
          <dl>
            <div v-for="f in aboutFacts" :key="f.label"><dt>{{ f.label }}</dt><dd>{{ f.value }}</dd></div>
          </dl>
        </div>
      </div>
      <div class="stats">
        <div v-for="s in stats" :key="s.label" class="stat reveal-self">
          <span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span>
          <span class="cap">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="sec">
      <span class="lab reveal">( What I do )</span>
      <ul class="serv">
        <li v-for="(srv, i) in services" :key="srv.title" class="reveal-self">
          <span class="s-no">0{{ i + 1 }}</span>
          <div><h3>{{ srv.title }}</h3><p>{{ srv.description }}</p></div>
        </li>
      </ul>
    </section>

    <!-- SKILLS -->
    <section class="sec">
      <span class="lab reveal">( Skills )</span>
      <div class="skills">
        <div v-for="g in skillGroups" :key="g.category" class="skgroup reveal-self">
          <h4>{{ g.category }}</h4>
          <span v-for="sk in g.skills" :key="sk.name" class="pill">{{ sk.name }}<i>{{ sk.level }}</i></span>
        </div>
      </div>
    </section>

    <!-- WORK — sticky stacking cards -->
    <section id="petal-work" class="sec">
      <span class="lab reveal">( Selected work )</span>
    </section>
    <div class="stack">
      <article v-for="(p, i) in projects" :key="p.title" class="stack-card" :style="{ top: 70 + i * 6 + 'px' }">
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
      <span class="lab reveal">( Certificates )</span>
      <div class="certs">
        <a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert reveal-self">
          <img :src="c.img" :alt="c.name" />
          <b>{{ c.name }}</b><span>{{ c.issuer }}</span>
        </a>
      </div>
    </section>

    <!-- CONTACT -->
    <footer class="sec contact">
      <h2 class="reveal-self">Let's make<br /><em>something lovely.</em></h2>
      <form class="reveal-self" action="https://formspree.io/f/mnndnjqg" method="POST">
        <div class="row"><input type="text" name="user_name" placeholder="Name" required /><input type="email" name="user_email" placeholder="Email" required /></div>
        <div class="row"><input type="text" name="user_company" placeholder="Company" /><input type="text" name="subject" placeholder="Subject" required /></div>
        <textarea name="message" rows="3" placeholder="Message" required></textarea>
        <button class="btn" type="submit" v-magnetic="0.3">Send →</button>
      </form>
      <div class="socials reveal-self">
        <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a>
        <span>{{ profile.email }}</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.petal {
  --pink: #ec4899;
  --blush: #fbe6ef;
  --cream: #fdf7f4;
  --ink: #2a2026;
  --gray: #9b8f96;
  position: relative;
  background: var(--cream);
  color: var(--ink);
  font-family: "Poppins", system-ui, sans-serif;
  overflow-x: hidden;
}
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px; border-radius: 999px; background: var(--ink); color: var(--cream); font-weight: 600; text-decoration: none; cursor: pointer; border: 1px solid var(--ink); font-size: 15px; transition: background 0.25s, color 0.25s; }
.btn:hover { background: var(--pink); border-color: var(--pink); }
.btn.ghost { background: transparent; color: var(--ink); }
.btn.ghost:hover { background: var(--ink); color: var(--cream); }

/* hero */
.hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; background: radial-gradient(120% 80% at 50% 0%, var(--blush), var(--cream) 60%); overflow: hidden; }
.trail { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
.trail img { position: absolute; width: 150px; height: 190px; object-fit: cover; border-radius: 10px; opacity: 0; box-shadow: 0 20px 50px -20px rgba(236,72,153,0.5); }
.kicker { position: relative; z-index: 1; text-transform: uppercase; letter-spacing: 0.28em; font-size: 12px; color: var(--gray); margin-bottom: 24px; }
.hero h1 { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 6px; line-height: 0.92; }
.hero .thin { font-size: clamp(18px, 3vw, 30px); font-weight: 300; letter-spacing: 0.04em; color: var(--gray); }
.hero .serif { font-family: "Libre Baskerville", serif; font-weight: 700; font-size: clamp(54px, 12vw, 168px); letter-spacing: -0.02em; }
.hero .serif em { font-style: italic; color: var(--pink); }
.lede { position: relative; z-index: 1; margin-top: 24px; max-width: 34ch; color: #6b5c64; font-size: 18px; }
.hero-cta { position: relative; z-index: 1; display: flex; gap: 14px; margin-top: 32px; }
.move-hint { position: absolute; bottom: 28px; z-index: 1; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gray); }

/* sections */
.sec { max-width: 1080px; margin: 0 auto; padding: 100px 28px 40px; }
.lab { display: block; font-style: italic; font-family: "Libre Baskerville", serif; color: var(--pink); font-size: 18px; margin-bottom: 36px; }

.about-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 60px; align-items: start; }
.bio { font-family: "Libre Baskerville", serif; font-size: clamp(20px, 2.6vw, 32px); line-height: 1.5; }
.about-side img { width: 100%; border-radius: 16px; aspect-ratio: 4/5; object-fit: cover; margin-bottom: 18px; }
.about-side dl { display: flex; flex-direction: column; }
.about-side dl > div { display: flex; justify-content: space-between; gap: 12px; padding: 11px 0; border-bottom: 1px solid #ead7df; font-size: 14px; }
.about-side dt { color: var(--gray); }
.about-side dd { font-weight: 600; text-align: right; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 64px; }
.stat { text-align: center; padding: 28px 12px; border-radius: 18px; background: var(--blush); }
.stat .num { display: block; font-family: "Libre Baskerville", serif; font-size: clamp(34px, 5vw, 60px); color: var(--pink); }
.stat .cap { font-size: 13px; color: #6b5c64; }

.serv { list-style: none; }
.serv li { display: grid; grid-template-columns: 70px 1fr; gap: 24px; align-items: baseline; padding: 28px 0; border-top: 1px solid #ead7df; }
.serv .s-no { font-family: "Libre Baskerville", serif; color: var(--pink); font-size: 20px; }
.serv h3 { font-size: clamp(22px, 3vw, 38px); font-weight: 600; margin-bottom: 8px; }
.serv p { color: #6b5c64; max-width: 60ch; }

.skills { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; }
.skgroup h4 { font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gray); margin-bottom: 16px; }
.pill { display: inline-flex; align-items: center; gap: 6px; margin: 0 8px 8px 0; padding: 9px 16px; border-radius: 999px; border: 1px solid #e7c9d6; font-size: 14px; }
.pill i { font-style: normal; color: var(--pink); font-weight: 700; font-size: 12px; }

/* stacking work cards */
.stack { max-width: 1080px; margin: 0 auto; padding: 0 28px 120px; }
.stack-card { position: sticky; display: grid; grid-template-columns: 1.1fr 1fr; gap: 36px; align-items: center; background: #fff; border-radius: 24px; padding: 26px; margin-bottom: 40px; box-shadow: 0 40px 90px -40px rgba(236,72,153,0.45); border: 1px solid #f2dde7; }
.sc-media { border-radius: 16px; overflow: hidden; }
.sc-media video { width: 100%; display: block; }
.sc-no { font-family: ui-monospace, monospace; color: var(--pink); font-size: 13px; }
.sc-info h3 { font-family: "Libre Baskerville", serif; font-size: clamp(26px, 3.4vw, 46px); font-weight: 700; margin: 10px 0 12px; }
.sc-info p { color: #6b5c64; line-height: 1.7; margin-bottom: 16px; }
.sc-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.sc-tags span { font-size: 12px; padding: 4px 12px; border-radius: 999px; background: var(--blush); color: var(--pink); }
.sc-links { display: flex; gap: 18px; }
.sc-links a { color: var(--ink); font-weight: 600; text-decoration: none; border-bottom: 2px solid var(--pink); }

.certs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.cert { display: flex; flex-direction: column; gap: 6px; text-decoration: none; color: var(--ink); padding: 16px; border-radius: 16px; background: #fff; border: 1px solid #f2dde7; transition: transform 0.3s; }
.cert:hover { transform: translateY(-8px) rotate(-1.5deg); }
.cert img { width: 100%; height: 150px; object-fit: contain; }
.cert b { margin-top: 8px; font-size: 14px; }
.cert span { font-size: 12px; color: var(--gray); }

.contact h2 { font-family: "Libre Baskerville", serif; font-size: clamp(40px, 8vw, 110px); line-height: 0.95; font-weight: 700; margin-bottom: 40px; }
.contact h2 em { color: var(--pink); font-style: italic; }
.contact form { display: flex; flex-direction: column; gap: 14px; max-width: 620px; }
.contact .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.contact input, .contact textarea { background: #fff; border: 1px solid #ead7df; border-radius: 12px; padding: 14px 16px; font-family: inherit; font-size: 15px; color: var(--ink); }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--pink); }
.socials { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; margin-top: 30px; color: var(--gray); }
.socials a { color: var(--ink); text-decoration: none; }
.socials a:hover { color: var(--pink); }

@media (max-width: 860px) {
  .about-grid { grid-template-columns: 1fr; }
  .skills { grid-template-columns: 1fr; }
  .stack-card { grid-template-columns: 1fr; }
  .stats { grid-template-columns: 1fr 1fr; }
  .certs { grid-template-columns: 1fr 1fr; }
  .contact .row { grid-template-columns: 1fr; }
}
</style>
