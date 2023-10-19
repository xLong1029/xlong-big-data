<template>
  <div class="wrapper">
    <div class="box">
        <Fire/>
    </div>
  </div>
</template>

<script setup>
import Fire from "@/components/common/Fire/index.vue"
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.box {
  width: 100px;
  height: 100px;
}
</style>
