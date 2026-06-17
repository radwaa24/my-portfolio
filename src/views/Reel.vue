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
const pinWrap = ref(null);
const track = ref(null);
const progress = ref(0);

let ctx, mm;

onMounted(() => {
  ctx = gsap.context(() => {
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
  mm?.revert();
  ctx?.revert();
});
</script>

<template>
  <div class="reel" ref="root">
    <div class="rail"><div class="rail-fill" :style="{ width: progress * 100 + '%' }"></div></div>

    <div class="pin" ref="pinWrap">
      <div class="track" ref="track">
        <!-- 01 intro -->
        <section class="scene intro">
          <p class="kick reveal-x">Portfolio reel — drag the world sideways</p>
          <h1 class="reveal-x">{{ profile.firstName }}<br /><em>{{ profile.lastName }}</em></h1>
          <p class="role reveal-x">{{ profile.role }} · {{ profile.specialty }}</p>
          <div class="cta reveal-x">
            <a class="btn" :href="profile.resume" target="_blank">Resume</a>
          </div>
          <div class="scrolltip reveal-x">scroll to play ⟶</div>
        </section>

        <!-- 02 about -->
        <section class="scene about">
          <span class="no reveal-x">01 / about</span>
          <div class="about-in">
            <img :src="profile.avatar" :alt="profile.name" class="reveal-x" />
            <div>
              <p class="bio reveal-x">{{ profile.about }}</p>
              <div class="facts reveal-x">
                <span v-for="f in aboutFacts" :key="f.label"><i :class="`fi ${f.icon}`"></i><b>{{ f.label }}</b> {{ f.value }}</span>
              </div>
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
  --rose: #fb7185;
  --bg: #0e0a0d;
  background: var(--bg);
  color: #fbe9ec;
  font-family: "Poppins", system-ui, sans-serif;
  overflow-x: hidden;
}
.rail { position: fixed; top: 0; left: 0; width: 100%; height: 3px; z-index: 9998; background: rgba(251,113,133,0.15); }
.rail-fill { height: 100%; background: var(--rose); box-shadow: 0 0 12px var(--rose); }

.pin { height: 100vh; overflow: hidden; }
.track { display: flex; height: 100vh; align-items: stretch; will-change: transform; }

.scene { flex: 0 0 auto; height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 0 7vw; position: relative; }
.no { font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.25em; color: var(--rose); font-size: 13px; margin-bottom: 26px; }

.btn { display: inline-flex; align-items: center; padding: 13px 30px; border-radius: 999px; background: var(--rose); color: #190a0d; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-size: 15px; }

/* intro */
.intro { width: 100vw; }
.intro .kick { font-family: ui-monospace, monospace; letter-spacing: 0.2em; color: rgba(251,233,236,0.6); font-size: 13px; margin-bottom: 24px; }
.intro h1 { font-family: "Libre Baskerville", serif; font-size: clamp(60px, 12vw, 190px); line-height: 0.88; font-weight: 700; letter-spacing: -0.02em; }
.intro h1 em { color: var(--rose); font-style: italic; }
.intro .role { margin-top: 24px; font-size: clamp(16px,2vw,22px); color: rgba(251,233,236,0.75); }
.intro .cta { margin-top: 30px; }
.scrolltip { position: absolute; bottom: 40px; left: 7vw; font-family: ui-monospace, monospace; letter-spacing: 0.2em; color: rgba(251,233,236,0.55); font-size: 13px; animation: nudge 1.8s ease-in-out infinite; }
@keyframes nudge { 50% { transform: translateX(10px); } }

/* about */
.about { width: 86vw; }
.about-in { display: grid; grid-template-columns: 240px 1fr; gap: 44px; align-items: center; max-width: 900px; }
.about-in img { width: 240px; height: 300px; object-fit: cover; border-radius: 18px; }
.bio { font-size: clamp(16px,1.6vw,21px); line-height: 1.8; color: rgba(251,233,236,0.85); }
.facts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
.facts span { font-size: 13px; color: rgba(251,233,236,0.65); }
.facts i { color: var(--rose); margin-right: 8px; }
.facts b { color: #fff; }

/* stats */
.stats { width: 80vw; flex-direction: row; gap: 5vw; align-items: center; }
.stat { text-align: center; }
.stat .num { display: block; font-family: "Libre Baskerville", serif; font-size: clamp(48px,7vw,120px); font-weight: 700; color: var(--rose); }
.stat .lbl { font-size: 14px; color: rgba(251,233,236,0.6); }

/* services */
.services { width: 92vw; }
.srow { display: flex; gap: 18px; }
.scard { width: 260px; padding: 28px; border-radius: 18px; border: 1px solid rgba(251,113,133,0.2); background: rgba(251,113,133,0.05); }
.scard i { font-size: 26px; color: var(--rose); }
.scard h3 { font-size: 18px; font-weight: 700; margin: 14px 0 8px; }
.scard p { font-size: 13.5px; line-height: 1.6; color: rgba(251,233,236,0.65); }

/* skills */
.skills { width: 80vw; }
.sgrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 34px; max-width: 820px; }
.sgroup h4 { font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--rose); margin-bottom: 14px; }
.pill { display: inline-block; margin: 0 8px 8px 0; padding: 8px 15px; border-radius: 999px; border: 1px solid rgba(251,113,133,0.3); font-size: 13.5px; }
.indwrap { display: flex; flex-wrap: wrap; gap: 12px; max-width: 720px; }
.indwrap .pill { margin: 0; }
.indwrap .pill i { color: var(--rose); margin-right: 7px; }

/* work */
.work-head { width: 60vw; }
.work-head h2 { font-family: "Libre Baskerville", serif; font-size: clamp(44px,7vw,120px); line-height: 0.9; font-weight: 700; }
.proj { width: 70vw; max-width: 900px; flex-direction: row; gap: 40px; align-items: center; }
.pnum { position: absolute; top: 12vh; left: 7vw; font-family: "Libre Baskerville", serif; font-size: 90px; color: rgba(251,113,133,0.16); }
.proj-media { flex: 1; border-radius: 16px; overflow: hidden; }
.proj-media video { width: 100%; display: block; }
.proj-info { flex: 1; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.tags span { font-size: 12px; padding: 4px 11px; border-radius: 999px; background: rgba(251,113,133,0.14); color: var(--rose); }
.proj-info h3 { font-family: "Libre Baskerville", serif; font-size: clamp(26px,3vw,42px); font-weight: 700; margin-bottom: 12px; }
.proj-info p { font-size: 15px; line-height: 1.7; color: rgba(251,233,236,0.72); margin-bottom: 18px; }
.links { display: flex; gap: 18px; }
.links a { color: var(--rose); text-decoration: none; font-weight: 600; }

/* certs */
.certs { width: 92vw; }
.crow { display: flex; gap: 16px; }
.cert { width: 220px; display: flex; flex-direction: column; gap: 5px; text-decoration: none; color: #fbe9ec; padding: 14px; border-radius: 16px; border: 1px solid rgba(251,113,133,0.18); }
.cert img { width: 100%; height: 150px; object-fit: contain; background: #fff; border-radius: 10px; padding: 8px; }
.cert b { font-size: 14px; margin-top: 6px; }
.cert span { font-size: 12px; color: rgba(251,233,236,0.55); }

/* contact */
.contact { width: 100vw; align-items: flex-start; }
.contact h2 { font-family: "Libre Baskerville", serif; font-size: clamp(50px,9vw,150px); font-weight: 700; margin-bottom: 30px; }
.contact form { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; max-width: 620px; width: 100%; }
.contact textarea { grid-column: span 2; }
.contact .btn { grid-column: span 2; justify-self: start; }
.contact input, .contact textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(251,113,133,0.25); border-radius: 12px; padding: 13px 15px; color: #fff; font-family: inherit; font-size: 15px; }
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
  .about-in { grid-template-columns: 1fr; }
  .about-in img { width: 100%; height: 280px; }
  .srow, .crow { flex-wrap: wrap; }
  .proj { flex-direction: column; width: 100% !important; }
  .pnum { position: static; font-size: 50px; }
  .contact form { grid-template-columns: 1fr; }
  .contact textarea, .contact .btn { grid-column: span 1; }
}
</style>
