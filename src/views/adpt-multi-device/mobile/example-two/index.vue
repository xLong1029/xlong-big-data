<template>
  <div class="screen-content">
    <div class="module-1">
      <CountStatistics v-if="screen.width >= 768" />
      <CountStatisticsMobile v-else />
    </div>
    <div class="module-2 mt-15">
      <MapStatistics />
    </div>
    <div class="module-3 mt-15">
      <ServiceDescription />
    </div>
    <div class="module-4 mt-15">
      <DataMonitor />
    </div>
    <div class="module-5 mt-15">
      <WeekStatistics />
    </div>
    <div class="module-6 mt-15">
      <HotProjects />
    </div>
    <div class="module-7 mt-15">
      <ProjectUse />
    </div>
    <div class="module-8 mt-15">
      <ProjectIncome />
    </div>
  </div>
</template>

<script setup>
import WeekStatistics from "@/components/screen/Content/WeekStatistics/index.vue";
import HotProjects from "@/components/screen/Content/HotProjects/index.vue";
import ServiceDescription from "@/components/screen/Content/ServiceDescription/index.vue";
import ProjectUse from "@/components/screen/Content/ProjectUse/index.vue";
import DataMonitor from "@/components/screen/Content/DataMonitor/index.vue";
import MapStatistics from "@/components/screen/Content/MapStatistics/index.vue";
import ProjectIncome from "@/components/screen/Content/ProjectIncome/index.vue";
import CountStatistics from "@/components/screen/Content/CountStatistics/index.vue";
import CountStatisticsMobile from "@/components/screen/Content/CountStatisticsMobile/index.vue";
import { inject } from "vue";
const screen = inject("getScreen");
</script>

<style lang="scss" scoped>
.screen-content {
  padding: size(var(--app-screen-spacing));

  :deep(.border-frame-container) {
    height: 100%;
    display: flex;
    flex-direction: column;
    .content {
      padding-top: size(var(--app-screen-spacing));
      height: calc(100% - size(var(--app-screen-spacing)));
    }
  }
}

.module-1 {
  height: size(200);
}

.module-2 {
  height: size(800);
}

.module-3 {
  height: auto;
}

.module-4 {
  height: size(400);
}

.module-5 {
  height: size(400);
}

.module-6 {
  height: size(300);
}

.module-7 {
  height: size(400);
}

.module-8 {
  height: size(380);
}

@media screen and (max-width: 1360px) {
   .module-8{
    :deep(.spinning-ball__bottom){
      background-size: auto 100%;
    }
  }
}

@media screen and (max-width: 768px) {
  .module-1 {
    height: auto;
  }

  .module-2 {
    :deep(.map-statistics__msg) {
      .swiper-container {
        height: size(265);
      }

      .msg-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .msg-item__content {
        width: 100%;
        overflow: visible;
        white-space: inherit;
        -webkit-line-clamp: inherit;
      }

      .msg-item__time {
        margin-left: size(4);
        margin-top: size(10);
      }
    }
  }
}

@media screen and (max-width: 560px) {
  .module-2 {
    height: size(650);
  }

  .module-3 {
    :deep(.tab-title-item__text) {
      font-size: size(18);
    }
  }
}
</style>
