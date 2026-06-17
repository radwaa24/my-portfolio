<template>
  <section id="projects" class="pt-10 p-10 border-t-2 border-red-50">
    <div class="flex text-xl gap-1 font-medium mb-10" data-aos="fade-up">
      <h2 class="border-b-2 mx-auto border-red-50 text-2xl p-1 px-3 w-fit">
        Projects
      </h2>
    </div>
    <MasonryWall
      :items="projects"
      :ssr-columns="1"
      :column-width="300"
      :gap="16"
    >
      <template #default="{ item }">
        <div class="p-4 bg-red-50 shadow-inner rounded-sm">
          <video class="w-full h-auto" controls autoplay muted playsinline>
            <source :src="item.video" type="video/mp4" />
          </video>
          <h3 class="text-xl font-bold mt-4">{{ item.title }}</h3>
          <p class="text-gray-600">{{ item.description }}</p>
          <div class="flex gap-2 mt-2">
            <a
              v-if="item.demo"
              :href="item.demo"
              target="_blank"
              class="bg-slate-900 text-white hover:bg-gray-800 flex gap-2 px-8 p-2 rounded-md"
            >
              <i class="fi fi-rr-eye flex my-auto"></i>Live Demo</a
            >
            <a
              v-if="item.repo"
              :href="item.repo"
              target="_blank"
              class="bg-slate-900 text-white hover:bg-gray-800 px-8 flex gap-2 p-2 rounded-md"
            >
              <i class="fi fi-brands-github flex my-auto"></i>GitHub repo</a
            >
          </div>
        </div>
      </template>
    </MasonryWall>
  </section>
</template>

<script setup>
// Import Swiper and required modules
import { ref } from "vue";

import top from "../assets/topNbuy.mp4";
import caveo from "../assets/caveo.mp4";
import meits from "../assets/meits.mp4";
import bittrust from "../assets/bittrust.mp4";
import lemon from "../assets/little-lemon.mp4";
import hero from "../assets/hero.webm";
import orders from "../assets/orders.webm";
import mealPrep from "../assets/meal-prep.webm";
import qwizeen from "../assets/qwizeen.webm";
import fascano from "../assets/fascano-web.mp4";
import reservation from "../assets/reservation-web.mp4";
import MasonryWall from "@yeger/vue-masonry-wall";

// Projects data
const projects = ref([
  {
    title: "Fascano",
    description:
      "Fascano delivers all-in-one management systems for restaurants, cafés, hotels and many other business types. As their front-end developer I built a wide range of high-converting landing pages, shipped new features for the dashboard, and contributed to the web-menu project.",
    video: fascano,
    demo: "https://www.fascano.com/en/restaurants",
  },
  {
    title: "Reservation & QR Check-in",
    description:
      "A full reservation platform for booking a hall or a table, generating a unique QR code that guests scan for fast, seamless on-site check-in. Built full-stack with a Nuxt front-end and a Node.js back-end.",
    video: reservation,
  },
  {
    title: "Qwizeen landing pages",
    description:
      "Refactored the Qwizeen landing page with a switchable design for the Qwizeen meal prep page. Created separate landing pages for each service, incorporating smooth animations, a polished layout, and a 'Contact Us' modal for enhanced user experience.",
    video: qwizeen,
    demo: "https://qwizeen.io/",
  },
  {
    title: "Meal prep restaurant",
    description:
      "Developed a landing page UI for meal prep restaurants, featuring home page an FAQ page, and a dynamic menu based on delivery dates. Also implemented login pages and forgot and reset password functionality for both customers and administrators.",
    video: mealPrep,
    demo: "https://kitchen-storys.qwizeen.io/prep",
  },
  {
    title: "Task managment board",
    description:
      "An assessment project for task management featuring drag-and-drop. Users can easily add tasks with options to select a title color and background color. The design emphasizes a basic UI structure to highlight functionality.",
    video: hero,
    repo: "https://github.com/radwaa24/Hero",
  },

  {
    title: "Top & Buy",
    description:
      "UI Transformation: Orchestrated a comprehensive revamp of the React project's user interface.",
    video: top,
    repo: "",
  },
  {
    title: "Caveo",
    description:
      "Led the overhaul of an outdated WordPress-based system, transitioning it to a modern stack.",
    video: caveo,
    demo: "https://caveo.com.kw/",
  },
  {
    title: "Orders management",
    description:
      "An order management project with features to create, list, and update orders. Includes admin login, order filtering by status or date, pagination for better list handling, and payment status synced with Stripe responses.",
    video: orders,
    repo: "https://github.com/radwaa24/velents",
  },
  {
    title: "Meits Tech",
    description:
      "Converted an existing WordPress project to a dynamic Vue.js application.",
    video: meits,
    demo: "https://meitstech.com/",
  },
  {
    title: "Bittrust",
    description:
      "Expanded the functionality of an existing system by incorporating three new pages.",
    video: bittrust,
    repo: "https://github.com/radwaa24/bittrust",
  },
  {
    title: "Little Lemon Restaurant",
    description:
      "Developed a React-based restaurant booking site with Material-UI components.",
    video: lemon,
    demo: "https://little-limon.vercel.app/",
    repo: "https://github.com/radwaa24/little-limon",
  },
]);
</script>

<style scoped></style>
