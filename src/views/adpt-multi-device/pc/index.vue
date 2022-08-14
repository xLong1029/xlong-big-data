<template>
  <div ref="pcScreeRef" class="pc-container">
    ddd
  </div>
</template>

<script setup>
import { ref } from "vue";

const pcScreeRef = ref(null);
</script>

<style lang="scss" scoped>
.pc-container{
  padding: size(15);
  height: 100%;
}
</style>
