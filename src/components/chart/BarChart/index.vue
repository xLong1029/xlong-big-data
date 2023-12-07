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

defineOptions(
  {
    name: "BarChart"
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
  // 图表方向
  chartDirection: {
    type: String,
    default: "vertical", // horizontal | vertical
  },
  // 坐标轴数值配置
  axis: {
    type: Object,
    default: () => ({
      name: "名称",
      property: "name",
    }),
  },
  // 条形数值配置
  series: {
    type: Array,
    default: () => [
      {
        name: "数值",
        property: "value",
      },
    ],
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
});

const { useChartOption } = hooks;
const { getAxisData } = useChartOption();

const option = ref(null);

const setOption = (chartData = []) => {
  const {
    chartDirection,
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

  const fontSize = labelFontSize * scale;
  const fontColor = "#FFFFFF";

  // 处理坐标轴数据
  const axisData = getAxisData(chartData, axis.property);

  // 处理显示数据
  let customSeries = [];
  series.forEach((e, index) => {
    customSeries.push({
      name: e.name,
      type: "bar",
      // stack: "all",
      barMaxWidth: "25%",
      z: index + 5,
      barGap: "10%",
      itemStyle: {
        color: colorList[index],
      },
      label: {
        show: valueLabelVisible,
        color: fontColor,
        fontSize,
        position: chartDirection === "horizontal" ? "top" : "right",
        formatter: (params) => {
          return params.value > 0 ? params.value : "";
        },
      },
      data: chartData.map((i) => i[e.property]),
    });
  });

  let categorySet = [
    {
      type: "category",
      axisTick: {
        show: false,
        lineStyle: {
          color: "#9dadc3",
          // type: "dashed",
          width: 0.8 * scale,
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#4b647f",
        },
      },
      axisLabel: {
        // interval: 0,
        color: fontColor,
        fontSize,
      },
      data: axisData,
    },
  ];
  let valueSet = [
    {
      stack: "all",
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          color: "#4b647f",
          // type: "dashed",
          width: 0.8 * scale,
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#4b647f",
          // type: "dashed",
          width: 0.8 * scale,
        },
      },
      axisLabel: {
        // interval: 0,
        color: fontColor,
        fontSize,
      },
    },
  ];

  // 提示
  let customTooltip = {
    position: 'inside',
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
    // padding: [10 * scale,10 * scale],
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
    data: series.map((e) => e.name),
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
    yAxis: chartDirection === "horizontal" ? valueSet : categorySet,
    xAxis: chartDirection === "horizontal" ? categorySet : valueSet,
    series: customSeries,
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
