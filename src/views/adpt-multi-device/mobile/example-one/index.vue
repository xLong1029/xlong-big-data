<template>
  <div class="screen-content">
    <BorderFrame>111</BorderFrame>
    <BorderFrame class="mt-15"></BorderFrame>
    <BorderFrame class="mt-15"></BorderFrame>
  </div>
</template>

<script setup>
import BorderFrame from "@/components/common/BorderFrame/index.vue";
</script>

<style lang="scss" scoped>
.screen-content {
  padding: size(15);
}
</style>
