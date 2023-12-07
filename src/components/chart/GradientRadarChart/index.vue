<template>
  <Chart :option="option" :width="width" :height="height" />
</template>

<script setup>
import Chart from "@/components/chart/Default/index.vue";
import { ref, watch } from "vue";
import { graphic } from "echarts";

defineOptions(
  {
    name: "GradientRadarChart"
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
    default: () => ["#71ffaa", "#09ddff"],
  },
  // 缩放基数
  scale: {
    type: Number,
    default: 1,
  },
  // 文本大小
  labelFontSize: {
    type: Number,
    default: 14,
  },
  // 雷达半径
  radius: {
    type: Number,
    default: 50,
  },
  // 雷达中心
  center: {
    type: Array,
    default: () => ["50%", "50%"],
  },
  // 名称格式化
  axisNameFormatter: {
    type: Function,
    default: (val, indicator) => {
      const { value, name } = indicator;
      return `{a|${name}}\n{b|【${value}】}`;
    },
  },
});

const option = ref(null);

const setOption = (chartData = []) => {
  const { title, axis, series, colorList, scale, labelFontSize, center, radius, axisNameFormatter } = props;

  const fontSize = labelFontSize * scale;
  const fontColor = "#FFFFFF";

  const seriesData = chartData.map((e) => e[series.property]);
  // const maxValue = Math.max(...seriesData);

  const indicatorData = chartData.map((e) => ({
    name: e[axis.property],
    // max: Math.floor(1.2 * maxValue),
    value: e[series.property],
  }));

  option.value = {
    tooltip: {
      show: false,
    },
    radar: {
      splitNumber: 3,
      indicator: indicatorData,
      center,
      axisLine: {
        lineStyle: {
          color: "#0FCDFF",
        },
      },
      axisName: {
        fontSize,
        formatter: axisNameFormatter,
        rich: {
          a: {
            color: fontColor,
            align: "center",
            fontSize,
            // width: 60,
            height: 30,
          },
          b: {
            color: "#f7b500",
            align: "center",
            fontSize,
          },
        },
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
      radius: `${Math.floor(radius * scale)}%`,
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
            width: 4 * scale,
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

watch(
  () => props.scale,
  () => {
    setOption(props.chartData);
  }
);
</script>
