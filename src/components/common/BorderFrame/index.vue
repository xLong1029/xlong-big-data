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
  padding: 35 * $baseUnit 25 * $baseUnit;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    
    // @include background-setting(
    //   "#{$imgPath}/border-frame-corner.png" , 22 * $baseUnit, 22 * $baseUnit
    // );
  }

  &::before {
    top: -1 * $baseUnit;   
  }

  &::after {
    bottom: -1 * $baseUnit;
  }


   &.left {
    &::before {
      left: -1 * $baseUnit;
    }

    &::after {
      right: -1 * $baseUnit;
      transform: rotate(180deg);
    }
  }

  &.right {
    &::before {
      right: -1 * $baseUnit;
      transform: rotate(90deg);
    }

    &::after {
      left: -1 * $baseUnit;
      transform: rotate(-90deg);
    }
  }
}
</style>
