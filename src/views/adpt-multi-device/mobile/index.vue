<template>
  <div ref="mobileScreeRef" class="mobile-container">
    移动端模式正在建设中，敬请期待...
  </div>
</template>

<script setup>
import { ref } from "vue";

const mobileScreeRef = ref(null);
</script>

<style lang="scss" scoped>
.mobile-container {
  box-sizing: border-box;
  min-height: 100vh;
  padding: size(15);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
