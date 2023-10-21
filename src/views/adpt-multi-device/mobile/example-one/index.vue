<template>
  <div class="screen-content">
    <div class="module-1">
      <TotalStatistics v-if="screen.width >= 1024" />
      <TotalStatisticsMobile v-else />
    </div>
    <div class="module-2 mt-15">
      <ProjectPercent v-if="screen.width >= 560" />
      <ProjectPercentMobile v-else />
    </div>
    <div class="module-3 mt-15">
      <CompanyStatistics />
    </div>
    <div class="module-4 mt-15">
      <CompanyProject />
    </div>
    <div class="module-5 mt-15">
      <ProjectStatistics />
    </div>
    <div class="module-6 mt-15">
      <CityStatistics />
    </div>
    <div class="module-7 mt-15">
      <CityRanking />
    </div>
  </div>
</template>

<script setup>
import CompanyStatistics from "@/components/screen/Content/CompanyStatistics/index.vue";
import CompanyProject from "@/components/screen/Content/CompanyProject/index.vue";
import ProjectPercent from "@/components/screen/Content/ProjectPercent/index.vue";
import ProjectPercentMobile from "@/components/screen/Content/ProjectPercentMobile/index.vue";
import TotalStatistics from "@/components/screen/Content/TotalStatistics/index.vue";
import TotalStatisticsMobile from "@/components/screen/Content/TotalStatisticsMobile/index.vue";
import CityStatistics from "@/components/screen/Content/CityStatistics/index.vue";
import ProjectStatistics from "@/components/screen/Content/ProjectStatistics/index.vue";
import CityRanking from "@/components/screen/Content/CityRanking/index.vue";
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
  height: size(500);
}

.module-2 {
  height: size(300);
}

.module-3 {
  height: size(300);
}

.module-4 {
  height: size(400);
}

.module-5 {
  height: size(260);
}

.module-6 {
  height: size(350);
}

.module-7 {
  height: size(600);
}

@media screen and (max-width: 1024px) {
  .module-1 {
    height: auto;
  }
}

@media screen and (max-width: 560px) {
  .module-2 {
    height: auto;

    :deep(.project-percent) {
      .data-loading-container {
        flex-direction: column;
      }

      .chart-module {
        margin: size(10);
        height: size(150);
        width: 100%;
      }
    }
  }
}
</style>
