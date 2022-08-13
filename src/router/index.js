import { createRouter, createWebHashHistory } from "vue-router";

const constantRoutes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/adpt-multi-device",
    name: "AdptMultiDevice",
    component: () => import("@/views/adpt-multi-device/index.vue"),
  },
  {
    path: "/adpt-scale",
    name: "AdptScale",
    component: () => import("@/views/adpt-scale/index.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/test/index.vue"),
  },
];


/**
 * 动态路由
 */
export const asyncRoutes = [];
const routesModules = import.meta.globEager("./modules/*.js");
Object.keys(routesModules).forEach((modulePath) => {
  asyncRoutes.push(...routesModules[modulePath].default);
});

/**
 * 初始化路由
 */
export const initRouter = () =>
  createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes],
  });

let router = initRouter();

/**
 * 重置路由
 * Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 */
export function resetRouter() {
  router = initRouter();
}

export default router;
