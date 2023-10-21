<template>
  <div class="screen-content">
    <div class="screen-content__left">
      <div class="module-1">
        <ProjectPercent />
      </div>
      <div class="module-2 pt-15">
        <ProjectStatistics />
      </div>
      <div class="module-3 pt-15">
        <CompanyStatistics />
      </div>
    </div>
    <div class="screen-content__center">
      <div class="screen-content__center-top">
        <div class="module-1">
          <CompanyProject />
        </div>
        <div class="module-2 pl-15">
          <TotalStatistics />
        </div>
      </div>
      <div class="screen-content__center-bottom pt-15">
        <CityStatistics />
      </div>
    </div>
    <div class="screen-content__right">
      <CityRanking />
    </div>
  </div>
</template>

<script setup>
import CompanyStatistics from "@/components/screen/Content/CompanyStatistics/index.vue";
import CompanyProject from "@/components/screen/Content/CompanyProject/index.vue";
import ProjectPercent from "@/components/screen/Content/ProjectPercent/index.vue";
import TotalStatistics from "@/components/screen/Content/TotalStatistics/index.vue";
import CityStatistics from "@/components/screen/Content/CityStatistics/index.vue";
import ProjectStatistics from "@/components/screen/Content/ProjectStatistics/index.vue";
import CityRanking from "@/components/screen/Content/CityRanking/index.vue";
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
    display: flex;
    flex-direction: column;
  }

  &__left {
    .module-1 {
      height: 25%;
    }
    .module-2 {
      flex: 1;
    }
    .module-3 {
      height: 40%;
    }
  }

  &__center {
    flex: 1;
    height: calc(100% - size(var(--app-screen-nav-height)));
    padding: 0 size(var(--app-screen-spacing));
    display: flex;
    flex-direction: column;

    &-top {
      height: 55%;
      display: flex;

      .module-1 {
        flex: 1;
      }
      .module-2 {
        width: 65%;
        max-width: size(1000);
      }
    }

    &-bottom {
      flex: 1;
    }
  }
}
</style>
