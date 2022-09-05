<template>
  <Chart
    :option="option"
    :width="width"
    :height="height"
    :duration="duration"
    :autoplay="autoplay"
  />
</template>

<script setup>
import Chart from "@/components/chart/Default/index.vue";
import { ref, watch } from "vue";
import hooks from "@/hooks";
import { graphic } from "echarts";

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
  // 坐标轴数值配置
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
    default: () => ["#71ffaa", "#09ddff", "#00e8ff", "#71ffaa"],
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
  // 数值轴文字显示
  valueLabelVisible: {
    type: Boolean,
    default: true,
  },
  // 图例
  legend: {
    type: Object,
    default: () => ({
      textStyle: {
        color: "#fff",
      },
    }),
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
    default: () => ({
      trigger: "axis",
    }),
  },
});

const { useChartOption } = hooks;
const { getAxisData } = useChartOption();

const option = ref(null);

const setOption = (chartData = []) => {
  const {
    title,
    axis,
    series,
    colorList,
    scale,
    labelFontSize,
    valueLabelVisible,
    legend,
    grid,
    tooltip,
  } = props;

  const seriesData = chartData.map((e) => e[series.property]);
  const maxValue = Math.max(...seriesData);

  const indicatorData = chartData.map((e) => ({
    name: e[axis.property],
    max: Math.floor(1.2 * maxValue),
  }));

  const fontSize = labelFontSize * scale;
  const fontColor = "#FFFFFF";

  // 提示
  let customTooltip = {
    textStyle: {
      fontSize,
      color: fontColor,
    },
    trigger: "axis",
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
    itemWidth: 12 * scale,
    itemHeight: 12 * scale,
    itemGap: 20 * scale,
    textStyle: {
      color: fontColor,
      fontSize,
    },
    ...legend,
  };

  // 网格
  const customGrid = {
    top: "10%",
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
    radar: {
      splitNumber: 3,
      indicator: indicatorData,
      center: ["50%", "60%"],
      axisLine: {
        lineStyle: {
          color: "#0FCDFF",
        },
      },
      axisName: {
        color: fontColor,
      },
      splitLine: {
        lineStyle: {
          color: "#0FCDFF",
        },
      },
      splitArea: {
        areaStyle: {
          opacity: 0,
        },
      },
    },
    series: [
      {
        name: title,
        symbol: "circle",
        symbolSize: 10 * scale,
        type: "radar",
        emphasis: {
          blurScope: "coordinateSystem",
          lineStyle: {
            width: 4,
          },
        },
        lineStyle: {
          color: "#00FFF3",
        },
        itemStyle: {
          color: "#FFA500",
        },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colorList[0] },
            { offset: 1, color: colorList[1] },
          ]),
        },
        data: [
          {
            value: seriesData,
          },
        ],
      },
    ],
  };
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
</script>
