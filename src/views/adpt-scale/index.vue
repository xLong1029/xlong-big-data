<template>
  <ScaleContainer>
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

const { useScreenNav, useScreenApiData } = hooks;
const { activeNavIndex, handleChangeNav } = useScreenNav();
const { apiLoading, apiTimer, getScreenData } = useScreenApiData();

watch(
  () => activeNavIndex.value,
  (val) => {
    apiLoading.value = true;
    getScreenData(val);
  }
);

onMounted(() => {
  apiLoading.value = true;
  getScreenData(activeNavIndex.value);
  apiTimer.value = setInterval(() => {
    getScreenData(activeNavIndex.value);
  }, 5000);
});

onUnmounted(() => {
  clearTimer([apiTimer.value]);
});
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
