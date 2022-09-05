<template>
  <div class="screen-content">
    <div class="screen-content__left">
      <div class="chart-1">
        <BorderFrame></BorderFrame>
      </div>
      <div class="chart-2 pt-15">
        <BorderFrame></BorderFrame>
      </div>
      <div class="chart-3 pt-15">
        <WeekStatistics />
      </div>
    </div>
    <div class="screen-content__center">
      <div class="screen-content__center-top">
        <BorderFrame></BorderFrame>
      </div>
      <div class="screen-content__center-center">222</div>
      <div class="screen-content__center-bottom">
        <BorderFrame></BorderFrame>
      </div>
    </div>
    <div class="screen-content__left">
      <BorderFrame direction="right"></BorderFrame>
    </div>
  </div>
</template>

<script setup>
import BorderFrame from "@/components/common/BorderFrame/index.vue";
import WeekStatistics from "./week-statistics/index.vue";
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
    width: 22%;
    height: 100%;
  }

  &__left {
    .chart-1 {
      height: 24%;
    }
    .chart-2 {
      height: 33.5%;
    }
    .chart-3 {
      height: 42.5%;
    }
  }

  &__center {
    width: 56%;
    height: calc(100% - size(var(--app-screen-nav-height)));
    padding: 0 size(15);
    display: flex;
    flex-direction: column;

    &-top {
      height: 20%;
    }

    &-center {
      height: 60%;
      padding: size(15) 0;
    }

    &-bottom {
      height: 20%;
    }
  }
}
</style>
