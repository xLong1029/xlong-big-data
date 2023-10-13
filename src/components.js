import BorderFrameOne from "@/components/common/BorderFrame/One.vue";
import DataLoading from "@/components/common/DataLoading/index.vue";
import BorderFrameTitleOne from "@/components/common/BorderFrameTitle/One.vue";
import BorderFrameTitleTwo from "@/components/common/BorderFrameTitle/Two.vue";
import BorderFrameTitleThree from "@/components/common/BorderFrameTitle/Three.vue";

const components = [BorderFrameOne, DataLoading, BorderFrameTitleOne, BorderFrameTitleTwo, BorderFrameTitleThree];

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
