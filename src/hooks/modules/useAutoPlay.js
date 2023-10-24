/*
 * 模块 : 图表模块
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-08-19
 * 版本 : version 1.0
 */

import { ref, reactive, onMounted, onUnmounted, watch } from "vue";

export default function (props) {
  // 默认配置
  const defaultConfig = reactive({
    duration: props?.duration || 3000,
    data: props?.data || [],
  });

  // 当前激活索引
  const activeIndex = ref(0);
  // 定时器
  const timer = ref(null);
  // 是否开启自动播放
  const autoplay = ref(true);
  // 记录循环次数
  const loopCount = ref(0);

  /**
   * 设置激活索引值
   * @param {*} index 索引
   */
  const setActiveIndex = (index) => {
    activeIndex.value = index;
    startTimer();
  };

  /**
   * 播放回调方法
   *
   * @returns
   */
  const playCallback = () => {
    if (!autoplay.value) {
      stopTimer();
      return;
    }
    activeIndex.value++;
    if (activeIndex.value >= defaultConfig.data.length) {
      activeIndex.value = 0;
      loopCount.value++;
    }
  };

  /**
   * 启动自动播放
   */
  const startTimer = () => {
    stopTimer();
    timer.value = setInterval(playCallback, defaultConfig.duration);
  };

  /**
   * 停止自动播放
   */
  const stopTimer = () => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  };

  // 监听自动播放变量
  watch(autoplay, (val) => {
    if (val) {
      startTimer();
    } else {
      stopTimer();
    }
  },
  {
    immediate: true,
  });

  onMounted(() => {
    if (autoplay.value) {
      startTimer();
    }
  });

  onUnmounted(() => {
    stopTimer();
  });
  return { activeIndex, autoplay, setActiveIndex, loopCount };
}
