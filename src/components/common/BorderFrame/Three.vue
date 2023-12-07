<template>
  <div ref="el" class="border-frame-container border-frame-3">
    <svg class="border-svg-container border-left" :width="elWidth" :height="elHeight">
      <path
        class="stroke-1"
        :d="`
              M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
              L ${elWidth - 20} 10 L ${elWidth - 5} 25
              L ${elWidth - 5} ${elHeight - 5} L 20 ${elHeight - 5}
              L 5 ${elHeight - 20} L 5 20
        `"
      ></path>
      <path class="stroke-2" d="M 5 20 L 5 10 L 12 3  L 60 3 L 68 10"></path>
      <path
        stroke-linecap="round"
        stroke-dasharray="10, 5"
        class="stroke-3"
        d="M 16 10 L 61 10"
      ></path>
      <path
        class="stroke-2"
        :d="`M ${elWidth - 5} ${elHeight - 30} L ${elWidth - 5} ${elHeight - 5} L ${
          elWidth - 30
        } ${elHeight - 5}`"
      ></path>
    </svg>
    <div class="border-frame-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useResizeObserver } from '@vueuse/core'

defineOptions(
  {
    name: "BorderFrameThree"
  }
);

const el = ref(null);
const elWidth = ref(50);
const elHeight = ref(50);

useResizeObserver(el, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;

  elWidth.value = width;
  elHeight.value = height;
});
</script>

<style lang="scss" scoped>
.border-frame-container {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
}

.border-svg-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.border-svg-container > path {
  fill: transparent;
}

.border-svg-container .stroke-1 {
  stroke-width: size(1);
  stroke: #7087f5;
}

.border-svg-container .stroke-2 {
  stroke-width: size(2);
  stroke: #01daff;
}

.border-svg-container .stroke-3 {
  stroke-width: size(3);
  stroke: #7087f5;
}

.border-left {
  left: 0;
}

.border-right {
  right: 0;
}

.border-frame-content {
  padding: size(15) size(10) size(10) size(10);
  height: 100%;
  position: relative;
  z-index: 1;
}
</style>
