<template>
  <div class="border-frame-title-container border-frame-title-2">
    <div class="title">
      <h2 class="text">{{ title }}</h2>
      <slot name="extra"> </slot>
    </div>
  </div>
</template>

<script setup>
defineOptions(
  {
    name: "BorderFrameTitleTwo"
  }
);

const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";
.border-frame-title-container {
  width: 100%;
  height: size(var(--app-screen-title-height));
  display: flex;
  position: relative;
  background: -webkit-linear-gradient(
    left,
    transparent 5%,
    rgba(44, 59, 173, 0.7),
    transparent 95%
  );
  box-shadow: #0f1e59b5 0px 0px calc(20 * var(--app-screen-base-unit)) inset;
  position: relative;

  &::before {
    display: block;
    content: "";
    background: -webkit-linear-gradient(left, #312b6700, #12a2de, #312b6700);
    height: 1px;
    width: 70%;
    position: absolute;
    top: 0;
    left: 15%;
  }

  &::after {
    display: block;
    content: "";
    background: -webkit-linear-gradient(left, #312b6700, #12a2de, #312b6700);
    height: 1px;
    width: 70%;
    position: absolute;
    bottom: 0;
    left: 15%;
  }

  .title {
    z-index: 1;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: size(2);

    h2 {
      @include gradient-font(bottom, #5accff, #ffffff);
      // @include gradient-font(bottom, #ee8ea0, #fffbbd);
      font-weight: bold;
      font-size: size(18);
      letter-spacing: size(1);
      margin-bottom: 0;
      margin-top: 0;
      position: relative;

      &::before {
        display: block;
        content: "";
        background: url("./../../../assets/images/line-title-bg-3.png") no-repeat center
          left;
        background-size: 100% 100%;
        height: size(14);
        width: size(14);
        position: absolute;
        top: 50%;
        margin-top: size(-8);
        left: size(-24);
      }

      &::after {
        display: block;
        content: "";
        background: url("./../../../assets/images/line-title-bg-3.png") no-repeat center
          left;
        background-size: 100% 100%;
        height: size(14);
        width: size(14);
        position: absolute;
        top: 50%;
        margin-top: size(-8);
        right: size(-24);
        transform: rotate(180deg);
      }
    }
  }
}
</style>
