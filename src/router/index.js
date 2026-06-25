import { createRouter, createWebHistory } from "vue-router";
import Flux from "../views/Flux.vue";

const routes = [
  { path: "/", name: "flux", component: Flux, meta: { title: "Radwa Khalaf" } },
  { path: "/1", name: "orbit", component: () => import("../views/Orbit.vue"), meta: { title: "Radwa Khalaf · 01 ORBIT" } },
  { path: "/2", name: "reel", component: () => import("../views/Reel.vue"), meta: { title: "Radwa Khalaf · 02 REEL" } },
  { path: "/3", name: "petal", component: () => import("../views/Petal.vue"), meta: { title: "Radwa Khalaf · 03 PETAL" } },
  { path: "/4", name: "veil", component: () => import("../views/Veil.vue"), meta: { title: "Radwa Khalaf · 04 VEIL" } },
  { path: "/5", name: "wormhole", component: () => import("../views/Wormhole.vue"), meta: { title: "Radwa Khalaf · 05 WORMHOLE" } },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title;
});

export default router;
