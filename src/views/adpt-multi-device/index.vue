<template>
  <div v-if="isLoaded" class="screen-container">
    <MobileHeader v-if="viewActive === 'mobile'" />
    <Header v-else />

    <div
      class="screen-content"
      :class="{ 'is-mobile': viewActive === 'mobile' }"
    >
      <component :is="views[viewActive]" />
    </div>

    <Nav :active="activeNavIndex" @change-nav="handleChangeNav" />
  </div>
</template>

<script setup>
import hooks from "@/hooks";
import { onMounted, onUnmounted, ref } from "vue";
// import { logInfo } from "@/utils";

import Header from "@/components/screen/Header/index.vue";
import Nav from "@/components/screen/Nav/index.vue";
import MobileHeader from "@/components/screen/MobileHeader/index.vue";
import PCScreen from "./pc/index.vue";
import WideScreen from "./wide-screen/index.vue";
import MobileScreen from "./mobile/index.vue";

const { useViews, useCommon, useScreen } = hooks;

const { isLoaded, views, viewActive, initViews, setViews } = useViews();
const { setSysLoading, setScreenMode } = useCommon();

const activeNavIndex = ref(0);

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

onMounted(() => {
  setScreenMode("AdptMultiDevice");
});

onUnmounted(() => {
  setScreenMode("Normal");
});

const handleChangeNav = (val) => {
  activeNavIndex.value = val;
};
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
