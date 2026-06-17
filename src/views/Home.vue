<script setup>
import Links from "../components/Links.vue";
import Hero from "../components/Hero.vue";
import About from "../components/About.vue";
import Skills from "../components/Skills.vue";
import Projects from "../components/Projects.vue";
import Certificates from "../components/Certificates.vue";
import Contact from "../components/Contact.vue";
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init();
  AOS.refresh();
});
</script>

<template>
  <div class="flex h-screen">
    <Links class="lg:fixed lg:w-[18%] top-0 lg:h-screen" />
    <div class="lg:ml-[18%] lg:w-[82%] min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
    </div>
  </div>
</template>

<style scoped></style>
