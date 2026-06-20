import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  { path: "/", name: "home", component: Home, meta: { title: "Radwa Khalaf" } },
  { path: "/1", name: "flux", component: () => import("../views/Flux.vue"), meta: { title: "Radwa Khalaf · 01 FLUX" } },
  { path: "/2", name: "orbit", component: () => import("../views/Orbit.vue"), meta: { title: "Radwa Khalaf · 02 ORBIT" } },
  { path: "/3", name: "reel", component: () => import("../views/Reel.vue"), meta: { title: "Radwa Khalaf · 03 REEL" } },
  { path: "/6", name: "petal", component: () => import("../views/Petal.vue"), meta: { title: "Radwa Khalaf · 06 PETAL" } },
  { path: "/8", name: "veil", component: () => import("../views/Veil.vue"), meta: { title: "Radwa Khalaf · 08 VEIL" } },
  { path: "/10", name: "nova", component: () => import("../views/Nova.vue"), meta: { title: "Radwa Khalaf · 10 NOVA" } },
  { path: "/14", name: "wormhole", component: () => import("../views/Wormhole.vue"), meta: { title: "Radwa Khalaf · 14 WORMHOLE" } },
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
