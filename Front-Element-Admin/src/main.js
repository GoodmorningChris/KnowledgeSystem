import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
import axios from "axios";
import router from './router/index.js'
import {importElement} from "./plugins/index.js";
import store from "./plugins/store";
import api from "./interface/index.js";


axios.interceptors.request.use(
    config => {
        if (localStorage.token) {
            config.headers.Authorization = `Bearer ${localStorage.token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
createApp(App).use(importElement).use(router).use(store).mount('#app')

