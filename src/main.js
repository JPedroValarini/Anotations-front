import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from './services/axios.js';
import { createRouter, createWebHistory } from 'vue-router';

import CreateNote from './components/CreateNote.vue';
import HomeAnotations from './components/HomeAnotations.vue';

const routes = [
  { path: '/', component: HomeAnotations },
  { path: '/create-note', component: CreateNote },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

axios.defaults.withCredentials = true;
app.config.globalProperties.$axios = axios;

app.use(router);

app.mount('#app');
