import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import NewPost from "./pages/NewPost.vue";
import EditPost from "./pages/EditPost.vue";
import ShowPost from "./pages/ShowPost.vue";
import { Store } from "./store";

export const routerWithStore = (store: Store) => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/posts/:id/edit",
        component: EditPost,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/posts/:id",
        component: ShowPost,
      },
      {
        path: "/posts/new",
        component: NewPost,
        meta: {
          authRequired: true,
        },
      },
    ],
  });

  router.beforeEach((to, from, next) => {
    const auth = !!store.getState().authors.currentUserId;
    if (!to.meta.authRequired) {
      next();
      return;
    }
    if (to.meta.authRequired && auth) {
      next();
    } else {
      next({
        path: "/",
      });
    }
  });
  return router;
};
