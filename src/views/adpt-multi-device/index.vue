<template>
  <div v-if="viewLoaded" class="screen-container">
    <MobileHeader v-if="viewActive === 'MobileScreen'" />
    <Header v-else />

    <div class="screen-content" :class="{ 'is-mobile': viewActive === 'MobileScreen' }">
      <component :is="views[viewActive]" />
    </div>

    <AdptNav :active="activeNavIndex" @change-nav="handleChangeNav" />
  </div>
</template>

<script setup>
import hooks from "@/hooks";
import { onMounted, onUnmounted, ref } from "vue";
// import { logInfo } from "@/utils";
import Header from "@/components/screen/Header/index.vue";
import AdptNav from "@/components/screen/AdptNav/index.vue";
import MobileHeader from "@/components/screen/MobileHeader/index.vue";
import PCScreen from "./pc/index.vue";
import WideScreen from "./wide-screen/index.vue";
import MobileScreen from "./mobile/index.vue";

const { useView, useCommon, useScreen, useScreenNav } = hooks;

const { viewLoaded, views, viewActive, initViews, setView } = useView();
const { setSysLoading, setScreenMode } = useCommon();
const { activeNavIndex, handleChangeNav } = useScreenNav();

viewLoaded.value = initViews({ PCScreen, WideScreen, MobileScreen });

// 处理屏幕尺寸变化
const { design, screen, minScreen, contrastRatio } = useScreen(() => {
  setTimeout(() => {
    setSysLoading(false);
  }, 500);

  initHtmlFontSize();
});

// 制定html根字体大小
const initHtmlFontSize = () => {
  // logInfo(
  //   `设计稿为：${design.width}*${design.height}px；当前视图为：${viewActive.value}，可视区域大小：${screen.width}*${screen.height}px`
  // );

  screen.width = document.body.clientWidth;
  screen.height = document.body.clientHeight;

  if (screen.width > 1024) {
    // 超宽屏大于 21：9
    if (screen.width / screen.height >= 21 / 9) {
      setView("wideScreen");

      if (screen.width / screen.height > design.ratio) {
        contrastRatio.value =
          screen.height < minScreen.height ? 0.56 : screen.height / design.height; // 以高度为基准制定
      } else {
        contrastRatio.value =
          screen.width < minScreen.width ? 0.6 : screen.width / design.width; // 以宽度为基准制定
      }
    } else {
      setView("PCScreen");

      contrastRatio.value = screen.height / design.height; // 以高度为基准制定
    }
  } else {
    setView("MobileScreen");
  }

  document.getElementsByTagName("html")[0].style.fontSize =
    contrastRatio.value * 100 + "px";
};

onMounted(() => {
  setScreenMode("AdptMultiDevice");
});

onUnmounted(() => {
  setScreenMode("Normal");
});
</script>

<style lang="scss" scoped>
.screen-content {
  padding-top: size(var(--app-screen-header-height));
  padding-bottom: size(var(--app-screen-nav-height));
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  &.is-mobile {
    overflow-y: auto;
  }
}
</style>
