import BorderFrame from "@/components/common/BorderFrame/index.vue";
import DataLoading from "@/components/common/DataLoading/index.vue";
import LineTitle from "@/components/common/LineTitle/index.vue";

const components = [BorderFrame, DataLoading, LineTitle];

export default (app) => {
  // 注册组件
  if (components.length) {
    components.forEach((component) => {
      try {
        app.component(component.name, component);
      }
      catch (err) {
        console.error('注册组件时获取不到组件名')
      }
    });
  }
};
