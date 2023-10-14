<template>
  <div class="border-frame-view-container" :class="className">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "BorderFrameView",
};
</script>


<script setup>
const props = defineProps({
  className: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.border-frame-view-container {
  display:flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - size(var(--app-screen-title-height)));
}
</style>
