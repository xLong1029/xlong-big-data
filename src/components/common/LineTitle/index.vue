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
import { defineProps } from "@vue/runtime-core";

// eslint-disable-next-line no-unused-vars
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
  height: 30 * $baseUnit;
  line-height: 30 * $baseUnit;
  display: flex;

  &::before {
    content: "";
    display: block;
    width: 4 * $baseUnit;
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
    margin-left: 2 * $baseUnit;

    h2 {
      color: #45f3fd;
      font-weight: 500;
      font-size: 20 * $baseUnit;
      margin-left: 3 * $baseUnit;
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
