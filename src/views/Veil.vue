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

const heroSpot = ref(null);
const glow = ref(null);

function onMove(e) {
  if (glow.value) glow.value.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  if (heroSpot.value) {
    const r = heroSpot.value.getBoundingClientRect();
    heroSpot.value.style.setProperty("--x", e.clientX - r.left + "px");
    heroSpot.value.style.setProperty("--y", e.clientY - r.top + "px");
  }
}
onMounted(() => window.addEventListener("pointermove", onMove));
onBeforeUnmount(() => window.removeEventListener("pointermove", onMove));
</script>

<template>
  <div class="veil">
    <div class="glow" ref="glow" aria-hidden="true"></div>

    <!-- HERO: discover the name with the flashlight -->
    <header class="hero">
      <div class="hero-inner">
        <p class="eyebrow">Front-End Developer · {{ profile.location }}</p>
        <h1>{{ profile.firstName }}<br />{{ profile.lastName }}</h1>
        <p class="role">{{ profile.specialty }}</p>
        <div class="cta">
          <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.3">Resume</a>
          <a class="btn ghost" href="#veil-work" v-magnetic="0.25">Work ↓</a>
        </div>
      </div>
      <div class="spot" ref="heroSpot" aria-hidden="true"></div>
      <div class="hint">◐ move your cursor — the rest is in the dark</div>
    </header>

    <main class="content">
      <section class="sec" v-reveal>
        <span class="lab">01 — About</span>
        <div class="about">
          <img :src="profile.avatar" :alt="profile.name" />
          <div>
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

      <section class="sec" v-reveal>
        <span class="lab">02 — Services</span>
        <div class="grid3">
          <div v-for="srv in services" :key="srv.title" class="card">
            <i :class="`fi ${srv.icon}`"></i><h3>{{ srv.title }}</h3><p>{{ srv.description }}</p>
          </div>
        </div>
      </section>

      <section class="sec" v-reveal>
        <span class="lab">03 — Skills</span>
        <div class="grid-sk">
          <div v-for="g in skillGroups" :key="g.category" class="skg">
            <h4>{{ g.category }}</h4>
            <div v-for="sk in g.skills" :key="sk.name" class="line">
              <span>{{ sk.name }}</span><span class="dots"></span><span class="lv">{{ sk.level }}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="veil-work" class="sec" v-reveal>
        <span class="lab">04 — Work</span>
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

      <section class="sec" v-reveal>
        <span class="lab">05 — Certificates</span>
        <div class="grid4">
          <a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert">
            <img :src="c.img" :alt="c.name" /><b>{{ c.name }}</b><span>{{ c.issuer }}</span>
          </a>
        </div>
      </section>

      <section class="sec" v-anim="'zoom'">
        <span class="lab">06 — How it works</span>
        <div class="grid3">
          <div v-for="s in process" :key="s.step" class="card">
            <i :class="`fi ${s.icon}`"></i><h3>{{ s.step }} · {{ s.title }}</h3><p>{{ s.description }}</p>
          </div>
        </div>
      </section>

      <section class="sec" v-anim="'flip'">
        <span class="lab">07 — Industries</span>
        <div class="grid3">
          <div v-for="i in industries" :key="i.name" class="card">
            <i :class="`fi ${i.icon}`"></i><h3>{{ i.name }}</h3>
          </div>
        </div>
      </section>

      <footer class="sec contact" v-reveal>
        <h2>Step into<br />the light.</h2>
        <form action="https://formspree.io/f/mnndnjqg" method="POST">
          <div class="row"><input type="text" name="user_name" placeholder="Name" required /><input type="email" name="user_email" placeholder="Email" required /></div>
          <div class="row"><input type="text" name="user_company" placeholder="Company" /><input type="text" name="subject" placeholder="Subject" required /></div>
          <textarea name="message" rows="3" placeholder="Message" required></textarea>
          <button class="btn" type="submit" v-magnetic="0.25">Send →</button>
        </form>
        <div class="socials"><a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a><span>{{ profile.email }}</span></div>
      </footer>
    </main>
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

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 8px; background: var(--bright); color: #111; font-weight: 700; text-decoration: none; cursor: pointer; border: 1px solid var(--bright); font-size: 15px; }
.btn.ghost { background: transparent; color: var(--bright); border-color: rgba(203,213,225,0.4); }
.btn.ghost:hover { border-color: var(--bright); }

/* hero flashlight */
.hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 24px; overflow: hidden; }
.hero-inner { position: relative; z-index: 1; }
.eyebrow { text-transform: uppercase; letter-spacing: 0.3em; font-size: 12px; color: #94a3b8; margin-bottom: 22px; }
.hero h1 { font-size: clamp(56px, 14vw, 200px); font-weight: 800; line-height: 0.86; letter-spacing: -0.03em; color: var(--bright); text-shadow: 0 0 60px rgba(248,250,252,0.18); }
.hero .role { margin-top: 18px; font-size: clamp(16px, 2vw, 22px); color: var(--silver); }
.cta { display: flex; gap: 14px; justify-content: center; margin-top: 30px; }
.spot { position: absolute; inset: 0; z-index: 2; pointer-events: none; background: radial-gradient(circle 300px at var(--x, 50%) var(--y, 40%), transparent 0, transparent 30%, rgba(8,9,12,0.62) 62%, rgba(8,9,12,0.93) 100%); transition: background 0.05s linear; }
.hint { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 3; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #64748b; }

/* content */
.content { position: relative; z-index: 2; }
.sec { max-width: 1080px; margin: 0 auto; padding: 90px 24px; border-top: 1px solid rgba(203,213,225,0.1); }
.lab { display: block; font-family: ui-monospace, monospace; letter-spacing: 0.2em; text-transform: uppercase; color: #94a3b8; font-size: 12px; margin-bottom: 34px; }

.about { display: grid; grid-template-columns: 200px 1fr; gap: 36px; align-items: start; }
.about img { width: 200px; height: 240px; object-fit: cover; border-radius: 14px; filter: grayscale(1) contrast(1.05); }
.bio { font-size: clamp(17px, 2vw, 24px); line-height: 1.7; color: #e2e8f0; }
.facts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 22px; }
.facts div { display: flex; gap: 8px; align-items: baseline; font-size: 13px; }
.facts i { color: var(--bright); }
.facts b { min-width: 92px; color: var(--bright); }
.facts span { color: #94a3b8; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 50px; }
.stat { text-align: center; padding: 24px; border: 1px solid rgba(203,213,225,0.12); border-radius: 14px; }
.stat .num { display: block; font-size: clamp(30px, 4vw, 50px); font-weight: 800; color: var(--bright); }
.stat .cap { font-size: 12px; color: #94a3b8; }

.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card { padding: 26px; border: 1px solid rgba(203,213,225,0.12); border-radius: 14px; transition: border-color 0.3s, background 0.3s; }
.card:hover { border-color: rgba(248,250,252,0.4); background: rgba(248,250,252,0.03); }
.card i { font-size: 24px; color: var(--bright); }
.card h3 { font-size: 18px; font-weight: 700; color: var(--bright); margin: 12px 0 7px; }
.card p { font-size: 13.5px; line-height: 1.6; color: #94a3b8; }

.grid-sk { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.skg h4 { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #94a3b8; margin-bottom: 16px; }
.line { display: flex; align-items: baseline; gap: 10px; padding: 9px 0; }
.line .dots { flex: 1; border-bottom: 1px dotted rgba(203,213,225,0.25); transform: translateY(-4px); }
.line .lv { color: var(--bright); font-weight: 700; }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.proj { border: 1px solid rgba(203,213,225,0.12); border-radius: 16px; overflow: hidden; transition: border-color 0.3s; }
.proj:hover { border-color: rgba(248,250,252,0.4); }
.proj-media video { width: 100%; display: block; filter: grayscale(0.4); transition: filter 0.4s; }
.proj:hover .proj-media video { filter: grayscale(0); }
.proj-b { padding: 18px; }
.tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 10px; }
.tags span { font-size: 11px; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(203,213,225,0.2); color: #94a3b8; }
.proj-b h3 { font-size: 19px; font-weight: 700; color: var(--bright); margin-bottom: 8px; }
.proj-b p { font-size: 13.5px; line-height: 1.6; color: #94a3b8; margin-bottom: 14px; }
.links { display: flex; gap: 16px; }
.links a { color: var(--bright); text-decoration: none; font-weight: 600; font-size: 13.5px; }

.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.cert { display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: var(--silver); padding: 14px; border: 1px solid rgba(203,213,225,0.12); border-radius: 14px; transition: border-color 0.3s; }
.cert:hover { border-color: rgba(248,250,252,0.4); }
.cert img { width: 100%; height: 130px; object-fit: contain; background: #fff; border-radius: 8px; padding: 7px; }
.cert b { font-size: 13.5px; color: var(--bright); margin-top: 5px; }
.cert span { font-size: 11.5px; color: #64748b; }

.contact h2 { font-size: clamp(40px, 8vw, 110px); font-weight: 800; line-height: 0.92; color: var(--bright); margin-bottom: 36px; }
.contact form { display: flex; flex-direction: column; gap: 14px; max-width: 600px; }
.contact .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.contact input, .contact textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(203,213,225,0.2); border-radius: 10px; padding: 13px 15px; color: var(--bright); font-family: inherit; font-size: 15px; }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--bright); }
.contact input::placeholder, .contact textarea::placeholder { color: #64748b; }
.socials { display: flex; gap: 20px; align-items: center; margin-top: 26px; color: #64748b; }
.socials a { color: var(--silver); text-decoration: none; }
.socials a:hover { color: var(--bright); }

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; }
  .grid3, .grid2, .grid-sk { grid-template-columns: 1fr; }
  .grid4, .stats, .facts { grid-template-columns: 1fr 1fr; }
  .contact .row { grid-template-columns: 1fr; }
}
</style>
