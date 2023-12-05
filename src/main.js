import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "./services/axios.js";
import { createRouter, createWebHistory } from "vue-router";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import CreateNote from "./components/CreateNote.vue";
import ListNote from "./components/ListNote.vue";
import HomeAnotations from "./components/HomeAnotations.vue";

const routes = [
  { path: "/", component: HomeAnotations },
  { path: "/create-note", component: CreateNote },
  { path: "/list-note", component: ListNote },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

axios.defaults.withCredentials = true;
app.config.globalProperties.$axios = axios;

app.component("VueDatePicker", VueDatePicker);

app.use(router);

app.mount("#app");
