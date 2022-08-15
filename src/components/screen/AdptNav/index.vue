<template>
  <div class="screen-nav-container">
    <div class="screen-nav__left" :class="{ 'is-active': active === 0 }">
      <span class="nav-text" @click="emit('change-nav', 0)">导航一</span>
    </div>
    <div class="screen-nav__right" :class="{ 'is-active': active === 1 }">
      <span class="nav-text" @click="emit('change-nav', 1)">导航二</span>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps({
  active: {
    type: Number,
    default: 0,
  },
});

// eslint-disable-next-line
const emit = defineEmits(["change-nav"]);
</script>

<style lang="scss" scoped>
@import "@/styles/nav-style.scss";

@media screen and (max-width: 1366px) {
  .screen-nav {
    &-container{
      width: 80%;
    }
  }
}

@media screen and (max-width: 1024px) {
  .screen-nav {
    &-container{
      width: 100%;

      .nav-text{
        font-size: size(14);
        line-height: size(30);
        padding: size(2) 15%;
      }
    }

    &__left,
    &__right {
      background-size: 120% 100%;
    }
  }
}

@media screen and (max-width: 768px) {
  .screen-nav {
    &__left,
    &__right {
      background-size: 120% 100%;
    }
  }
}

@media screen and (max-width: 640px) {
}

@media screen and (max-width: 560px) {
  .screen-nav {
    &__left,
    &__right {
      background-size: 140% 100%;
    }
  }
}

@media screen and (max-width: 414px) {
  .screen-nav {
    &__left,
    &__right {
      background-size: 160% 100%;
    }
  }
}

@media screen and (max-width: 375px) {
}
</style>
