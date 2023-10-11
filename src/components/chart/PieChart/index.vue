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

const option = ref(null);

const setOption = (chartData = []) => {
  const {
    axis,
    series,
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
  const fontColor = "#ffffff";

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
        data: chartData.map((e) => ({
          name: e[axis.property],
          value: e[series.property],
        })),
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

watch(
  () => props.scale,
  () => {
    setOption(props.chartData);
  },
);
</script>
