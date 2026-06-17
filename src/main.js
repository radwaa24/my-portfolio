import { createApp } from "vue";
import "./style.css";
import "aos/dist/aos.css";
import App from "./App.vue";
import router from "./router";
import motion from "./plugins/motion";

createApp(App).use(router).use(motion).mount("#app");
