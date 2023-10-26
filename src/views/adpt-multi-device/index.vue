<template>
  <div
    v-if="viewLoaded"
    class="screen-container"
    :class="{ 'is-mobile': viewActive === 'MobileScreen' }"
  >
    <MobileHeader v-if="viewActive === 'MobileScreen'" />
    <Header v-else />

    <div ref="screenContentContainer" class="screen-content-container">
      <component :is="views[viewActive]" />
    </div>

    <AdptNav :active="activeNavIndex" @change-nav="handleChangeNav" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref } from "vue";
import Header from "@/components/screen/Header/index.vue";
import AdptNav from "@/components/screen/AdptNav/index.vue";
import MobileHeader from "@/components/screen/MobileHeader/index.vue";
import PCScreen from "./pc/index.vue";
import WideScreen from "./wide-screen/index.vue";
import MobileScreen from "./mobile/index.vue";
import hooks from "@/hooks";
import { docElmScrollTo } from "@/utils/scroll-to";
import Api from "@/api/screen";

const { useView, useCommon, useScreen, useScreenNav, useScreenApiData } = hooks;

const { viewLoaded, views, viewActive, initViews, setView } = useView();
const { setScreenMode } = useCommon();
const { activeNavIndex, handleChangeNav } = useScreenNav();
const {
  apiLoading,
  getScreenData,
  startLoopGetData,
  stopLoopGetData,
} = useScreenApiData();

viewLoaded.value = initViews({ PCScreen, WideScreen, MobileScreen });

const screenContentContainer = ref(null);

// 处理屏幕尺寸变化
const { screen, screenRate } = useScreen(true);

watch(
  () => activeNavIndex.value,
  () => {
    if (screenContentContainer.value) {
      docElmScrollTo(screenContentContainer.value, 0);
    }
    init();
  }
);

watch(
  () => screenRate.swhr,
  (swhr) => {
    // 横屏
    if (swhr > 1) {
      if (screen.width > 1366) {
        // 超宽屏大于 21：9
        if (swhr >= 21 / 9) {
          setView("WideScreen");
        } else {
          setView("PCScreen");
        }
      } else {
        setView("MobileScreen");
      }
    }
    // 竖屏
    else {
      setView("MobileScreen");
    }
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  setScreenMode("AdptMultiDevice");

  init();
});

onUnmounted(() => {
  setScreenMode("Normal");
});

const init = () => {
  stopLoopGetData();

  apiLoading.value = true;
  startLoopGetData(() => {
    getScreenData(Api.GetScreenData, activeNavIndex.value);
  }, 5000);
};
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.screen-container {
  // background: var(--app-screen-bg-color);
  @include background-setting("./../../assets/images/bg.jpg", 100%, 100%);

  &.is-mobile {
    background-size: auto auto;
    .screen-content-container {
      padding-top: size(40);
      padding-bottom: size(45);
      overflow-y: auto;
    }
  }
}

.screen-content-container {
  padding-top: size(var(--app-screen-header-height));
  // padding-bottom: size(var(--app-screen-nav-height));
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
