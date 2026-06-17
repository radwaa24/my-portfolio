<template>
  <section
    id="skills"
    ref="skillsSection"
    class="pt-10 p-10 border-t-2 border-red-50"
  >
    <div class="flex text-xl gap-1 font-medium mb-10" data-aos="fade-up">
      <h2 class="border-b-2 mx-auto border-red-50 text-2xl p-1 px-3 w-fit">
        Skills
      </h2>
    </div>
    <!-- Skills Grid -->
    <div
      class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
      data-aos="fade-up"
    >
      <div
        v-for="(skill, index) in skills"
        :key="index"
        class="flex flex-col items-center"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div class="relative w-24 h-24">
          <svg class="w-full h-full">
            <!-- Background Circle -->
            <circle
              class="text-gray-300"
              stroke-width="8"
              stroke="currentColor"
              fill="transparent"
              r="36"
              cx="50%"
              cy="50%"
            />
            <!-- Animated Circle -->
            <circle
              class="text-red-50"
              stroke-width="8"
              stroke-linecap="round"
              stroke="currentColor"
              fill="transparent"
              r="36"
              cx="50%"
              cy="50%"
              :style="{
                strokeDasharray: circumference,
                strokeDashoffset:
                  circumference - (skill.animatedLevel / 100) * circumference,
                transition: 'stroke-dashoffset 1s ease-in-out',
              }"
            />
          </svg>
          <div
            class="absolute inset-0 flex items-center justify-center text-lg font-bold"
          >
            {{ skill.level }}%
          </div>
        </div>
        <h3 class="mt-4 md:text-lg font-medium">{{ skill.name }}</h3>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

const circumference = 2 * Math.PI * 36; // Circumference of the circle
const skills = ref([
  { name: "HTML", level: 95, animatedLevel: 0 },
  { name: "CSS", level: 92, animatedLevel: 0 },
  { name: "JavaScript", level: 90, animatedLevel: 0 },
  { name: "Tailwind CSS", level: 95, animatedLevel: 0 },
  { name: "Vue.js", level: 96, animatedLevel: 0 },
  { name: "Nuxt.js", level: 96, animatedLevel: 0 },
  { name: "React.js", level: 84, animatedLevel: 0 },
  { name: "Next.js", level: 80, animatedLevel: 0 },
  { name: "Node.js", level: 85, animatedLevel: 0 },
  { name: "RESTful APIs", level: 96, animatedLevel: 0 },
  { name: "Full-Stack Apps", level: 88, animatedLevel: 0 },
  { name: "Figma", level: 85, animatedLevel: 0 },
  { name: "Version Control", level: 90, animatedLevel: 0 },
  { name: "Problem Solving", level: 92, animatedLevel: 0 },
  { name: "Communication", level: 98, animatedLevel: 0 },
  { name: "Attention to Detail", level: 95, animatedLevel: 0 },
  { name: "Adaptability", level: 92, animatedLevel: 0 },
  { name: "Collaboration", level: 96, animatedLevel: 0 },
]);

const skillsSection = ref(null);
let observer;

const handleIntersection = (entries) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    skills.value.forEach((skill) => {
      skill.animatedLevel = skill.level; // Trigger animation when section is in view
    });
  }
};

onMounted(() => {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: true, // Animation happens only once
  });

  // Use IntersectionObserver to detect when the section is in view
  observer = new IntersectionObserver(handleIntersection, {
    root: null, // Use the viewport as the root
    threshold: 0.2, // Trigger when 20% of the section is visible
  });

  if (skillsSection.value) {
    observer.observe(skillsSection.value);
  }
});

onUnmounted(() => {
  if (observer && skillsSection.value) {
    observer.unobserve(skillsSection.value);
  }
});
</script>

<style scoped>
circle {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>
