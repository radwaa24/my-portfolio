import { createApp } from "vue";
import "./style.css";
import "aos/dist/aos.css";
import App from "./App.vue";
import router from "./router";
import motion from "./plugins/motion";
import AboutFacts from "./components/common/AboutFacts.vue";

const app = createApp(App);
app.use(router).use(motion);
app.component("AboutFacts", AboutFacts);
app.mount("#app");
