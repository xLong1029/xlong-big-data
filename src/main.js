import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia';

// 初始化ElementPlus
import initElementPlus from "./element-plus";

// 字体样式
// import "./assets/iconfont/iconfont.css";

// 全局样式
import "./styles/index.scss";
// import './style.css'

// 路由权限
import "./permission.js";

const app = createApp(App);
app.config.productionTip = false;

initElementPlus(app);

app.use(createPinia()).use(router).mount("#app");