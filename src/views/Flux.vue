<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
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
const glCanvas = ref(null);
const l1 = profile.firstName.split("");
const l2 = profile.lastName.split("");

/* ---------------- WebGL fluid shader ---------------- */
let renderer, scene, camera, material, clock, rafId;
const ptr = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

const vert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
const frag = `
precision highp float;
varying vec2 vUv;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec2  u_res;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1.,0.)), u.x),
             mix(hash(i+vec2(0.,1.)), hash(i+vec2(1.,1.)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<4;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = (gl_FragCoord.xy*2.0 - u_res) / min(u_res.x, u_res.y);
  vec2 m  = (u_mouse - 0.5) * 2.0;
  float t = u_time * 0.10;
  vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(5.2,1.3) - t));
  vec2 r = vec2(fbm(uv + 3.0*q + vec2(1.7,9.2) + m*0.40),
                fbm(uv + 3.0*q + vec2(8.3,2.8) - t));
  float f = fbm(uv + 3.0*r);

  // light pinky / white / gray palette
  vec3 white = vec3(1.000, 0.992, 0.996);
  vec3 pink  = vec3(0.984, 0.835, 0.902);
  vec3 rose  = vec3(0.961, 0.733, 0.831);
  vec3 gray  = vec3(0.906, 0.890, 0.910);

  vec3 col = mix(white, pink, smoothstep(0.10, 0.72, f));
  col = mix(col, rose, smoothstep(0.45, 0.95, length(r)) * 0.55);
  col = mix(col, gray, smoothstep(0.30, 0.85, length(q)) * 0.30);
  float vig = smoothstep(1.8, 0.15, length(uv));
  col *= 0.95 + 0.05 * vig;
  gl_FragColor = vec4(col, 1.0);
}`;

function initGL() {
  renderer = new THREE.WebGLRenderer({ canvas: glCanvas.value, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  material = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_res: { value: new THREE.Vector2(1, 1) },
    },
    vertexShader: vert,
    fragmentShader: frag,
  });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
  clock = new THREE.Clock();
  resize();
  animate();
}
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  material.uniforms.u_res.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
}
function animate() {
  ptr.x += (ptr.tx - ptr.x) * 0.05;
  ptr.y += (ptr.ty - ptr.y) * 0.05;
  material.uniforms.u_time.value = clock.getElapsedTime();
  material.uniforms.u_mouse.value.set(ptr.x, ptr.y);
  renderer.render(scene, camera);
  rafId = requestAnimationFrame(animate);
}
function onMove(e) {
  ptr.tx = e.clientX / window.innerWidth;
  ptr.ty = 1 - e.clientY / window.innerHeight;
}

let ctx;
onMounted(() => {
  initGL();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onMove);

  ctx = gsap.context(() => {
    gsap.from(".hero-title .ch", {
      yPercent: 130,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.04,
      delay: 0.2,
    });
    gsap.from([".hero-sub", ".hero-cta", ".hero-meta"], {
      y: 30, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.7,
    });
    gsap.utils.toArray(".reveal-up").forEach((el) => {
      gsap.from(el, {
        y: 60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });
    gsap.utils.toArray(".dial-fg").forEach((el) => {
      const C = 2 * Math.PI * 34; // r = 34
      const lvl = +el.dataset.level;
      gsap.set(el, { strokeDasharray: C, strokeDashoffset: C });
      gsap.to(el, {
        strokeDashoffset: C * (1 - lvl / 100),
        duration: 1.6, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%" },
      });
    });
  }, root.value);
});
onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
  window.removeEventListener("resize", resize);
  window.removeEventListener("pointermove", onMove);
  ctx?.revert();
  material?.dispose();
  renderer?.dispose();
});
</script>

<template>
  <div class="flux" ref="root">
    <canvas ref="glCanvas" class="gl" aria-hidden="true"></canvas>

    <!-- HERO over the live shader -->
    <header class="hero">
      <p class="hero-tagline">{{ profile.specialty }}</p>
      <h1 class="hero-title">
        <span class="line"><span v-for="(c, i) in l1" :key="'a' + i" class="ch">{{ c }}</span></span>
        <span class="line"><span v-for="(c, i) in l2" :key="'b' + i" class="ch">{{ c }}</span></span>
      </h1>
      <p class="hero-sub">{{ profile.tagline }}</p>
      <div class="hero-cta">
        <a class="btn" :href="profile.resume" target="_blank" v-magnetic="0.4">Resume</a>
        <a class="btn ghost" href="#flux-work" v-magnetic="0.3">Selected work</a>
      </div>
      <div class="hero-meta">
        <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank">{{ s.name }}</a>
      </div>
      <div class="scroll-hint">scroll ↓</div>
    </header>

    <!-- CONTENT (faint living shader behind translucent dark) -->
    <div class="content">
      <section class="sec">
        <div class="sec-head reveal-up">
          <span class="idx">01</span><h2>About</h2>
        </div>
        <div class="about reveal-up">
          <img :src="profile.avatar" :alt="profile.name" class="avatar" />
          <div>
            <p class="bio">{{ profile.about }}</p>
            <AboutFacts />
          </div>
        </div>
        <div class="stats">
          <div v-for="s in stats" :key="s.label" class="stat reveal-up">
            <span class="num" v-count="{ to: s.value, suffix: s.suffix }">0</span>
            <span class="lbl">{{ s.label }}</span>
          </div>
        </div>
      </section>

      <section class="sec">
        <div class="sec-head reveal-up"><span class="idx">02</span><h2>Services</h2></div>
        <div class="cards">
          <div v-for="srv in services" :key="srv.title" class="card reveal-up">
            <i :class="`fi ${srv.icon}`"></i>
            <h3>{{ srv.title }}</h3>
            <p>{{ srv.description }}</p>
          </div>
        </div>
      </section>

      <section class="sec">
        <div class="sec-head reveal-up"><span class="idx">03</span><h2>Skills</h2></div>
        <svg width="0" height="0" aria-hidden="true" style="position:absolute">
          <defs>
            <linearGradient id="dialgrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f472b6" />
              <stop offset="100%" stop-color="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <div class="skills">
          <div v-for="g in skillGroups" :key="g.category" class="skgroup reveal-up">
            <h4>{{ g.category }}</h4>
            <div class="dials">
              <div v-for="sk in g.skills" :key="sk.name" class="dial">
                <div class="dial-ring">
                  <svg viewBox="0 0 90 90">
                    <circle class="dial-bg" cx="45" cy="45" r="34" />
                    <circle class="dial-fg" cx="45" cy="45" r="34" :data-level="sk.level" />
                  </svg>
                  <span class="dial-pct"><span v-count="{ to: sk.level, suffix: '%' }">0</span></span>
                </div>
                <span class="dial-name">{{ sk.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="flux-work" class="sec">
        <div class="sec-head reveal-up"><span class="idx">04</span><h2>Work</h2></div>
        <div class="work">
          <article v-for="p in projects" :key="p.title" class="proj reveal-up">
            <div class="proj-media"><video v-lazyvideo="p.video" muted loop playsinline></video></div>
            <div class="proj-body">
              <div class="tags"><span v-for="t in p.tags" :key="t">{{ t }}</span></div>
              <h3>{{ p.title }}</h3>
              <p>{{ p.description }}</p>
              <div class="proj-links">
                <a v-if="p.demo" :href="p.demo" target="_blank">Live ↗</a>
                <a v-if="p.repo" :href="p.repo" target="_blank">Code ↗</a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="sec">
        <div class="sec-head reveal-up"><span class="idx">05</span><h2>Certificates</h2></div>
        <div class="certs">
          <a v-for="c in certificates" :key="c.name" :href="c.link" target="_blank" class="cert reveal-up">
            <img :src="c.img" :alt="c.name" />
            <span class="c-name">{{ c.name }}</span>
            <span class="c-iss">{{ c.issuer }}</span>
          </a>
        </div>
      </section>

      <section class="sec">
        <div class="sec-head reveal-up"><span class="idx">06</span><h2>Process</h2></div>
        <div class="cards">
          <div v-for="s in process" :key="s.step" class="card reveal-up">
            <i :class="`fi ${s.icon}`"></i>
            <h3>{{ s.step }} · {{ s.title }}</h3>
            <p>{{ s.description }}</p>
          </div>
        </div>
      </section>

      <section class="sec">
        <div class="sec-head reveal-up"><span class="idx">07</span><h2>Industries</h2></div>
        <div class="cards">
          <div v-for="i in industries" :key="i.name" class="card reveal-up">
            <i :class="`fi ${i.icon}`"></i>
            <h3>{{ i.name }}</h3>
          </div>
        </div>
      </section>
    </div>

    <!-- CONTACT over the shader again -->
    <footer class="closing">
      <h2 class="reveal-up">Let's create<br />something fluid.</h2>
      <form class="form reveal-up" action="https://formspree.io/f/mnndnjqg" method="POST">
        <div class="row">
          <input type="text" name="user_name" placeholder="Name" required />
          <input type="email" name="user_email" placeholder="Email" required />
        </div>
        <div class="row">
          <input type="text" name="user_company" placeholder="Company" />
          <input type="text" name="subject" placeholder="Subject" required />
        </div>
        <textarea name="message" rows="3" placeholder="Message" required></textarea>
        <button type="submit" class="btn" v-magnetic="0.3">Send message</button>
      </form>
      <p class="sign">{{ profile.name }} · {{ profile.email }}</p>
    </footer>
  </div>
</template>

<style scoped>
.flux {
  --rose: #ec4899;
  --rose-2: #f472b6;
  --pink: #fbcfe8;
  --pink-soft: #fce7f3;
  --bg: #fff6fa;
  --ink: #4a3a44;
  --muted: #8b7d86;
  --line: rgba(236,72,153,0.16);
  position: relative;
  background: var(--bg);
  color: var(--ink);
  font-family: "Poppins", system-ui, sans-serif;
  overflow-x: hidden;
}
.gl { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; }

/* hero */
.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; }
.hero-tagline { text-transform: uppercase; letter-spacing: 0.4em; font-size: 13px; color: #b03a6e; margin-bottom: 18px; opacity: 0.9; text-shadow: 0 1px 14px rgba(255,255,255,0.8); }
.hero-title { font-family: "Libre Baskerville", serif; font-weight: 700; line-height: 0.86; letter-spacing: -0.02em; color: #3a2730; text-shadow: 0 6px 36px rgba(255,255,255,0.55); }
.hero-title .line { display: block; overflow: hidden; }
.hero-title .ch { display: inline-block; font-size: clamp(64px, 16vw, 220px); }
.hero-sub { margin-top: 24px; font-size: clamp(16px, 2vw, 21px); color: #5a4751; max-width: 30ch; text-shadow: 0 1px 12px rgba(255,255,255,0.7); }
.hero-cta { display: flex; gap: 14px; margin-top: 32px; }
.hero-meta { display: flex; gap: 20px; margin-top: 30px; }
.hero-meta a { color: rgba(74,58,68,0.75); text-decoration: none; font-size: 14px; transition: color 0.2s; text-shadow: 0 1px 10px rgba(255,255,255,0.7); }
.hero-meta a:hover { color: var(--rose); }
.scroll-hint { position: absolute; bottom: 26px; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(74,58,68,0.65); animation: bob 2s ease-in-out infinite; }
@keyframes bob { 50% { transform: translateY(8px); } }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px; border-radius: 999px; background: var(--rose); color: #fff; font-weight: 600; text-decoration: none; border: 1px solid transparent; cursor: pointer; font-size: 15px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 10px 36px -10px rgba(236,72,153,0.6); }
.btn:hover { box-shadow: 0 16px 46px -8px rgba(236,72,153,0.75); }
.btn.ghost { background: rgba(255,255,255,0.6); color: var(--rose); border-color: rgba(236,72,153,0.35); backdrop-filter: blur(8px); box-shadow: none; }

/* content */
.content { position: relative; z-index: 2; background: rgba(255,250,252,0.86); backdrop-filter: blur(3px); border-top: 1px solid var(--line); }
.sec { max-width: 1080px; margin: 0 auto; padding: 100px 24px; }
.sec-head { display: flex; align-items: baseline; gap: 16px; margin-bottom: 48px; border-bottom: 1px solid var(--line); padding-bottom: 18px; }
.idx { font-family: "Libre Baskerville", serif; color: var(--rose); font-size: 15px; }
.sec-head h2 { font-family: "Libre Baskerville", serif; font-size: clamp(30px, 5vw, 60px); font-weight: 700; color: #3a2730; }

.about { display: grid; grid-template-columns: 200px 1fr; gap: 40px; align-items: start; }
.avatar { width: 200px; height: 200px; object-fit: cover; border-radius: 18px; border: 1px solid rgba(236,72,153,0.3); box-shadow: 0 10px 30px -12px rgba(236,72,153,0.35); }
.bio { font-size: 17px; line-height: 1.8; color: #5a4751; }
.facts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
.fact { display: flex; gap: 10px; align-items: center; font-size: 14px; color: var(--muted); }
.fact i { color: var(--rose); }
.fact b { display: block; color: #3a2730; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 56px; }
.stat { text-align: center; padding: 24px; border: 1px solid var(--line); border-radius: 16px; background: rgba(255,255,255,0.5); }
.num { display: block; font-size: clamp(32px,4vw,52px); font-weight: 800; color: var(--rose); }
.lbl { font-size: 13px; color: var(--muted); }

.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.card { padding: 30px; border-radius: 18px; border: 1px solid var(--line); background: rgba(255,255,255,0.6); transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s; }
.card:hover { transform: translateY(-6px); border-color: rgba(236,72,153,0.45); box-shadow: 0 18px 40px -20px rgba(236,72,153,0.45); }
.card i { font-size: 26px; color: var(--rose); }
.card h3 { font-size: 19px; font-weight: 700; margin: 14px 0 8px; color: #3a2730; }
.card p { font-size: 14px; line-height: 1.6; color: var(--muted); }

/* skills — radial dials */
.skills { display: grid; grid-template-columns: 1fr; gap: 44px; }
.skgroup h4 { font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--rose); margin-bottom: 24px; }
.dials { display: grid; grid-template-columns: repeat(auto-fit, minmax(116px, 1fr)); gap: 24px; }
.dial { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.dial-ring { position: relative; width: 116px; height: 116px; }
.dial-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.dial-bg { fill: none; stroke: rgba(236,72,153,0.12); stroke-width: 7; }
.dial-fg { fill: none; stroke: url(#dialgrad); stroke-width: 7; stroke-linecap: round; }
.dial-pct { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; color: #3a2730; }
.dial-name { font-size: 13px; font-weight: 600; color: #5a4751; text-align: center; }
.dial:hover .dial-ring { transform: translateY(-4px); }
.dial-ring { transition: transform 0.3s; }

.work { display: flex; flex-direction: column; gap: 26px; }
.proj { display: grid; grid-template-columns: 1.2fr 1fr; gap: 30px; align-items: center; padding: 22px; border-radius: 20px; border: 1px solid var(--line); background: rgba(255,255,255,0.55); }
.proj:nth-child(even) .proj-media { order: 2; }
.proj-media { border-radius: 14px; overflow: hidden; }
.proj-media video { width: 100%; display: block; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
.tags span { font-size: 12px; padding: 4px 11px; border-radius: 999px; background: var(--pink-soft); color: #b03a6e; }
.proj-body h3 { font-size: 24px; font-weight: 700; margin-bottom: 10px; color: #3a2730; }
.proj-body p { font-size: 15px; line-height: 1.7; color: var(--muted); margin-bottom: 16px; }
.proj-links { display: flex; gap: 18px; }
.proj-links a { color: var(--rose); text-decoration: none; font-weight: 600; font-size: 14px; }

.certs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.cert { display: flex; flex-direction: column; gap: 6px; text-decoration: none; color: var(--ink); padding: 14px; border-radius: 16px; border: 1px solid var(--line); background: rgba(255,255,255,0.55); transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s; }
.cert:hover { transform: translateY(-6px); border-color: rgba(236,72,153,0.45); box-shadow: 0 18px 40px -20px rgba(236,72,153,0.45); }
.cert img { width: 100%; height: 150px; object-fit: contain; background: #fff; border-radius: 10px; padding: 8px; }
.c-name { font-weight: 600; font-size: 14px; margin-top: 6px; color: #3a2730; }
.c-iss { font-size: 12px; color: var(--muted); }

/* closing / contact over shader */
.closing { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 80px 24px; }
.closing h2 { font-family: "Libre Baskerville", serif; font-size: clamp(36px, 7vw, 92px); font-weight: 700; line-height: 1; color: #3a2730; text-shadow: 0 6px 36px rgba(255,255,255,0.55); margin-bottom: 40px; }
.form { width: min(560px, 100%); display: flex; flex-direction: column; gap: 14px; background: rgba(255,255,255,0.72); backdrop-filter: blur(16px); padding: 30px; border-radius: 20px; border: 1px solid rgba(236,72,153,0.2); box-shadow: 0 20px 50px -24px rgba(236,72,153,0.4); }
.form .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form input, .form textarea { background: rgba(255,255,255,0.8); border: 1px solid rgba(236,72,153,0.2); border-radius: 12px; padding: 13px 15px; color: var(--ink); font-family: inherit; font-size: 15px; }
.form input::placeholder, .form textarea::placeholder { color: rgba(139,125,134,0.7); }
.form input:focus, .form textarea:focus { outline: none; border-color: var(--rose); }
.sign { margin-top: 26px; color: var(--muted); font-size: 14px; text-shadow: 0 1px 12px rgba(255,255,255,0.6); }

@media (max-width: 860px) {
  .about { grid-template-columns: 1fr; }
  .cards { grid-template-columns: 1fr 1fr; }
  .skills { grid-template-columns: 1fr; }
  .proj, .proj:nth-child(even) .proj-media { grid-template-columns: 1fr; order: 0; }
  .stats { grid-template-columns: 1fr 1fr; }
  .certs { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 540px) {
  .cards, .form .row { grid-template-columns: 1fr; }
}
</style>
