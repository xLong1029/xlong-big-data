/*
 * 模块 : 图表模块
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-08-19
 * 版本 : version 1.0
 */

import { ref, reactive, onMounted, onUnmounted, watch } from "vue";
// import { logInfo } from "@/utils";

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
  // 记录村黄次数
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

  // /**
  //  * 定时器
  //  *
  //  * @param {*} cb
  //  * @param {*} duration
  //  * @returns
  //  */
  // const setInterval = (cb, duration) => {
  //   let timer = null;
  //   let st = null;
  //   let pt = null;
  //   let et = null;
  //   let count = 0;

  //   const loop = () => {
  //     st = st || new Date().getTime();
  //     et = new Date().getTime();
  //     const dt = et - st;
  //     if (props.showCount && et - pt >= 1000) {
  //       pt = et;
  //     }
  //     if (dt >= duration) {
  //       st = et;
  //       cb();
  //       if (props.showCount) {
  //         logInfo(count++);
  //       }
  //     }
  //     timer = window.requestAnimationFrame(loop);
  //   };
  //   loop();
  //   return () => {
  //     window.cancelAnimationFrame(timer);
  //   };
  // };

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
