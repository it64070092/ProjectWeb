import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import { createWebHistory, createRouter } from "vue-router";
import '@fortawesome/fontawesome-svg-core';
import Login from './views/normal/LoginTab.vue';
import Signup from './views/normal/SignupTab.vue';
import AMLanding from './views/admin/LandingTab.vue';
import AMCatalog from './views/admin/CatalogTab.vue';
import AMBooking from "./views/admin/BookingHistory.vue";
import NMLanding from './views/normal/LandingTab.vue';
import CMLanding from './views/customer/LandingTab.vue';
import CMCatalog from './views/customer/CatalogTab.vue';
import CMMoviePage from "./views/customer/MoviePageTab.vue";
import CMBooking from "./views/customer/BookingHistory.vue";
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
      path: "/cmlanding",
      component: CMLanding,
    },    {
      path: "/amlanding",
      component: AMLanding,
    },
    {
      path: "/nmlanding",
      component: NMLanding,
    },
    {
      path: "/cmcatalog",
      component: CMCatalog,
    },
    {
      path: "/cmbooking",
      component: CMBooking,
    },
    {
      path: "/amcatalog",
      component: AMCatalog,
    },
    {
      path: "/ambooking",
      component: AMBooking,
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: CMMoviePage,
    },
    { path: "/:pathMatch(.*)*", redirect: "/nmlanding" },
    { path: "/:pathMatch(.*)*", redirect: "/cmlanding" },
    { path: "/:pathMatch(.*)*", redirect: "/amlanding" },
    { path: "/:pathMatch(.*)*", redirect: "/cmbooking" },
    { path: "/:pathMatch(.*)*", redirect: "/ambooking" },
    { path: "/:pathMatch(.*)*", redirect: "/login" },
    { path: "/:pathMatch(.*)*", redirect: "/signup" },
    { path: "/:pathMatch(.*)*", redirect: "/cmcatalog" },
    { path: "/:pathMatch(.*)*", redirect: "/amcatalog" },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });


createApp(App).use(router).use(VueCarousel).mount('#app')
