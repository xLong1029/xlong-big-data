<template>
  <Chart :option="option" :width="width" :height="height" />
</template>

<script setup>
import Chart from "@/components/chart/Default/index.vue";
import { ref, watch } from "vue";
import * as echarts from "echarts";
import hooks from "@/hooks";

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
  // 地理数据
  geoData: {
    type: Object,
    required: true,
    default: () => null,
  },
  // 坐标数据
  coordinateData: {
    type: Object,
    required: true,
    default: () => ({
      南宁市: [108.467414, 23.055856],
    }),
  },
  // 中心点
  centerPoint: {
    type: Object,
    default: () => ({
      name: "南宁市",
      value: [108.467414, 23.055856],
    }),
  },
  // 地图名称
  mapName: {
    type: String,
    required: true,
    default: "guangxi",
  },
  // 地图缩放大小
  mapZoom: {
    type: Number,
    default: 1,
  },
  // 名称配置
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
      name: "数值",
      property: "value",
    }),
  },
  // 颜色列表
  colorList: {
    type: Array,
    default: () => ["rgba(21, 4, 87, 0.7)", "rgba(47, 148, 255, 0.7)"],
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
  // 改变数据
  changeData: {
    type: Object,
    default: () => null,
  },
});

const { useChartOption } = hooks;
const { sortData } = useChartOption();

const option = ref(null);

const convertData = (data, coordinateData) => {
  return data.map(({ name, value }) => {
    const obj = coordinateData.find((e) => e.name === name);
    return {
      name,
      value: obj.value.concat(value),
    };
  });
};

const getLineData = (changeData, centerPoint) => {
  if (!changeData) return [];
  return [
    {
      coords: [changeData.coordinate, centerPoint.value],
    },
  ];
};

const setOption = (chartData = []) => {
  const {
    changeData,
    centerPoint,
    axis,
    series,
    mapZoom,
    mapName,
    geoData,
    coordinateData,
    colorList,
    scale,
    labelFontSize,
    grid,
  } = props;

  echarts.registerMap(mapName, geoData);

  if (!geoData || !coordinateData) {
    console.log("geoData or coordinateData is required");
    return false;
  }

  let sortChartData = sortData(chartData, series);
  let thisChartData = sortChartData.map((e) => ({
    name: e[axis.property],
    value: e[series.property],
  }));

  const minValue = sortChartData[0][series.property];
  const maxValue = sortChartData[sortChartData.length - 1][series.property];

  const fontSize = labelFontSize * scale;
  const fontColor = "#FFFFFF";

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
    tooltip: {
      show: false,
    },
    grid: customGrid,
    // 地图选取控件
    visualMap: {
      show: false,
      min: minValue,
      max: maxValue,
      left: "left",
      top: "bottom",
      seriesIndex: [0],
      inRange: {
        color: colorList,
      },
      textStyle: {
        color: fontColor,
        fontSize,
      },
      text: ["高", "低"], // 文本，默认为数值文本
      calculable: true,
    },
    // 地图
    geo: {
      map: mapName,
      label: {
        show: false,
      },
      // 地图变形，1为不变形
      aspectScale: 1,
      // 缩放操作
      roam: true,
      // 地图样式
      itemStyle: {
        areaColor: "#04235b",
        borderColor: "#47a5fc",
      },
      emphasis: {
        label: {
          show: false,
        },
        itemStyle: {
          areaColor: "rgba(0,0,0, 0.35)",
        },
      },
      zoom: mapZoom,
    },
    series: [
      // 地图样式，配合控件使用
      {
        type: "map",
        roam: true,
        geoIndex: 0,
        map: mapName,
        animationDurationUpdate: 1000,
        // universalTransition: true,
        // 地图变形，1为不变形
        aspectScale: 1,
        data: thisChartData,
      },
      // 涟漪坐标点
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        z: 1,
        data: coordinateData,
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke",
        },
        symbolSize: (val) => {
          let size = 10;

          if (changeData) {
            if (
              val[0] === changeData.coordinate[0] &&
              val[1] === changeData.coordinate[1]
            ) {
              size = 20;
            }
          }
          return size * scale;
        },
        label: {
          show: false,
        },
        itemStyle: {
          color: "rgba(4, 191, 255, 0.75)",
        },
      },
      // 坐标点
      {
        type: "scatter",
        coordinateSystem: "geo",
        z: 10,
        data: coordinateData,
        symbolSize: 5 * scale,
        label: {
          show: true,
          position: "bottom",
          formatter: "{b}",
          fontSize,
          color: fontColor,
          padding: 10 * scale,
          textShadowColor: "rgba(0, 0, 0, 0.5)",
          textShadowBlur: 1,
          textShadowOffsetY: 1,
        },
        itemStyle: {
          color: "#fff",
        },
      },
      // 数值点
      {
        name: "点",
        type: "scatter",
        coordinateSystem: "geo",
        symbol: "pin",
        symbolSize: (val) => {
          let size = 60;

          if (changeData) {
            if (
              val[0] === changeData.coordinate[0] &&
              val[1] === changeData.coordinate[1]
            ) {
              size = 80;
            }
          }
          return size * scale;
        },
        label: {
          show: true,
          formatter: (val) => {
            const data = val.data.value[2];
            return data;
          },
          color: fontColor,
          fontSize,
        },
        itemStyle: {
          //标志颜色
          color: (params) => {
            let color = "#ec2c68";

            if (changeData) {
              if (
                params.data.value[0] === changeData.coordinate[0] &&
                params.data.value[1] === changeData.coordinate[1]
              ) {
                color = "#fba320";
              }
            }
            return color;
          },
        },
        zlevel: 10,
        data: convertData(thisChartData, coordinateData),
      },
      // 地图连线
      // {
      //   type: "lines",
      //   zlevel: 1,
      //   lineStyle: {
      //     color: "#3ed4ff",
      //     width: 1, //尾迹线条宽度
      //     opacity: 0.7, //尾迹线条透明度
      //     curveness: 0.2, //尾迹线条曲直度
      //   },
      //   data: getLineData(changeData, centerPoint),
      // },
      //地图线的动画
      {
        type: "lines",
        zlevel: 2,
        effect: {
          show: true,
          period: 3 * scale,
          trailLength: 0.7,
          color: "rgba(4, 191, 255, 0.75)",
          symbolSize: 4 * scale,
        },
        lineStyle: {
          color: "#3ed4ff",
          width: 0,
          curveness: 0.2,
        },
        animationDelayUpdate: 5000,
        data: getLineData(changeData, centerPoint),
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
