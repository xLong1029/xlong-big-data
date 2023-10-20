import BorderFrameOne from "@/components/common/BorderFrame/One.vue";
import BorderFrameTwo from "@/components/common/BorderFrame/Two.vue";
import BorderFrameThree from "@/components/common/BorderFrame/Three.vue";
import BorderFrameFour from "@/components/common/BorderFrame/Four.vue";
import BorderFrameFlyLight from "@/components/common/BorderFrame/FlyLight.vue";
import DataLoading from "@/components/common/DataLoading/index.vue";
import BorderFrameTitleOne from "@/components/common/BorderFrameTitle/One.vue";
import BorderFrameTitleTwo from "@/components/common/BorderFrameTitle/Two.vue";
import BorderFrameTitleThree from "@/components/common/BorderFrameTitle/Three.vue";
import BorderFrameTitleFour from "@/components/common/BorderFrameTitle/Four.vue";

const components = [
  BorderFrameOne,
  BorderFrameTwo,
  BorderFrameThree,
  BorderFrameFour,
  BorderFrameFlyLight,
  DataLoading,
  BorderFrameTitleOne,
  BorderFrameTitleTwo,
  BorderFrameTitleThree,
  BorderFrameTitleFour,
];

export default (app) => {
  // 注册组件
  if (components.length) {
    components.forEach((component) => {
      try {
        app.component(component.name, component);
      } catch (err) {
        console.error("注册组件时获取不到组件名");
      }
    });
  }
};
