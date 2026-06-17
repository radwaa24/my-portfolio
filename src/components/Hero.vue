<template>
  <section
    id="hero"
    class="h-screen bg-cover object-cover bg-center p-8"
    :style="{
      backgroundImage: `url(${currentBg})`,
      transition: 'background-image 1s ease-in-out', // Smooth transition
      backgroundColor: '#f0f0f0', // Fallback background color
    }"
    data-aos="fade-in"
  >
    <!-- Hidden div to preload images -->
    <div class="hidden">
      <img :src="bg" alt="Preloading background 1" />
      <img :src="bg2" alt="Preloading background 2" />
    </div>

    <div
      class="bg-sky-50 w-fit flex flex-col gap-2 items-start justify-center mt-10 mb-5 p-5 bg-opacity-20 rounded-md"
    >
      <p class="sixtyfour lg:hidden">Radwa Khalaf</p>
      <p class="sixtyfour">
        <span ref="typedRef" class="typed"></span>
      </p>
    </div>
    <div
      class="flex flex-col w-fit justify-center items-center gap-2 text-xl font-semibold"
    >
      <i class="fi fi-rr-down animate-arrow"></i>
      <a
        target="_blank"
        href="https://drive.google.com/file/d/1GQTnmwh2rrj60lXYa-G_Tsn5QyVN5VKy/view?usp=sharing"
        class="bg-sky-50 p-3 px-8 bg-opacity-20 rounded-md hover:bg-opacity-30"
      >
        Resume
      </a>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import Typed from "typed.js";
import bg from "../assets/ten.webp";
import bg2 from "../assets/eight.webp";

const typedRef = ref(null);
const currentBg = ref(bg); // Start with the first background image

onMounted(() => {
  // Typed.js initialization
  const options = {
    strings: [
      "Full-Stack Web Developer",
      "Vue.js & Nuxt.js Specialist",
      "React & Next.js Developer",
      "Node.js Back-Ends",
    ],
    typeSpeed: 50, // Speed of typing
    backSpeed: 0, // Speed of deleting
    loop: true, // Loop the animation
  };
  const typed = new Typed(typedRef.value, options);

  // Background image swapping logic
  const interval = setInterval(() => {
    currentBg.value = currentBg.value === bg ? bg2 : bg; // Swap background
  }, 5000); // 5 seconds

  // Cleanup
  onBeforeUnmount(() => {
    typed.destroy();
    clearInterval(interval);
  });
});
</script>

<style scoped>
.sixtyfour {
  font-family: "Sixtyfour", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-variation-settings: "BLED" 5, "SCAN" 21;
}
@keyframes move-up-down {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
section {
  transition: background-image 1s ease-in-out;
}

.animate-arrow {
  animation: move-up-down 1.5s ease-in-out infinite;
  display: inline-block; /* Ensure it's treated as an inline element */
}
.hidden {
  display: none; /* Ensure the preloading div is hidden */
}
</style>
