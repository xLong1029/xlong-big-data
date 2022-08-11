/*
 * 模块 : 图表通用模块
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-04-26
 * 版本 : version 1.1
 */
import { ref } from "vue";
import * as echarts from "echarts";
import { deepClone, clearTimer, debounce } from "utils";

/**
 *
 * @param {*} props 接收属性
 * @param {*} emit 触发事件
 * @returns
 */
export default function (props, emit) {
  const option = ref(null);
  const timer = ref(null);
  const chartDom = ref(null);
  const activeIndex = ref(0);

  /**
   * 清除图表
   * 
   * @param {*} chart 
   */
  const clearChart = chart => {
    if (chart && chartDom.value) {
      chart.dispose();
    }
    chart = null;

    clearTimer([timer]);
  };

  /**
   * 排序
   * 
   * @param {Array} chartData 图表数据
   * @param {Array} series 连续值
   * @returns 
   */
  const sortData = (chartData, series) => {
    // 解决因为排序改变图表数据，切换图表时导致死循环的问题
    let data = deepClone(chartData);
    // 处理属性值
    let propertys = [];
    series.forEach(e => propertys.push(e.property));

    // 图表数据排序
    data.sort(compare(propertys));
    return data;
  };

  /**
   * 对比，默认降序
   * @param {String} propertys 属性名
   * @returns 
   */
  const compare = propertys => {
    return function (a, b) {
      let value1 = 0;
      let value2 = 0;

      propertys.forEach(e => {
        value1 += a[e];
        value2 += b[e];
      });
      return propertys.length > 1 ? value2 - value1 : value1 - value2;
    };
  };

  /**
   * 设置动画
   * 
   * @param {*} chart 
   */
  const setAnimation = (chart) => {
    clearTimer([timer.value]);

    activeIndex.value = -1;
    setChartItemActiveByIndex(chart);
    timer.value = setInterval(() => {
      setChartItemActiveByIndex(chart);
    }, props.duration);
  };

  /**
   * 高亮图表项
   * 
   * @param {*} chart 
   * @param {*} dataIndex 
   * @returns activeIndex
   */
  const setChartItemActiveByIndex = (chart, dataIndex = activeIndex.value) => {
    if (!chart || !option.value.series.length) {
      return false;
    }

    const dataLen = option.value.series[0].data.length;

    let seriesIndex = 0;
    // // 只适用于2条线，若多条线需要另外判断最大值
    // if (option.value.series.length === 2) {
    //   seriesIndex =
    //     option.value.series[0].data[dataIndex] >
    //       option.value.series[1].data[dataIndex]
    //       ? 0
    //       : 1;
    // }

    // 取消之前高亮的图形
    chart.dispatchAction({
      type: "downplay",
      seriesIndex,
      dataIndex
    });

    if (props.rewind) {
      dataIndex--;
      if (dataIndex < 0) {
        dataIndex = dataLen - 1;
      }
    } else {
      dataIndex = (dataIndex + 1) % dataLen;
    }

    activeIndex.value = dataIndex;

    // 高亮当前图形
    chart.dispatchAction({
      type: "highlight",
      seriesIndex,
      dataIndex
    });

    // 显示 tooltip
    chart.dispatchAction({
      type: "showTip",
      seriesIndex,
      dataIndex
    });

    if (emit) {
      emit("get-chart-item-active", option.value, seriesIndex, dataIndex);
    }

    return dataIndex;
  };

  return {
    echarts,
    option,
    timer,
    chartDom,
    activeIndex,
    clearChart,
    clearTimer,
    debounce,
    sortData,
    compare,
    setAnimation,
    setChartItemActiveByIndex
  };
}
