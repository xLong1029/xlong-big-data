<template>
  <div class="line-title-container">
    <div class="title">
      <div class="text">
        <span class="dot"></span>
        <h2>{{ title }}</h2>
      </div>
      <slot name="extra"> </slot>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  title: {
    type: String,
    default: "标题"
  }
});
</script>

<style lang="scss" scoped>
.line-title-container {
  width: 100%;
  height: size(30);
  line-height: size(30);
  display: flex;

  &::before {
    content: "";
    display: block;
    width: size(4);
    height: 100%;
    background: rgba(31, 76, 162, 0.6);
  }

  .dot {
    display: inline-block;
  }

  .title {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: size(2);

    h2 {
      color: #45f3fd;
      font-weight: 500;
      font-size: size(20);
      margin-left: size(3);
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
</style>
