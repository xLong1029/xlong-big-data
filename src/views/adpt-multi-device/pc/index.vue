<template>
  <div ref="pcScreeRef" class="pc-container">
    <!-- PC模式正在建设中，敬请期待...
    <div class="mt-5">eee</div> -->
    <Header/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "@/components/screen/Header/index.vue";

const pcScreeRef = ref(null);
</script>

<style lang="scss" scoped>

.pc-container {
  box-sizing: border-box;
  min-height: 100vh;
  padding: calc(20 * var(--app-base-unit));
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(20 * var(--app-base-unit));
}
</style>
