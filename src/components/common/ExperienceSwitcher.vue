<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { experiences } from "../../data/portfolio.js";

const route = useRoute();
const current = computed(() => route.path);
const open = ref(false);
const listEl = ref(null);
const currentExp = computed(
  () => experiences.find((e) => e.path === route.path) || experiences[0]
);

// always open the mobile dropdown scrolled to the top (Home first).
// Re-apply after a tick so it beats the browser auto-scrolling the active item into view.
watch(open, (v) => {
  if (!v) return;
  const toTop = () => { if (listEl.value) listEl.value.scrollTop = 0; };
  nextTick(toTop);
  setTimeout(toTop, 70);
});
</script>

<template>
  <nav class="exp" :class="{ open }" aria-label="Choose a portfolio experience">
    <!-- mobile toggle -->
    <button
      class="exp-toggle"
      :style="{ '--accent': currentExp.accent }"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="dot"></span>
      <span class="cur">{{ currentExp.tech }}</span>
      <span class="chev">{{ open ? "✕" : "☰" }}</span>
    </button>

    <!-- backdrop (mobile, when open) -->
    <div v-if="open" class="exp-backdrop" @click="open = false"></div>

    <!-- list: desktop dock / mobile dropdown -->
    <div class="exp-list" ref="listEl">
      <RouterLink
        v-for="exp in experiences"
        :key="exp.path"
        :to="exp.path"
        class="exp-pill"
        :class="{ active: current === exp.path }"
        :style="{ '--accent': exp.accent }"
        @click="open = false"
      >
        <span class="dot"></span>
        <span class="tech">{{ exp.tech }}</span>
        <span class="label">{{ exp.label }}</span>
        <span class="tip">{{ exp.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.exp-pill {
  position: relative;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: color 0.25s, background 0.25s, transform 0.25s;
}
.exp-pill .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
  transition: transform 0.25s;
  flex: 0 0 auto;
}
.exp-pill .label { display: none; }
.exp-pill:hover { color: #fff; transform: translateY(-1px); }
.exp-pill:hover .dot { transform: scale(1.4); }
.exp-pill.active { color: #0a0c10; background: var(--accent); box-shadow: 0 0 22px -2px var(--accent); }
.exp-pill.active .dot { background: #0a0c10; box-shadow: none; }

/* desktop dock */
.exp-list {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3px;
  padding: 6px;
  max-width: min(760px, calc(100vw - 16px));
  border-radius: 26px;
  background: rgba(10, 12, 16, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.6);
  animation: dockIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes dockIn {
  from { opacity: 0; transform: translate(-50%, -20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

/* tooltip (desktop hover) */
.exp-pill .tip {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  white-space: nowrap;
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  background: rgba(10, 12, 16, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 5px 10px;
  border-radius: 8px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
}
.exp-pill:hover .tip { opacity: 1; transform: translateX(-50%) translateY(0); }

.exp-toggle { display: none; }
.exp-backdrop { display: none; }

/* ---------- mobile: collapse into a tap-to-open button ---------- */
@media (max-width: 720px) {
  .exp-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    position: fixed;
    top: 12px;
    right: 12px;
    z-index: 10001;
    padding: 9px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(10, 12, 16, 0.72);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    color: #fff;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
  }
  .exp-toggle .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); }
  .exp-toggle .chev { font-size: 12px; opacity: 0.85; }

  .exp-backdrop { display: block; position: fixed; inset: 0; z-index: 9999; background: rgba(0, 0, 0, 0.2); }

  .exp-list {
    top: 56px;
    right: 12px;
    left: auto;
    transform: translateY(-8px);
    z-index: 10000;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    width: 220px;
    max-height: 76vh;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    gap: 2px;
    padding: 8px;
    border-radius: 16px;
    animation: none;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s, transform 0.25s;
  }
  .exp.open .exp-list { opacity: 1; pointer-events: auto; transform: translateY(0); }
  .exp-pill { padding: 11px 12px; font-size: 14px; }
  .exp-pill .label { display: inline; margin-left: 4px; font-weight: 500; font-size: 12px; opacity: 0.8; }
  .exp-pill .tip { display: none; }
  .exp-pill .tech { min-width: 32px; }
}
</style>
