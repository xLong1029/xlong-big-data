<template>
  <Chart :option="option" :width="width" :height="height" />
</template>

<script setup>
import Chart from "@/components/chart/Default/index.vue";
import { ref, watch } from "vue";
import { graphic } from "echarts";

defineOptions(
  {
    name: "CirclePercentChart"
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
    default: 18,
  },
  // 标题大小
  titleFontSize: {
    type: Number,
    default: 14,
  },
  // 圆圈大小
  radius: {
    type: Array,
    default: () => ["50%", "70%"],
  },
  // 中心点
  center: {
    type: Array,
    default: () => ["50%", "40%"],
  },
  // 文本中心点
  labelCenter: {
    type: String,
    default: "34%",
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
    textStyle: {
      fontSize,
      color: fontColor,
    },
    trigger: "item",
    axisPointer: {
      type: "shadow",
    },
    backgroundColor: "rgba(0,0,0,0.6)",
    borderColor: "transparent",
    padding: 5 * scale,
    ...tooltip,
  };

  // 图例
  const customLegend = {
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
    title: [
      {
        text: `${chartValue}%`,
        x: "center",
        top: labelCenter,
        textStyle: {
          fontSize: fontSize,
          color: colorList[1],
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
    polar: [
      {
        radius,
        center,
      },
    ],
    angleAxis: {
      max: 100,
      show: false,
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: false,
      axisLine: false,
      axisTick: false,
    },
    series: [
      {
        type: "bar",
        roundCap: true,
        showBackground: true,
        backgroundStyle: {
          color: "rgba(66, 66, 66, .3)",
        },
        data: [chartValue],
        coordinateSystem: "polar",
        itemStyle: {
          color: new graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: colorList[0],
            },
            {
              offset: 1,
              color: colorList[1],
            },
          ]),
        },
        emphasis: {
          itemStyle: {
            borderWidth: 2 * scale,
            borderColor: colorList[1],
          },
        },
      },
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
