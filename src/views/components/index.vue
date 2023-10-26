<template>
  <el-tabs v-model="activeTabName" class="custom-tabs-style" @tab-click="handleTabClick">
    <el-tab-pane v-for="(item, index) in views" :key="'views' + index" :label="item.label" :name="item.name">
      <component :is="item.component" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { reactive, ref, markRaw, provide } from "vue";
import BorderFrameView from "./border-frame/index.vue";
import BorderFrameTitleView from "./border-frame-title/index.vue";
import ChartView from "./chart/index.vue";
import CommonView from "./common/index.vue";

const views = reactive([
  {
    name: "chart",
    label: "图表组件",
    component: markRaw(ChartView),
  },
  {
    name: "borderFrame",
    label: "边框组件",
    component: markRaw(BorderFrameView),
  },
  {
    name: "borderFrameTitle",
    label: "标题组件",
    component: markRaw(BorderFrameTitleView),
  },
  {
    name: "common",
    label: "其他通用组件",
    component: markRaw(CommonView),
  },
]);

const activeTabName = ref('chart');
provide("getActiveTabName", activeTabName);

const handleTabClick = (val) => {
  activeTabName.value = views[val.index].name;
};
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

:deep(.el-tabs__content){
  padding: 10px;
  overflow-y: auto;
  height: calc(100vh - 40px);
}
</style>
