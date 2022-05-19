import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import "./assets/styles.scss";

import api from "./plugins/api";

createApp(App).use(api).use(store).use(router).mount("#app");
