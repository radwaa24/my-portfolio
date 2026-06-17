<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useSmoothScroll } from "../composables/useSmoothScroll.js";
import {
  profile, aboutFacts, socials, skillGroups, projects, certificates, services, stats,
} from "../data/portfolio.js";

useSmoothScroll();

const eclipse = ref(null);
const starfield = ref(null);
function onScroll() {
  const y = window.scrollY;
  if (eclipse.value) eclipse.value.style.transform = `translateY(${y * 0.18}px) scale(${1 + Math.min(y / 2600, 0.35)})`;
  if (starfield.value) starfield.value.style.transform = `translateY(${y * 0.06}px)`;
}
function onMove(e) {
  if (!eclipse.value) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 26;
  const y = (e.clientY / window.innerHeight - 0.5) * 18;
  eclipse.value.style.setProperty("--ox", x + "px");
  eclipse.value.style.setProperty("--oy", y + "px");
}
onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onMove);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("pointermove", onMove);
});
</script>

<template>
  <div class="eclipse-x">
    <div class="stars" ref="starfield" aria-hidden="true"></div>

    <header class="hero">
      <div class="eclipse" ref="eclipse" aria-hidden="true">
        <span class="rays"></span>
        <span class="corona"></span>
        <span class="moon"></span>
        <span class="diamond"></span>
      </div>
      <div class="hero-text">
        <p class="eyebrow">✸ totality ✸</p>
        <h1>{{ profile.firstName }}<br /><span class="glow">{{ profile.lastName }}</span></h1>
        <p class="role">{{ profile.role }} · {{ profile.specialty }}</p>
        <div class="cta">
          <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.35">Resume</a>
          <a class="btn ghost" href="#ec-work" v-magnetic="0.25">Work ↓</a>
        </div>
      </div>
      <span class="hint">scroll into the shadow</span>
    </header>

    <main class="content">
      <!-- ABOUT — slide left -->
      <section class="sec" v-anim="'left'">
        <span class="lab">01 · About</span>
        <div class="about">
          <div class="ava-wrap"><img :src="profile.avatar" :alt="profile.name" /></div>
          <div>
            <p class="bio">{{ profile.about }}</p>
            <div class="facts"><span v-for="f in aboutFacts" :key="f.label"><i :class="`fi ${f.icon}`"></i><b>{{ f.label }}</b> {{ f.value }}</span></div>
          </div>
        </div>
      </section>

      <!-- STATS — stagger + count -->
      <section class="sec">
        <div class="stats" v-anim="{ type: 'stagger', delay: 60 }">
          <div v-for="s in stats" :key="s.label" class="stat">
            <span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span><span class="cap">{{ s.label }}</span>
          </div>
        </div>
      </section>

      <!-- SERVICES — flip -->
      <section class="sec" v-anim="'flip'">
        <span class="lab">02 · Services</span>
        <div class="grid3"><div v-for="srv in services" :key="srv.title" class="card"><i :class="`fi ${srv.icon}`"></i><h3>{{ srv.title }}</h3><p>{{ srv.description }}</p></div></div>
      </section>

      <!-- SKILLS — zoom -->
      <section class="sec" v-anim="'zoom'">
        <span class="lab">03 · Skills</span>
        <div class="chips"><span v-for="sk in skillGroups.flatMap(g => g.skills)" :key="sk.name">{{ sk.name }} <b>{{ sk.level }}</b></span></div>
      </section>

      <!-- WORK — clip wipe -->
      <section id="ec-work" class="sec" v-anim="'clip'">
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

      <!-- CERTS — blur -->
      <section class="sec" v-anim="'blur'">
        <span class="lab">05 · Certificates</span>
        <div class="grid4"><a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert"><img :src="c.img" :alt="c.name" /><b>{{ c.name }}</b><span>{{ c.issuer }}</span></a></div>
      </section>

      <!-- CONTACT — rotate -->
      <footer class="sec contact" v-anim="'rotate'">
        <h2>Out of the<br /><span class="glow">shadow.</span></h2>
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
.eclipse-x {
  --gold: #fbbf24; --amber: #f59e0b; --ink: #050406;
  position: relative; background: radial-gradient(120% 80% at 50% 8%, #1a1206 0%, #0a0608 40%, #050406 100%);
  color: #f5ecd8; font-family: "Poppins", system-ui, sans-serif; overflow-x: hidden;
}
.stars { position: fixed; inset: 0; z-index: 0;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 22%, #fff, transparent),
    radial-gradient(1px 1px at 38% 12%, #ffe9bf, transparent),
    radial-gradient(1.5px 1.5px at 65% 28%, #fff, transparent),
    radial-gradient(1px 1px at 82% 16%, #fff, transparent),
    radial-gradient(1px 1px at 25% 60%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 72% 72%, #ffe9bf, transparent),
    radial-gradient(1px 1px at 50% 88%, #fff, transparent);
  background-size: 100% 100%; animation: tw 5s ease-in-out infinite alternate; }
@keyframes tw { from { opacity: 0.55; } to { opacity: 1; } }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 999px; background: var(--gold); color: #1a1206; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-size: 15px; box-shadow: 0 0 30px -4px var(--gold); }
.btn.ghost { background: transparent; color: var(--gold); border: 1px solid rgba(251,191,36,0.5); box-shadow: none; }

.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; }
.eclipse { position: absolute; top: 14vh; left: 50%; width: clamp(220px, 34vw, 460px); height: clamp(220px, 34vw, 460px); transform: translateX(-50%); margin-left: var(--ox, 0); }
.eclipse > span { position: absolute; inset: 0; border-radius: 50%; }
.rays { background: repeating-conic-gradient(from 0deg, rgba(251,191,36,0.5) 0deg 2deg, transparent 2deg 7deg); -webkit-mask: radial-gradient(circle, transparent 47%, #000 49%, #000 60%, transparent 66%); mask: radial-gradient(circle, transparent 47%, #000 49%, #000 60%, transparent 66%); animation: spin 60s linear infinite; opacity: 0.7; }
.corona { box-shadow: 0 0 60px 8px rgba(251,191,36,0.7), 0 0 130px 40px rgba(245,158,11,0.45), 0 0 220px 90px rgba(245,158,11,0.18); }
.moon { background: #060406; box-shadow: inset 0 0 40px rgba(0,0,0,0.9); transform: translateY(var(--oy, 0)); }
.diamond { width: 26px; height: 26px; top: 6%; left: 64%; inset: auto; border-radius: 50%; background: radial-gradient(circle, #fff, rgba(255,255,255,0)); box-shadow: 0 0 30px 10px #fff; animation: sparkle 4s ease-in-out infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes sparkle { 0%, 100% { opacity: 0.2; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1.2); } }

.hero-text { position: relative; z-index: 2; margin-top: 26vh; }
.eyebrow { letter-spacing: 0.35em; text-transform: uppercase; font-size: 12px; color: var(--gold); margin-bottom: 16px; }
.hero h1 { font-family: "Libre Baskerville", serif; font-size: clamp(46px, 11vw, 140px); font-weight: 700; line-height: 0.9; letter-spacing: -0.02em; color: #fff; }
.hero .glow { color: var(--gold); text-shadow: 0 0 40px rgba(251,191,36,0.7); }
.role { margin-top: 16px; font-size: clamp(15px, 2vw, 21px); color: #d9c9a6; }
.cta { display: flex; gap: 14px; justify-content: center; margin-top: 28px; }
.hint { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8a7a55; }

.content { position: relative; z-index: 2; }
.sec { max-width: 1080px; margin: 0 auto; padding: 90px 24px; }
.lab { display: block; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); font-size: 13px; margin-bottom: 30px; }

.about { display: grid; grid-template-columns: 200px 1fr; gap: 36px; align-items: center; }
.ava-wrap { width: 200px; height: 200px; border-radius: 50%; padding: 6px; background: conic-gradient(var(--gold), var(--amber), #fff, var(--gold)); }
.ava-wrap img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
.bio { font-size: clamp(16px, 2vw, 23px); line-height: 1.7; color: #ece0c8; }
.facts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 20px; font-size: 13px; }
.facts i { color: var(--gold); margin-right: 7px; }
.facts b { color: #fff; }

.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat { text-align: center; padding: 28px 14px; border-radius: 18px; background: rgba(251,191,36,0.06); border: 1px solid rgba(251,191,36,0.2); }
.stat .num { display: block; font-family: "Libre Baskerville", serif; font-size: clamp(32px, 4.5vw, 56px); color: var(--gold); }
.stat .cap { font-size: 12px; color: #b9a87f; }

.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card { padding: 26px; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(251,191,36,0.18); transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; }
.card:hover { transform: translateY(-6px); border-color: var(--gold); box-shadow: 0 0 36px -10px var(--gold); }
.card i { font-size: 24px; color: var(--gold); }
.card h3 { font-size: 18px; font-weight: 700; color: #fff; margin: 12px 0 7px; }
.card p { font-size: 13.5px; line-height: 1.6; color: #b9a87f; }

.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chips span { padding: 9px 15px; border-radius: 999px; border: 1px solid rgba(251,191,36,0.3); font-size: 13.5px; transition: box-shadow 0.3s, transform 0.3s; }
.chips span:hover { box-shadow: 0 0 20px -4px var(--gold); transform: translateY(-3px); }
.chips b { color: var(--gold); }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.proj { border-radius: 16px; overflow: hidden; background: rgba(255,255,255,0.03); border: 1px solid rgba(251,191,36,0.18); transition: transform 0.3s, border-color 0.3s; }
.proj:hover { transform: translateY(-6px); border-color: var(--gold); }
.proj-media video { width: 100%; display: block; }
.proj-b { padding: 18px; }
.tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 10px; }
.tags span { font-size: 11px; padding: 4px 10px; border-radius: 999px; background: rgba(251,191,36,0.14); color: var(--gold); }
.proj-b h3 { font-size: 19px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.proj-b p { font-size: 13.5px; line-height: 1.6; color: #b9a87f; margin-bottom: 14px; }
.links { display: flex; gap: 16px; }
.links a { color: var(--gold); text-decoration: none; font-weight: 600; font-size: 13.5px; }

.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.cert { display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: #f5ecd8; padding: 14px; border-radius: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(251,191,36,0.18); transition: transform 0.3s; }
.cert:hover { transform: translateY(-6px); }
.cert img { width: 100%; height: 130px; object-fit: contain; background: #fff; border-radius: 8px; padding: 7px; }
.cert b { font-size: 13.5px; color: #fff; margin-top: 5px; }
.cert span { font-size: 11.5px; color: #8a7a55; }

.contact h2 { font-family: "Libre Baskerville", serif; font-size: clamp(40px, 8vw, 100px); line-height: 0.95; font-weight: 700; color: #fff; margin-bottom: 36px; }
.contact .glow { color: var(--gold); text-shadow: 0 0 40px rgba(251,191,36,0.6); }
.contact form { display: flex; flex-direction: column; gap: 14px; max-width: 600px; }
.contact .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.contact input, .contact textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(251,191,36,0.25); border-radius: 12px; padding: 13px 15px; color: #fff; font-family: inherit; font-size: 15px; }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--gold); }
.contact input::placeholder, .contact textarea::placeholder { color: #8a7a55; }
.socials { display: flex; gap: 20px; margin-top: 26px; }
.socials a { color: #b9a87f; text-decoration: none; }
.socials a:hover { color: var(--gold); }

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; justify-items: center; text-align: center; }
  .facts { text-align: left; }
  .grid3, .grid2 { grid-template-columns: 1fr; }
  .grid4, .stats, .facts { grid-template-columns: 1fr 1fr; }
  .contact .row { grid-template-columns: 1fr; }
  .hero-text { margin-top: 30vh; }
}
@media (max-width: 540px) { .grid4, .stats { grid-template-columns: 1fr 1fr; } }
</style>
