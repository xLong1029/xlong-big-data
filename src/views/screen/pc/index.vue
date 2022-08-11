<template>
  <div ref="pcScreeRef" class="pc-container">PC端模式正在建设中，敬请期待...</div>
</template>

<script setup>
import { ref } from "vue";

const pcScreeRef = ref(null);
</script>

<style lang="scss" scoped>
.pc-container {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
