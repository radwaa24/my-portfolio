import { onMounted, onBeforeUnmount } from "vue";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------
//  Buttery smooth scrolling (Lenis) wired into GSAP ScrollTrigger.
//  Per-view lifecycle so SPA route changes never leave a stray instance.
//  Honours prefers-reduced-motion (falls back to native scroll).
// ---------------------------------------------------------------------
export function useSmoothScroll(opts = {}) {
  let lenis = null;
  const mq = (q) =>
    typeof window !== "undefined" && window.matchMedia && window.matchMedia(q).matches;
  // Skip Lenis on touch / small screens: it fights native momentum scrolling
  // on phones and can stall scroll-triggered reveals. Use native scroll there.
  const disabled =
    mq("(prefers-reduced-motion: reduce)") || mq("(pointer: coarse)") || mq("(max-width: 768px)");

  const tick = (time) => lenis && lenis.raf(time * 1000);

  onMounted(() => {
    if (disabled) {
      // native scroll — just make sure ScrollTrigger measures correctly
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }
    lenis = new Lenis({
      duration: opts.duration ?? 1.15,
      smoothWheel: true,
      touchMultiplier: 1.6,
      ...opts,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // let ScrollTrigger settle after layout/lazy content
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  onBeforeUnmount(() => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  });

  return {
    scrollTo(target, options) {
      if (lenis) lenis.scrollTo(target, options);
      else if (typeof target === "number") window.scrollTo({ top: target });
    },
    getLenis: () => lenis,
  };
}
