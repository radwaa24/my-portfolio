<script setup>
import { RouterView } from "vue-router";
import ExperienceSwitcher from "./components/common/ExperienceSwitcher.vue";
</script>

<template>
  <ExperienceSwitcher />
  <RouterView v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<style>
/* page-level cross-fade between routes */
.route-enter-active,
.route-leave-active {
  transition: opacity 0.35s ease;
}
.route-enter-from,
.route-leave-to {
  opacity: 0;
}
</style>
