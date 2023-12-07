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
import { graphic } from "echarts";
import hooks from "@/hooks";

defineOptions(
  {
    name: "GradientBarChart"
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
    type: Object,
    default: () => ({
      name: "数值",
      property: "value",
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
  // 柱状图圆角大小
  barBorderRadius: {
    type: Array,
    default: () => [20, 20, 0, 0],
  },
  // 柱状图背景颜色
  barColor: {
    type: [Object, String],
    default: null,
  },
  // 坐标字体倾斜角度
  textFontRotate: {
    type: Number,
    default: 0,
  },
  // 字间距
  textLableInterval: {
    type: [Number, String],
    default: 'auto',
  }
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
    barBorderRadius,
    barColor,
    textFontRotate,
    textLableInterval
  } = props;

  const fontSize = labelFontSize * scale;
  const fontColor = "#FFFFFF";

  // 处理坐标轴数据
  const axisData = getAxisData(chartData, axis.property);

  // 处理显示数据
  let customSeries = [];
  customSeries.push({
    name: series.name,
    type: "bar",
    barWidth: "40%",
    silent: true,
    itemStyle: {
      borderRadius: barBorderRadius,
        color: barColor
          ? barColor
          : new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorList[0],
              },
              {
                offset: 1,
                color: colorList[1], // 100% 处的颜色
              },
            ]),
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
    data: chartData.map((i) => i[series.property]),
    zlevel: 10,
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
        interval: textLableInterval,
        rotate: chartDirection === "horizontal" && textFontRotate !== 0 ? textFontRotate : 0,
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
        interval: textLableInterval,
        rotate: chartDirection === "vertical" && textFontRotate !== 0 ? textFontRotate : 0,
        color: fontColor,
        fontSize,
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(250,250,250,0.05)", "rgba(250,250,250,0.0)"],
        },
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
      type: "shadow",
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
    data: [series.name],
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

  if(!chartData.length){
    return;
  }

  const max = chartData.reduce((prev, current) =>
    prev[series.property] > current[series.property] ? prev : current
  );

  option.value = {
    tooltip: customTooltip,
    legend: customLegend,
    grid: customGrid,
    color: colorList,
    yAxis: chartDirection === "horizontal" ? valueSet : categorySet,
    xAxis: chartDirection === "horizontal" ? categorySet : valueSet,
    series: [
      ...customSeries,
      // {
      //   name: "背景",
      //   type: "bar",
      //   barWidth: "50%",
      //   barGap: "-100%",
      //   data: chartData.map((i) => max[series.property]),
      //   itemStyle: {
      //     color: "rgba(255,255,255,0.1)",
      //   },
      //   zlevel: 9,
      // },
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
  }
);
</script>
