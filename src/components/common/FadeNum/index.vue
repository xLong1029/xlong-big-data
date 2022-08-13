<template>
  <!-- eslint-disable -->
  <transition name="fade">
    <span v-if="num !== 0" class="change-num" :style="{ color }">{{ setText() }}</span>
  </transition>
</template>

<script setup>
import { ref, watch } from "@vue/runtime-core";
// eslint-disable-next-line no-undef
const props = defineProps({
  // 数值
  value: {
    type: Number,
    default: 0,
  },
  // 字体颜色
  color: {
    type: String,
    default: "#3fffe4",
  },
  // 持续时间
  duration: {
    type: Number,
    default: 1000,
  },
});

const num = ref(0);

watch(
  () => props.value,
  (val) => (num.value = val)
);

watch(
  () => num,
  (val) => {
    if (val !== 0) {
      setTimeout(() => {
        num.value = 0;
      }, props.duration);
    }
  }
);

const setText = () => `${num.value > 0 ? "+" : ""}${num.value}`;
</script>
<style lang="scss" scoped>
.change-num {
  position: absolute;
  z-index: 999;
  font-weight: normal;
  font-size: 18 * $baseUnit;
  margin-left: 5 * $baseUnit;
}
</style>
