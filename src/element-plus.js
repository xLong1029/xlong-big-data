// 基于断点的隐藏类样式
// import 'element-plus/theme-chalk/display.css';

// element-plus的message相关样式
import "element-plus/theme-chalk/src/message.scss"
import "element-plus/theme-chalk/src/message-box.scss"

import { HomeFilled } from "@element-plus/icons-vue";

const icons = [HomeFilled];

export default (app) => {
  // 注册图标
  if (icons.length) {
    icons.forEach((icon) => {
      app.component(icon.name, icon);
    });
  }
};
