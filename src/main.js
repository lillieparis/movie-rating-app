import { createApp } from "vue";
import App from "./App.vue";
import "../style.css";
import MovieDetail from "./MovieDetail.vue"
import {createWebHistory, createRouter} from 'vue-router'
import Home from "./Home.vue"

const routes = [
    {path:'/', component: Home, name: 'Home'},
    {path:'/movie/:id', component: MovieDetail, name:'MovieDetail'}
]
;
const router = createRouter({
    history: createWebHistory(),
    routes

});

createApp(App)
    .use(router)
    .mount("#app");

  
    
