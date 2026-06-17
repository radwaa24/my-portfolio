<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { experiences } from "../../data/portfolio.js";

const route = useRoute();
const current = computed(() => route.path);
</script>

<template>
  <nav class="exp-switcher" aria-label="Choose a portfolio experience">
    <RouterLink
      v-for="exp in experiences"
      :key="exp.path"
      :to="exp.path"
      class="exp-pill"
      :class="{ active: current === exp.path }"
      :style="{ '--accent': exp.accent }"
    >
      <span class="dot"></span>
      <span class="tech">{{ exp.tech }}</span>
      <span class="tip">{{ exp.label }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.exp-switcher {
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
  from {
    opacity: 0;
    transform: translate(-50%, -20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

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
}
.exp-pill:hover {
  color: #fff;
  transform: translateY(-1px);
}
.exp-pill:hover .dot {
  transform: scale(1.4);
}
.exp-pill.active {
  color: #0a0c10;
  background: var(--accent);
  box-shadow: 0 0 22px -2px var(--accent);
}
.exp-pill.active .dot {
  background: #0a0c10;
  box-shadow: none;
}

/* tooltip with the design name */
.exp-pill .tip {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  white-space: nowrap;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: #fff;
  background: rgba(10, 12, 16, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 5px 10px;
  border-radius: 8px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
}
.exp-pill:hover .tip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

@media (max-width: 640px) {
  .exp-switcher {
    top: 10px;
    gap: 2px;
    padding: 5px;
  }
  .exp-pill {
    padding: 7px 10px;
    font-size: 12px;
  }
  .exp-pill .tip {
    display: none;
  }
}
</style>
