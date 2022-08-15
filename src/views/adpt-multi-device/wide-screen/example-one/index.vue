<template>
  <div class="screen-content">
    <div class="screen-content__left">
      <BorderFrame></BorderFrame>
    </div>
    <div class="screen-content__center">
      <div class="screen-content__center-top">111</div>
      <div class="screen-content__center-bottom">
        <BorderFrame></BorderFrame>
      </div>
    </div>
    <div class="screen-content__left">
      <BorderFrame direction="right"></BorderFrame>
    </div>
  </div>
</template>

<script setup>
import BorderFrame from "@/components/common/BorderFrame/index.vue";
</script>

<style lang="scss" scoped>
.screen-content {
  padding: size(15);
  height: 100%;
  width: 100%;
  display: flex;

  &__left,
  &__right {
    width: 22%;
    height: 100%;
  }

  &__center {
    width: 56%;
    height: calc(100% - size(var(--app-screen-nav-height)));
    padding: 0 size(15);
    display: flex;
    flex-direction: column;

    &-top {
      height: 60%;
    }

    &-bottom {
      height: 40%;
      padding-top: size(15);
    }
  }
}
</style>
