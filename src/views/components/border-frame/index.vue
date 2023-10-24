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
import BorderFrameOne from "@/components/common/BorderFrame/One.vue";
import BorderFrameTwo from "@/components/common/BorderFrame/Two.vue";
import BorderFrameThree from "@/components/common/BorderFrame/Three.vue";
import BorderFrameFour from "@/components/common/BorderFrame/Four.vue";
import BorderFrameFlyLight from "@/components/common/BorderFrame/FlyLight.vue";

const components = reactive([
  {
    label: "边框一",
    component: markRaw(BorderFrameOne),
  },
  {
    label: "边框二",
    component: markRaw(BorderFrameTwo),
  },
  {
    label: "边框三",
    component: markRaw(BorderFrameThree),
  },
  {
    label: "边框四",
    component: markRaw(BorderFrameFour),
  },
  {
    label: "流光边框",
    component: markRaw(BorderFrameFlyLight),
  },
]);
</script>

<style lang="scss" scoped>
@import "@/styles/components-demo.scss";
</style>
