<template>
  <ScaleContainer>
  <!-- 计算性高度适配在此屏内容不适用，但其他屏使用正常 -->
  <!-- <ScaleContainer :width="1920" :height="1920 / screen.width * screen.height"> -->
    <div class="screen-container">
      <Header />
      <div class="screen-content-container"><PCScreen /></div>
      <Nav :active="activeNavIndex" @change-nav="handleChangeNav" />
    </div>
  </ScaleContainer>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref, provide } from "vue";
import hooks from "@/hooks";
import { clearTimer } from "@/utils";
import ScaleContainer from "@/components/common/ScaleContainer/index.vue";
import Header from "@/components/screen/Header/index.vue";
import Nav from "@/components/screen/Nav/index.vue";
import PCScreen from "@/views/adpt-multi-device/pc/index.vue";
import Api from "@/api/screen";

const { 
  useScreenNav,
  useScreenApiData,
  // useScreen
} = hooks;
const { activeNavIndex, handleChangeNav } = useScreenNav();
const {
  apiLoading,
  getScreenData,
  startLoopGetData,
  stopLoopGetData,
} = useScreenApiData();
// const { screen } = useScreen(false);

watch(
  () => activeNavIndex.value,
  (val) => {
    init();
  }
);

onMounted(() => {
  init();
});

onUnmounted(() => {
  clearTimer([apiTimer.value]);
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
  height: 100%;
}

.screen-content-container {
  padding-top: size(var(--app-screen-header-height));
  // padding-bottom: size(var(--app-screen-nav-height));
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
