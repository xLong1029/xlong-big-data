<template>
  <div
    class="border-frame-container"
    :class="{ left: direction === 'left', right: direction === 'right' }"
  >
    <slot />
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  direction: {
    type: String,
    default: "left" // left || right
  }
});
</script>

<style lang="scss" scoped>
.border-frame-container {
  position: relative;
  z-index: 10;
  width: 100%;
  border: 1 * $baseUnit solid transparent;
  border-image: linear-gradient(transparent, #3f6277) 20 20;
  padding: size(35) size(25);

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
  }

  &::before {
    top: size(-1);   
  }

  &::after {
    bottom: size(-1);
  }


   &.left {
    &::before {
      left: size(-1);
    }

    &::after {
      right: size(-1);
      transform: rotate(180deg);
    }
  }

  &.right {
    &::before {
      right: size(-1);
      transform: rotate(90deg);
    }

    &::after {
      left: size(-1);
      transform: rotate(-90deg);
    }
  }
}
</style>
