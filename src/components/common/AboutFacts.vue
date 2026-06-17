<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { aboutFacts, experiences } from "../../data/portfolio.js";

const route = useRoute();
function hexToRgb(hex) {
  const h = (hex || "#888888").replace("#", "");
  const f = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [parseInt(f.slice(0, 2), 16) || 136, parseInt(f.slice(2, 4), 16) || 136, parseInt(f.slice(4, 6), 16) || 136];
}
function mix([r, g, b], toWhite, a) {
  const t = toWhite ? 255 : 0;
  const fn = (v) => Math.round(v + (t - v) * a);
  return `rgb(${fn(r)}, ${fn(g)}, ${fn(b)})`;
}
const vars = computed(() => {
  const exp = experiences.find((e) => e.path === route.path) || {};
  const accent = exp.accent || "#888888";
  const light = !!exp.light;
  const [r, g, b] = hexToRgb(accent);
  return light
    ? { "--acc": accent, "--accT": mix([r, g, b], false, 0.4), "--tint": `rgba(${r},${g},${b},0.13)`, "--fg": "#15151b", "--muted": "rgba(0,0,0,0.55)", "--surface": "rgba(0,0,0,0.03)", "--border": "rgba(0,0,0,0.1)" }
    : { "--acc": accent, "--accT": mix([r, g, b], true, 0.16), "--tint": `rgba(${r},${g},${b},0.16)`, "--fg": "#ffffff", "--muted": "rgba(255,255,255,0.58)", "--surface": "rgba(255,255,255,0.04)", "--border": "rgba(255,255,255,0.12)" };
});
</script>

<template>
  <div class="afacts" :style="vars" v-anim="{ type: 'stagger', delay: 30 }">
    <div v-for="f in aboutFacts" :key="f.label" class="afact">
      <span class="afact-ic"><i :class="`fi ${f.icon}`"></i></span>
      <div class="afact-body">
        <span class="afact-label">{{ f.label }}</span>
        <span class="afact-value">{{ f.value }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.afacts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 12px;
  margin-top: 22px;
  font-family: "Poppins", system-ui, sans-serif;
}
.afact {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 15px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s;
}
.afact:hover {
  transform: translateY(-4px);
  border-color: var(--acc);
  box-shadow: 0 16px 32px -20px var(--acc);
}
.afact-ic {
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: var(--tint);
  color: var(--accT);
  font-size: 17px;
}
.afact-body { display: flex; flex-direction: column; min-width: 0; }
.afact-label { font-size: 11px; letter-spacing: 0.13em; text-transform: uppercase; color: var(--muted); font-weight: 700; }
.afact-value { font-size: 14px; color: var(--fg); font-weight: 600; line-height: 1.35; margin-top: 3px; overflow-wrap: anywhere; }
</style>
