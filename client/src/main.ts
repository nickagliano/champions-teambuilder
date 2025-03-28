import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./style.css";
import router from "./router"; // Import the router

const app = createApp(App);

// Use the router in the app
app.use(router);

// Set up Pinia
const pinia = createPinia();
app.use(pinia);

app.mount("#app");
