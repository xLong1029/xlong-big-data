import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia';

// 初始化ElementPlus
import initElementPlus from "./element-plus";

// 全局注册组件
import registerComponents from "./components";

// 全局样式
import "./styles/index.scss";

// 路由权限
import "./permission.js";

const app = createApp(App);
app.config.productionTip = false;

initElementPlus(app);
registerComponents(app);

app.use(createPinia()).use(router).mount("#app");