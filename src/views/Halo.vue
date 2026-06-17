<script setup>
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

function onTilt(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  el.style.setProperty("--mx", px * 100 + "%");
  el.style.setProperty("--my", py * 100 + "%");
  el.style.transform = `perspective(1000px) rotateY(${(px - 0.5) * 12}deg) rotateX(${-(py - 0.5) * 12}deg) translateZ(0)`;
}
function onLeave(e) {
  const el = e.currentTarget;
  el.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  el.style.setProperty("--mx", "50%");
  el.style.setProperty("--my", "50%");
}
</script>

<template>
  <div class="halo">
    <div class="foil" aria-hidden="true"></div>
    <div class="grain" aria-hidden="true"></div>

    <header class="hero">
      <p class="eyebrow" v-reveal>✦ iridescent portfolio ✦</p>
      <h1 class="iri" v-reveal="{ delay: 80 }" :data-text="profile.name">{{ profile.name }}</h1>
      <p class="role" v-reveal="{ delay: 150 }">{{ profile.role }} · {{ profile.specialty }}</p>
      <p class="tag" v-reveal="{ delay: 220 }">{{ profile.tagline }}</p>
      <div class="cta" v-reveal="{ delay: 300 }">
        <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.35">Resume</a>
        <a class="btn ghost" href="#halo-work" v-magnetic="0.25">Work ↓</a>
      </div>
    </header>

    <section class="wrap">
      <div class="holo about" @pointermove="onTilt" @pointerleave="onLeave" v-reveal>
        <img :src="profile.avatar" :alt="profile.name" class="ava" />
        <div>
          <span class="lab">About</span>
          <p class="bio">{{ profile.about }}</p>
          <div class="facts">
            <span v-for="f in aboutFacts" :key="f.label"><i :class="`fi ${f.icon}`"></i><b>{{ f.label }}</b> {{ f.value }}</span>
          </div>
        </div>
      </div>

      <div class="stats">
        <div v-for="s in stats" :key="s.label" class="holo stat" @pointermove="onTilt" @pointerleave="onLeave" v-reveal>
          <span class="num iri" v-count="{ to: s.value, suffix: s.suffix }">0</span>
          <span class="cap">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <section class="wrap">
      <h2 class="sec-ttl iri" v-reveal>Services</h2>
      <div class="grid3">
        <div v-for="srv in services" :key="srv.title" class="holo card" @pointermove="onTilt" @pointerleave="onLeave" v-reveal>
          <i :class="`fi ${srv.icon}`"></i>
          <h3>{{ srv.title }}</h3>
          <p>{{ srv.description }}</p>
        </div>
      </div>
    </section>

    <section class="wrap">
      <h2 class="sec-ttl iri" v-reveal>Skills</h2>
      <div class="grid-sk">
        <div v-for="g in skillGroups" :key="g.category" class="holo card" @pointermove="onTilt" @pointerleave="onLeave" v-reveal>
          <h4>{{ g.category }}</h4>
          <div class="chips"><span v-for="sk in g.skills" :key="sk.name">{{ sk.name }} <b>{{ sk.level }}</b></span></div>
        </div>
      </div>
    </section>

    <section id="halo-work" class="wrap">
      <h2 class="sec-ttl iri" v-reveal>Selected work</h2>
      <div class="grid2">
        <article v-for="p in projects" :key="p.title" class="holo proj" @pointermove="onTilt" @pointerleave="onLeave" v-reveal>
          <div class="proj-media"><video v-lazyvideo="p.video" muted loop playsinline></video></div>
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

    <section class="wrap">
      <h2 class="sec-ttl iri" v-reveal>Certificates</h2>
      <div class="grid4">
        <a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="holo cert" @pointermove="onTilt" @pointerleave="onLeave" v-reveal>
          <img :src="c.img" :alt="c.name" /><b>{{ c.name }}</b><span>{{ c.issuer }}</span>
        </a>
      </div>
    </section>

    <section class="wrap">
      <h2 class="sec-ttl iri" v-reveal>How it works</h2>
      <div class="grid3">
        <div v-for="s in process" :key="s.step" class="holo card" @pointermove="onTilt" @pointerleave="onLeave" v-reveal>
          <i :class="`fi ${s.icon}`"></i>
          <h3>{{ s.step }} · {{ s.title }}</h3>
          <p>{{ s.description }}</p>
        </div>
      </div>
    </section>

    <section class="wrap">
      <h2 class="sec-ttl iri" v-reveal>Industries I serve</h2>
      <div class="grid3">
        <div v-for="i in industries" :key="i.name" class="holo card" @pointermove="onTilt" @pointerleave="onLeave" v-reveal>
          <i :class="`fi ${i.icon}`"></i>
          <h3>{{ i.name }}</h3>
        </div>
      </div>
    </section>

    <footer class="wrap contact">
      <h2 class="iri big" v-reveal>Let's shimmer.</h2>
      <form class="holo" @pointermove="onTilt" @pointerleave="onLeave" v-reveal action="https://formspree.io/f/mnndnjqg" method="POST">
        <div class="row"><input type="text" name="user_name" placeholder="Name" required /><input type="email" name="user_email" placeholder="Email" required /></div>
        <div class="row"><input type="text" name="user_company" placeholder="Company" /><input type="text" name="subject" placeholder="Subject" required /></div>
        <textarea name="message" rows="3" placeholder="Message" required></textarea>
        <button class="btn" type="submit">Send →</button>
      </form>
      <div class="socials" v-reveal>
        <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.halo {
  --p1: #f0abfc; --p2: #c084fc; --p3: #818cf8; --p4: #f9a8d4;
  position: relative;
  background: #140a22;
  color: #f3e9ff;
  font-family: "Poppins", system-ui, sans-serif;
  overflow-x: hidden;
}
.foil { position: fixed; inset: -30%; z-index: 0; filter: blur(70px) saturate(150%); opacity: 0.55;
  background: conic-gradient(from 0deg, #f0abfc, #c084fc, #818cf8, #67e8f9, #f9a8d4, #fcd34d, #f0abfc);
  animation: spin 26s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.grain { position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.07; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

.iri { background: linear-gradient(110deg, var(--p1), var(--p2) 30%, #a5f3fc 50%, var(--p4) 70%, var(--p1)); background-size: 250% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shine 6s linear infinite; }
@keyframes shine { to { background-position: 250% center; } }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px; border-radius: 999px; background: #fff; color: #2a0a3a; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-size: 15px; box-shadow: 0 0 30px -6px var(--p1); }
.btn.ghost { background: rgba(255,255,255,0.08); color: #f3e9ff; border: 1px solid rgba(240,171,252,0.4); box-shadow: none; backdrop-filter: blur(8px); }

.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; }
.eyebrow { letter-spacing: 0.3em; text-transform: uppercase; font-size: 12px; color: #e9d5ff; margin-bottom: 20px; }
.hero h1 { font-size: clamp(48px, 12vw, 150px); font-weight: 800; letter-spacing: -0.03em; line-height: 0.9; }
.role { margin-top: 16px; font-size: clamp(16px, 2vw, 22px); color: #e9d5ff; }
.tag { margin-top: 10px; color: rgba(243,233,255,0.6); }
.cta { display: flex; gap: 14px; margin-top: 30px; }

.wrap { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; padding: 80px 24px; }
.sec-ttl { font-size: clamp(28px, 5vw, 56px); font-weight: 800; margin-bottom: 36px; }

/* holographic card */
.holo { position: relative; border-radius: 22px; border: 1px solid rgba(240,171,252,0.28); background: rgba(255,255,255,0.05); backdrop-filter: blur(14px); transition: transform 0.2s ease; transform-style: preserve-3d; overflow: hidden; --mx: 50%; --my: 50%; }
.holo::before { content: ""; position: absolute; inset: 0; pointer-events: none; background:
    radial-gradient(420px circle at var(--mx) var(--my), rgba(255,255,255,0.35), transparent 45%),
    conic-gradient(from 90deg at var(--mx) var(--my), rgba(240,171,252,0.5), rgba(129,140,248,0.5), rgba(103,232,249,0.5), rgba(252,211,77,0.5), rgba(240,171,252,0.5));
  mix-blend-mode: color-dodge; opacity: 0; transition: opacity 0.3s; }
.holo:hover::before { opacity: 0.5; }

.about { display: grid; grid-template-columns: 200px 1fr; gap: 32px; align-items: center; padding: 32px; }
.ava { width: 200px; height: 200px; border-radius: 16px; object-fit: cover; }
.lab { display: block; text-transform: uppercase; letter-spacing: 0.2em; font-size: 12px; color: var(--p1); margin-bottom: 14px; }
.bio { line-height: 1.8; color: rgba(243,233,255,0.85); }
.facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 22px; font-size: 13px; }
.facts i { color: var(--p1); margin-right: 7px; }
.facts b { color: #fff; }

.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 22px; }
.stat { padding: 28px 16px; text-align: center; }
.stat .num { display: block; font-size: clamp(30px, 4vw, 50px); font-weight: 800; }
.stat .cap { font-size: 13px; color: rgba(243,233,255,0.6); }

.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.grid-sk { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.card { padding: 28px; }
.card i { font-size: 26px; color: var(--p1); }
.card h3 { font-size: 18px; font-weight: 700; margin: 14px 0 8px; }
.card p { font-size: 14px; line-height: 1.6; color: rgba(243,233,255,0.68); }
.card h4 { font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--p1); margin-bottom: 14px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chips span { font-size: 13px; padding: 7px 13px; border-radius: 999px; border: 1px solid rgba(240,171,252,0.3); }
.chips b { color: var(--p1); }

.proj { overflow: hidden; }
.proj-media video { width: 100%; display: block; }
.proj-b { padding: 20px; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
.tags span { font-size: 11px; padding: 4px 10px; border-radius: 999px; background: rgba(240,171,252,0.14); color: var(--p1); }
.proj-b h3 { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
.proj-b p { font-size: 14px; line-height: 1.6; color: rgba(243,233,255,0.7); margin-bottom: 14px; }
.links { display: flex; gap: 16px; }
.links a { color: var(--p1); text-decoration: none; font-weight: 600; font-size: 14px; }

.cert { display: flex; flex-direction: column; gap: 6px; text-decoration: none; color: #f3e9ff; padding: 14px; }
.cert img { width: 100%; height: 140px; object-fit: contain; background: #fff; border-radius: 10px; padding: 8px; }
.cert b { font-size: 14px; margin-top: 6px; }
.cert span { font-size: 12px; color: rgba(243,233,255,0.55); }

.contact .big { font-size: clamp(40px, 8vw, 96px); font-weight: 800; margin-bottom: 30px; }
.contact form { padding: 30px; display: flex; flex-direction: column; gap: 14px; max-width: 620px; }
.contact .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.contact input, .contact textarea { background: rgba(255,255,255,0.06); border: 1px solid rgba(240,171,252,0.25); border-radius: 12px; padding: 13px 15px; color: #fff; font-family: inherit; font-size: 15px; }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--p1); }
.contact input::placeholder, .contact textarea::placeholder { color: rgba(243,233,255,0.4); }
.socials { display: flex; gap: 20px; margin-top: 26px; }
.socials a { color: rgba(243,233,255,0.65); text-decoration: none; }
.socials a:hover { color: var(--p1); }

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; }
  .grid3, .grid2, .grid-sk { grid-template-columns: 1fr; }
  .grid4 { grid-template-columns: 1fr 1fr; }
  .stats { grid-template-columns: 1fr 1fr; }
  .facts { grid-template-columns: 1fr; }
  .contact .row { grid-template-columns: 1fr; }
}
</style>
