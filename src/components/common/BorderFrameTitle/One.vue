<template>
  <div class="border-frame-title-container border-frame-title-1">
    <div class="title">
      <h2 class="text">{{ title }}</h2>
      <slot name="extra"> </slot>
    </div>
  </div>
</template>

<script setup>
defineOptions(
  {
    name: "BorderFrameTitleOne"
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

  &::before {
    content: "";
    position: absolute;

    z-index: 1;
    top: 50%;
    left: size(10);
    margin-top: size(-11);
    display: block;
    width: size(22);
    height: size(22);
    background: url("./../../../assets/images/line-title-bg-1.png") no-repeat;
    // background: url("./../../../assets/screen_images/line-title-bg-2.png") no-repeat;
    background-position: left center;
    background-size: auto 100%;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      270deg,
      rgba(31, 76, 162, 0) 0%,
      rgba(44,59,173,0.7) 100%
    );

    // background-image: linear-gradient(
    //   270deg,
    //   rgba(31, 76, 162, 0) 0%,
    //   rgba(26 ,6,117,0.7) 100%
    // );
  }

  .title {
    z-index: 1;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: size(10);
    padding-top: size(2);

    h2 {
      @include gradient-font(bottom, color(blue), #ffffff);
      // @include gradient-font(bottom, #ee8ea0, #fffbbd);
      font-weight: bold;
      font-size: size(18);
      margin-left: size(20);
      letter-spacing: size(1);
      margin-bottom: 0;
      margin-top: 0;
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
