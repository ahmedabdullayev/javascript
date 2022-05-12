import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
axios.defaults.baseURL = process.env.VUE_APP_DATA_SERVICE_URL;
createApp(App).use(store).use(router).mount('#app')
