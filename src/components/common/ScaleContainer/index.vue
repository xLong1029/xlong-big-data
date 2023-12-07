<template>
  <transition :name="transitionName">
    <div
      v-show="visible"
      ref="ScaleContainer"
      class="scale-container scroll-style"
      :class="{
        'scroll__x-visible': scrollX,
        'scroll__y-visible': scrollY,
      }"
    >
      <div class="no-scale-box">
        <slot name="noScale"></slot>
      </div>
      <div
        ref="scaleBox"
        :class="scrollX ? 'scale-box__scroll' : 'scale-box'"
        :style="{
          width: `${width}px`,
          height: `${height}px`,
        }"
      >
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide, nextTick, watch } from "vue";
import { debounce, clearTimer } from "@/utils";

defineOptions(
  {
    name: "ScaleContainer"
  }
);

const props = defineProps({
  // 设计稿宽度
  width: {
    type: Number,
    default: 1920,
  },
  // 设计稿高度
  height: {
    type: Number,
    default: 1080,
  },
  // 是否显示滚动条
  scroll: {
    type: Boolean,
    default: false,
  },
  // 滚动条位置
  scrollPosition: {
    type: String,
    default: "center",
  },
  // 显示1:1设计稿尺寸，若设计稿尺寸大于当前屏幕则显示xy轴滚动条
  displayOrigin: {
    type: Boolean,
    default: false,
  },
  // 过渡动画名称
  transitionName: {
    type: String,
    default: "fade",
  },
});

const visible = ref(true);
const scaleBox = ref(null);
const ScaleContainer = ref(null);
const scale = ref(1);

const scrollX = ref(false);
const scrollY = ref(false);

const timer = ref(null);

watch(
  () => props.scroll,
  (val) => {
    scrollX.value = val;
  }
);

const getScale = () => {
  const { width, height, displayOrigin, scroll } = props;
  scrollX.value = scroll;

  if (displayOrigin) {
    scrollY.value = scroll;
    return 1;
  }

  let ww = window.innerWidth / width;
  let wh = window.innerHeight / height;

  if (scrollX.value) {
    return wh;
  }
  return ww < wh ? ww : wh;
};

// 设置缩放大小
const setScale = debounce(() => {
  if(!scaleBox.value) return;

  scale.value = getScale();

  const { width, height, scrollPosition, scroll } = props;

  scaleBox.value.style.setProperty("--scale", scale.value);
  scaleBox.value.style.setProperty("--height", `${height}px`);
  scaleBox.value.style.setProperty("--width", `${width}px`);

  visible.value = false;
  clearTimer([timer.value]);
      timer.value = setTimeout(() => {
    visible.value = true;
    nextTick(() => {
      if (scrollX.value) {
        const position = {
          left: 0,
          center:
            (scaleBox.value.offsetWidth * scale.value -
              ScaleContainer.value.offsetWidth) /
            2,
          right: scaleBox.value.offsetWidth * scale.value,
        };
        ScaleContainer.value.scrollLeft = position[scrollPosition];
      }
    });
  }, 100);
}, 500);

onMounted(() => {
  setScale();
  window.addEventListener("resize", setScale);
});

onUnmounted(() => {
  window.removeEventListener("resize", setScale);
});

provide("getPageScale", scale);
</script>

<style lang="scss" scoped>
.scale-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  overflow: hidden;
}

.scroll__x-visible {
  overflow-x: auto;
}

.scroll__y-visible {
  overflow-y: auto;
}

.scale-box {
  --scale: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: scale(var(--scale)) translateX(-50%) translateY(-50%);
  transform-origin: 0 0;
  transition: 0.3s;
  overflow: hidden;

  &__scroll {
    --scale: 1;
    position: absolute;
    transform: scale(var(--scale));
    transform-origin: 0 0;
    transition: 0.3s;
  }
}

.no-scale-box {
  position: absolute;
  width: calc(var(--width) * var(--scale));
  height: calc(var(--height) * var(--scale));
}
</style>
