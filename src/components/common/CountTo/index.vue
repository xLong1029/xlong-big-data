<template>
  <span>
    {{ displayValue }}
  </span>
</template>
<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { requestAnimationFrame, cancelAnimationFrame } from "./requestAnimationFrame.js";

const props = defineProps({
  startVal: {
    type: Number,
    required: false,
    default: 0,
  },
  endVal: {
    type: Number,
    required: false,
    default: 2017,
  },
  duration: {
    type: Number,
    required: false,
    default: 3000,
  },
  autoplay: {
    type: Boolean,
    required: false,
    default: true,
  },
  decimals: {
    type: Number,
    required: false,
    default: 0,
    validator(value) {
      return value >= 0;
    },
  },
  decimal: {
    type: String,
    required: false,
    default: ".",
  },
  separator: {
    type: String,
    required: false,
    default: ",",
  },
  prefix: {
    type: String,
    required: false,
    default: "",
  },
  suffix: {
    type: String,
    required: false,
    default: "",
  },
  useEasing: {
    type: Boolean,
    required: false,
    default: true,
  },
  easingFn: {
    type: Function,
    default(t, b, c, d) {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
    },
  },
});

const emit = defineEmits(["callback"]);

const localStartVal = ref();
const displayValue = ref(0);
const printVal = ref(null);
const paused = ref(false);
const localDuration = ref(0);
const startTime = ref(null);
const timestamp = ref(null);
const remaining = ref(null);
const rAF = ref(null);

const countDown = computed(() => props.startVal > props.endVal);

const start = () => {
  const { startVal, duration } = props;

  localStartVal.value = startVal;
  startTime.value = null;
  localDuration.value = duration;
  paused.value = false;
  rAF.value = requestAnimationFrame(count);
};

const pauseResume = () => {
  const { paused } = props;

  if (paused) {
    resume();
    paused.value = false;
  } else {
    pause();
    paused.value = true;
  }
};

const pause = () => {
  cancelAnimationFrame(rAF.value);
};

const resume = () => {
  const { remaining, printVal } = props;
  startTime.value = null;
  localDuration.value = +remaining;
  localStartVal.value = +printVal;
  requestAnimationFrame(count);
};

const reset = () => {
  const { rAF, startVal } = propsl;
  startTime.value = null;
  cancelAnimationFrame(rAF);
  displayValue.value = formatNumber(startVal);
};

const count = (timestampTemp) => {
  if (!startTime.value) startTime.value = timestampTemp;

  const { endVal, useEasing, easingFn } = props;

  timestamp.value = timestampTemp;
  const progress = timestampTemp - startTime.value;
  remaining.value = localDuration.value - progress;

  if (useEasing) {
    if (countDown.value) {
      printVal.value =
        localStartVal.value -
        easingFn(progress, 0, localStartVal.value - endVal, localDuration.value);
    } else {
      printVal.value = easingFn(
        progress,
        localStartVal.value,
        endVal - localStartVal.value,
        localDuration.value
      );
    }
  } else {
    if (countDown.value) {
      printVal.value =
        localStartVal.value -
        (localStartVal.value - endVal) * (progress / localDuration.value);
    } else {
      printVal.value =
        localStartVal.value +
        (endVal - localStartVal.value) * (progress / localDuration.value);
    }
  }
  if (countDown.value) {
    printVal.value = printVal.value < endVal ? endVal : printVal.value;
  } else {
    printVal.value = printVal.value > endVal ? endVal : printVal.value;
  }

  displayValue.value = formatNumber(printVal.value);
  if (progress < localDuration.value) {
    rAF.value = requestAnimationFrame(count);
  } else {
    emit("callback");
  }
};

const isNumber = (val) => !isNaN(parseFloat(val));

const formatNumber = (num) => {
  const { prefix, suffix, decimals, separator } = props;
  num = num.toFixed(decimals);

  num += "";
  const x = num.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? decimal + x[1] : "";
  const rgx = /(\d+)(\d{3})/;
  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + separator + "$2");
    }
  }
  return prefix + x1 + x2 + suffix;
};

watch(
  () => props.startVal,
  () => {
    if (props.autoplay) {
      start();
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => props.endVal,
  () => {
    if (props.autoplay) {
      start();
    }
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  const { startVal } = props;
  localStartVal.value = startVal;
  displayValue.value = formatNumber(startVal);
});

onUnmounted(() => {
  cancelAnimationFrame(rAF.value);
});
</script>
