<template>
  <div id="bgStars">
    <slot />
    <div id="stars1"></div>
    <div id="stars3"></div>
    <div id="stars4"></div>
  </div>
</template>

<script setup>
defineOptions(
  {
    name: "StarContainer"
  }
);
</script>
<style lang="scss" scoped>
@import "@/styles/star.scss";
</style>
