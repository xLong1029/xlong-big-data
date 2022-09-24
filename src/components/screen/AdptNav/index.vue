<template>
  <div class="screen-nav-container">
    <div
      class="screen-nav__left"
      :class="{ 'is-active': active === 0 }"
      @click="emit('change-nav', 0)"
    >
      <span class="nav-text">导航一</span>
    </div>
    <div
      class="screen-nav__right"
      :class="{ 'is-active': active === 1 }"
      @click="emit('change-nav', 1)"
    >
      <span class="nav-text">导航二</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["change-nav"]);
</script>

<style lang="scss" scoped>
@import "@/styles/nav-style.scss";

@media screen and (max-width: 1366px) {
  .screen-nav {
    &-container {
      width: 80%;
    }
  }
}

@media screen and (max-width: 1024px) {
  .screen-nav {
    &-container {
      width: 100%;
      background-size: 120% 100%;

      .nav-text {
        font-size: size(16);
      }
    }

    &__left,
    &__right {
      line-height: size(30);
      width: 21.5%;

      &.is-active{
        width: 21.5%;
      }
    }
  }
}

@media screen and (max-width: 768px) {
}

@media screen and (max-width: 640px) {
}

@media screen and (max-width: 560px) {
}

@media screen and (max-width: 414px) {
  .screen-nav {
    &-container {
      background-size: 160% 100%;
    }

    &__left,
    &__right {
      line-height: size(30);
      width: 28%;

      &.is-active{
        width: 28%;
      }
    }
  }
}

@media screen and (max-width: 375px) {
}
</style>
