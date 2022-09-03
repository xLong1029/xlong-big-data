<template>
  <div class="screen-content">
    <div class="screen-content__left">
      <div class="chart-1">
        <ProjectPercent />
      </div>
      <div class="chart-2 pt-15">
        <BorderFrame> </BorderFrame>
      </div>
      <div class="chart-3 pt-15">
        <WeekStatistics />
      </div>
    </div>
    <div class="screen-content__center">
      <div class="screen-content__center-top">
        <TotalStatistics />
      </div>
      <div class="screen-content__center-bottom">
        <CityStatistics />
      </div>
    </div>
    <div class="screen-content__left">
      <BorderFrame direction="right"></BorderFrame>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject, onMounted, shallowRef } from "@vue/runtime-core";
import LineTitle from "@/components/common/LineTitle/index.vue";
import BorderFrame from "@/components/common/BorderFrame/index.vue";
import BarChart from "@/components/chart/BarChart/index.vue";
import WeekStatistics from "./week-statistics/index.vue";
import ProjectPercent from "./project-percent/index.vue";
import TotalStatistics from "./total-statistics/index.vue";
import CityStatistics from "./city-statistics/index.vue";
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
    display: flex;
    flex-direction: column;
  }

  &__left {
    .chart-1 {
      height: 24%;
    }
    .chart-2 {
      height: 33%;
    }
    .chart-3 {
      height: 43%;
    }
  }

  &__center {
    width: 54%;
    height: calc(100% - size(var(--app-screen-nav-height)));
    padding: 0 size(15);
    display: flex;
    flex-direction: column;

    &-top {
      height: 60%;
    }

    &-bottom {
      height: 40%;
      padding-top: size(15);
    }
  }
}
</style>
