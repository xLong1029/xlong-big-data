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
    name: "GradientLineChart"
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
    default: () => ["#71ffaa", "#09ddff"],
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
  // 线条粗细
  lineWidth: {
    type: Number,
    default: 2,
  },
  // 是否光滑曲线
  smooth: {
    type: Boolean,
    default: true,
  }
});

const { useChartOption } = hooks;
const { getAxisData } = useChartOption();

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
    lineWidth,
    smooth,
  } = props;

  const fontSize = labelFontSize * scale;
  const fontColor = "#FFFFFF";

  // 处理坐标轴数据
  const axisData = getAxisData(chartData, axis.property);

  // 处理显示数据
  let customSeries = [];
  series.forEach((e, index) => {
    const data = chartData.map((i) => i[e.property]);
    customSeries.push({
      name: e.name,
      type: "line",
      smooth,
      areaStyle: {
        color: new graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: colorList[2 * index],
            },
            {
              offset: 1,
              color: "transparent",
            },
          ],
          false
        ),
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowBlur: 20,
      },
      lineStyle: {
        width: lineWidth * scale,
        color: {
          type: "linear",
          colorStops: [
            {
              offset: 0,
              color: colorList[2 * index], // 0% 处的颜色
            },
            {
              offset: 1,
              color: colorList[2 * index + 1], // 100% 处的颜色
            },
          ],
        },
      },
      data,
    });
  });

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
    itemWidth: 30 * scale,
    itemHeight: 10 * scale,
    itemGap: 10 * scale,
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
    color: colorList.filter((e, index) => index % 2 === 0),
    xAxis: [
      {
        type: "category",
        // boundaryGap: false,
        splitLine: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          // interval: 0,
          color: fontColor,
          fontSize,
        },
        boundaryGap: false, // 去掉两边留白
        data: axisData,
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            color: "#4b647f",
            width: 0.8 * scale,
          },
        },
        splitArea: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          // interval: 0,
          color: fontColor,
          fontSize,
        },
      },
    ],
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
