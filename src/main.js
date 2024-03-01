import router from "./router/router";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createApp } from "vue";
import App from "./App.vue";
import "./styles/styles.scss";
import { useStore } from "./pinia/store";

loadFonts();

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
const mainStore = useStore();
mainStore.initializeStore();

app.use(vuetify).use(router).mount("#app");
