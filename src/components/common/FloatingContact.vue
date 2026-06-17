<script setup>
import { ref } from "vue";
import { contactLinks } from "../../data/portfolio.js";

const open = ref(false);
</script>

<template>
  <div class="fab-wrap" :class="{ open }">
    <div class="channels">
      <a :href="contactLinks.whatsapp" target="_blank" rel="noopener" class="chan wa" style="--d: 0.18s" title="WhatsApp">
        <i class="fi fi-brands-whatsapp"></i><span>WhatsApp</span>
      </a>
      <a :href="contactLinks.telegram" target="_blank" rel="noopener" class="chan tg" style="--d: 0.12s" title="Telegram">
        <i class="fi fi-brands-telegram"></i><span>Telegram</span>
      </a>
      <a :href="contactLinks.email" class="chan em" style="--d: 0.06s" title="Email">
        <i class="fi fi-rr-envelope"></i><span>Email</span>
      </a>
    </div>

    <button class="fab" @click="open = !open" :aria-label="open ? 'Close contact menu' : 'Contact me'">
      <i v-if="!open" class="fi fi-brands-whatsapp"></i>
      <i v-else class="fi fi-rr-cross-small"></i>
      <span v-if="!open" class="fab-label">Let's talk</span>
    </button>
  </div>
</template>

<style scoped>
.fab-wrap {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 9997;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.channels {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.chan {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 18px 11px 14px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transform: translateY(14px) scale(0.9);
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.chan i { font-size: 18px; display: flex; }
.chan.wa { background: #25d366; color: #06351b; }
.chan.tg { background: #229ed9; }
.chan.em { background: #4b5563; }
.fab-wrap.open .chan {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
  transition-delay: var(--d);
}

.fab {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px 0 0;
  height: 60px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 14px 40px -10px rgba(37, 211, 102, 0.7);
  transition: transform 0.2s, box-shadow 0.2s;
}
.fab:hover { transform: translateY(-2px); box-shadow: 0 18px 48px -8px rgba(37, 211, 102, 0.85); }
.fab i {
  width: 60px;
  height: 60px;
  display: grid;
  place-items: center;
  font-size: 26px;
}
.fab-label { font-weight: 700; font-size: 15px; padding-right: 4px; white-space: nowrap; }

/* gentle attention pulse on the closed button */
.fab-wrap:not(.open) .fab::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25d366;
  z-index: -1;
  animation: ring 2.4s ease-out infinite;
}
.fab { position: relative; }
@keyframes ring {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.8); opacity: 0; }
}

@media (max-width: 600px) {
  .fab-wrap { left: 14px; bottom: 14px; }
  .fab { height: 54px; padding-right: 16px; }
  .fab i { width: 54px; height: 54px; font-size: 23px; }
  .fab-label { font-size: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .fab-wrap:not(.open) .fab::before { animation: none; }
}
</style>
