<template>
  <div class="screen-content">
    <div class="screen-content__left">
      <div class="chart-1">
        <ProjectDescription />
      </div>
      <div class="chart-2 pt-15">
        <DataMonitor />
      </div>
      <div class="chart-3 pt-15">
        <WeekStatistics />
      </div>
    </div>
    <div class="screen-content__center">
      <div class="screen-content__center-top">
        <CountStatistics />
      </div>
      <div class="screen-content__center-center pt-15">
        <MapStatistics />
      </div>
    </div>
    <div class="screen-content__right">
      <div class="chart-1">
        <HotProjects />
      </div>
      <div class="chart-2 pt-15">
        <ProjectUse />
      </div>
      <div class="chart-3 pt-15">
        <ProjectIncome />
      </div>
    </div>
  </div>
</template>

<script setup>
import BorderFrame from "@/components/common/BorderFrame/index.vue";
import WeekStatistics from "./week-statistics/index.vue";
import HotProjects from "./hot-projects/index.vue";
import ProjectDescription from "./project-description/index.vue";
import ProjectUse from "./project-use/index.vue";
import DataMonitor from "./data-monitor/index.vue";
import MapStatistics from "./map-statistics/index.vue";
import ProjectIncome from "./project-income/index.vue";
import CountStatistics from "./count-statistics/index.vue";
</script>

<style lang="scss" scoped>
.screen-content {
  padding: size(15);
  height: 100%;
  width: 100%;
  display: flex;

  :deep(.border-frame-container) {
    height: 100%;
    display: flex;
    flex-direction: column;
    .content {
      padding-top: size(15);
      height: calc(100% - size(15));
    }
  }

  &__left,
  &__right {
    width: 23%;
    height: 100%;
  }

  &__left {
    display: flex;
    flex-direction: column;

    .chart-1 {
      min-height: size(280);
    }
    .chart-2 {
      height: 36%;
    }
    .chart-3 {
      flex: 1;
    }
  }

  &__center {
    width: 56%;
    height: calc(100% - size(var(--app-screen-nav-height)));
    padding: 0 size(15);
    display: flex;
    flex-direction: column;

    &-top {
      height: 12%;
    }

    &-center {
      flex: 1;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;

    .chart-1 {
      height: 25%;
    }
    .chart-2 {
      height: 40%;
    }
    .chart-3 {
      flex: 1;
    }
  }
}
</style>
