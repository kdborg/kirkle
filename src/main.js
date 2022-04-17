import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useStore } from "./stores/kirkle";

const app = createApp(App);
app.use(router);
app.use(createPinia());

const store = useStore();
window.theStore = store;

app.mount("#app");
