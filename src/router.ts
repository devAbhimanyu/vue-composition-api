import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import NewPost from "./pages/NewPost.vue";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/posts/new",
      component: NewPost,
    },
  ],
});
