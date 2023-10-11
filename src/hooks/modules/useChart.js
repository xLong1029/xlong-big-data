/*
 * 模块 : 图表模块
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-08-19
 * 版本 : version 1.0
 */

import {
  ref,
  reactive,
  shallowReactive,
  onUnmounted,
  watch,
} from "vue";
import * as echarts from "echarts";
import { debounce } from "@/utils";
import { useWindowSize } from '@vueuse/core'

export default function () {
  // 默认配置项
  const defaultOption = reactive({
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,0.6)",
      borderWidth: 0,
      textStyle: {
        fontSize: 12,
        color: "#FFFFFF",
      },
    },
  });

  // 图表
  const chart = shallowReactive({
    value: null,
  });
  // dom容器
  const container = ref(null);
  // 自定义配置项
  const option = ref(null);

  const { width: winWidth, height: winHeight } = useWindowSize();

  onUnmounted(() => {
    chart.value?.dispose();
    chart.value = null;
  });

  /**
   * 设置配置项
   */
  const setOption = () => {
    chart.value?.setOption({ ...defaultOption, ...option.value });
  };

  // 监听配置项和dom改变
  watch([option, container], ([opt, dom]) => {
    if (dom && !chart.value) {
      // 暗色系，svg减少内存
      chart.value = echarts.init(dom, { theme: "dark" }, { render: 'svg' });
    }
    setOption();
  });

  /**
   * 处理屏幕尺寸变化
   */
  const handleResizeScreen = debounce(() => {
    if (chart.value) {
      // chart.value.resize();

      chart.value?.dispose();
      chart.value = null;
      if(container.value){
        chart.value = echarts.init(container.value, { theme: "dark" }, { render: 'svg' });
        setOption();
      }
    }
  }, 100);

  watch(
    [winWidth, winHeight],
    ([width, height]) => {
      handleResizeScreen();
    },
    {
      immediate: true
    }
  );

  return {
    chart,
    echarts,
    option,
    container,
  };
}
