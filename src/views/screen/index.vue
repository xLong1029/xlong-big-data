<template>
  <div v-if="isLoaded">
    <component :is="views[viewActive]" />
  </div>
</template>

<script setup>
import hooks from "@/hooks";
// import { logInfo } from "@/utils";
import PCScreen from "./pc";
import WideScreen from "./wide-screen";
import MobileScreen from "./mobile";

const { useViews, useCommon, useScreen } = hooks;

const { isLoaded, views, viewActive, initViews, setViews } = useViews();
const { setSysLoading } = useCommon();

isLoaded.value = initViews(PCScreen, WideScreen, MobileScreen);

// 处理屏幕尺寸变化
const { design, screen, minScreen, contrastRatio } = useScreen(() => {
  setTimeout(() => {
    setSysLoading(false);
  }, 500);

  const { width, height } = setViews();
  screen.width = width;
  screen.height = height;

  initHtmlFontSize();

  // logInfo(
  //   `设计稿为：${design.width}*${design.height}px；当前视图为：${viewActive.value}，可视区域大小：${screen.width}*${screen.height}px`
  // );
});

// 制定html根字体大小
const initHtmlFontSize = () => {
  if (viewActive.value === "wideScreen") {
    // 制定html根字体大小
    if (screen.width / screen.height > design.ratio) {
      contrastRatio.value =
        screen.height < minScreen.height ? 0.56 : screen.height / design.height; // 以高度为基准制定
    } else {
      contrastRatio.value =
        screen.width < minScreen.width ? 0.6 : screen.width / design.width; // 以宽度为基准制定
    }
  }
  if (viewActive.value === "pc") {
    contrastRatio.value = screen.height / design.height; // 以高度为基准制定
  }

  document.getElementsByTagName("html")[0].style.fontSize =
    contrastRatio.value * 100 + "px";
};
</script>

<style lang="scss">
.screen-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
