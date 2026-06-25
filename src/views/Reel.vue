<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
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

/* only GitHub + LinkedIn flank the Resume button in the hero */
const gh = socials.find((s) => s.name === "GitHub");
const li = socials.find((s) => s.name === "LinkedIn");

const root = ref(null);
const pinWrap = ref(null);
const track = ref(null);
const progress = ref(0);

let ctx, mm;

/* ---------------- switchable soft background ---------------- */
const bgMode = ref(
  (typeof localStorage !== "undefined" && localStorage.getItem("reelBg")) || "pink"
);
const codeCanvas = ref(null);
let codeRaf = null, codeCtx = null, cols = 0, drops = [], cw = 0, ch = 0;
const FS = 16;
const glyphs = "01{}[]()<>/=+*;:.#$&|console.log()=>const let function async await return".split("");

function resizeCode() {
  const c = codeCanvas.value;
  if (!c) return;
  cw = c.width = window.innerWidth;
  ch = c.height = window.innerHeight;
  cols = Math.floor(cw / FS);
  drops = Array.from({ length: cols }, () => (Math.random() * ch) / FS);
}
function drawCode() {
  if (!codeCtx) return;
  codeCtx.fillStyle = "rgba(14,10,13,0.10)";
  codeCtx.fillRect(0, 0, cw, ch);
  codeCtx.font = `${FS}px ui-monospace, monospace`;
  for (let i = 0; i < cols; i++) {
    const g = glyphs[Math.floor(Math.random() * glyphs.length)];
    const x = i * FS, y = drops[i] * FS;
    codeCtx.fillStyle = Math.random() > 0.92 ? "rgba(251,233,236,0.75)" : "rgba(255,111,142,0.5)";
    codeCtx.fillText(g, x, y);
    if (y > ch && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.5;
  }
  codeRaf = requestAnimationFrame(drawCode);
}
function startCode() {
  nextTick(() => {
    const c = codeCanvas.value;
    if (!c) return;
    codeCtx = c.getContext("2d");
    resizeCode();
    window.addEventListener("resize", resizeCode);
    drawCode();
  });
}
function stopCode() {
  if (codeRaf) cancelAnimationFrame(codeRaf);
  codeRaf = null;
  codeCtx = null;
  window.removeEventListener("resize", resizeCode);
}
function toggleBg() {
  bgMode.value = bgMode.value === "pink" ? "code" : "pink";
  if (typeof localStorage !== "undefined") localStorage.setItem("reelBg", bgMode.value);
}
watch(bgMode, (v) => (v === "code" ? startCode() : stopCode()));

onMounted(() => {
  if (bgMode.value === "code") startCode();

  ctx = gsap.context(() => {
    // ---- catchy hero intro (runs on load, all viewports) ----
    gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.15 })
      .from(".intro .kick", { y: 24, opacity: 0, duration: 0.7 })
      .from(".intro h1 .line", { yPercent: 115, duration: 1.1, stagger: 0.14 }, "-=0.35")
      .from(".intro .role", { y: 22, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".intro .cta", { y: 22, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".intro .scrolltip", { opacity: 0, duration: 0.9 }, "-=0.5");

    mm = gsap.matchMedia();

    // ---- desktop: horizontal scroll-jack ----
    mm.add("(min-width: 861px)", () => {
      const getDist = () => track.value.scrollWidth - window.innerWidth;
      const tween = gsap.to(track.value, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: pinWrap.value,
          start: "top top",
          end: () => "+=" + getDist(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => (progress.value = self.progress),
        },
      });

      // reveal items as they enter the horizontal viewport
      gsap.utils.toArray(".reveal-x").forEach((el) => {
        gsap.from(el, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            containerAnimation: tween,
            start: "left 88%",
          },
        });
      });
      return () => {};
    });
  }, root.value);
});

onBeforeUnmount(() => {
  stopCode();
  mm?.revert();
  ctx?.revert();
});
</script>

<template>
  <div class="reel" ref="root">
    <!-- soft animated background (switchable) -->
    <div class="bg-layer" :class="`bg-${bgMode}`" aria-hidden="true">
      <template v-if="bgMode === 'pink'">
        <span class="blob b1"></span>
        <span class="blob b2"></span>
        <span class="blob b3"></span>
      </template>
      <canvas v-else ref="codeCanvas" class="code-canvas"></canvas>
    </div>

    <button class="theme-toggle" type="button" @click="toggleBg">
      <span class="dot" :class="bgMode"></span>
      {{ bgMode === 'pink' ? 'Try code theme' : 'Try pink theme' }}
    </button>

    <div class="rail"><div class="rail-fill" :style="{ width: progress * 100 + '%' }"></div></div>

    <div class="pin" ref="pinWrap">
      <div class="track" ref="track">
        <!-- 01 intro -->
        <section class="scene intro">
          <p class="kick">{{ profile.heroTagline }}</p>
          <h1 :aria-label="profile.name">
            <span class="line-wrap"><span class="line">{{ profile.firstName }}</span></span>
            <span class="line-wrap"><span class="line shine">{{ profile.lastName }}</span></span>
          </h1>
          <div class="role">
            <div class="stack">
              <span v-for="t in profile.stack" :key="t" class="chip">{{ t }}</span>
            </div>
            <p class="intro-lead">I direct front-end experiences in Vue &amp; React, frame by frame — and produce complete full-stack apps end-to-end in Nuxt.</p>
          </div>
          <div class="cta">
            <a class="btn" :href="profile.resume" target="_blank">Resume</a>
            <a v-if="gh" class="btn-ghost" :href="gh.url" target="_blank">GitHub</a>
            <a v-if="li" class="btn-ghost" :href="li.url" target="_blank">LinkedIn</a>
          </div>
          <div class="scrolltip">scroll to play ⟶</div>
        </section>

        <!-- 02 about -->
        <section class="scene about">
          <div class="about-in">
            <figure class="about-portrait reveal-x">
              <img :src="profile.avatar" :alt="profile.name" />
              <figcaption>{{ profile.role }}</figcaption>
            </figure>
            <div class="about-body">
              <span class="no reveal-x">01 / about</span>
              <h2 class="about-h reveal-x">A little <em>about me</em></h2>
              <p class="bio reveal-x">{{ profile.about }}</p>
              <AboutFacts class="reveal-x" />
            </div>
          </div>
        </section>

        <!-- 03 stats -->
        <section class="scene stats">
          <div v-for="s in stats" :key="s.label" class="stat reveal-x">
            <span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span>
            <span class="lbl">{{ s.label }}</span>
          </div>
        </section>

        <!-- 04 services -->
        <section class="scene services">
          <span class="no reveal-x">02 / services</span>
          <div class="srow">
            <div v-for="srv in services" :key="srv.title" class="scard reveal-x">
              <i :class="`fi ${srv.icon}`"></i><h3>{{ srv.title }}</h3><p>{{ srv.description }}</p>
            </div>
          </div>
        </section>

        <!-- 05 skills -->
        <section class="scene skills">
          <span class="no reveal-x">03 / skills</span>
          <div class="sgrid">
            <div v-for="g in skillGroups" :key="g.category" class="sgroup reveal-x">
              <h4>{{ g.category }}</h4>
              <span v-for="sk in g.skills" :key="sk.name" class="pill">{{ sk.name }} · {{ sk.level }}</span>
            </div>
          </div>
        </section>

        <!-- 06 work -->
        <section class="scene work-head reveal-x">
          <span class="no">04 / selected work</span>
          <h2>Things I've<br />shipped.</h2>
        </section>
        <article v-for="(p, i) in projects" :key="p.title" class="scene proj reveal-x">
          <span class="pnum">{{ String(i + 1).padStart(2, "0") }}</span>
          <div class="proj-media"><video v-lazyvideo="p.video" muted loop playsinline></video></div>
          <div class="proj-info">
            <div class="tags"><span v-for="t in p.tags" :key="t">{{ t }}</span></div>
            <h3>{{ p.title }}</h3>
            <p>{{ p.description }}</p>
            <div class="links">
              <a v-if="p.demo" :href="p.demo" target="_blank">Live ↗</a>
              <a v-if="p.repo" :href="p.repo" target="_blank">Code ↗</a>
            </div>
          </div>
        </article>

        <!-- 07 certs -->
        <section class="scene certs">
          <span class="no reveal-x">05 / certificates</span>
          <div class="crow">
            <a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert reveal-x">
              <img :src="c.img" :alt="c.name" /><b>{{ c.name }}</b><span>{{ c.issuer }}</span>
            </a>
          </div>
        </section>

        <!-- 06 process -->
        <section class="scene services">
          <span class="no reveal-x">06 / how it works</span>
          <div class="srow">
            <div v-for="s in process" :key="s.step" class="scard reveal-x">
              <i :class="`fi ${s.icon}`"></i><h3>{{ s.step }} · {{ s.title }}</h3><p>{{ s.description }}</p>
            </div>
          </div>
        </section>

        <!-- 07 industries -->
        <section class="scene skills">
          <span class="no reveal-x">07 / industries</span>
          <div class="indwrap reveal-x">
            <span v-for="i in industries" :key="i.name" class="pill"><i :class="`fi ${i.icon}`"></i> {{ i.name }}</span>
          </div>
        </section>

        <!-- 08 contact -->
        <section class="scene contact">
          <h2 class="reveal-x">Let's roll.</h2>
          <form class="reveal-x" action="https://formspree.io/f/mnndnjqg" method="POST">
            <input type="text" name="user_name" placeholder="Name" required />
            <input type="email" name="user_email" placeholder="Email" required />
            <input type="text" name="subject" placeholder="Subject" required />
            <textarea name="message" rows="2" placeholder="Message" required></textarea>
            <button class="btn" type="submit">Send</button>
          </form>
          <div class="socials reveal-x">
            <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reel {
  --rose: #ff6f8e;
  --rose-deep: #f23a64;
  --rose-soft: #ffa6bd;
  --bg: #0a0a0c;
  --bg-2: #0e0d11;
  --ink: #fdeef1;
  position: relative;
  background:
    radial-gradient(90% 70% at 88% -12%, rgba(255,111,142,0.13), transparent 55%),
    radial-gradient(70% 60% at -8% 110%, rgba(255,111,142,0.06), transparent 55%),
    var(--bg);
  color: var(--ink);
  font-family: "Poppins", system-ui, sans-serif;
  overflow-x: hidden;
}

/* soft animated background */
.bg-layer { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.code-canvas { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.55; }
.blob { position: absolute; border-radius: 50%; filter: blur(130px); opacity: 0.16; mix-blend-mode: screen; will-change: transform; }
.b1 { width: 44vw; height: 44vw; background: var(--rose); top: -16%; left: -12%; animation: drift1 19s ease-in-out infinite; }
.b2 { width: 34vw; height: 34vw; background: var(--rose-soft); bottom: -18%; right: -10%; animation: drift2 23s ease-in-out infinite; }
.b3 { width: 28vw; height: 28vw; background: var(--rose-deep); top: 32%; left: 48%; animation: drift3 27s ease-in-out infinite; opacity: 0.1; }
@keyframes drift1 { 50% { transform: translate(18vw, 12vh) scale(1.15); } }
@keyframes drift2 { 50% { transform: translate(-15vw, -11vh) scale(1.1); } }
@keyframes drift3 { 50% { transform: translate(-20vw, 16vh) scale(0.9); } }
@media (prefers-reduced-motion: reduce) {
  .blob { animation: none; }
}

/* theme toggle */
.theme-toggle { position: fixed; bottom: 22px; right: 22px; z-index: 9999; display: inline-flex; align-items: center; gap: 9px; padding: 11px 18px; border-radius: 999px; border: 1px solid rgba(255,111,142,0.4); background: rgba(14,10,13,0.6); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); color: #fbe9ec; font-family: ui-monospace, monospace; font-size: 13px; letter-spacing: 0.04em; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
.theme-toggle:hover { transform: translateY(-2px); box-shadow: 0 0 26px -6px var(--rose); border-color: var(--rose); }
.theme-toggle .dot { width: 9px; height: 9px; border-radius: 50%; }
.theme-toggle .dot.pink { background: #f9a8d4; box-shadow: 0 0 10px #f9a8d4; }
.theme-toggle .dot.code { background: var(--rose); box-shadow: 0 0 10px var(--rose); }

.rail { position: fixed; top: 0; left: 0; width: 100%; height: 3px; z-index: 9998; background: rgba(255,111,142,0.15); }
.rail-fill { height: 100%; background: var(--rose); box-shadow: 0 0 12px var(--rose); }

.pin { position: relative; z-index: 1; height: 100vh; overflow: hidden; }
.track { display: flex; height: 100vh; align-items: stretch; will-change: transform; }

.scene { flex: 0 0 auto; height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 0 7vw; position: relative; }
.no { font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.25em; color: var(--rose); font-size: 13px; margin-bottom: 26px; }

.btn { display: inline-flex; align-items: center; padding: 13px 30px; border-radius: 999px; background: var(--rose); color: #190a0d; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-size: 15px; }

/* intro */
.intro { width: 100vw; }
.intro .kick { font-family: ui-monospace, monospace; letter-spacing: 0.2em; color: rgba(251,233,236,0.6); font-size: 13px; margin-bottom: 24px; }
.intro h1 { font-family: "Libre Baskerville", serif; font-size: clamp(60px, 12vw, 190px); line-height: 0.9; font-weight: 700; letter-spacing: -0.02em; }
.intro h1 .line-wrap { display: block; overflow: hidden; padding-bottom: 0.06em; }
.intro h1 .line { display: block; }
.intro h1 .shine {
  font-style: italic;
  background: linear-gradient(100deg, var(--rose) 0%, var(--rose) 38%, #ffffff 50%, var(--rose) 62%, var(--rose) 100%);
  background-size: 230% 100%;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
  animation: nameShine 4.8s ease-in-out infinite;
}
@keyframes nameShine { 0% { background-position: 120% 0; } 55%, 100% { background-position: -120% 0; } }
@media (prefers-reduced-motion: reduce) { .intro h1 .shine { animation: none; } }
.intro .role { margin-top: 24px; }
.intro .stack { display: flex; flex-wrap: wrap; gap: 9px; margin-bottom: 18px; }
.intro .chip { font-family: ui-monospace, monospace; font-size: 12.5px; letter-spacing: 0.04em; color: var(--rose); padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(255,111,142,0.32); background: rgba(255,111,142,0.06); transition: transform 0.3s, border-color 0.3s, background 0.3s; }
.intro .chip:hover { transform: translateY(-3px); border-color: var(--rose); background: rgba(255,111,142,0.12); }
.intro .intro-lead { font-size: clamp(15px,1.7vw,19px); line-height: 1.7; color: rgba(251,233,236,0.78); max-width: 56ch; }
.intro .cta { margin-top: 30px; display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
.intro .btn-ghost { display: inline-flex; align-items: center; padding: 13px 26px; border-radius: 999px; border: 1px solid rgba(255,111,142,0.4); color: #fbe9ec; text-decoration: none; font-weight: 600; font-size: 15px; transition: transform 0.25s, border-color 0.25s, background 0.25s, box-shadow 0.25s; }
.intro .btn-ghost:hover { transform: translateY(-2px); border-color: var(--rose); background: rgba(255,111,142,0.1); box-shadow: 0 0 26px -8px var(--rose); }
.scrolltip { position: absolute; bottom: 40px; left: 7vw; font-family: ui-monospace, monospace; letter-spacing: 0.2em; color: rgba(251,233,236,0.55); font-size: 13px; animation: nudge 1.8s ease-in-out infinite; }
@keyframes nudge { 50% { transform: translateX(10px); } }

/* about */
.about { width: auto; }
.about-in { display: grid; grid-template-columns: 300px minmax(0, 620px); gap: 56px; align-items: center; }
.about-portrait { position: relative; margin: 0; }
.about-portrait img { position: relative; z-index: 1; width: 300px; height: 400px; object-fit: cover; border-radius: 20px; display: block; box-shadow: 0 30px 60px -28px rgba(0,0,0,0.7); }
.about-portrait::before { content: ""; position: absolute; inset: 18px -18px -18px 18px; border: 1px solid var(--rose); border-radius: 20px; z-index: 0; }
.about-portrait figcaption { position: absolute; z-index: 2; left: 13px; bottom: 13px; font-family: ui-monospace, monospace; font-size: 11.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink); background: rgba(18,10,20,0.62); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 7px 13px; border-radius: 999px; border: 1px solid rgba(255,111,142,0.4); }
.about-body { min-width: 0; }
.about-body .no { margin-bottom: 14px; }
.about-h { font-family: "Libre Baskerville", serif; font-size: clamp(28px, 3vw, 46px); line-height: 1.08; font-weight: 700; margin-bottom: 16px; }
.about-h em { color: var(--rose); font-style: italic; }
.bio { font-size: 15px; line-height: 1.7; color: rgba(253,238,241,0.82); }
.about-body :deep(.afacts) { margin-top: 20px; grid-template-columns: repeat(3, 1fr); }
.about-body :deep(.afact) { padding: 11px 12px; }
.about-body :deep(.afact-ic) { width: 32px; height: 32px; font-size: 15px; }

/* stats */
.stats { width: 80vw; flex-direction: row; gap: 5vw; align-items: center; }
.stat { text-align: center; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
.stat:hover { transform: translateY(-6px); }
.stat .num { display: block; font-family: "Libre Baskerville", serif; font-size: clamp(48px,7vw,120px); font-weight: 700; color: var(--rose); transition: text-shadow 0.4s; }
.stat:hover .num { text-shadow: 0 0 38px rgba(255,111,142,0.5); }
.stat .lbl { font-size: 14px; color: rgba(251,233,236,0.6); }

/* services */
.services { width: auto; }
.srow { display: flex; gap: 18px; }
.scard { width: 260px; padding: 28px; border-radius: 18px; border: 1px solid rgba(255,111,142,0.2); background: rgba(255,111,142,0.05); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, box-shadow 0.4s, background 0.4s; }
.scard:hover { transform: translateY(-8px); border-color: var(--rose); background: rgba(255,111,142,0.1); box-shadow: 0 24px 50px -28px var(--rose); }
.scard i { font-size: 26px; color: var(--rose); }
.scard h3 { font-size: 18px; font-weight: 700; margin: 14px 0 8px; }
.scard p { font-size: 13.5px; line-height: 1.6; color: rgba(251,233,236,0.65); }

/* skills */
.skills { width: 80vw; }
.sgrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 34px; max-width: 820px; }
.sgroup h4 { font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--rose); margin-bottom: 14px; }
.pill { display: inline-block; margin: 0 8px 8px 0; padding: 8px 15px; border-radius: 999px; border: 1px solid rgba(255,111,142,0.3); font-size: 13.5px; transition: transform 0.3s, border-color 0.3s, background 0.3s, color 0.3s; }
.pill:hover { transform: translateY(-3px); border-color: var(--rose); background: rgba(255,111,142,0.12); color: #fff; }
.indwrap { display: flex; flex-wrap: wrap; gap: 12px; max-width: 720px; }
.indwrap .pill { margin: 0; }
.indwrap .pill i { color: var(--rose); margin-right: 7px; }

/* work */
.work-head { width: 60vw; }
.work-head h2 { font-family: "Libre Baskerville", serif; font-size: clamp(44px,7vw,120px); line-height: 0.9; font-weight: 700; }
.proj { width: 80vw; max-width: 1180px; flex-direction: row; gap: 54px; align-items: center; }
.pnum { position: absolute; top: 12vh; left: 7vw; font-family: "Libre Baskerville", serif; font-size: 90px; color: rgba(255,111,142,0.16); }
.proj-media { flex: 1; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,111,142,0.14); box-shadow: 0 30px 60px -34px rgba(0,0,0,0.7); }
.proj-media video { width: 100%; display: block; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
.proj:hover .proj-media video { transform: scale(1.05); }
.proj-info { flex: 1.4; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.tags span { font-size: 12px; padding: 4px 11px; border-radius: 999px; background: rgba(255,111,142,0.14); color: var(--rose); }
.proj-info h3 { font-family: "Libre Baskerville", serif; font-size: clamp(26px,3vw,42px); font-weight: 700; margin-bottom: 12px; }
.proj-info p { font-size: 16px; line-height: 1.8; color: rgba(251,233,236,0.74); margin-bottom: 20px; max-width: 600px; }
.links { display: flex; gap: 22px; }
.links a { position: relative; color: var(--rose); text-decoration: none; font-weight: 600; }
.links a::after { content: ""; position: absolute; left: 0; bottom: -3px; width: 100%; height: 1.5px; background: var(--rose); transform: scaleX(0); transform-origin: left; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
.links a:hover::after { transform: scaleX(1); }

/* certs */
.certs { width: auto; }
.crow { display: flex; gap: 16px; }
.cert { width: 220px; display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: #fbe9ec; padding: 14px; border-radius: 16px; border: 1px solid rgba(255,111,142,0.18); background: rgba(255,111,142,0.04); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, box-shadow 0.4s; }
.cert:hover { transform: translateY(-8px); border-color: var(--rose); box-shadow: 0 24px 50px -28px var(--rose); }
.cert img { width: 100%; height: 150px; object-fit: contain; background: #fff; border-radius: 10px; padding: 8px; }
.cert b { font-size: 14px; margin-top: 6px; }
.cert span { font-size: 12px; color: rgba(251,233,236,0.55); }

/* contact */
.contact { width: 100vw; align-items: flex-start; }
.contact h2 { font-family: "Libre Baskerville", serif; font-size: clamp(50px,9vw,150px); font-weight: 700; margin-bottom: 30px; }
.contact form { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; max-width: 620px; width: 100%; }
.contact textarea { grid-column: span 2; }
.contact .btn { grid-column: span 2; justify-self: start; }
.contact input, .contact textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,111,142,0.25); border-radius: 12px; padding: 13px 15px; color: #fff; font-family: inherit; font-size: 15px; }
.contact input:focus, .contact textarea:focus { outline: none; border-color: var(--rose); }
.contact input::placeholder, .contact textarea::placeholder { color: rgba(251,233,236,0.45); }
.socials { display: flex; gap: 18px; margin-top: 24px; }
.socials a { color: rgba(251,233,236,0.65); text-decoration: none; font-size: 14px; }

/* ---- mobile: vertical fallback (no pin / no horizontal) ---- */
@media (max-width: 860px) {
  .pin { height: auto; overflow: visible; }
  .track { flex-direction: column; height: auto; transform: none !important; }
  .scene { width: 100% !important; max-width: none; height: auto; min-height: auto; padding: 70px 24px; }
  .stats { flex-direction: row; flex-wrap: wrap; gap: 30px; }
  .about-in { grid-template-columns: 1fr; gap: 34px; }
  .about-portrait { max-width: 320px; }
  .about-portrait img { width: 100%; height: 320px; }
  .about-portrait::before { inset: 12px -12px -12px 12px; }
  .srow, .crow { flex-wrap: wrap; }
  .proj { flex-direction: column; width: 100% !important; }
  .pnum { position: static; font-size: 50px; }
  .contact form { grid-template-columns: 1fr; }
  .contact textarea, .contact .btn { grid-column: span 1; }
}
</style>
