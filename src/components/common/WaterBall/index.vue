<template>
  <div ref="el" class="water-ball-container" :style="{ width, height }">
    <div class="water-ball__outer">
      <div class="water-ball__inner" :style="{ height: `${waveHeight}px` }">
        <div
          class="water-ball__wave1"
          :style="{ width: `${2 * elWidth}px`, height: `${1.2 * elHeight}px` }"
        ></div>
        <div
          class="water-ball__wave2"
          :style="{
            width: `${2 * elWidth}px`,
            height: `${1.2 * elHeight}px`,
            left: `-${elWidth / 2}px`,
          }"
        ></div>
      </div>
      <div class="water-ball__percent" id="percent">100%</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useResizeObserver } from "@vueuse/core";

defineOptions(
  {
    name: "WaterBall"
  }
);

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  width: {
    type: [String, Number],
    default: "100%",
  },
  height: {
    type: [String, Number],
    default: "100%",
  },
});

const el = ref(null);
const elWidth = ref(0);
const elHeight = ref(0);
const waveHeight = ref(0);

useResizeObserver(el, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;

  elWidth.value = width;
  elHeight.value = height;

  handleWaveHeight(props.value);
});

const handleWaveHeight = (percent) => {
  let value = percent;
  if (value < 0) {
    value = 0;
  }
  if (value > 100) {
    value = 100;
  }

  if (elHeight.value > 0) {
    waveHeight.value = (elHeight.value / 100) * value - 10;
  }
};

watch(
  () => props.value,
  (val) => {
    handleWaveHeight(val);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.water-ball {
  &-container {
    display: flex;
  }

  &__outer {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
  }

  &__inner {
    width: 100%;
    height: 0px;
    position: absolute;
    left: 0;
    bottom: 0;
    transition: height 1s;
    -moz-transition: height 1s;
    -webkit-transition: height 1s;
    -o-transition: height 1s;
  }

  &__percent {
    position: absolute;
    font-size: size(40);
    color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    font-weight: bold;
  }

  &__wave1 {
    background: url(./../../../assets/images/wave1.png) repeat-x;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    animation: moveLeft 1s linear infinite;
    -webkit-animation: moveLeft 1s linear infinite;
  }

  &__wave2 {
    background: url(./../../../assets/images/wave2.png) repeat-x;
    position: absolute;
    top: 0px;
    // left: -200px;
    z-index: 1;
    animation: moveRight 1.5s linear infinite;
    -webkit-animation: moveRight 1.5s linear infinite;
  }
}

@keyframes moveLeft {
  from {
    left: 0px;
  }
  to {
    left: -100%;
  }
}

@keyframes moveRight {
  from {
    left: -100%;
  }
  to {
    left: 0px;
  }
}
</style>
