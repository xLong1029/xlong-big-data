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
    name: "MixedLineBarChart"
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
  // 柱状图对应属性
  barProperty: {
    type: Array,
    default: () => ["name1"],
  },
  // 柱状图坐标轴名称
  barAxisName: {
    type: String,
    default: "名称1",
  },
  // 折线图对应属性
  lineProperty: {
    type: Array,
    default: () => ["name2"],
  },
  // 折线图坐标轴名称
  lineAxisName: {
    type: String,
    default: "名称2",
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
    barAxisName,
    lineAxisName,
    axis,
    series,
    colorList,
    scale,
    labelFontSize,
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
    const { name, property } = e;

    const data = props.chartData.map((i) => i[property]);

    // 柱状图
    if (props.barProperty.indexOf(property) >= 0) {
      customSeries.push({
        name,
        type: "bar",
        yAxisIndex: 0,
        barMaxWidth: "40%",
        data,
      });
    }

    // 折线图
    if (props.lineProperty.indexOf(property) >= 0) {
      customSeries.push({
        name,
        type: "line",
        yAxisIndex: 1,
        data,
      });
    }
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
      type: "shadow",
      shadowStyle: "rgba(0, 0, 0, 0.5)",
    },
    backgroundColor: "rgba(0,0,0,0.6)",
    borderColor: "transparent",
    // padding: [10 * scale,10 * scale],
    ...tooltip,
  };

  // 图例
  const customLegend = {
    itemHeight: 10 * scale,
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
    yAxis: [
      {
        stack: "all",
        type: "value",
        name: barAxisName,
        nameTextStyle: {
          fontSize,
          padding: 10 * scale,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#4b647f",
            width: 0.8 * scale,
          },
        },
        axisLabel: {
          // interval: 0,
          color: fontColor,
          fontSize,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        position: "left",
      },
      {
        type: "value",
        name: lineAxisName,
        nameTextStyle: {
          fontSize,
          padding: 10 * scale,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#4b647f",
            width: 0.8 * scale,
          },
        },
        axisLabel: {
          interval: 0,
          color: fontColor,
          fontSize,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        position: "right",
      },
    ],
    xAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
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
