import { createRouter, createWebHashHistory } from "vue-router";

const constantRoutes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "首页",
    },
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/adpt-multi-device",
    name: "AdptMultiDevice",
    meta: {
      title: "示例【多设备尺寸自适应】",
    },
    component: () => import("@/views/adpt-multi-device/index.vue"),
  },
  {
    path: "/adpt-scale",
    name: "AdptScale",
    meta: {
      title: "示例【自适应缩放】",
    },
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
