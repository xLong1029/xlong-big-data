## 动态路由模块

如果有动态路由，可放置在此目录下，参考格式如下：

```js
export default [
  {
    path: "/test",
    component: () => import("@/views/test/index.vue"),
    name: "Test",
    meta: {
        title: "测试页面",
        icon: "iconfont icon-test"
    },
  },
];
```