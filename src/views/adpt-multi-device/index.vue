<template>
  <div
    v-if="viewLoaded"
    class="screen-container"
    :class="{ 'is-mobile': viewActive === 'MobileScreen' }"
  >
    <MobileHeader v-if="viewActive === 'MobileScreen'" />
    <Header v-else />

    <div class="screen-content-container">
      <component :is="views[viewActive]" />
    </div>

    <AdptNav :active="activeNavIndex" @change-nav="handleChangeNav" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref, provide } from "vue";
import hooks from "@/hooks";
import { clearTimer, logInfo } from "@/utils";
import Header from "@/components/screen/Header/index.vue";
import AdptNav from "@/components/screen/AdptNav/index.vue";
import MobileHeader from "@/components/screen/MobileHeader/index.vue";
import PCScreen from "./pc/index.vue";
import WideScreen from "./wide-screen/index.vue";
import MobileScreen from "./mobile/index.vue";

const { useView, useCommon, useScreen, useScreenNav, useScreenApiData } = hooks;

const { viewLoaded, views, viewActive, initViews, setView } = useView();
const { setSysLoading, setScreenMode } = useCommon();
const { activeNavIndex, handleChangeNav } = useScreenNav();
const { apiLoading, apiTimer, getScreenData } = useScreenApiData();

viewLoaded.value = initViews({ PCScreen, WideScreen, MobileScreen });

// 处理屏幕尺寸变化
const { design, screen, minScreen, contrastRatio } = useScreen(() => {
  initHtmlFontSize();
});

// 制定html根字体大小
const initHtmlFontSize = () => {
  // logInfo(
  //   `设计稿为：${design.width}*${design.height}px；当前视图为：${viewActive.value}，可视区域大小：${screen.width}*${screen.height}px`
  // );

  screen.width = document.body.clientWidth;
  screen.height = document.body.clientHeight;

  const hr = screen.height / design.height;
  const wr = screen.width / design.width;
  const swhr = screen.width / screen.height;

  // 横屏
  if (swhr > 1) {
    if (screen.width > 1366) {
      // 超宽屏大于 21：9
      if (swhr >= 21 / 9) {
        setView("WideScreen");

        if (swhr > design.ratio) {
          contrastRatio.value = screen.height < minScreen.height ? 0.56 : hr; // 以高度为基准制定
        } else {
          contrastRatio.value = screen.width < minScreen.width ? 0.6 : wr; // 以宽度为基准制定
        }
      } else {
        setView("PCScreen");

        // contrastRatio.value = hr; // 以高度为基准制定
        if (swhr > design.ratio) {
          contrastRatio.value = screen.height < minScreen.height ? 0.56 : hr; // 以高度为基准制定
        } else {
          contrastRatio.value = screen.width < minScreen.width ? 0.6 : wr; // 以宽度为基准制定
        }
      }
    } else {
      contrastRatio.value = 1;
      setView("MobileScreen");
    }
  }
  // 竖屏
  else {
    setView("MobileScreen");
  }

  document.documentElement.style.fontSize = contrastRatio.value * 100 + "px";
};

watch(
  () => activeNavIndex.value,
  () => {
    init();
  }
);

onMounted(() => {
  setScreenMode("AdptMultiDevice");

  init();
});

onUnmounted(() => {
  setScreenMode("Normal");

  clearTimer([apiTimer.value]);
});

const init = () => {
  clearTimer([apiTimer.value]);

  apiLoading.value = true;
  getScreenData(activeNavIndex.value);
  apiTimer.value = setInterval(() => {
    getScreenData(activeNavIndex.value);
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
