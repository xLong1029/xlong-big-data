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
</style>
