<template>
  <section
    id="certificates"
    class="pt-10 p-10 border-t-2 border-red-50 overflow-hidden"
  >
    <div class="flex text-xl gap-1 font-medium mb-10">
      <h2 class="border-b-2 mx-auto border-red-50 text-2xl p-1 px-3 w-fit">
        Certificates
      </h2>
    </div>
    <div class="md:max-w-3xl max-w-xl lg:max-w-full mx-auto">
      <Swiper
        :autoplay="{ delay: 3000, disableOnInteraction: true }"
        :loop="true"
        :centeredSlides="true"
        :slidesPerView="2"
        :space-between="30"
        :grabCursor="true"
        :pagination="{
          clickable: true,
        }"
        :modules="[Pagination, Autoplay]"
      >
        <SwiperSlide v-for="(certificate, index) in certificates" :key="index">
          <div class="flex flex-col items-center bg-red-50 p-6 rounded-md">
            <a v-if="certificate.link" :href="certificate.link" target="_blank">
              <img
                :src="certificate.img"
                alt="certificate image"
                class="object-contain max-md:mt-6 lg:rounded-none lg:max-h-[350px] lg:min-h-[300px]"
              />
            </a>
            <div class="mt-4 font-semibold">{{ certificate.name }}</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Register modules
import { ref } from "vue";
import um from "../assets/um.png";
import meta from "../assets/meta.png";
import codeCademy from "../assets/codecdmy.png";
import solo from "../assets/solo.png";
import aice from "../assets/aice.png";
import fwd from "../assets/fwd.png";
import freeCode from "../assets/freecode.png";

const certificates = ref([
  {
    img: um,
    name: "University of Michigan",
    link: "https://drive.google.com/file/d/1_vmc3MKJsdSLxMjTByYtvPPtbHv5KFZu/view?usp=sharing",
  },
  {
    img: meta,
    name: "Meta",
    link: "https://drive.google.com/file/d/1goUCFzpM7UPEhMVVea2gLkPOSaI-71xZ/view?usp=sharing",
  },
  {
    img: codeCademy,
    name: "CodeCademy",
    link: "https://drive.google.com/file/d/1Oo2Nh3KypxGQkp8gQWk8w_kZLFXGuXWQ/view?usp=sharing",
  },
  {
    img: freeCode,
    name: "FreeCodeCamp",
    link: "https://www.freecodecamp.org/certification/fcc27c68a8f-117a-4666-aed4-05679ffcb9a6/javascript-algorithms-and-data-structures",
  },
  {
    img: solo,
    name: "Solo Learn",
    link: "https://drive.google.com/file/d/1WJAh6iUKVRODZAuSI1FgwjbV3_3qUmW6/view?usp=sharing",
  },
  {
    img: aice,
    name: "AICE - ALX",
    link: "https://drive.google.com/file/d/1QOLLZtqlO9Wm5uiR_9kBm5ca-0Gd1Sgk/view?usp=sharing",
  },
  {
    img: fwd,
    name: "FWD",
    link: "https://drive.google.com/file/d/1fO1hOcKJyqKx8JxmjDrjlYYpL20pNvE6/view?usp=sharing",
  },
]);
// https://www.freecodecamp.org/certification/fcc27c68a8f-117a-4666-aed4-05679ffcb9a6/javascript-algorithms-and-data-structures
</script>

<style scoped>
/* Default styles for swiper slides */
.swiper-slide {
  transition: filter 0.3s ease, opacity 0.3s ease;
  opacity: 0.5;
  filter: blur(4px);
  transform: scale(0.9);
}

/* Style for active slide */
.swiper-slide-active {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}

/* Styles for next and previous slides to make them partially visible and slightly blurred */
.swiper-slide-next,
.swiper-slide-prev {
  opacity: 0.75;
  filter: blur(2px);
  transform: scale(0.95);
}
.swiper-slide img {
  transition: transform 0.6s ease;
  transform: scale(0.5);
}

.swiper-slide-active img {
  transform: scale(1.05);
}
</style>
