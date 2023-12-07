<template>
  <div class="fade-num-container">
    <slot></slot>
    <transition name="fade">
      <span
        v-if="value !== 0"
        class="change-num"
        :style="{ color, right: geRightPos(value) }"
        >{{ setText() }}</span
      >
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { clearTimer } from "@/utils";

defineOptions(
  {
    name: "FadeNum"
  }
);

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

const emit = defineEmits(["update:value"]);
const timer = ref(null);

watch(
  () => props.value,
  (val) => {
    if (val !== 0) {
      clearTimer([timer.value]);
      timer.value = setTimeout(() => {
        emit("update:value", 0);
      }, props.duration);
    }
  }
);

const setText = () => `${props.value > 0 ? "+" : ""}${props.value}`;

const geRightPos = (value) => `-${value.toString().length * 10 + 10}px`;
</script>
<style lang="scss" scoped>
.fade-num-container {
  position: relative;
  // padding: 0 size(5);
}
.change-num {
  position: absolute;
  z-index: 999;
  font-weight: normal;
  font-size: size(14);
  top: 0;
  right: size(-40);
}
</style>
