import {
  ElConfigProvider,
  ElButton,
  ElLoading,
  ElEmpty,
  ElIcon,
  ElBreadcrumb,
} from "element-plus";
import { HomeFilled } from "@element-plus/icons";
// 定制主题
import "@/styles/element-variables.scss";
// 基于断点的隐藏类样式
import "element-plus/theme-chalk/display.css";

const components = [
  ElConfigProvider,
  ElButton,
  ElLoading,
  ElEmpty,
  ElIcon,
  ElBreadcrumb,
];

const icons = [HomeFilled];

export default (app) => {
  // 注册组件
  if (components.length) {
    components.forEach((component) => {
      app.use(component);
    });
  }

  // 注册图标
  if (icons.length) {
    icons.forEach((icon) => {
      app.component(icon.name, icon);
    });
  }
};
