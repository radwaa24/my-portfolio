<script setup>
import Links from "../components/Links.vue";
import Hero from "../components/Hero.vue";
import About from "../components/About.vue";
import Skills from "../components/Skills.vue";
import Projects from "../components/Projects.vue";
import Certificates from "../components/Certificates.vue";
import Contact from "../components/Contact.vue";
import { process, industries } from "../data/portfolio.js";
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init();
  AOS.refresh();
});
</script>

<template>
  <div class="lg:flex lg:h-screen">
    <Links class="lg:fixed lg:w-[18%] top-0 lg:h-screen" />
    <div class="w-full lg:ml-[18%] lg:w-[82%] min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <section class="pt-10 p-10 border-t-2 border-red-50">
        <div class="flex text-xl gap-1 font-medium mb-10" data-aos="fade-up">
          <h2 class="border-b-2 mx-auto border-red-50 text-2xl p-1 px-3 w-fit">How it works</h2>
        </div>
        <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6 text-slate-700" data-aos="fade-up">
          <div v-for="s in process" :key="s.step" class="border-2 border-red-50 p-6 rounded-lg shadow-sm">
            <i :class="`fi ${s.icon} text-xl mb-3`"></i>
            <h3 class="font-semibold">{{ s.step }} · {{ s.title }}</h3>
            <p class="mt-2">{{ s.description }}</p>
          </div>
        </div>
      </section>

      <section class="pt-10 p-10 border-t-2 border-red-50">
        <div class="flex text-xl gap-1 font-medium mb-10" data-aos="fade-up">
          <h2 class="border-b-2 mx-auto border-red-50 text-2xl p-1 px-3 w-fit">Industries I serve</h2>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-slate-700" data-aos="fade-up">
          <div v-for="i in industries" :key="i.name" class="border-2 border-red-50 p-5 rounded-lg shadow-sm flex items-center gap-3">
            <i :class="`fi ${i.icon} text-xl shrink-0`"></i>
            <span class="font-semibold">{{ i.name }}</span>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  </div>
</template>

<style scoped></style>
