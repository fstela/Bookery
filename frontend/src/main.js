import { initializeApp } from "firebase/app";
import { createPinia } from "pinia";
import { createApp, watch } from "vue";
import App from "./App.vue";
import { config } from "./config";
import router from "./router";

import "./style.css";

initializeApp(config.firebase);
const pinia = createPinia();

watch(
  pinia.state,
  (state) => localStorage.setItem("cart", JSON.stringify(state.cart)),
  { deep: true }
);

createApp(App).use(router).use(pinia).mount("#app");
