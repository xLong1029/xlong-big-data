<template>
  <Chart :option="option" :width="width" :height="height" />
</template>

<script setup>
import Chart from "@/components/chart/Default/index.vue";
import { ref, watch } from "vue";
import { graphic } from "echarts";
import "echarts-liquidfill";

defineOptions(
  {
    name: "WaterPercentChart"
  }
);

const props = defineProps({
  // 图表名称
  title: {
    type: String,
    default: "",
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
  // 图表数值
  chartValue: {
    type: [Number, String],
    default: 100,
  },
  // 颜色列表
  colorList: {
    type: Array,
    default: () => ["#d55800", "#f7b500"],
  },
  // 缩放基数
  scale: {
    type: Number,
    default: 1,
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
  // 文本大小
  labelFontSize: {
    type: Number,
    default: 24,
  },
  // 标题大小
  titleFontSize: {
    type: Number,
    default: 14,
  },
  // 圆圈大小
  radius: {
    type: String,
    default: "65%",
  },
  // 中心点
  center: {
    type: Array,
    default: () => ["50%", "45%"],
  },
  // 文本中心点
  labelCenter: {
    type: String,
    default: "38%",
  },
});

const option = ref(null);

const setOption = (chartValue = 0) => {
  const {
    colorList,
    scale,
    labelFontSize,
    legend,
    grid,
    tooltip,
    titleFontSize,
    title,
    radius,
    center,
    labelCenter
  } = props;

  const fontSize = labelFontSize * scale;
  const fontColor = "#FFFFFF";

  // 提示
  let customTooltip = {
    position: 'inside',
    show: false,
    ...tooltip,
  };

  // 图例
  const customLegend = {
    show: false,
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

  const chartData = [];
  let templateChartValue = chartValue;
  for (let i = 0; i < 1; i++) {
    if (templateChartValue - 10 > 0) {
      templateChartValue -= 10;
      chartData.push({ name: title, value: templateChartValue / 100 });
    }
  }

  chartData.push({ name: title, value: chartValue / 100 });

  option.value = {
    tooltip: customTooltip,
    legend: customLegend,
    grid: customGrid,
    title: [
      {
        text: `${chartValue}%`,
        x: "center",
        top: labelCenter,
        textStyle: {
          fontSize,
          color: "#ffffff",
          fontWeight: "600",
        },
      },
      {
        text: title,
        x: "center",
        bottom: 0,
        textStyle: {
          color: fontColor,
          fontSize: titleFontSize * scale,
          fontWeight: "100",
        },
      },
    ],
    series: [
      {
        type: "liquidFill",
        radius,
        center,
        shape: "circle",
        phase: 0,
        direction: "right",
        outline: {
          show: true,
          borderDistance: 6 * scale, // 边框线与图表的距离 数字
          itemStyle: {
            opacity: 0.5,
            borderWidth: 2 * scale,
            borderColor: colorList[0],
          },
        },
        // 图形样式
        itemStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colorList[0] },
            { offset: 0.8, color: colorList[1] },
          ]),
          opacity: 0.5,
          shadowBlur: 10,
        },
        backgroundStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colorList[0] },
            { offset: 0.8, color: colorList[1] },
          ]),
          opacity: 0.2,
        },
        // 图形的高亮样式
        emphasis: {
          itemStyle: {
            opacity: 1,
          },
        },
        // 图形上的文本标签
        label: {
          show: false,
        },
        data: chartData,
      },
      // {
      //   type: "pie",
      //   radius: ["70%", "78%"],
      //   center: ["50%", "45%"],
      //   startAngle: 340,
      //   avoidLabelOverlap: false,
      //   itemStyle: {
      //     borderRadius: 10,
      //   },
      //   label: {
      //     show: false,
      //     position: "center",
      //   },
      //   labelLine: {
      //     show: false,
      //   },
      //   data: [
      //     {
      //       value: 0.4,
      //       name: "Direct",
      //       itemStyle: {
      //         color: colorList[1],
      //       },
      //     },
      //     {
      //       value: 0.6,
      //       name: "Direct",
      //       itemStyle: {
      //         color: "rgba(240, 248, 255, 0)",
      //       },
      //     },
      //   ],
      //   emphasis: {
      //     disabled: true,
      //   },
      // },
    ],
  };
};

watch(
  () => props.chartValue,
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
    setOption(props.chartValue);
  }
);
</script>
