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

const scene = ref(null);
function onMove(e) {
  if (!scene.value) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  scene.value.style.setProperty("--px", x * 24 + "px");
}
onMounted(() => window.addEventListener("pointermove", onMove));
onBeforeUnmount(() => window.removeEventListener("pointermove", onMove));
</script>

<template>
  <div class="synth">
    <!-- fixed retrowave scene -->
    <div class="scene" ref="scene" aria-hidden="true">
      <div class="stars"></div>
      <div class="sun"></div>
      <div class="mountains"></div>
      <div class="floor"></div>
      <div class="haze"></div>
    </div>
    <div class="scan" aria-hidden="true"></div>

    <header class="hero">
      <p class="eyebrow">◈ press start ◈</p>
      <h1 class="chrome">{{ profile.firstName }}<br />{{ profile.lastName }}</h1>
      <p class="role neon-c">{{ profile.role }} · {{ profile.specialty }}</p>
      <p class="tag">{{ profile.tagline }}</p>
      <div class="cta">
        <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.35">▶ Resume</a>
        <a class="btn ghost" href="#synth-work" v-magnetic="0.25">Work ▾</a>
      </div>
    </header>

    <main class="content">
      <section class="sec" v-reveal>
        <h2 class="lab">About</h2>
        <div class="panel about">
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

      <section class="sec" v-reveal>
        <h2 class="lab">Services</h2>
        <div class="grid3"><div v-for="srv in services" :key="srv.title" class="panel card"><i :class="`fi ${srv.icon}`"></i><h3>{{ srv.title }}</h3><p>{{ srv.description }}</p></div></div>
      </section>

      <section class="sec" v-reveal>
        <h2 class="lab">Skills</h2>
        <div class="chips"><span v-for="sk in skillGroups.flatMap(g => g.skills)" :key="sk.name">{{ sk.name }} <b>{{ sk.level }}</b></span></div>
      </section>

      <section id="synth-work" class="sec" v-reveal>
        <h2 class="lab">Work</h2>
        <div class="grid2">
          <article v-for="p in projects" :key="p.title" class="panel proj">
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
        <h2 class="lab">Certificates</h2>
        <div class="grid4"><a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="panel cert"><img :src="c.img" :alt="c.name" /><b>{{ c.name }}</b><span>{{ c.issuer }}</span></a></div>
      </section>

      <section class="sec" v-anim="'zoom'">
        <h2 class="lab">How it works</h2>
        <div class="grid3"><div v-for="s in process" :key="s.step" class="panel card"><i :class="`fi ${s.icon}`"></i><h3>{{ s.step }} · {{ s.title }}</h3><p>{{ s.description }}</p></div></div>
      </section>

      <section class="sec" v-anim="'flip'">
        <h2 class="lab">Industries</h2>
        <div class="chips"><span v-for="i in industries" :key="i.name">{{ i.name }}</span></div>
      </section>

      <footer class="sec contact" v-reveal>
        <h2 class="chrome big">GAME ON.</h2>
        <form class="panel" action="https://formspree.io/f/mnndnjqg" method="POST">
          <div class="row"><input type="text" name="user_name" placeholder="NAME" required /><input type="email" name="user_email" placeholder="EMAIL" required /></div>
          <div class="row"><input type="text" name="user_company" placeholder="COMPANY" /><input type="text" name="subject" placeholder="SUBJECT" required /></div>
          <textarea name="message" rows="3" placeholder="MESSAGE" required></textarea>
          <button class="btn" type="submit" v-magnetic="0.25">▶ Send</button>
        </form>
        <div class="socials"><a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a></div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.synth {
  --pink: #ff2fb3; --cyan: #22d3ee; --orange: #ff8a3d; --bg: #170a2e;
  position: relative; background: var(--bg); color: #f3e8ff;
  font-family: "Poppins", system-ui, sans-serif; overflow-x: hidden;
}
/* scene */
.scene { position: fixed; inset: 0; z-index: 0; overflow: hidden; transform: translateX(var(--px, 0)); }
.stars { position: absolute; inset: 0; background:
    radial-gradient(1px 1px at 20% 18%, #fff, transparent),
    radial-gradient(1px 1px at 70% 12%, #fff, transparent),
    radial-gradient(1px 1px at 45% 28%, #fff, transparent),
    radial-gradient(1px 1px at 85% 22%, #fff, transparent),
    radial-gradient(2px 2px at 33% 8%, #fff, transparent),
    linear-gradient(180deg, #170a2e 0%, #3b1158 45%, #7a1d6b 56%, #170a2e 60%); background-size: cover; }
.sun { position: absolute; left: 50%; top: 26%; width: 380px; height: 380px; transform: translate(-50%, 0); border-radius: 50%;
  background: linear-gradient(180deg, #ffe66d 0%, #ff8a3d 40%, #ff2fb3 75%, #b3179a 100%);
  box-shadow: 0 0 120px 20px rgba(255,47,179,0.5); }
.sun::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: repeating-linear-gradient(180deg, transparent 0 18px, #170a2e 18px 22px); -webkit-mask: linear-gradient(180deg, transparent 52%, #000 52%); mask: linear-gradient(180deg, transparent 52%, #000 52%); }
.mountains { position: absolute; left: 0; right: 0; top: 55%; height: 12%; background:
    linear-gradient(135deg, transparent 47%, #2a0e44 47% 53%, transparent 53%) repeat-x; background-size: 120px 100%; opacity: 0.6; }
.floor { position: absolute; left: -50%; right: -50%; bottom: 0; height: 46vh; transform: perspective(320px) rotateX(64deg); transform-origin: 50% 0;
  background-image:
    linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,47,179,0.5) 1px, transparent 1px);
  background-size: 56px 56px; filter: drop-shadow(0 0 6px rgba(34,211,238,0.5)); animation: race 1.3s linear infinite; }
@keyframes race { from { background-position-y: 0, 0; } to { background-position-y: 56px, 56px; } }
.haze { position: absolute; left: 0; right: 0; bottom: 40vh; height: 16vh; background: linear-gradient(180deg, transparent, rgba(255,47,179,0.25)); filter: blur(20px); }
.scan { position: fixed; inset: 0; z-index: 1; pointer-events: none; background: repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,0.16) 3px); mix-blend-mode: multiply; }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 6px; background: var(--pink); color: #fff; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-size: 15px; box-shadow: 0 0 24px -4px var(--pink); }
.btn.ghost { background: transparent; color: var(--cyan); border: 1px solid var(--cyan); box-shadow: 0 0 18px -6px var(--cyan); }

.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; }
.eyebrow { letter-spacing: 0.3em; text-transform: uppercase; font-size: 12px; color: var(--cyan); margin-bottom: 18px; text-shadow: 0 0 10px var(--cyan); }
.chrome { font-family: "Poppins", sans-serif; font-weight: 900; font-size: clamp(54px, 13vw, 170px); line-height: 0.86; letter-spacing: -0.02em;
  background: linear-gradient(180deg, #ffffff 0%, #cdebff 40%, #22d3ee 52%, #ff7ad9 78%, #ff2fb3 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 2px 0 #7a1d6b) drop-shadow(0 0 24px rgba(255,47,179,0.5)); }
.role { margin-top: 18px; font-size: clamp(16px, 2vw, 22px); }
.neon-c { color: var(--cyan); text-shadow: 0 0 12px rgba(34,211,238,0.7); }
.tag { margin-top: 10px; color: rgba(243,232,255,0.65); }
.cta { display: flex; gap: 14px; margin-top: 28px; }

.content { position: relative; z-index: 2; }
.sec { max-width: 1080px; margin: 0 auto; padding: 80px 24px; }
.lab { font-weight: 900; font-size: clamp(26px, 5vw, 52px); letter-spacing: 0.02em; margin-bottom: 32px; color: #fff; text-shadow: 0 0 18px rgba(255,47,179,0.6); }

.panel { background: rgba(23,10,46,0.72); border: 1px solid rgba(34,211,238,0.3); border-radius: 14px; backdrop-filter: blur(8px); box-shadow: 0 0 30px -12px rgba(34,211,238,0.5); }

.about { display: grid; grid-template-columns: 200px 1fr; gap: 30px; align-items: center; padding: 28px; }
.about img { width: 200px; height: 200px; object-fit: cover; border-radius: 12px; border: 1px solid var(--pink); }
.bio { line-height: 1.7; color: #e7d8ff; }
.facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 20px; font-size: 13px; }
.facts i { color: var(--cyan); margin-right: 6px; }
.facts b { color: #fff; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 22px; }
.stat { padding: 24px; text-align: center; background: rgba(23,10,46,0.72); border: 1px solid rgba(255,47,179,0.3); border-radius: 14px; }
.stat .num { display: block; font-size: clamp(30px, 4vw, 50px); font-weight: 900; color: var(--orange); text-shadow: 0 0 16px rgba(255,138,61,0.6); }
.stat .cap { font-size: 12px; color: #c4a9e8; }

.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card { padding: 26px; transition: transform 0.3s, border-color 0.3s; }
.card:hover { transform: translateY(-6px); border-color: var(--pink); }
.card i { font-size: 24px; color: var(--cyan); }
.card h3 { font-size: 18px; font-weight: 800; color: #fff; margin: 12px 0 7px; }
.card p { font-size: 13.5px; line-height: 1.6; color: #c4a9e8; }

.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chips span { padding: 9px 15px; border-radius: 6px; border: 1px solid rgba(34,211,238,0.4); font-size: 13.5px; box-shadow: 0 0 14px -8px var(--cyan); }
.chips b { color: var(--orange); }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.proj { overflow: hidden; transition: transform 0.3s, border-color 0.3s; }
.proj:hover { transform: translateY(-6px); border-color: var(--pink); }
.proj-media video { width: 100%; display: block; }
.proj-b { padding: 18px; }
.tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 10px; }
.tags span { font-size: 11px; padding: 4px 10px; border-radius: 4px; background: rgba(255,47,179,0.16); color: #ff7ad9; }
.proj-b h3 { font-size: 19px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.proj-b p { font-size: 13.5px; line-height: 1.6; color: #c4a9e8; margin-bottom: 14px; }
.links { display: flex; gap: 16px; }
.links a { color: var(--cyan); text-decoration: none; font-weight: 700; font-size: 13.5px; }

.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.cert { display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: #f3e8ff; padding: 14px; transition: transform 0.3s; }
.cert:hover { transform: translateY(-6px); }
.cert img { width: 100%; height: 130px; object-fit: contain; background: #fff; border-radius: 8px; padding: 7px; }
.cert b { font-size: 13.5px; color: #fff; margin-top: 5px; }
.cert span { font-size: 11.5px; color: #a98fd0; }

.contact .big { font-size: clamp(48px, 11vw, 150px); margin-bottom: 30px; }
.contact form { padding: 28px; display: flex; flex-direction: column; gap: 14px; max-width: 600px; }
.contact .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.contact input, .contact textarea { background: rgba(0,0,0,0.35); border: 1px solid rgba(34,211,238,0.3); border-radius: 8px; padding: 13px 15px; color: #fff; font-family: inherit; font-size: 14px; }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--pink); box-shadow: 0 0 0 2px rgba(255,47,179,0.25); }
.contact input::placeholder, .contact textarea::placeholder { color: #8f78b8; }
.socials { display: flex; gap: 20px; margin-top: 26px; }
.socials a { color: #c4a9e8; text-decoration: none; }
.socials a:hover { color: var(--cyan); }

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; }
  .grid3, .grid2 { grid-template-columns: 1fr; }
  .grid4, .stats { grid-template-columns: 1fr 1fr; }
  .facts { grid-template-columns: 1fr 1fr; }
  .contact .row { grid-template-columns: 1fr; }
  .sun { width: 240px; height: 240px; }
}
@media (max-width: 600px) {
  .scene { transform: none; }
  .sun { width: 180px; height: 180px; top: 13%; }
  .hero { padding: 100px 20px 76px; }
  .chrome { font-size: clamp(42px, 12vw, 58px); text-shadow: 0 3px 30px rgba(10, 4, 20, 0.7); }
  .role { font-size: 14px; }
  .tag { font-size: 13px; }
}
</style>
