<template>
  <div class="screen-content">
    <div class="screen-content__left">
      <div class="module-1"><ServiceDescription /></div>
      <div class="module-2 pt-15">
        <ProjectUse />
      </div>
    </div>
    <div class="screen-content__center">
      <div class="screen-content__center-left pr-15">
        <MapStatisticsWide />
      </div>
      <div class="screen-content__center-right">
        <div class="module-1">
          <DataMonitor />
        </div>
        <div class="module-2 pt-15">
          <WeekStatistics />
        </div>
      </div>
    </div>
    <div class="screen-content__right">
      <div class="module-1">
        <HotProjects />
      </div>
      <div class="module-2 pt-15">
        <ProjectIncome />
      </div>
    </div>
  </div>
</template>

<script setup>
import WeekStatistics from "@/components/screen/Content/WeekStatistics/index.vue";
import HotProjects from "@/components/screen/Content/HotProjects/index.vue";
import ServiceDescription from "@/components/screen/Content/ServiceDescription/index.vue";
import ProjectUse from "@/components/screen/Content/ProjectUse/index.vue";
import DataMonitor from "@/components/screen/Content/DataMonitor/index.vue";
import MapStatisticsWide from "@/components/screen/Content/MapStatisticsWide/index.vue";
import ProjectIncome from "@/components/screen/Content/ProjectIncome/index.vue";
import CountStatistics from "@/components/screen/Content/CountStatistics/index.vue";
</script>

<style lang="scss" scoped>
.screen-content {
  padding: size(var(--app-screen-spacing));
  height: 100%;
  width: 100%;
  display: flex;

  :deep(.border-frame-container) {
    height: 100%;
    display: flex;
    flex-direction: column;
    .content {
      padding-top: size(var(--app-screen-spacing));
      height: calc(100% - size(var(--app-screen-spacing)));
    }
  }

  &__left,
  &__right {
    width: 18%;
    height: 100%;
  }

  &__left {
    display: flex;
    flex-direction: column;

    .module-1 {
      min-height: size(280);
      height: auto;
    }
    .module-2 {
      flex: 1;
      height: 30%;
    }
  }

  &__center {
    flex: 1;
    height: calc(100% - size(var(--app-screen-nav-height)));
    padding: 0 size(var(--app-screen-spacing));
    display: flex;

    &-left {
      width: 70%;
    }

    &-right {
      flex: 1;
      display: flex;
      flex-direction: column;

      .module-1 {
        height: 50%;
      }
      .module-2 {
        flex: 1;
      }
    }
  }

  &__right {
    display: flex;
    flex-direction: column;

    .module-1 {
      height: 47.5%;
    }
    .module-2 {
      flex: 1;
    }
  }
}
</style>
