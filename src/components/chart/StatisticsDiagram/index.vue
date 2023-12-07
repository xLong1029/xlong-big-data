<template>
  <Chart :option="option" :width="width" :height="height" />
</template>

<script setup>
import Chart from "@/components/chart/Default/index.vue";
import { ref, watch } from "vue";
import symbolJson from "@/assets/json/symbol.json";

defineOptions(
  {
    name: "StatisticsDiagram"
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
  // 颜色列表
  colorList: {
    type: Array,
    default: () => [
      "#5470c6",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc",
    ],
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
  const { lineData, flyLineData, scale, labelFontSize, grid, tooltip } = props;

  const fontSize = labelFontSize * scale;
  const fontColor = "#FFFFFF";

  const symbolData = chartData.map((e) => {
    const { name, value, category, extraData } = e;

    let symbol = null;
    let symbolSize = [60 * scale, 60 * scale];
    if (category === 1) {
      symbol = `image://${symbolJson[0].base64}`;
      symbolSize = [90 * scale, 70 * scale];
    }
    if (category === 2) {
      symbolSize = [70 * scale, 50 * scale];
      symbol = `image://${symbolJson[1].base64}`;
    }

    return {
      name,
      value,
      symbol,
      x: value[0],
      y: value[1],
      symbolSize,
      fixed: true,
      zlevel: 20,
      label: {
        color: fontColor,
        position: "bottom",
        fontSize,
      },
      extraData,
    };
  });

  // 提示
  let customTooltip = {
    position: 'inside',
    textStyle: {
      fontSize,
      color: fontColor,
    },
    trigger: "item",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderColor: "transparent",
    // padding: [10 * scale,10 * scale],
    ...tooltip,
  };

  // 网格
  const customGrid = {
    top: "2%",
    bottom: "1%",
    left: "1%",
    right: "16%",
    containLabel: true,
    ...grid,
  };

  option.value = {
    tooltip: customTooltip,
    grid: customGrid,
    color: ["#4992ff", "#7cffb2"],
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
        symbolOffset: [0, 0],
        label: {
          show: true,
          // 隐藏不需要显示的文本标签
          color: "transparent",
        },
        data: symbolData,
        links: lineData,
        lineStyle: {
          opacity: 1,
          color: "#57b4d2",
          curveness: 0.05,
          width: 1,
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
          symbolSize: 8 * scale,
          symbol: "pin",
          loop: true,
          color: "#00e3ff9e",
        },
        lineStyle: {
          color: "#99e8ff",
          width: 0,
          curveness: 0.05,
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
          symbolSize: 8 * scale,
          symbol: "pin",
          loop: true,
          color: "#00e3ff9e",
        },
        lineStyle: {
          color: "#99e8ff",
          width: 0,
          curveness: 0.05,
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
          symbolSize: 8 * scale,
          symbol: "pin",
          loop: true,
          color: "#00e3ff9e",
        },
        lineStyle: {
          color: "#99e8ff",
          width: 0,
          curveness: 0.05,
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

watch(
  () => props.scale,
  () => {
    setOption(props.chartData);
  },
  {
    immediate: true,
  }
);

</script>
