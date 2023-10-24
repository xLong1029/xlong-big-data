<template>
  <div class="component-list">
    <div
      v-for="(item, index) in components"
      :key="'components' + index"
      class="component-list-item"
    >
      <component :is="item.component" />
      <div class="component-list-item__title">{{  item.label  }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, markRaw } from "vue";
import BorderFrameTitleOne from "@/components/common/BorderFrameTitle/One.vue";
import BorderFrameTitleTwo from "@/components/common/BorderFrameTitle/Two.vue";
import BorderFrameTitleThree from "@/components/common/BorderFrameTitle/Three.vue";
import BorderFrameTitleFour from "@/components/common/BorderFrameTitle/Four.vue";

const components = reactive([
  {
    label: "标题一",
    component: markRaw(BorderFrameTitleOne),
  },
  {
    label: "标题二",
    component: markRaw(BorderFrameTitleTwo),
  },
  {
    label: "标题三",
    component: markRaw(BorderFrameTitleThree),
  },
  {
    label: "标题四",
    component: markRaw(BorderFrameTitleFour),
  },
]);
</script>

<style lang="scss" scoped>
@import "@/styles/components-demo.scss";

.component-list-item{
  min-height: auto;
}
</style>
