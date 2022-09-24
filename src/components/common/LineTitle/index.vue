<template>
  <div class="line-title-container">
    <div class="title">
      <div class="text">
        <h2>{{ title }}</h2>
      </div>
      <slot name="extra"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LineTitle",
};
</script>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";
@font-face {
  font-family: ShiShangZhongHeiJianTi;
  src: url("./../../../assets/font/ShiShangZhongHeiJianTi.ttf");
}

.line-title-container {
  width: 100%;
  height: size(30);
  line-height: size(30);
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

  .text {
    display: flex;
    align-items: center;
  }
}

@media screen and (max-width: 768px) {
  .line-title-container {
    .title {
      h2 {
        font-size: size(18);
      }
    }
  }
}
</style>
