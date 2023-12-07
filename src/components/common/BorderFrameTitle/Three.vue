<template>
  <div class="border-frame-title-container border-frame-title-3">
    <div class="border-frame-title-bg"></div>
    <div class="title">
      <img v-if="icon" :src="icon" class="icon" :class="animateClassNme"/>
      <slot name="title">
        <h2 class="text">{{ title }}</h2>
      </slot>
      <slot name="extra"> </slot>
    </div>
  </div>
</template>

<script setup>
defineOptions(
  {
    name: "BorderFrameTitleThree"
  }
);

const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
  icon: {
    type:String,
    default: ''
  },
  animateClassNme: {
    type:String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";
.border-frame-title-container {
  width: 100%;
  height: size(var(--app-screen-title-height));
  display: flex;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(270deg, #06074600 50%, #48cbff 100%);
    border-radius: size(var(--app-screen-title-height) / 2) 0 0
      size(var(--app-screen-title-height) / 2);
  }

  .border-frame-title-bg {
    position: absolute;
    left: size(2);
    top: size(2);
    height: calc(100% - size(4));
    width: 100%;
    border-radius: size(var(--app-screen-title-height) / 2) 0 0
      size(var(--app-screen-title-height) / 2);
    background-image: linear-gradient(270deg, #06074600 0%, #060746 80%, #060746 100%);
    z-index: 1;
  }
  .title {
    z-index: 1;
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: size(15);
    padding-top: size(2);

    h2 {
      @include gradient-font(bottom, color(blue), #ffffff);
      // @include gradient-font(bottom, #ee8ea0, #fffbbd);
      font-weight: bold;
      font-size: size(18);
      letter-spacing: size(1);
      margin-bottom: 0;
      margin-top: 0;
    }

    .icon{
      width: size(20);
      height: size(20);
      margin-right: size(5);
    }
  }
}

@media screen and (max-width: 768px) {
  .border-frame-title-container {
    .title {
      h2 {
        font-size: size(18);
      }
    }
  }
}
</style>
