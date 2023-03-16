import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import { createWebHistory, createRouter } from "vue-router";
import '@fortawesome/fontawesome-svg-core';
import Login from './views/LoginTab.vue'
import Signup from './views/SignupTab.vue';
import Landing from './views/LandingTab.vue';
import Catalog from './views/CatalogTab.vue';
import MoviePage from "./views/MoviePageTab.vue";
import VueCarousel from 'vue-carousel';


const routes = [
    {
      path: "/login",
      component: Login,
    },
    {
        path: "/signup",
        component: Signup,
    },
    {
      path: "/landing",
      component: Landing,
    },
    {
      path: "/catalog",
      component: Catalog,
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: MoviePage,
    },
    { path: "/:pathMatch(.*)*", redirect: "/landing" },
    { path: "/:pathMatch(.*)*", redirect: "/login" },
    { path: "/:pathMatch(.*)*", redirect: "/signup" },
    { path: "/:pathMatch(.*)*", redirect: "/catalog" },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });


createApp(App).use(router).use(VueCarousel).mount('#app')
