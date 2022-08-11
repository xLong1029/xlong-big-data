<template>
  <div v-if="isLoaded">
    <component :is="views[viewActive]" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import hooks from "@/hooks";
import PCScreen from "./pc";
import WideScreen from "./wide-screen";
import MobileScreen from "./mobile";

const { useViews, useCommon } = hooks;

const { isLoaded, views, viewActive, initViews, setViews } = useViews();
const { setSysLoading } = useCommon();

console.log(setSysLoading);

isLoaded.value = initViews(PCScreen, WideScreen, MobileScreen);

onMounted(() => {
  setSysLoading(false);
  setViews();
  window.addEventListener("resize", setViews);
});

onUnmounted(() => {
  window.removeEventListener("resize", setViews);
});
</script>

<style lang="scss">
.screen-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
