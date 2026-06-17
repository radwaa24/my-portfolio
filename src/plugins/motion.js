// =====================================================================
//  Global motion directives shared by the three themed routes.
//  Register once in main.js:  app.use(motion)
//  All effects honour prefers-reduced-motion.
// =====================================================================

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------------
//  v-reveal  — fade / slide / scale an element into view on scroll
//  Usage: v-reveal  |  v-reveal="{ y: 40, delay: 120, duration: 800 }"
// ---------------------------------------------------------------------
const reveal = {
  mounted(el, binding) {
    const o = binding.value || {};
    const y = o.y ?? 28;
    const x = o.x ?? 0;
    const scale = o.scale ?? 1;
    const delay = o.delay ?? 0;
    const duration = o.duration ?? 750;

    if (reduceMotion()) {
      el.style.opacity = "1";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = `translate(${x}px, ${y}px) scale(${scale === 1 ? 1 : scale})`;
    el.style.willChange = "opacity, transform";

    const show = () => {
      el.style.transition = `opacity ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms`;
      el.style.opacity = "1";
      el.style.transform = "translate(0,0) scale(1)";
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    el._revealObserver = io;
  },
  unmounted(el) {
    el._revealObserver?.disconnect();
  },
};

// ---------------------------------------------------------------------
//  v-tilt — 3D pointer tilt for cards
//  Usage: v-tilt  |  v-tilt="10"   (max degrees)
// ---------------------------------------------------------------------
const tilt = {
  mounted(el, binding) {
    if (reduceMotion()) return;
    const max = typeof binding.value === "number" ? binding.value : 9;
    el.style.transformStyle = "preserve-3d";
    el.style.transition = "transform .2s ease";

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el._tiltCleanup = () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  },
  unmounted(el) {
    el._tiltCleanup?.();
  },
};

// ---------------------------------------------------------------------
//  v-magnetic — element gently follows the pointer
//  Usage: v-magnetic  |  v-magnetic="0.4"  (strength)
// ---------------------------------------------------------------------
const magnetic = {
  mounted(el, binding) {
    if (reduceMotion()) return;
    const strength = typeof binding.value === "number" ? binding.value : 0.35;
    el.style.transition = "transform .25s cubic-bezier(.16,1,.3,1)";

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el._magCleanup = () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  },
  unmounted(el) {
    el._magCleanup?.();
  },
};

// ---------------------------------------------------------------------
//  v-count — animate a number from 0 → target when it scrolls into view
//  Usage: v-count="{ to: 9, suffix: '+', duration: 1600 }"
// ---------------------------------------------------------------------
const count = {
  mounted(el, binding) {
    const o = binding.value || {};
    const to = Number(o.to ?? 0);
    const from = Number(o.from ?? 0);
    const duration = o.duration ?? 1600;
    const suffix = o.suffix ?? "";
    const prefix = o.prefix ?? "";
    const decimals = o.decimals ?? 0;

    const setText = (n) => {
      el.textContent = `${prefix}${n.toFixed(decimals)}${suffix}`;
    };

    if (reduceMotion()) {
      setText(to);
      return;
    }

    setText(from);
    let started = false;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setText(from + (to - from) * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            run();
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    el._countObserver = io;
  },
  unmounted(el) {
    el._countObserver?.disconnect();
  },
};

// ---------------------------------------------------------------------
//  v-lazyvideo — defer video download until it scrolls into view, then
//  autoplay; pause when it scrolls away. Saves huge upfront bandwidth.
//  Usage: <video v-lazyvideo="p.video" muted loop playsinline></video>
//  (omit :src and autoplay — the directive owns both)
// ---------------------------------------------------------------------
const lazyvideo = {
  mounted(el, binding) {
    const src = binding.value;
    el.muted = true;
    el.loop = true;
    el.playsInline = true;
    el.setAttribute("playsinline", "");
    el.preload = "none";
    el.removeAttribute("autoplay");

    let loaded = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!loaded && src) {
              el.src = src; // begin download only now
              loaded = true;
            }
            const p = el.play();
            if (p && p.catch) p.catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    el._lazyVideoObserver = io;
  },
  unmounted(el) {
    el._lazyVideoObserver?.disconnect();
    try {
      el.pause();
      el.removeAttribute("src");
      el.load();
    } catch (e) {
      /* ignore */
    }
  },
};

// ---------------------------------------------------------------------
//  v-anim — varied scroll-reveal animations so each section differs.
//  Usage: v-anim="'clip'"  |  v-anim="{ type: 'stagger', delay: 120 }"
//  types: up · down · left · right · zoom · flip · rotate · blur · clip · stagger
// ---------------------------------------------------------------------
const ANIM = {
  up: { opacity: 0, transform: "translateY(46px)" },
  down: { opacity: 0, transform: "translateY(-46px)" },
  left: { opacity: 0, transform: "translateX(-70px)" },
  right: { opacity: 0, transform: "translateX(70px)" },
  zoom: { opacity: 0, transform: "scale(0.84)" },
  flip: { opacity: 0, transform: "perspective(900px) rotateX(38deg)" },
  rotate: { opacity: 0, transform: "rotate(-7deg) translateY(42px)" },
  blur: { opacity: 0, filter: "blur(16px)", transform: "scale(1.05)" },
  clip: { clipPath: "inset(0 0 100% 0)" },
};
const anim = {
  mounted(el, binding) {
    const o =
      typeof binding.value === "object" && binding.value
        ? binding.value
        : { type: binding.value };
    const type = o.type || "up";
    const delay = o.delay ?? 0;
    const dur = o.duration ?? 850;
    if (reduceMotion()) {
      el.style.opacity = "1";
      return;
    }
    const ease = "cubic-bezier(.16,1,.3,1)";

    if (type === "stagger") {
      const kids = Array.from(el.children);
      kids.forEach((k) => {
        k.style.opacity = "0";
        k.style.transform = "translateY(30px)";
      });
      const io = new IntersectionObserver(
        (e, obs) =>
          e.forEach((en) => {
            if (en.isIntersecting) {
              kids.forEach((k, i) => {
                k.style.transition = `opacity ${dur}ms ${ease} ${delay + i * 85}ms, transform ${dur}ms ${ease} ${delay + i * 85}ms`;
                k.style.opacity = "1";
                k.style.transform = "none";
              });
              obs.unobserve(el);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      io.observe(el);
      el._animIO = io;
      return;
    }

    const from = ANIM[type] || ANIM.up;
    Object.assign(el.style, from);
    el.style.willChange = "opacity, transform, filter, clip-path";
    const io = new IntersectionObserver(
      (e, obs) =>
        e.forEach((en) => {
          if (en.isIntersecting) {
            el.style.transition = `opacity ${dur}ms ${ease} ${delay}ms, transform ${dur}ms ${ease} ${delay}ms, filter ${dur}ms ease ${delay}ms, clip-path ${dur}ms ${ease} ${delay}ms`;
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.filter = "none";
            el.style.clipPath = "inset(0 0 0% 0)";
            obs.unobserve(el);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    el._animIO = io;
  },
  unmounted(el) {
    el._animIO?.disconnect();
  },
};

export default {
  install(app) {
    app.directive("reveal", reveal);
    app.directive("tilt", tilt);
    app.directive("magnetic", magnetic);
    app.directive("count", count);
    app.directive("lazyvideo", lazyvideo);
    app.directive("anim", anim);
  },
};
