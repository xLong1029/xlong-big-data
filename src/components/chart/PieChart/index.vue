<template>
  <div ref="container" :style="{ height, width }" />
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";
import hooks from "@/hooks";

defineOptions(
  {
    name: "PieChart"
  }
);

const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
  // 宽度
  width: {
    type: [Number, String],
    default: "100%",
  },
  // 高度
  height: {
    type: [Number, String],
    default: "100%",
  },
  // 图表数据
  chartData: {
    type: Array,
    default: () => [],
  },
  // 指示器数值配置
  axis: {
    type: Object,
    default: () => ({
      name: "名称",
      property: "name",
    }),
  },
  // 数值配置
  series: {
    type: Object,
    default: () => ({
      name: "名称",
      property: "name",
    }),
  },
  // 颜色列表
  colorList: {
    type: Array,
    default: () => ["#ffbf4b", "#fd65b9", "#b14bff", "#3886fb", "#45f3fd", "#97ff84"],
  },
  // 缩放基数
  scale: {
    type: Number,
    default: 1,
  },
  // 是否自动播放
  autoplay: {
    type: Boolean,
    default: false,
  },
  // 持续时间
  duration: {
    type: Number,
    default: 1500,
  },
  // 文本大小
  labelFontSize: {
    type: Number,
    default: 14,
  },
  // 图例
  legend: {
    type: Object,
    default: () => ({}),
  },
  // 网格
  grid: {
    type: Object,
    default: () => ({
      containLabel: true,
    }),
  },
  // 提示
  tooltip: {
    type: Object,
    default: () => ({}),
  },
  // 饼图半径
  radius: {
    type: [Array, String],
    default: "60%",
  },
  // 饼图中心
  center: {
    type: Array,
    default: () => ["50%", "45%"],
  },
  // 单位
  unit: {
    type: String,
    default: "%",
  },
});


const { useChart } = hooks;

const { chart, option, container } = useChart();

const activeIndex = ref(0);
const autoplay = ref(false);

const timer = ref(null);

const setOption = (chartData = []) => {
  const {
    colorList,
    scale,
    labelFontSize,
    legend,
    grid,
    tooltip,
    radius,
    center,
    unit,
  } = props;

  const fontSize = labelFontSize * scale;
  const fontColor = "#FFFFFF";

  // 提示
  let customTooltip = {
    position: 'inside',
    textStyle: {
      fontSize,
      color: fontColor,
    },
    trigger: "item",
    axisPointer: {
      type: "line",
    },
    backgroundColor: "rgba(0,0,0,0.6)",
    borderColor: "transparent",
    padding: 5 * scale,
    ...tooltip,
  };

  // 图例
  const customLegend = {
    type: "scroll",
    bottom: "bottom",
    itemWidth: 16 * scale,
    itemHeight: 8 * scale,
    itemGap: 16 * scale,
    textStyle: {
      color: fontColor,
      fontSize,
    },
    ...legend,
  };

  // 网格
  const customGrid = {
    top: "1%",
    bottom: "1%",
    left: "1%",
    right: "1%",
    containLabel: true,
    ...grid,
  };

  option.value = {
    tooltip: customTooltip,
    legend: customLegend,
    grid: customGrid,
    color: colorList,
    series: [
      {
        type: "pie",
        center,
        radius,
        label: {
          formatter: `{c}${unit}`,
          color: fontColor,
          fontSize,
        },
        selectedMode: "single",
        select: {
          itemStyle: {
            opacity: 1,
          },
        },
        labelLine: {
            // lineStyle: {
            //   color: "rgba(255, 255, 255, 0.3)"
            // },
            // smooth: 0.2 * this.scale,
            length: 15 * scale,
            length2: 10 * scale,
          },
        data: handleData(chartData, 1),
      },
    ],
  };
};

const handleData = (chartData, opacity) => {
  const { axis, series, colorList } = props;

  return chartData.map((e, i) => ({
    name: e[axis.property],
    value: e[series.property],
    itemStyle: {
      color: colorList[i],
      opacity,
    },
  }));
};

const startTimer = () => {
  stopTimer();
  timer.value = setInterval(startLoopMove, props.duration);
};

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
};

const startLoopMove = () => {
  const { autoplay, chartData } = props;

  if (!autoplay) {
    stopTimer();
    return;
  }

  activeIndex.value++;
  if (activeIndex.value >= chartData.length) {
    activeIndex.value = 0;
  }
};

watch(
  () => props.chartData,
  (data) => {
    setOption(data);
  },
  {
    immediate: true,
  }
);

watch(
  () => props.scale,
  () => {
    setOption(props.chartData);
  },
);

const setAutoplay = (val) => (autoplay.value = val);

watch(
  () => props.autoplay,
  (val) => {
    setAutoplay(val);
  },
  {
    immediate: true,
  }
);

watch(
  autoplay,
  (val) => {
    if (val) {
      startTimer();
    } else {
      stopTimer();
    }
  },
  {
    immediate: true,
  }
);

watch(activeIndex, (val, preval) => {
  chart.value?.dispatchAction({
    type: "select",
    seriesIndex: [0, 1],
    itemStyle: {
      opacity: 1,
    },
    dataIndex: val,
  });

  // chart.value?.dispatchAction({
  //   type: "showTip",
  //   seriesIndex: [0],
  //   dataIndex: val,
  // });
});

watch(
  () => chart.value,
  (newChart) => {
    const { autoplay } = props;
    if (newChart && autoplay) {
      newChart.getZr().on("mousemove", (e) => {
        if (e.topTarget) {
          setAutoplay(false);

          newChart.dispatchAction({
            type: "unselect",
            seriesIndex: [0, 1],
            dataIndex: activeIndex.value,
          });
        } else {
          setAutoplay(true);
        }
      });
      newChart.getDom().addEventListener("mouseout", (e) => {
        setAutoplay(true);
      });
    }
  }
);

onUnmounted(() => {
  stopTimer();
});
</script>
