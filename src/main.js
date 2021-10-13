import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

import './assets/fontawesome/css/fontawesome.css'
import './assets/fontawesome/css/fontawesome.css'
import './assets/fontawesome/css/solid.css'
import './assets/css/main.css'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App)
.use(router)
.use(store)
.mount('#app')
