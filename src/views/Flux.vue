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
const fullName = `${profile.firstName} ${profile.lastName}`;

/* ---- code texture clipped into the name letters ---- */
const xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const codeLines = [
  { t: "const flow = () => {", c: "#f472b6" },
  { t: "  return Template()", c: "#fda4af" },
  { t: "}", c: "#e5e7eb" },
  { t: "async function build() {", c: "#f472b6" },
  { t: "  await deploy(app)", c: "#f9a8d4" },
  { t: "  const res = api.get()", c: "#fbcfe8" },
  { t: "}", c: "#e5e7eb" },
  { t: ".hero { display: grid }", c: "#fbcfe8" },
  { t: "v-for='p in projects'", c: "#f9a8d4" },
  { t: "export default { ui }", c: "#f472b6" },
  { t: "import { ref } from vue", c: "#fda4af" },
  { t: "git push origin main", c: "#9ca3af" },
  { t: "npm run dev --open", c: "#e5e7eb" },
  { t: "useState(() => 0)", c: "#fda4af" },
  { t: "if (ready) render()", c: "#f472b6" },
  { t: "{ ...props, ready }", c: "#f9a8d4" },
  { t: "router.push('/work')", c: "#fbcfe8" },
  { t: "height: 100vh;", c: "#fbcfe8" },
  { t: "transition: all .3s", c: "#9ca3af" },
  { t: "onMounted(() => init())", c: "#fda4af" },
  { t: "data.map(x => x.id)", c: "#f9a8d4" },
  { t: "background: #ec4899", c: "#f472b6" },
];
const codeSvg =
  `<svg xmlns='http://www.w3.org/2000/svg' width='460' height='440' viewBox='0 0 460 440'>` +
  `<rect width='460' height='440' fill='#0a0d14'/>` +
  `<g font-family='ui-monospace,Menlo,Consolas,monospace' font-size='17' font-weight='600'>` +
  codeLines.map((l, i) => `<text x='10' y='${18 + i * 20}' fill='${l.c}'>${xml(l.t)}</text>`).join("") +
  `</g></svg>`;
const codeBg = `url("data:image/svg+xml,${encodeURIComponent(codeSvg)}")`;

/* only GitHub + LinkedIn flank the Resume button in the hero */
const gh = socials.find((s) => s.name === "GitHub");
const li = socials.find((s) => s.name === "LinkedIn");

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
  for(int i=0;i<5;i++){ v += a*noise(p); p = p*2.0 + 17.3; a *= 0.5; }
  return v;
}
mat2 rot(float a){ float s=sin(a), c=cos(a); return mat2(c,-s,s,c); }

// one soft 5-petal flower in local space; returns coverage 0..1 and core mask
float flower(vec2 p, float sc, out float core){
  p /= sc;
  float r = length(p);
  float a = atan(p.y, p.x);
  float petal = 0.5 + 0.5*abs(cos(a*2.5));   // 5 lobes
  float edge  = petal*0.92;
  float body  = smoothstep(edge, edge-0.22, r);
  core = smoothstep(0.30, 0.0, r);
  return clamp(body + core*0.7, 0.0, 1.0);
}

// scattered flowers — dense, even-sized, gently floating
float flowers(vec2 uv, float t, out float coreOut){
  float acc = 0.0; coreOut = 0.0;
  vec2 g  = uv * 2.4;
  vec2 id = floor(g);
  vec2 f  = fract(g) - 0.5;
  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 o = vec2(float(x), float(y));
      float h  = hash(id + o);
      if(h < 0.45) continue;                 // most cells bloom -> denser field
      float h2 = hash(id + o + 31.4);
      // gentle floating sway so each flower drifts on its own little path
      vec2 sway = vec2(sin(t*1.2 + h*6.2831), cos(t*1.0 + h2*6.2831)) * 0.13;
      vec2 p = f - (o + (vec2(h, h2)-0.5)*0.5 + sway);
      p = rot(t*0.35*(h-0.5) + h2*6.2831) * p;
      float c;
      float fv = flower(p, 0.17 + 0.04*h2, c);  // near-uniform size
      if(fv > acc){ acc = fv; coreOut = c; }
    }
  }
  return acc;
}

void main(){
  vec2 uv = (gl_FragCoord.xy*2.0 - u_res) / min(u_res.x, u_res.y);
  vec2 m  = (u_mouse - 0.5) * 2.0;
  float t = u_time * 0.16;

  // ---- silky flowing waves (domain-warped sine ribbons) ----
  vec2 wp = uv + m*0.10;
  float warp = fbm(wp*1.4 + vec2(0.0, t*0.6));
  float w1 = sin(wp.x*2.2 + t*1.1 + warp*3.0);
  float w2 = sin(wp.x*3.6 - t*0.7 + wp.y*1.8 + warp*2.0);
  float wave = 0.5 + 0.26*w1 + 0.24*w2;                 // 0..1 flowing bands
  float band = fbm(vec2(wp.x*1.1 + t*0.5, wp.y*1.7 - t*0.4));
  float shimmer = fbm(uv*3.2 + vec2(t, -t));

  // ---- pinky / white palette ----
  vec3 white = vec3(1.000, 0.984, 0.992);
  vec3 pink  = vec3(0.992, 0.886, 0.937);
  vec3 rose  = vec3(0.973, 0.776, 0.863);
  vec3 blush = vec3(0.949, 0.671, 0.808);

  vec3 col = mix(white, pink, smoothstep(-1.1, 1.1, uv.y));  // soft vertical wash
  col = mix(col, rose,  smoothstep(0.34, 0.86, wave) * 0.60);
  col = mix(col, blush, smoothstep(0.58, 0.96, band) * 0.32);
  col = mix(col, white, smoothstep(0.30, 0.92, shimmer) * 0.28);

  // ---- flowers riding the waves ----
  vec2 fuv = uv;
  fuv.y += u_time * 0.035;                 // gentle upward drift
  fuv.x += (wave - 0.5) * 0.35;            // softly pushed by the waves
  fuv += m * 0.08;                         // react to pointer
  float core;
  float fl = flowers(fuv, u_time * 0.45, core);
  vec3 petalCol = mix(vec3(1.0, 0.985, 0.992), rose, 0.26);
  col = mix(col, petalCol, fl * 0.58);     // light translucent petals
  col = mix(col, blush, core * 0.55);      // pink flower centers
  col += fl * 0.06 * vec3(1.0, 0.96, 0.98);// soft rim glow

  float vig = smoothstep(1.9, 0.10, length(uv));
  col *= 0.93 + 0.07 * vig;
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
    gsap.from(".hero-title .ttext", {
      yPercent: 40,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      delay: 0.2,
    });
    gsap.from([".hero-stack", ".hero-sub", ".hero-meta"], {
      y: 30, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.6,
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
      <p class="hero-tagline">{{ profile.heroTagline }}</p>
      <h1 class="hero-title">
        <span class="ttext" :style="{ '--code': codeBg }">{{ fullName }}</span>
      </h1>
      <div class="hero-stack">
        <span v-for="t in profile.stack" :key="t">{{ t }}</span>
      </div>
      <p class="hero-sub">A front-end specialist fluent in Vue &amp; React, I craft fluid, pixel-perfect interfaces — and ship complete full-stack apps built in Nuxt.</p>
      <div class="hero-meta">
        <a :href="gh.url" target="_blank" :aria-label="gh.name">
          <i :class="`fi ${gh.brand}`"></i><span>{{ gh.name }}</span>
        </a>
        <a class="resume-btn" :href="profile.resume" target="_blank" aria-label="Resume" v-magnetic="0.4">
          <i class="fi fi-rr-document"></i><span>Resume</span>
        </a>
        <a :href="li.url" target="_blank" :aria-label="li.name">
          <i :class="`fi ${li.brand}`"></i><span>{{ li.name }}</span>
        </a>
      </div>
      <div class="scroll-hint" aria-hidden="true">
        <span class="scroll-line"></span>
        <span class="scroll-flower">
          <svg viewBox="0 0 48 48">
            <g class="petals">
              <ellipse v-for="n in 5" :key="n" cx="24" cy="13" rx="6.5" ry="11"
                :transform="`rotate(${(n - 1) * 72} 24 24)`" />
            </g>
            <circle class="fcore" cx="24" cy="24" r="6" />
          </svg>
        </span>
      </div>
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
        <div class="svc-grid">
          <article v-for="(srv, i) in services" :key="srv.title" class="svc reveal-up">
            <span class="svc-num">{{ String(i + 1).padStart(2, "0") }}</span>
            <span class="svc-orb"><i :class="`fi ${srv.icon}`"></i></span>
            <h3>{{ srv.title }}</h3>
            <p>{{ srv.description }}</p>
            <span class="svc-line"></span>
          </article>
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
        <ol class="proc">
          <li v-for="s in process" :key="s.step" class="proc-step reveal-up">
            <span class="proc-rail"><span class="proc-node">{{ s.step }}</span></span>
            <div class="proc-body">
              <span class="proc-ic"><i :class="`fi ${s.icon}`"></i></span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.description }}</p>
            </div>
          </li>
        </ol>
      </section>

      <section class="sec">
        <div class="sec-head reveal-up"><span class="idx">07</span><h2>Industries</h2></div>
        <p class="inds-lead reveal-up">Trusted across the sectors I build for every day.</p>
        <div class="inds reveal-up">
          <span
            v-for="(ind, i) in industries"
            :key="ind.name"
            class="ind"
            :style="{ '--d': i * 0.25 + 's' }"
          >
            <i :class="`fi ${ind.icon}`"></i>{{ ind.name }}
          </span>
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
.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 96px 24px 110px; }
.hero-tagline { text-transform: uppercase; letter-spacing: 0.4em; font-size: 12px; color: #b03a6e; margin-bottom: 22px; opacity: 0.9; text-shadow: 0 1px 14px rgba(255,255,255,0.8); }
.hero-title { font-family: "Fraunces", "Libre Baskerville", serif; font-weight: 700; line-height: 1; letter-spacing: -0.02em; filter: drop-shadow(0 4px 22px rgba(255,255,255,0.7)) drop-shadow(0 2px 3px rgba(10,13,20,0.35)); }
.hero-title .ttext {
  display: inline-block;
  white-space: nowrap;
  font-size: clamp(34px, 9vw, 124px);
  font-variation-settings: "opsz" 144;
  color: #0a0d14;                 /* fallback: solid black name */
  background-color: #0a0d14;
  background-image: var(--code);
  background-repeat: repeat;
  background-size: auto 54px;     /* tiny, dense, unreadable code */
  background-position: 0 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  will-change: background-position;
  animation: codeScroll 9s linear infinite;
}
@keyframes codeScroll {
  from { background-position: 0 0; }
  to   { background-position: 0 -216px; }   /* 4 × 54px, scrolls bottom → top */
}
.hero-stack { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 22px; }
.hero-stack span { font-size: 12px; font-weight: 600; letter-spacing: 0.04em; color: #b03a6e; padding: 5px 13px; border-radius: 999px; background: rgba(255,255,255,0.62); border: 1px solid rgba(236,72,153,0.22); backdrop-filter: blur(6px); box-shadow: 0 4px 14px -8px rgba(236,72,153,0.4); }
.hero-sub { margin-top: 22px; font-size: clamp(15px, 1.7vw, 19px); line-height: 1.65; color: #5a4751; max-width: 52ch; text-shadow: 0 1px 12px rgba(255,255,255,0.7); }
.hero-meta { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 14px; margin-top: 36px; }
.hero-meta a { display: inline-flex; align-items: center; gap: 8px; color: rgba(74,58,68,0.8); text-decoration: none; font-size: 14px; font-weight: 600; padding: 9px 16px 9px 11px; border-radius: 999px; background: rgba(255,255,255,0.6); border: 1px solid rgba(236,72,153,0.2); backdrop-filter: blur(6px); box-shadow: 0 4px 14px -8px rgba(236,72,153,0.4); transition: color 0.25s, background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s; }
.hero-meta a i { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: rgba(236,72,153,0.12); color: var(--rose); font-size: 14px; transition: background 0.25s, color 0.25s; }
.hero-meta a:not(.resume-btn):hover { transform: translateY(-3px); color: #fff; background: linear-gradient(135deg, var(--rose-2), var(--rose)); border-color: transparent; box-shadow: 0 14px 30px -14px rgba(236,72,153,0.7); }
.hero-meta a:not(.resume-btn):hover i { background: rgba(255,255,255,0.22); color: #fff; }

/* unique, animated Resume button between the two social links */
.hero-meta .resume-btn { position: relative; overflow: hidden; color: #fff; font-size: 15px; padding: 12px 24px 12px 14px; border: 1px solid transparent; background: linear-gradient(120deg, var(--rose-2), var(--rose) 55%, #db2777); background-size: 200% 100%; box-shadow: 0 12px 30px -10px rgba(236,72,153,0.7); animation: resumeGlow 3s ease-in-out infinite, resumeFlow 6s linear infinite; }
.hero-meta .resume-btn i { background: rgba(255,255,255,0.22); color: #fff; }
/* sweeping shine */
.hero-meta .resume-btn::before { content: ""; position: absolute; top: 0; left: -60%; width: 45%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent); transform: skewX(-20deg); animation: resumeShine 3.4s ease-in-out infinite; }
.hero-meta .resume-btn span { position: relative; z-index: 1; }
.hero-meta .resume-btn:hover { transform: translateY(-4px) scale(1.04); box-shadow: 0 20px 44px -12px rgba(236,72,153,0.85); }
.hero-meta .resume-btn:hover i { animation: resumeBob 0.7s ease-in-out infinite; }
@keyframes resumeGlow { 50% { box-shadow: 0 12px 38px -8px rgba(236,72,153,0.95); } }
@keyframes resumeFlow { to { background-position: 200% 0; } }
@keyframes resumeShine { 0% { left: -60%; } 55%, 100% { left: 130%; } }
@keyframes resumeBob { 50% { transform: translateY(-3px); } }
.scroll-hint { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; }
.scroll-line { width: 1px; height: 34px; background: linear-gradient(to bottom, transparent, var(--rose)); transform-origin: top; animation: scrollPulse 1.9s ease-in-out infinite; }
@keyframes scrollPulse { 0%, 100% { transform: scaleY(0.35); opacity: 0.4; } 50% { transform: scaleY(1); opacity: 1; } }
.scroll-flower { display: block; width: 32px; height: 32px; transform-origin: center; will-change: transform; animation: scrollBob 1.9s ease-in-out infinite; }
.scroll-flower svg { display: block; width: 100%; height: 100%; transform-origin: 50% 50%; will-change: transform; animation: scrollSpin 8s linear infinite; filter: drop-shadow(0 4px 10px rgba(236,72,153,0.45)); }
.scroll-flower .petals { transform-origin: 24px 24px; animation: scrollBloom 1.9s ease-in-out infinite; }
.scroll-flower .petals ellipse { fill: var(--rose-2); }
.scroll-flower .petals ellipse:nth-child(even) { fill: var(--rose); }
.scroll-flower .fcore { fill: #fff; }
@keyframes scrollBob { 0%, 100% { transform: translateY(-3px); } 50% { transform: translateY(8px); } }
@keyframes scrollSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes scrollBloom { 0%, 100% { transform: scale(0.85); } 50% { transform: scale(1.08); } }

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

/* ── 02 Services — gradient-orb feature cards ───────────────── */
.svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.svc { position: relative; overflow: hidden; padding: 30px 28px 34px; border-radius: 22px; border: 1px solid var(--line); background: linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.5)); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, box-shadow 0.4s; }
.svc:hover { transform: translateY(-8px); border-color: rgba(236,72,153,0.4); box-shadow: 0 26px 50px -26px rgba(236,72,153,0.55); }
.svc-num { position: absolute; top: 20px; right: 24px; font-family: "Fraunces", serif; font-size: 30px; font-weight: 500; color: rgba(236,72,153,0.18); transition: color 0.4s; }
.svc:hover .svc-num { color: rgba(236,72,153,0.4); }
.svc-orb { display: grid; place-items: center; width: 58px; height: 58px; border-radius: 18px; background: linear-gradient(135deg, var(--rose-2), var(--rose)); color: #fff; font-size: 24px; box-shadow: 0 12px 28px -12px rgba(236,72,153,0.7); transition: transform 0.4s; }
.svc:hover .svc-orb { transform: scale(1.08) rotate(-4deg); }
.svc h3 { font-family: "Fraunces", serif; font-size: 21px; font-weight: 600; margin: 20px 0 10px; color: #3a2730; }
.svc p { font-size: 14px; line-height: 1.7; color: var(--muted); }
.svc-line { display: block; height: 2px; width: 28px; margin-top: 18px; border-radius: 2px; background: linear-gradient(90deg, var(--rose), transparent); transition: width 0.4s cubic-bezier(0.16,1,0.3,1); }
.svc:hover .svc-line { width: 70px; }

/* ── 06 Process — fluid vertical timeline ───────────────────── */
.proc { list-style: none; position: relative; max-width: 720px; margin: 0 auto; }
.proc-step { position: relative; display: grid; grid-template-columns: 64px 1fr; gap: 22px; padding-bottom: 38px; }
.proc-step:last-child { padding-bottom: 0; }
.proc-rail { position: relative; display: flex; justify-content: center; }
.proc-rail::before { content: ""; position: absolute; top: 56px; bottom: -38px; width: 2px; background: linear-gradient(to bottom, var(--rose), rgba(236,72,153,0.12)); }
.proc-step:last-child .proc-rail::before { display: none; }
.proc-node { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; font-family: "Fraunces", serif; font-size: 19px; font-weight: 600; color: var(--rose); background: rgba(255,255,255,0.85); border: 2px solid rgba(236,72,153,0.4); box-shadow: 0 10px 26px -14px rgba(236,72,153,0.6); transition: transform 0.35s, background 0.35s, color 0.35s; z-index: 1; }
.proc-step:hover .proc-node { transform: scale(1.1); background: linear-gradient(135deg, var(--rose-2), var(--rose)); color: #fff; }
.proc-body { padding: 6px 4px; }
.proc-ic { display: inline-flex; align-items: center; gap: 8px; color: var(--rose); font-size: 18px; }
.proc-body h3 { font-family: "Fraunces", serif; font-size: 20px; font-weight: 600; margin: 8px 0 8px; color: #3a2730; }
.proc-body p { font-size: 14.5px; line-height: 1.7; color: var(--muted); }

/* ── 07 Industries — floating pill cloud ────────────────────── */
.inds-lead { text-align: center; color: var(--muted); font-size: 15px; margin-bottom: 34px; }
.inds { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }
.ind { display: inline-flex; align-items: center; gap: 10px; padding: 13px 22px; border-radius: 999px; font-size: 14.5px; font-weight: 600; color: #5a4751; background: rgba(255,255,255,0.6); border: 1px solid var(--line); animation: indFloat 5s ease-in-out infinite; animation-delay: var(--d); transition: transform 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s, background 0.3s; }
.ind i { font-size: 17px; color: var(--rose); transition: color 0.3s; }
.ind:hover { transform: translateY(-4px) scale(1.04); color: #fff; background: linear-gradient(135deg, var(--rose-2), var(--rose)); border-color: transparent; box-shadow: 0 16px 34px -16px rgba(236,72,153,0.7); }
.ind:hover i { color: #fff; }
@keyframes indFloat { 50% { transform: translateY(-6px); } }

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
  .svc-grid { grid-template-columns: 1fr 1fr; }
  .skills { grid-template-columns: 1fr; }
  .proj, .proj:nth-child(even) .proj-media { grid-template-columns: 1fr; order: 0; }
  .stats { grid-template-columns: 1fr 1fr; }
  .certs { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 540px) {
  .svc-grid, .form .row { grid-template-columns: 1fr; }
  .proc-step { grid-template-columns: 48px 1fr; gap: 16px; }
  .proc-node { width: 46px; height: 46px; font-size: 16px; }
  .proc-rail::before { top: 48px; }
}
</style>
