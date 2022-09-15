<template>
  <Chart :option="option" :width="width" :height="height" />
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
  // 连线数据
  lineData: {
    type: Array,
    default: () => [],
  },
  // 飞线数据
  flyLineData: {
    type: Array,
    default: () => [],
  },
  // 中心点
  centerPoint: {
    type: Array,
    default: () => [
      {
        name: "xLong家里蹲",
        value: [0, 0],
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
  // 文本大小
  labelFontSize: {
    type: Number,
    default: 14,
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

const option = ref(null);

const setOption = (chartData = []) => {
  const { lineData, flyLineData, colorList, scale, labelFontSize, grid, tooltip } = props;

  const fontSize = labelFontSize * scale;
  const fontColor = "#FFFFFF";

  const data = chartData.map((e) => {
    const { name, value, category, categoryType, offer, get, symbolSize, symbol } = e;
    return {
      name,
      value,
      symbol,
      x: value[0],
      y: value[1],
      symbolSize,
      fixed: true,
      zlevel: 20,
      label:
        category === 4
          ? false
          : {
              color: fontColor,
              position: category === 3 ? "top" : "bottom",
              fontSize,
            },
      offer,
      get,
    };
  });

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
    padding: [10 * scale, 0 * scale],
    ...tooltip,
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
    grid: customGrid,
    color: colorList,
    xAxis: {
      show: false,
      type: "value",
    },
    yAxis: {
      show: false,
      type: "value",
    },
    series: [
      {
        type: "graph",
        zlevel: 5,
        draggable: false,
        coordinateSystem: "cartesian2d", //使用二维的直角坐标系（也称笛卡尔坐标系）
        symbol: "rect",
        symbolOffset: ["15%", 0],
        label: {
          normal: {
            show: true,
            textStyle: {
              // 隐藏不需要显示的文本标签
              color: "transparent",
            },
          },
        },
        data,
        links: lineData,
        lineStyle: {
          normal: {
            opacity: 1,
            color: "#99e8ff",
            curveness: 0.05,
            width: 1,
          },
        },
      },
      {
        type: "lines",
        coordinateSystem: "cartesian2d",
        z: 1,
        zlevel: 2,
        animation: false,
        effect: {
          show: true,
          period: 5,
          trailLength: 0.01,
          symbolSize: 10,
          symbol: "pin",
          loop: true,
          color: "rgba(55,155,255,0.5)",
        },
        lineStyle: {
          normal: {
            color: "#99e8ff",
            width: 0,
            curveness: 0.05,
          },
        },
        data: flyLineData,
      },
      {
        type: "lines",
        coordinateSystem: "cartesian2d",
        z: 1,
        zlevel: 2,
        animation: false,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.01,
          symbolSize: 10,
          symbol: "pin",
          loop: true,
          color: "rgba(55,155,255,0.5)",
        },
        lineStyle: {
          normal: {
            color: "#99e8ff",
            width: 0,
            curveness: 0.05,
          },
        },
        data: flyLineData,
      },
      {
        type: "lines",
        coordinateSystem: "cartesian2d",
        z: 1,
        zlevel: 2,
        animation: false,
        effect: {
          show: true,
          period: 8,
          trailLength: 0.01,
          symbolSize: 10,
          symbol: "pin",
          loop: true,
          color: "rgba(55,155,255,0.5)",
        },
        lineStyle: {
          normal: {
            color: "#99e8ff",
            width: 0,
            curveness: 0.05,
          },
        },
        data: flyLineData,
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
