<template>
  <div
    class="border-frame-container"
    :class="{ left: direction === 'left', right: direction === 'right' }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "BorderFrame",
};
</script>


<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: "left", // left || right
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.border-frame-container {
  position: relative;
  z-index: 10;
  width: 100%;
  border: size(1) solid transparent;
  border-image: linear-gradient(#0b64ad, #0a345c) 20 20;
  padding: size(15) size(15);
  height: 100%;
  background: rgb(2 15 34 / 60%);

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
  }

  &::before {
    top: size(-1);

    @include background-setting(
      "./../../../assets/images/border-frame-corner.png",
      size(15),
      size(15)
    );
  }

  &::after {
    bottom: size(-1);
    @include background-setting(
      "./../../../assets/images/border-frame-corner.png",
      size(15),
      size(15)
    );
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
