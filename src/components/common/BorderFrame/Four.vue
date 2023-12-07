<template>
  <div class="border-frame-container border-frame-4" :class="{ raidus: raidus }">
    <div class="border-frame-gradient-background top"></div>
    <div class="border-frame-gradient-background bottom"></div>
    <div class="border-frame-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineOptions(
  {
    name: "BorderFrameFour"
  }
);

const props = defineProps({
  raidus: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.border-frame-container {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  box-shadow: rgba(78, 100, 185, 0.3) 0px 0px calc(34 * var(--app-screen-base-unit)) inset;
  background-color: #14195982;
  border: size(1) solid #273285;
  &.raidus {
    border-radius: size(8);
  }

  &::before {
    display: block;
    content: '';
    background: -webkit-linear-gradient(bottom, #312b6700, #12a2de, #312b6700);
    height: 100%;
    width: 1px;
    position: absolute;
    top: 0;
    left: -1px;
    opacity: 0.68;
  }

  &::after {
    display: block;
    content: '';
    background: -webkit-linear-gradient(bottom, #312b6700, #12a2de, #312b6700);
    height: 100%;
    width: 1px;
    position: absolute;
    top: 0;
    right: -1px;
    opacity: 0.68;
  }
}

.border-frame-gradient-background
{
  position: absolute;
  width: 100%;
  height: 30%;

  &.top{
    top: 0;
    left: 0;
    background: linear-gradient(180deg,  #2438925e, transparent);
  }

  &.bottom{
    bottom: 0;
    left: 0;
    background: linear-gradient(0deg,  #2438925e, transparent);
  }
}

.border-frame-content{
  position: relative;
  z-index: 1;
  height: 100%;
}
</style>
