import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Screen",
    component: () => import("@/views/screen/index.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/test/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
