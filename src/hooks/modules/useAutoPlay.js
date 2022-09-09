import { isFunction } from "@vue/shared";
import { ref, reactive, onMounted, onUnmounted, watch } from "vue";

export default function (props) {
  const defaultConfig = reactive({
    duration: props?.duration || 3000,
    data: props?.data || [],
  });
  const activeIndex = ref(0);
  const timer = ref(null);
  const onChange = ref(null);
  const autoplay = ref(true);
  const loopCount = ref(0);

  const setActiveIndex = (index) => {
    activeIndex.value = index;
    restartTimer();
  };

  const playCallback = () => {
    if (!autoplay.value) {
      stopTimer();
      return;
    }
    activeIndex.value++;
    if (activeIndex.value === defaultConfig.data.length) {
      activeIndex.value = 0;
      loopCount.value++;
    }
  };
  const setInterval = (cb, duration) => {
    let timer = null;
    let st = null;
    let pt = null;
    let et = null;
    let count = 0;

    const loop = () => {
      st = st || new Date().getTime();
      et = new Date().getTime();
      const dt = et - st;
      if (props.showCount && et - pt >= 1000) {
        pt = et;
      }
      if (dt >= duration) {
        st = et;
        cb();
        if (props.showCount) {
          console.log(count++);
        }
      }
      timer = window.requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.cancelAnimationFrame(timer);
    };
  };

  const restartTimer = () => {
    stopTimer();
    timer.value = setInterval(playCallback, defaultConfig.duration);
  };

  const stopTimer = () => {
    if (timer.value) {
      timer.value();
    }
  };

  watch(activeIndex, (val, preVal) => {
    if (isFunction(onChange.value)) {
      onChange.value(val, preVal);
    }
  });

  watch(autoplay, (val) => {
    if (val) {
      restartTimer();
    } else {
      stopTimer();
    }
  });

  onMounted(() => {
    if (autoplay.value) {
      restartTimer();
    }
  });

  onUnmounted(() => {
    stopTimer();
  });
  return { activeIndex, autoplay, setActiveIndex, onChange, loopCount };
}
