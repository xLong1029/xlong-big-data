<template>
  <Chart :option="option" :width="width" :height="height" />
</template>

<script setup>
import Chart from "@/components/chart/Default/index.vue";
import { ref, watch, onUnmounted } from "vue";

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
  // 颜色列表
  colorList: {
    type: Array,
    default: () => [
      "#45FBF7",
      "#48FF58",
      "#EAE809",
      "#FF7E3F",
      "#FF4746",
      "#E177F9",
      "#4E6BFF",
      "#5EA6FE",
    ],
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
    type: Array,
    default: [0, 55],
  },
  // 饼图中心
  center: {
    type: Array,
    default: () => ["50%", "50%"],
  },
});

const option = ref(null);

const activeIndex = ref(0);

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
  } = props;

  const fontSize = labelFontSize * scale;
  const fontColor = "#FFFFFF";

  // 提示
  let customTooltip = {
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
    orient: "vartical",
    top: "center",
    right: 5 * scale,
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
        radius: [radius + 20 * scale, radius + 30 * scale],
        label: {
          show: false,
          // formatter: "{c}",
          // fontSize
        },
        labelLine: {
          show: false,
        },
        data: appendBaseColor(chartData, colorList, 1 * scale),
      },
      {
        type: "pie",
        radius,
        center,
        label: {
          show: false,
          formatter: "{c}",
          fontSize
        },
        itemStyle: {},
        labelLine: {
          show: false,
        },
        data: appendBaseColor(chartData, colorList, 0.6 * scale),
      },
    ],
  };
};

const appendBaseColor = (dataList, colorList, opacity) => {
  return dataList.map((e, i) => ({
    ...e,
    itemStyle: {
      color: colorList[i],
      opacity,
    },
  }));
};

const restartTimer = () => {
  stopTimer();
  timer.value = setInterval(startLoopMove, props.duration);
};

const stopTimer = () => {
  if (timer.value) {
    timer.value();
  }
};

const startLoopMove = () => {
  if (!autoplay.value) {
    stopTimer();
    return;
  }
  activeIndex.value++;
  if (activeIndex.value === defaultConfig.data.length) {
    activeIndex.value = 0;
  }

  const { chartData } = props;

  // let idx = 0;
  // setInterval(() => {
  //   clearSelectedStatus();

  //   let opt = JSON.parse(JSON.stringify(option.value));
  //   opt?.series[0].data[idx]["selected"] = true;
  //   opt?.series[0].data[idx]["itemStyle"]["opacity"] = 1;
  //   opt?.series[1].data[idx]["selected"] = true;
  //   option.value = opt;

  //   idx++;
  //   if (idx >= chartData.length) {
  //     idx = 0;
  //   }
  // }, 1000);
};

const clearSelectedStatus = () => {
  // const { chartData, colorList } = props;
  // let opt = JSON.parse(JSON.stringify(option.value));
  // opt?.series[0].data = appendBaseColor(chartData, colorList, 0.6);
  // opt?.series[1].data = appendBaseColor(chartData, colorList, 1);
  // option.value = opt;
};

watch(
  () => props.chartData,
  (data) => {
    setOption(data);

    if (props.autoplay) {
      restartTimer();
    }
  },
  {
    immediate: true,
  }
);

onUnmounted(() => {
  stopTimer();
});
</script>
