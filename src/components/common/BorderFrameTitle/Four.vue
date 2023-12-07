<template>
  <div class="border-frame-title-container border-frame-title-4">
    <div class="title">
      <h2 class="text">{{ title }}</h2>
      <slot name="extra"> </slot>
    </div>
  </div>
</template>

<script setup>
defineOptions(
  {
    name: "BorderFrameTitleFour"
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
@font-face {
  font-family: ShiShangZhongHeiJianTi;
  src: url("./../../../assets/font/ShiShangZhongHeiJianTi.ttf");
}

.border-frame-title-container {
  width: 100%;
  height: size(var(--app-screen-title-height));
  line-height: size(var(--app-screen-title-height));
  display: flex;

  &::before {
    content: "";
    display: block;
    width: size(3);
    height: 100%;
    background: color(blue);
  }

  .title {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: size(3);
    justify-content: space-between;

    h2 {
      color: #45f3fd;
      font-family: "ShiShangZhongHeiJianTi";
      font-weight: 500;
      font-size: size(22);
      margin-left: size(5);
      letter-spacing: size(1);
      margin-bottom: 0;
      margin-top: 0;
    }

    background-image: linear-gradient(
      270deg,
      rgba(31, 76, 162, 0) 0%,
      rgba(31, 76, 162, 0.6) 100%
    );
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
