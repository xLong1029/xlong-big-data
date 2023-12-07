<template>
  <Chart :option="option" :width="width" :height="height" />
</template>

<script setup>
import Chart from "@/components/chart/Default/index.vue";
import { ref, watch } from "vue";
import hooks from "@/hooks";

defineOptions(
  {
    name: "RankingBarChart"
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
  // 条形数值配置
  series: {
    type: Object,
    default: () => ({
      name: "数值",
      property: "value",
    }),
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
  // 前几名
  topNum: {
    type: Number,
    default: 3,
  },
  // 前3排行颜色
  topColors: {
    type: Array,
    default: () => ["#f0515e", "#ef8554"],
  },
  // 普通排行颜色
  defaultColors: {
    type: Array,
    default: () => ["#3c38e4", "#24a5cd"],
  },
});

const { useChartOption } = hooks;
const { sortData } = useChartOption();

const option = ref(null);

const setOption = (chartData = []) => {
  const {
    axis,
    series,
    scale,
    labelFontSize,
    grid,
    topNum,
    topColors,
    defaultColors,
  } = props;

  let thisChartData = sortData(chartData, series);

  const fontSize = labelFontSize * scale;
  const fontColor = "#FFFFFF";

  // 处理坐标轴数据
  let axisData = [];
  thisChartData.forEach((e, index) => {
    axisData.push(`${index < 10 ? "0" : ""}${index}${e[axis.property]}`);
  });

  // 处理显示数据
  let seriesData = thisChartData.map((e) => e[series.property]);

  // 网格
  const customGrid = {
    top: 0,
    bottom: -70 * scale,
    left: -50 * scale,
    right: 0,
    containLabel: true,
    ...grid,
  };

  const customYAxisRich = {
    color: fontColor,
    fontSize,
    width: 24 * scale,
    height: 24 * scale,
    align: "center",
    lineHeight: 50 * scale,
    borderRadius: 2 * scale,
  };

  option.value = {
    tooltip: {
      show: false,
    },
    grid: customGrid,
    xAxis: {
      show: false,
    },
    yAxis: {
      type: "category",
      inverse: true,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      nameGap: 0,
      axisLabel: {
        interval: 0,
        color: fontColor,
        align: "left",
        verticalAlign: "middle",
        fontSize,
        margin: 95 * scale,
        rich: {
          a: {
            ...customYAxisRich,
            backgroundColor: topColors[0],
          },
          b: {
            ...customYAxisRich,
            backgroundColor: defaultColors[0],
          },
        },
        formatter: (params) => {
          if (parseInt(params.slice(0, 2)) < 3) {
            return [
              "{a|" +
                (parseInt(params.slice(0, 2)) + 1) +
                "}" +
                "  " +
                params.slice(2),
            ].join("\n");
          } else {
            return [
              "{b|" +
                (parseInt(params.slice(0, 2)) + 1) +
                "}" +
                "  " +
                params.slice(2),
            ].join("\n");
          }
        },
      },
      data: axisData,
    },
    series: [
      {
        type: "bar",
        barMaxWidth: 24 * scale,
        itemStyle: {
          color: (params) => {
            let colors = {
              colorStops: defaultColors.map((color, offset) => ({
                offset,
                color,
              })),
            };

            if (params.dataIndex < topNum) {
              colors = {
                colorStops: topColors.map((color, offset) => ({
                  offset,
                  color,
                })),
              };
            }

            return colors;
          },
          borderRadius: [0, 15, 15, 0],
        },
        label: {
          show: true,
          position: "inside",
          color: fontColor,
          fontSize,
          textShadowColor: "rgba(0, 0, 0, 0.5)",
          textShadowBlur: 1,
          textShadowOffsetY: 1,
        },
        data: seriesData,
        animationEasing: "bounceOut",
        animationEasingUpdate: "bounceOut",
        animationDelay: 100,
        animationDelayUpdate: 100,
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
