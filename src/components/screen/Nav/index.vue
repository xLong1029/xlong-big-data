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
</style>
