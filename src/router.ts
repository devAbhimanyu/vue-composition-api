import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
// im
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
  ],
});
