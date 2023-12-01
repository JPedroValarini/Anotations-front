import { createApp } from 'vue'
import App from './App.vue'
import CreateNote from './components/CreateNote.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from './services/axios.js'


const app = createApp(App);
axios.defaults.withCredentials = true;
app.config.globalProperties.$axios = axios;

app.component('CreateNote', CreateNote);

app.mount('#app');
