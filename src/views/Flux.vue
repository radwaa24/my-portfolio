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

vec3 palette(float t){
  vec3 a = vec3(0.52, 0.42, 0.62);
  vec3 b = vec3(0.45, 0.40, 0.55);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.10, 0.42, 0.78);
  return a + b*cos(6.28318*(c*t + d));
}
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
  float t = u_time * 0.12;
  vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(5.2,1.3) - t));
  vec2 r = vec2(fbm(uv + 3.5*q + vec2(1.7,9.2) + m*0.45),
                fbm(uv + 3.5*q + vec2(8.3,2.8) - t));
  float f = fbm(uv + 3.5*r);
  vec3 col = palette(f + t + length(q)*0.5);
  col = mix(col, palette(length(r)+0.2+t), 0.5);
  col = mix(vec3(0.04,0.03,0.08), col, smoothstep(0.0,0.9,f+0.25));
  float vig = smoothstep(1.6,0.25,length(uv));
  col *= 0.55 + 0.45*vig;
  gl_FragColor = vec4(pow(col, vec3(1.05)), 1.0);
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
    gsap.utils.toArray(".bar-fill").forEach((el) => {
      gsap.to(el, {
        width: el.dataset.level + "%", duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
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
            <div class="facts">
              <div v-for="f in aboutFacts" :key="f.label" class="fact">
                <i :class="`fi ${f.icon}`"></i>
                <span><b>{{ f.label }}</b>{{ f.value }}</span>
              </div>
            </div>
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
        <div class="skills">
          <div v-for="g in skillGroups" :key="g.category" class="skgroup reveal-up">
            <h4>{{ g.category }}</h4>
            <div v-for="sk in g.skills" :key="sk.name" class="bar">
              <div class="bar-top"><span>{{ sk.name }}</span><span>{{ sk.level }}%</span></div>
              <div class="bar-track"><div class="bar-fill" :data-level="sk.level"></div></div>
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
  --violet: #a78bfa;
  --ink: #0a0812;
  position: relative;
  background: var(--ink);
  color: #f2eeff;
  font-family: "Poppins", system-ui, sans-serif;
  overflow-x: hidden;
}
.gl { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; }

/* hero */
.hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; }
.hero-tagline { text-transform: uppercase; letter-spacing: 0.4em; font-size: 13px; color: #e9e3ff; margin-bottom: 18px; opacity: 0.85; text-shadow: 0 2px 20px rgba(0,0,0,0.5); }
.hero-title { font-family: "Libre Baskerville", serif; font-weight: 700; line-height: 0.86; letter-spacing: -0.02em; text-shadow: 0 8px 50px rgba(0,0,0,0.45); }
.hero-title .line { display: block; overflow: hidden; }
.hero-title .ch { display: inline-block; font-size: clamp(64px, 16vw, 220px); }
.hero-sub { margin-top: 24px; font-size: clamp(16px, 2vw, 21px); color: #efeaff; max-width: 30ch; text-shadow: 0 2px 16px rgba(0,0,0,0.5); }
.hero-cta { display: flex; gap: 14px; margin-top: 32px; }
.hero-meta { display: flex; gap: 20px; margin-top: 30px; }
.hero-meta a { color: rgba(242,238,255,0.75); text-decoration: none; font-size: 14px; transition: color 0.2s; text-shadow: 0 2px 12px rgba(0,0,0,0.5); }
.hero-meta a:hover { color: #fff; }
.scroll-hint { position: absolute; bottom: 26px; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(242,238,255,0.7); animation: bob 2s ease-in-out infinite; }
@keyframes bob { 50% { transform: translateY(8px); } }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px; border-radius: 999px; background: #fff; color: #14101f; font-weight: 600; text-decoration: none; border: 1px solid transparent; cursor: pointer; font-size: 15px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 10px 40px -10px rgba(167,139,250,0.7); }
.btn:hover { box-shadow: 0 14px 50px -8px rgba(167,139,250,0.9); }
.btn.ghost { background: rgba(255,255,255,0.08); color: #fff; border-color: rgba(255,255,255,0.3); backdrop-filter: blur(8px); box-shadow: none; }

/* content */
.content { position: relative; z-index: 2; background: rgba(10,8,18,0.82); backdrop-filter: blur(2px); border-top: 1px solid rgba(167,139,250,0.18); }
.sec { max-width: 1080px; margin: 0 auto; padding: 100px 24px; }
.sec-head { display: flex; align-items: baseline; gap: 16px; margin-bottom: 48px; border-bottom: 1px solid rgba(167,139,250,0.18); padding-bottom: 18px; }
.idx { font-family: "Libre Baskerville", serif; color: var(--violet); font-size: 15px; }
.sec-head h2 { font-family: "Libre Baskerville", serif; font-size: clamp(30px, 5vw, 60px); font-weight: 700; }

.about { display: grid; grid-template-columns: 200px 1fr; gap: 40px; align-items: start; }
.avatar { width: 200px; height: 200px; object-fit: cover; border-radius: 18px; border: 1px solid rgba(167,139,250,0.4); }
.bio { font-size: 17px; line-height: 1.8; color: rgba(242,238,255,0.82); }
.facts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
.fact { display: flex; gap: 10px; align-items: center; font-size: 14px; color: rgba(242,238,255,0.7); }
.fact i { color: var(--violet); }
.fact b { display: block; color: #fff; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 56px; }
.stat { text-align: center; padding: 24px; border: 1px solid rgba(167,139,250,0.18); border-radius: 16px; }
.num { display: block; font-size: clamp(32px,4vw,52px); font-weight: 800; color: var(--violet); }
.lbl { font-size: 13px; color: rgba(242,238,255,0.6); }

.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.card { padding: 30px; border-radius: 18px; border: 1px solid rgba(167,139,250,0.16); background: rgba(167,139,250,0.04); transition: transform 0.3s, border-color 0.3s; }
.card:hover { transform: translateY(-6px); border-color: rgba(167,139,250,0.5); }
.card i { font-size: 26px; color: var(--violet); }
.card h3 { font-size: 19px; font-weight: 700; margin: 14px 0 8px; }
.card p { font-size: 14px; line-height: 1.6; color: rgba(242,238,255,0.65); }

.skills { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.skgroup h4 { font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--violet); margin-bottom: 18px; }
.bar { margin-bottom: 16px; }
.bar-top { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 7px; }
.bar-track { height: 6px; border-radius: 6px; background: rgba(255,255,255,0.08); overflow: hidden; }
.bar-fill { width: 0; height: 100%; border-radius: 6px; background: linear-gradient(90deg, var(--violet), #f0abfc); }

.work { display: flex; flex-direction: column; gap: 26px; }
.proj { display: grid; grid-template-columns: 1.2fr 1fr; gap: 30px; align-items: center; padding: 22px; border-radius: 20px; border: 1px solid rgba(167,139,250,0.14); background: rgba(255,255,255,0.02); }
.proj:nth-child(even) .proj-media { order: 2; }
.proj-media { border-radius: 14px; overflow: hidden; }
.proj-media video { width: 100%; display: block; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
.tags span { font-size: 12px; padding: 4px 11px; border-radius: 999px; background: rgba(167,139,250,0.14); color: var(--violet); }
.proj-body h3 { font-size: 24px; font-weight: 700; margin-bottom: 10px; }
.proj-body p { font-size: 15px; line-height: 1.7; color: rgba(242,238,255,0.7); margin-bottom: 16px; }
.proj-links { display: flex; gap: 18px; }
.proj-links a { color: var(--violet); text-decoration: none; font-weight: 600; font-size: 14px; }

.certs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.cert { display: flex; flex-direction: column; gap: 6px; text-decoration: none; color: #f2eeff; padding: 14px; border-radius: 16px; border: 1px solid rgba(167,139,250,0.16); transition: transform 0.3s, border-color 0.3s; }
.cert:hover { transform: translateY(-6px); border-color: rgba(167,139,250,0.5); }
.cert img { width: 100%; height: 150px; object-fit: contain; background: #fff; border-radius: 10px; padding: 8px; }
.c-name { font-weight: 600; font-size: 14px; margin-top: 6px; }
.c-iss { font-size: 12px; color: rgba(242,238,255,0.5); }

/* closing / contact over shader */
.closing { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 80px 24px; }
.closing h2 { font-family: "Libre Baskerville", serif; font-size: clamp(36px, 7vw, 92px); font-weight: 700; line-height: 1; text-shadow: 0 8px 50px rgba(0,0,0,0.5); margin-bottom: 40px; }
.form { width: min(560px, 100%); display: flex; flex-direction: column; gap: 14px; background: rgba(10,8,18,0.55); backdrop-filter: blur(16px); padding: 30px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.14); }
.form .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form input, .form textarea { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.16); border-radius: 12px; padding: 13px 15px; color: #fff; font-family: inherit; font-size: 15px; }
.form input::placeholder, .form textarea::placeholder { color: rgba(242,238,255,0.45); }
.form input:focus, .form textarea:focus { outline: none; border-color: var(--violet); }
.sign { margin-top: 26px; color: rgba(242,238,255,0.7); font-size: 14px; text-shadow: 0 2px 14px rgba(0,0,0,0.5); }

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
