<script setup>
import { useSmoothScroll } from "../composables/useSmoothScroll.js";
import {
  profile, aboutFacts, socials, skillGroups, projects, certificates, services, stats, process, industries,
} from "../data/portfolio.js";

useSmoothScroll();

// each planet = a section (diameters & margins are % of the square system box)
const planets = [
  { label: "About", href: "#or-about", d: 26, sz: 16, color: "#b9b2a8", dur: 16 },
  { label: "Services", href: "#or-services", d: 42, sz: 22, color: "#e3b873", dur: 22 },
  { label: "Skills", href: "#or-skills", d: 58, sz: 18, color: "#4f9cf0", dur: 29 },
  { label: "Work", href: "#or-work", d: 74, sz: 26, color: "#e06a4a", dur: 37 },
  { label: "Certificates", href: "#or-certs", d: 89, sz: 20, color: "#d8b48a", dur: 45 },
  { label: "Contact", href: "#or-contact", d: 100, sz: 15, color: "#a5b4fc", dur: 54 },
];
</script>

<template>
  <div class="orrery-x">
    <div class="space" aria-hidden="true"></div>

    <header class="hero">
      <div class="hero-text">
        <p class="eyebrow">◉ a small solar system</p>
        <h1>{{ profile.firstName }}<br /><span class="sun-name">{{ profile.lastName }}</span></h1>
        <p class="role">{{ profile.role }} · {{ profile.specialty }}</p>
        <div class="cta">
          <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.35">Resume</a>
          <a class="btn ghost" href="#or-work" v-magnetic="0.25">Work ↓</a>
        </div>
        <span class="hint">hover to pause · click a planet to travel</span>
      </div>

      <div class="system">
        <div class="sun"></div>
        <div
          v-for="pl in planets"
          :key="pl.label"
          class="orbit"
          :style="{ width: pl.d + '%', height: pl.d + '%', marginLeft: -pl.d / 2 + '%', marginTop: -pl.d / 2 + '%', animationDuration: pl.dur + 's' }"
        >
          <a
            class="planet"
            :href="pl.href"
            :style="{ width: pl.sz + 'px', height: pl.sz + 'px', marginLeft: -pl.sz / 2 + 'px', marginTop: -pl.sz / 2 + 'px', animationDuration: pl.dur + 's', '--c': pl.color }"
          >
            <span class="pdot"></span>
            <span class="plabel">{{ pl.label }}</span>
          </a>
        </div>
      </div>
    </header>

    <main class="content">
      <section id="or-about" class="sec" v-anim="'left'">
        <span class="lab">☉ About</span>
        <div class="about">
          <img :src="profile.avatar" :alt="profile.name" />
          <div>
            <p class="bio">{{ profile.about }}</p>
            <AboutFacts />
          </div>
        </div>
        <div class="stats" v-anim="{ type: 'stagger', delay: 60 }">
          <div v-for="s in stats" :key="s.label" class="stat"><span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span><span class="cap">{{ s.label }}</span></div>
        </div>
      </section>

      <section id="or-services" class="sec" v-anim="'flip'">
        <span class="lab">☉ Services</span>
        <div class="grid3"><div v-for="srv in services" :key="srv.title" class="card"><i :class="`fi ${srv.icon}`"></i><h3>{{ srv.title }}</h3><p>{{ srv.description }}</p></div></div>
      </section>

      <section id="or-skills" class="sec" v-anim="'zoom'">
        <span class="lab">☉ Skills</span>
        <div class="chips"><span v-for="sk in skillGroups.flatMap(g => g.skills)" :key="sk.name">{{ sk.name }} <b>{{ sk.level }}</b></span></div>
      </section>

      <section id="or-work" class="sec" v-anim="'clip'">
        <span class="lab">☉ Work</span>
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

      <section id="or-certs" class="sec" v-anim="'blur'">
        <span class="lab">☉ Certificates</span>
        <div class="grid4"><a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert"><img :src="c.img" :alt="c.name" /><b>{{ c.name }}</b><span>{{ c.issuer }}</span></a></div>
      </section>

      <section class="sec" v-anim="'zoom'">
        <span class="lab">☉ How it works</span>
        <div class="grid3"><div v-for="s in process" :key="s.step" class="card"><i :class="`fi ${s.icon}`"></i><h3>{{ s.step }} · {{ s.title }}</h3><p>{{ s.description }}</p></div></div>
      </section>

      <section class="sec" v-anim="'flip'">
        <span class="lab">☉ Industries</span>
        <div class="chips"><span v-for="i in industries" :key="i.name">{{ i.name }}</span></div>
      </section>

      <footer id="or-contact" class="sec contact" v-anim="'rotate'">
        <h2>Orbit into<br /><span class="sun-name">my inbox.</span></h2>
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
.orrery-x {
  --indigo: #818cf8; --sun: #fbbf24; --ink: #060818;
  position: relative; background: radial-gradient(120% 90% at 70% 10%, #131a40 0%, #0a0e27 45%, #060818 100%);
  color: #c7d2fe; font-family: "Poppins", system-ui, sans-serif; overflow-x: hidden;
}
.space { position: fixed; inset: 0; z-index: 0;
  background-image:
    radial-gradient(1.4px 1.4px at 15% 20%, #fff, transparent),
    radial-gradient(1px 1px at 42% 14%, #cfe, transparent),
    radial-gradient(1.4px 1.4px at 68% 26%, #fff, transparent),
    radial-gradient(1px 1px at 85% 18%, #fff, transparent),
    radial-gradient(1px 1px at 28% 64%, #fff, transparent),
    radial-gradient(1.4px 1.4px at 76% 74%, #ffe, transparent),
    radial-gradient(1px 1px at 52% 88%, #fff, transparent);
  animation: tw 6s ease-in-out infinite alternate; }
@keyframes tw { from { opacity: 0.5; } to { opacity: 0.95; } }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 999px; background: var(--indigo); color: #0a0e27; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-size: 15px; box-shadow: 0 0 30px -4px var(--indigo); }
.btn.ghost { background: rgba(129,140,248,0.08); color: #e0e7ff; border: 1px solid rgba(129,140,248,0.5); box-shadow: none; }

.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; align-items: center; justify-content: space-between; gap: 40px; padding: 80px 6vw; flex-wrap: wrap; }
.hero-text { flex: 1 1 360px; }
.eyebrow { letter-spacing: 0.3em; text-transform: uppercase; font-size: 12px; color: var(--indigo); margin-bottom: 16px; }
.hero h1 { font-size: clamp(46px, 9vw, 118px); font-weight: 800; line-height: 0.9; letter-spacing: -0.03em; color: #eef2ff; }
.sun-name { background: linear-gradient(110deg, var(--sun), #fde68a); -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 0 40px rgba(251,191,36,0.3); }
.role { margin-top: 16px; font-size: clamp(15px, 2vw, 21px); color: #b6c0f5; }
.cta { display: flex; gap: 14px; margin-top: 26px; }
.hint { display: block; margin-top: 22px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #6b76b8; }

/* solar system */
.system { position: relative; flex: 0 0 auto; width: clamp(300px, 42vw, 560px); aspect-ratio: 1; }
.sun { position: absolute; top: 50%; left: 50%; width: 13%; height: 13%; margin: -6.5% 0 0 -6.5%; border-radius: 50%; background: radial-gradient(circle at 40% 38%, #fff7e0, #fbbf24 45%, #f97316 100%); box-shadow: 0 0 50px 10px rgba(251,191,36,0.6), 0 0 110px 30px rgba(249,115,22,0.35); }
.orbit { position: absolute; top: 50%; left: 50%; border: 1px solid rgba(129,140,248,0.16); border-radius: 50%; animation: orb linear infinite; }
.planet { position: absolute; top: 0; left: 50%; border-radius: 50%; text-decoration: none; animation: orbrev linear infinite; }
.pdot { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 38% 35%, #fff, var(--c) 60%, rgba(0,0,0,0.4)); box-shadow: 0 0 14px -2px var(--c); }
.plabel { position: absolute; left: 50%; top: 130%; transform: translateX(-50%); font-size: 11px; letter-spacing: 0.05em; color: #c7d2fe; white-space: nowrap; opacity: 0.5; transition: opacity 0.2s, color 0.2s; }
.planet:hover .plabel { opacity: 1; color: #fff; }
.planet:hover .pdot { box-shadow: 0 0 22px 2px var(--c); }
.system:hover .orbit, .system:hover .planet { animation-play-state: paused; }
@keyframes orb { to { transform: rotate(360deg); } }
@keyframes orbrev { to { transform: rotate(-360deg); } }

.content { position: relative; z-index: 2; }
.sec { max-width: 1080px; margin: 0 auto; padding: 90px 24px; scroll-margin-top: 70px; }
.lab { display: block; letter-spacing: 0.18em; text-transform: uppercase; color: var(--indigo); font-size: 13px; margin-bottom: 30px; }

.about { display: grid; grid-template-columns: 200px 1fr; gap: 36px; align-items: center; }
.about img { width: 200px; height: 240px; object-fit: cover; border-radius: 16px; border: 1px solid rgba(129,140,248,0.3); }
.bio { font-size: clamp(16px, 2vw, 23px); line-height: 1.7; color: #dbe1ff; }
.facts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 20px; font-size: 13px; }
.facts i { color: var(--indigo); margin-right: 7px; }
.facts b { color: #fff; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 50px; }
.stat { text-align: center; padding: 26px 14px; border-radius: 18px; background: rgba(129,140,248,0.06); border: 1px solid rgba(129,140,248,0.2); }
.stat .num { display: block; font-size: clamp(30px, 4.5vw, 52px); font-weight: 800; color: var(--indigo); }
.stat .cap { font-size: 12px; color: #9aa6e0; }

.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card { padding: 26px; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(129,140,248,0.18); transition: transform 0.3s, border-color 0.3s; }
.card:hover { transform: translateY(-6px); border-color: var(--indigo); }
.card i { font-size: 24px; color: var(--indigo); }
.card h3 { font-size: 18px; font-weight: 700; color: #fff; margin: 12px 0 7px; }
.card p { font-size: 13.5px; line-height: 1.6; color: #9aa6e0; }

.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chips span { padding: 9px 15px; border-radius: 999px; border: 1px solid rgba(129,140,248,0.3); font-size: 13.5px; transition: box-shadow 0.3s, transform 0.3s; }
.chips span:hover { box-shadow: 0 0 20px -4px var(--indigo); transform: translateY(-3px); }
.chips b { color: var(--sun); }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.proj { border-radius: 16px; overflow: hidden; background: rgba(255,255,255,0.03); border: 1px solid rgba(129,140,248,0.18); transition: transform 0.3s, border-color 0.3s; }
.proj:hover { transform: translateY(-6px); border-color: var(--indigo); }
.proj-media video { width: 100%; display: block; }
.proj-b { padding: 18px; }
.tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 10px; }
.tags span { font-size: 11px; padding: 4px 10px; border-radius: 999px; background: rgba(129,140,248,0.14); color: var(--indigo); }
.proj-b h3 { font-size: 19px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.proj-b p { font-size: 13.5px; line-height: 1.6; color: #9aa6e0; margin-bottom: 14px; }
.links { display: flex; gap: 16px; }
.links a { color: var(--indigo); text-decoration: none; font-weight: 600; font-size: 13.5px; }

.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.cert { display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: #c7d2fe; padding: 14px; border-radius: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(129,140,248,0.18); transition: transform 0.3s; }
.cert:hover { transform: translateY(-6px); }
.cert img { width: 100%; height: 130px; object-fit: contain; background: #fff; border-radius: 8px; padding: 7px; }
.cert b { font-size: 13.5px; color: #fff; margin-top: 5px; }
.cert span { font-size: 11.5px; color: #6b76b8; }

.contact h2 { font-size: clamp(40px, 8vw, 100px); line-height: 0.95; font-weight: 800; color: #eef2ff; margin-bottom: 36px; }
.contact form { display: flex; flex-direction: column; gap: 14px; max-width: 600px; }
.contact .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.contact input, .contact textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(129,140,248,0.25); border-radius: 12px; padding: 13px 15px; color: #fff; font-family: inherit; font-size: 15px; }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--indigo); }
.contact input::placeholder, .contact textarea::placeholder { color: #6b76b8; }
.socials { display: flex; gap: 20px; margin-top: 26px; }
.socials a { color: #9aa6e0; text-decoration: none; }
.socials a:hover { color: var(--indigo); }

@media (max-width: 920px) {
  .hero { justify-content: center; text-align: center; }
  .hero-text { flex-basis: 100%; }
  .cta { justify-content: center; }
  .system { width: min(78vw, 460px); margin-top: 10px; }
}
@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; }
  .grid3, .grid2 { grid-template-columns: 1fr; }
  .grid4, .stats, .facts { grid-template-columns: 1fr 1fr; }
  .contact .row { grid-template-columns: 1fr; }
}
</style>
