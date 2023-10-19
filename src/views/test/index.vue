<template>
  <div class="wrapper">
    <div class="box">
        <BorderFrameFlyLight>
    ddd
    </BorderFrameFlyLight>
    </div>
  </div>
</template>

<script setup>
import BorderFrameFlyLight from "@/components/common/BorderFrame/FlyLight.vue"
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
  display: flex;
}
</style>
