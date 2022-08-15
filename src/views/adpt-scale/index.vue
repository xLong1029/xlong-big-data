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
import hooks from "@/hooks";

import ScaleContainer from "@/components/common/ScaleContainer/index.vue";
import Header from "@/components/screen/Header/index.vue";
import Nav from "@/components/screen/Nav/index.vue";
import PCScreen from "@/views/adpt-multi-device/pc/index.vue";

const { useScreenNav } = hooks;
const { activeNavIndex, handleChangeNav } = useScreenNav();
</script>

<style lang="scss" scoped>
.screen-container {
  background: var(--app-screen-bg-color);
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
