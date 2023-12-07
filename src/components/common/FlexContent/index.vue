<template>
  <div class="flex-content-container" :class="className">
    <slot/>
  </div>
</template>

<script setup>
defineOptions(
  {
    name: "FlexContent"
  }
);

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.flex-content-container {
  display:flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: size(var(--app-screen-spacing));
}
</style>
