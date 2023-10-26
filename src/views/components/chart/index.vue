<template>
  <div v-if="isLoaded" class="component-list">
    <div class="component-list-item">
      <FlexContent>
        <BarChart
          :chart-data="barChart.chartData"
          :axis="barChart.chartSetting.axis"
          :series="barChart.chartSetting.series"
          :color-list="barChart.chartSetting.colorList"
          :legend="barChart.chartSetting.legend"
          :tooltip="barChart.chartSetting.tooltip"
          :grid="barChart.chartSetting.grid"
          :label-font-size="barChart.chartSetting.labelFontSize"
          :value-label-visible="barChart.chartSetting.valueLabelVisible"
          :chart-direction="barChart.chartSetting.chartDirection"
          :autoplay="true"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ barChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <LineChart
          :chart-data="lineChart.chartData"
          :axis="lineChart.chartSetting.axis"
          :series="lineChart.chartSetting.series"
          :tooltip="lineChart.chartSetting.tooltip"
          :grid="lineChart.chartSetting.grid"
          :legend="lineChart.chartSetting.legend"
          :color-list="lineChart.chartSetting.colorList"
          :label-font-size="lineChart.chartSetting.labelFontSize"
          :autoplay="true"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ lineChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <MixedLineBarChart
          :chart-data="mixedLineBarChart.chartData"
          :axis="mixedLineBarChart.chartSetting.axis"
          :series="mixedLineBarChart.chartSetting.series"
          :tooltip="mixedLineBarChart.chartSetting.tooltip"
          :grid="mixedLineBarChart.chartSetting.grid"
          :legend="mixedLineBarChart.chartSetting.legend"
          :color-list="mixedLineBarChart.chartSetting.colorList"
          :label-font-size="mixedLineBarChart.chartSetting.labelFontSize"
          :bar-property="mixedLineBarChart.chartSetting.barProperty"
          :bar-axisName="mixedLineBarChart.chartSetting.barAxisName"
          :line-property="mixedLineBarChart.chartSetting.lineProperty"
          :line-axisName="mixedLineBarChart.chartSetting.lineAxisName"
          :autoplay="true"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ mixedLineBarChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <GradientBarChart
          :chart-data="gradientBarChart.chartData"
          :axis="gradientBarChart.chartSetting.axis"
          :series="gradientBarChart.chartSetting.series"
          :tooltip="gradientBarChart.chartSetting.tooltip"
          :legend="gradientBarChart.chartSetting.legend"
          :grid="gradientBarChart.chartSetting.grid"
          :label-font-size="gradientBarChart.chartSetting.labelFontSize"
          :value-label-visible="gradientBarChart.chartSetting.valueLabelVisible"
          :chart-direction="gradientBarChart.chartSetting.chartDirection"
          :color-list="gradientBarChart.chartSetting.colorList"
          :autoplay="true"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ gradientBarChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <GradientLineChart
          :chart-data="gradientLineChart.chartData"
          :axis="gradientLineChart.chartSetting.axis"
          :series="gradientLineChart.chartSetting.series"
          :tooltip="gradientLineChart.chartSetting.tooltip"
          :grid="gradientLineChart.chartSetting.grid"
          :legend="gradientLineChart.chartSetting.legend"
          :color-list="gradientLineChart.chartSetting.colorList"
          :label-font-size="gradientLineChart.chartSetting.labelFontSize"
          :smooth="gradientLineChart.chartSetting.smooth"
          :autoplay="true"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ gradientLineChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <GradientMixedLineBarChart
          :chart-data="gradientMixedLineBar.chartData"
          :axis="gradientMixedLineBar.chartSetting.axis"
          :series="gradientMixedLineBar.chartSetting.series"
          :tooltip="gradientMixedLineBar.chartSetting.tooltip"
          :grid="gradientMixedLineBar.chartSetting.grid"
          :legend="gradientMixedLineBar.chartSetting.legend"
          :color-list="gradientMixedLineBar.chartSetting.colorList"
          :label-font-size="gradientMixedLineBar.chartSetting.labelFontSize"
          :bar-property="gradientMixedLineBar.chartSetting.barProperty"
          :bar-axisName="gradientMixedLineBar.chartSetting.barAxisName"
          :line-property="gradientMixedLineBar.chartSetting.lineProperty"
          :line-axisName="gradientMixedLineBar.chartSetting.lineAxisName"
          :autoplay="true"
        />
      </FlexContent>
      <div class="component-list-item__title">
        {{ gradientMixedLineBar.label }}
      </div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <PieChart
          :chart-data="pieChart.chartData"
          :axis="pieChart.chartSetting.axis"
          :series="pieChart.chartSetting.series"
          :color-list="pieChart.chartSetting.colorList"
          :radius="pieChart.chartSetting.radius"
          :center="pieChart.chartSetting.center"
          :legend="pieChart.chartSetting.legend"
          :tooltip="pieChart.chartSetting.tooltip"
          :grid="pieChart.chartSetting.grid"
          :autoplay="true"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ pieChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <DoughnutChart
          :chart-data="doughnutChart.chartData"
          :axis="doughnutChart.chartSetting.axis"
          :series="doughnutChart.chartSetting.series"
          :color-list="doughnutChart.chartSetting.colorList"
          :radius="doughnutChart.chartSetting.radius"
          :center="doughnutChart.chartSetting.center"
          :legend="doughnutChart.chartSetting.legend"
          :tooltip="doughnutChart.chartSetting.tooltip"
          :grid="doughnutChart.chartSetting.grid"
          :autoplay="true"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ doughnutChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <GradientRadarChart
          :chart-data="radarChart.chartData"
          :axis="radarChart.chartSetting.axis"
          :series="radarChart.chartSetting.series"
          :label-font-size="radarChart.chartSetting.labelFontSize"
          :radius="radarChart.chartSetting.radius"
          :center="radarChart.chartSetting.center"
          :color-list="radarChart.chartSetting.colorList"
          :axisNameFormatter="radarChart.chartSetting.axisNameFormatter"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ radarChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <SegmentPieChart
          :chart-data="segmentPieChart.chartData"
          :axis="segmentPieChart.chartSetting.axis"
          :series="segmentPieChart.chartSetting.series"
          :color-list="segmentPieChart.chartSetting.colorList"
          :radius="segmentPieChart.chartSetting.radius"
          :center="segmentPieChart.chartSetting.center"
          :legend="segmentPieChart.chartSetting.legend"
          :tooltip="segmentPieChart.chartSetting.tooltip"
          :grid="segmentPieChart.chartSetting.grid"
          :autoplay="true"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ segmentPieChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <CirclePercentChart
          :title="circlePercentChart.chartData.name"
          :chart-value="circlePercentChart.chartData.percent"
          :color-list="circlePercentChart.chartSetting.colorList"
          :radius="circlePercentChart.chartSetting.radius"
          :center="circlePercentChart.chartSetting.center"
          :tooltip="circlePercentChart.chartSetting.tooltip"
          :label-center="circlePercentChart.chartSetting.labelCenter"
          :label-font-size="circlePercentChart.chartSetting.labelFontSize"
          :title-font-size="circlePercentChart.chartSetting.titleFontSize"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ circlePercentChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <WaterPercentChart
          :title="waterPercentChart.chartData.name"
          :chart-value="waterPercentChart.chartData.rate"
          :color-list="waterPercentChart.chartSetting.colorList"
          :tooltip="{ show: false }"
          :label-font-size="waterPercentChart.chartSetting.labelFontSize"
          :title-font-size="waterPercentChart.chartSetting.titleFontSize"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ waterPercentChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <RankingBarChart
          :chart-data="rankingBarChart.chartData"
          :axis="rankingBarChart.chartSetting.axis"
          :series="rankingBarChart.chartSetting.series"
          :label-font-size="rankingBarChart.chartSetting.labelFontSize"
          :top-num="rankingBarChart.chartSetting.topNum"
          :top-colors="rankingBarChart.chartSetting.topColors"
          :default-colors="rankingBarChart.chartSetting.defaultColors"
          :grid="rankingBarChart.chartSetting.grid"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ rankingBarChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <MsgMap
          :geo-data="geoJson"
          :chart-data="msgMapChart.chartData"
          :change-data="msgMapChart.changeData"
          :coordinate-data="msgMapChart.chartSetting.coordinateData"
          :center-point="msgMapChart.chartSetting.centerPoint"
          :axis="msgMapChart.chartSetting.axis"
          :series="msgMapChart.chartSetting.series"
          :map-name="msgMapChart.chartSetting.mapName"
          :map-zoom="msgMapChart.chartSetting.mapZoom"
          :unit="msgMapChart.chartSetting.unit"
          :label-font-size="msgMapChart.chartSetting.labelFontSize"
          :layout-center="msgMapChart.chartSetting.layoutCenter"
          :layout-size="msgMapChart.chartSetting.layoutSize"
          :bubble-size="msgMapChart.chartSetting.bubbleSize"
          :bubble-color="msgMapChart.chartSetting.bubbleColor"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ msgMapChart.label }}</div>
    </div>

    <div class="component-list-item">
      <FlexContent>
        <StatisticsDiagram
          :chart-data="statisticsDiagramChart.chartData"
          :line-data="statisticsDiagramChart.lineData"
          :fly-line-data="statisticsDiagramChart.flyLineData"
          :tooltip="statisticsDiagramChart.tooltip"
          :label-font-size="statisticsDiagramChart.labelFontSize"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ statisticsDiagramChart.label }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch, inject } from "vue";
import BarChart from "@/components/chart/BarChart/index.vue";
import GradientBarChart from "@/components/chart/GradientBarChart/index.vue";
import LineChart from "@/components/chart/LineChart/index.vue";
import GradientLineChart from "@/components/chart/GradientLineChart/index.vue";
import MixedLineBarChart from "@/components/chart/MixedLineBarChart/index.vue";
import GradientMixedLineBarChart from "@/components/chart/GradientMixedLineBarChart/index.vue";
import CirclePercentChart from "@/components/chart/CirclePercentChart/index.vue";
import PieChart from "@/components/chart/PieChart/index.vue";
import DoughnutChart from "@/components/chart/DoughnutChart/index.vue";
import GradientRadarChart from "@/components/chart/GradientRadarChart/index.vue";
import SegmentPieChart from "@/components/chart/SegmentPieChart/index.vue";
import WaterPercentChart from "@/components/chart/WaterPercentChart/index.vue";
import RankingBarChart from "@/components/chart/RankingBarChart/index.vue";
import MsgMap from "@/components/chart/MsgMap/index.vue";
import StatisticsDiagram from "@/components/chart/StatisticsDiagram/index.vue";
import hooks from "@/hooks";
import geoJson from "@/assets/json/guangxi.json";
import guangxiCoordinateJson from "@/assets/json/guangxi-coordinate.json";

const { useChartOption } = hooks;
const { formatTooltip } = useChartOption();

const activeTabName = inject("getActiveTabName", "common");
const isLoaded = ref(false);

watch(
  () => activeTabName.value,
  (val) => {
    console.log(val);
    isLoaded.value = val === "chart";
  },
  {
    immediate: true,
  }
);

const barChart = reactive({
  label: "多柱状图",
  chartData: [
    { name: "1月", test1: 65, test2: 73 },
    { name: "2月", test1: 79, test2: 96 },
    { name: "3月", test1: 90, test2: 96 },
    { name: "4月", test1: 78, test2: 98 },
  ],
  chartSetting: {
    axis: {
      property: "name",
    },
    series: [
      {
        name: "移动端访问量",
        property: "test1",
      },
      {
        name: "PC端访问量",
        property: "test2",
      },
    ],
    tooltip: {
      trigger: "axis",
      position: function (pos, params, dom, rect, size) {
        let obj = {};

        // const horizontalPosIndex = +(pos[0] < size.viewSize[0] / 2);
        const verticalPosIndex = +(pos[1] < size.viewSize[1] / 2);

        // obj[["left", "right"][horizontalPosIndex]] = "1%";   // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        obj["right"] = "10";
        obj[["bottom", "top"][verticalPosIndex]] = [
          [size.viewSize[1] - pos[1] + 10, pos[1] + 10][verticalPosIndex],
        ]; // 鼠标在上方时 tooltip 显示到下方，鼠标在下方时 tooltip 显示到上方。
        return obj;
      },
      formatter: (p) => formatTooltip(p, { unit: "次", scale: 1 }),
    },
    grid: {
      top: "11%",
      bottom: 0,
      left: "1%",
      right: "7%",
    },
    valueLabelVisible: false,
    labelFontSize: 14,
    chartDirection: "vertical",
    colorList: ["#4992ff", "#7cffb2"],
  },
});

const gradientBarChart = reactive({
  label: "单柱状（渐变）",
  chartData: [
    { name: "2017", value: 50 },
    { name: "2018", value: 436 },
    { name: "2019", value: 1052 },
    { name: "2020", value: 479 },
    { name: "2021", value: 527 },
    { name: "2022", value: 475 },
    { name: "2023", value: 21 },
  ],
  chartSetting: {
    axis: {
      property: "name",
    },
    series: {
      name: "门",
      property: "value",
    },
    tooltip: {
      trigger: "axis",
      formatter: (p) => {
        const scale = 1;
        const fontSize = 14;

        const { name, marker, color, value, dataIndex } = p[0];

        return `<div style="font-size:${
          fontSize * scale
        }px;display:flex;align-items:center;">
        ${marker}<span style="margin-left:${5 * scale}px;">${name}年创建课程</span>
       <span style="margin-left:${0.5 * fontSize}px; color:${
          color.colorStops[0].color
        }; font-weight: bold;">${value}</span>门
        </div>`;
      },
    },
    grid: {
      top: "5%",
      bottom: 0,
      left: "1%",
      right: "2%",
    },
    valueLabelVisible: false,
    labelFontSize: 14,
    legend: {
      show: false,
    },
    chartDirection: "horizontal",
    colorList: ["#00feff", "#027eff"],
  },
});

const circlePercentChart = reactive({
  label: "圆形进度图",
  chartData: {
    name: "当前进度",
    percent: 78.02,
  },
  chartSetting: {
    tooltip: {
      show: false,
    },
    radius: ["50%", "65%"],
    center: ["50%", "45%"],
    labelCenter: "40%",
    labelFontSize: 28,
    titleFontSize: 16,
    colorList: ["#3cc9df", "#76ffb9"],
  },
});

const pieChart = reactive({
  label: "饼图",
  chartData: [
    {
      client: "博士",
      number: 43,
      percent: 0.43,
    },
    {
      client: "硕士",
      number: 677,
      percent: 16.77,
    },
    {
      client: "本科",
      number: 4486,
      percent: 44.86,
    },
    {
      client: "大专",
      number: 1130,
      percent: 11.3,
    },
    {
      client: "大专以下",
      number: 108,
      percent: 1.08,
    },
    {
      client: "未填",
      number: 3556,
      percent: 35.56,
    },
  ],
  chartSetting: {
    axis: {
      property: "client",
    },
    series: {
      property: "percent",
    },
    radius: ["0", "65%"],
    center: ["58%", "50%"],
    colorList: ["#009dff", "#22e4ff", "#3bffd0", "#04e38a", "#9dff86", "#fee588"],
    tooltip: {
      // show: false,
      formatter: (p) => {
        const scale = 1;
        const fontSize = 14;

        const { name, marker, color, value, dataIndex } = p;

        return `<div style="font-size:${fontSize * scale}px;">
        ${marker} ${name}
       <span style="margin-left:${
         0.5 * fontSize
       }px; color:${color}; font-weight: bold;">${
          pieChart.chartData[dataIndex].number
        }</span><span>人(${value}%)</span>
        </div>`;
      },
    },
    legend: {
      type: "scroll",
      orient: "vartical",
      top: "center",
      left: 0,
    },
    gird: {
      top: "2%",
      bottom: "1%",
      left: "1%",
      right: "1%",
    },
  },
});

const doughnutChart = reactive({
  label: "环形图",
  chartData: [
    {
      client: "45岁以上",
      number: 1828,
      percent: 18.28,
    },
    {
      client: "36-45岁",
      number: 2116,
      percent: 21.16,
    },
    {
      client: "26-35岁",
      number: 1416,
      percent: 14.16,
    },
    {
      client: "25岁以下",
      number: 134,
      percent: 1.34,
    },
    {
      client: "未填",
      number: 4506,
      percent: 45.06,
    },
  ],
  chartSetting: {
    axis: {
      property: "client",
    },
    series: {
      property: "percent",
    },
    radius: ["45%", "65%"],
    center: ["50%", "50%"],
    colorList: ["#009dff", "#22e4ff", "#3bffd0", "#04e38a", "#9dff86", "#fee588"],
    tooltip: {
      show: false,
    },
    gird: {
      top: "2%",
      bottom: "1%",
      left: "1%",
      right: "1%",
    },
  },
});

const segmentPieChart = reactive({
  label: "隔断饼图",
  chartData: [
    {
      client: "PC端",
      number: 10000,
      percent: 50,
    },
    {
      client: "App",
      number: 8000,
      percent: 40,
    },
    {
      client: "微信公众号",
      number: 2000,
      percent: 10,
    },
  ],
  chartSetting: {
    axis: {
      property: "client",
    },
    series: {
      property: "percent",
    },
    radius: ["0", "47%"],
    center: ["60%", "50%"],
    colorList: ["#009dff", "#22e4ff", "#3bffd0", "#04e38a", "#9dff86", "#fee588"],
    tooltip: {
      show: true,
      formatter: (p) => {
        const scale = 1;
        const fontSize = 14;

        const { name, marker, color, value, dataIndex } = p;

        return `<div style="font-size:${fontSize * scale}px;">
        ${marker} ${name}
       <span style="margin-left:${
         0.5 * fontSize
       }px; color:${color}; font-weight: bold;">${
          segmentPieChart.chartData[dataIndex].number
        }</span><span>人(${value}%)</span>
        </div>`;
      },
    },
    legend: {
      top: "center",
      left: 0,
    },
    gird: {
      top: "1%",
      bottom: "1%",
      left: "1%",
      right: "1%",
    },
  },
});

const gradientLineChart = reactive({
  label: "多折线图（渐变）",
  chartData: [
    {
      time: "202301",
      applet: 478,
      pc: 454,
      h5: 534,
    },
    {
      time: "202302",
      applet: 678,
      pc: 578,
      h5: 424,
    },
    {
      time: "202303",
      applet: 537,
      pc: 266,
      h5: 234,
    },
    {
      time: "202304",
      applet: 645,
      pc: 500,
      h5: 678,
    },
    {
      time: "202305",
      applet: 467,
      pc: 563,
      h5: 467,
    },
  ],
  chartSetting: {
    axis: {
      property: "time",
    },
    series: [
      {
        name: "微信小程序",
        property: "applet",
      },
      {
        name: "PC端",
        property: "pc",
      },
      {
        name: "H5端",
        property: "h5",
      },
    ],
    tooltip: {
      show: true,
      formatter: (p) =>
        formatTooltip(p, {
          unit: "人",
          scale: 1,
        }),
    },
    grid: {
      top: "15%",
      bottom: "1%",
      left: "2%",
      right: "5%",
    },
    smooth: true,
    colorList: ["#42cdff", "#21afff", "#1fff83", "#46ffea", "#ff62b5", "#ff46fd"],
    labelFontSize: 14,
  },
});

const radarChart = reactive({
  label: "雷达图",
  chartData: [
    { name: "国有企业", num: 568 },
    { name: "外商投资企业", num: 736 },
    { name: "集体企业", num: 632 },
    { name: "股份制企业", num: 704 },
    { name: "私营企业", num: 503 },
  ],
  chartSetting: {
    axis: {
      property: "name",
    },
    series: {
      property: "num",
    },
    labelFontSize: 15,
    center: ["50%", "58%"],
    radius: 55,
    colorList: ["#42cdff", "#1fff83"],
    axisNameFormatter: (val, indicator) => {
      const { value, name } = indicator;
      return `{a|${name}}\n{b|${value}人}`;
    },
  },
});

const lineChart = reactive({
  label: "多折线图",
  chartData: [
    {
      time: "202301",
      applet: 478,
      pc: 454,
      h5: 534,
    },
    {
      time: "202302",
      applet: 678,
      pc: 578,
      h5: 424,
    },
    {
      time: "202303",
      applet: 537,
      pc: 266,
      h5: 234,
    },
    {
      time: "202304",
      applet: 645,
      pc: 500,
      h5: 678,
    },
    {
      time: "202305",
      applet: 467,
      pc: 563,
      h5: 467,
    },
  ],
  chartSetting: {
    axis: {
      property: "time",
    },
    series: [
      {
        name: "PC端访问量",
        property: "pc",
      },
      {
        name: "H5端访问量",
        property: "h5",
      },
    ],
    tooltip: {
      show: true,
      formatter: (p) =>
        formatTooltip(p, {
          unit: "次",
          scale: 1,
        }),
    },
    grid: {
      top: "15%",
      bottom: "1%",
      left: "2%",
      right: "5%",
    },
    legend: {
      show: false,
    },
    colorList: ["#3886fb", "#6bffdd"],
    labelFontSize: 14,
  },
});

const mixedLineBarChart = reactive({
  label: "折线柱状混合图",
  chartData: [
    { name: "南宁市", companines: 157, users: 2617, visit: 77 },
    { name: "柳州市", companines: 178, users: 3143, visit: 75 },
    { name: "桂林市", companines: 167, users: 4894, visit: 98 },
    { name: "来宾市", companines: 163, users: 2522, visit: 81 },
    { name: "河池市", companines: 130, users: 2898, visit: 84 },
    { name: "北海市", companines: 143, users: 3887, visit: 82 },
  ],
  chartSetting: {
    axis: {
      property: "name",
    },
    series: [
      {
        name: "服务企业",
        property: "companines",
      },
      {
        name: "服务用户",
        property: "users",
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: (p) => formatTooltip(p, { unit: ["家", "人"], scale: 1 }),
    },
    grid: {
      top: "18%",
      bottom: "1%",
      left: "1%",
      right: "1%",
    },
    legend: {},
    colorList: ["#3886fb", "#6bffdd"],
    labelFontSize: 14,
    autoplay: true,
    barProperty: ["companines"],
    lineProperty: ["users"],
    barAxisName: "企业（家）",
    lineAxisName: "用户（人）",
  },
});

const gradientMixedLineBar = reactive({
  label: "折线柱状混合图（渐变）",
  chartData: [
    { name: "2019", user: 271670, rate: 96.8 },
    { name: "2020", user: 254223, rate: 92.5 },
    { name: "2021", user: 273968, rate: 98 },
    { name: "2022", user: 271501, rate: 98.4 },
  ],
  chartSetting: {
    axis: {
      property: "name",
    },
    series: [
      {
        name: "完成人数",
        property: "user",
      },
      {
        name: "完成率",
        property: "rate",
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: (p) => formatTooltip(p, { unit: ["人", "%"], scale: 1 }),
    },
    grid: {
      top: "18%",
      bottom: "1%",
      left: "1%",
      right: "1%",
    },
    legend: {},
    colorList: ["#53eefe", "#2a76ff", "#f7b500"],
    barProperty: ["user"],
    lineProperty: ["rate"],
    barAxisName: "",
    lineAxisName: "",
  },
});

const waterPercentChart = reactive({
  label: "水波图",
  chartData: { name: "参加率", rate: 76.56 },
  chartSetting: {
    labelFontSize: 30,
    titleFontSize: 14,
    colorList: ["#2a76ff", "#3de6ff"],
  },
});

const rankingBarChart = reactive({
  label: "排行榜柱状图",
  chartData: [
    {
      name: "来宾市",
      coordinate: [109.417387, 23.852127],
      companines: 177,
      users: 3845,
      visit: 81,
    },
    {
      name: "南宁市",
      coordinate: [108.467414, 23.055856],
      companines: 207,
      users: 2920,
      visit: 76,
    },
    {
      name: "河池市",
      coordinate: [107.845944, 24.642313],
      companines: 137,
      users: 3079,
      visit: 84,
    },
    {
      name: "防城港市",
      coordinate: [108.014761, 21.869759],
      companines: 197,
      users: 3790,
      visit: 25,
    },
    {
      name: "梧州市",
      coordinate: [110.994766, 23.480033],
      companines: 213,
      users: 3582,
      visit: 81,
    },
    {
      name: "柳州市",
      coordinate: [109.375468, 24.948002],
      companines: 212,
      users: 3475,
      visit: 46,
    },
  ],
  chartSetting: {
    axis: {
      property: "name",
    },
    series: {
      property: "users",
    },
    labelFontSize: 14,
    topNum: 3,
    topColors: ["#ff65e5", "#fd6581"],
    defaultColors: ["#3368ff", "#50ffef"],
    grid: {
      right: 0,
      bottom: "-12%",
    },
  },
});

const msgMapChart = reactive({
  label: "地图",
  chartData: [
    {
      name: "崇左市",
      coordinate: [107.277482, 22.501959],
      value: 71,
    },
    {
      name: "贺州市",
      coordinate: [111.366656, 24.357028],
      value: 98,
    },
    {
      name: "玉林市",
      coordinate: [110.186377, 22.440029],
      value: 67,
    },
    {
      name: "来宾市",
      coordinate: [109.417387, 23.852127],
      value: 24,
    },
    {
      name: "贵港市",
      coordinate: [110.003191, 23.306537],
      value: 83,
    },
    {
      name: "南宁市",
      coordinate: [108.467414, 23.055856],
      value: 45,
    },
    {
      name: "河池市",
      coordinate: [107.845944, 24.642313],
      value: 46,
    },
    {
      name: "防城港市",
      coordinate: [108.014761, 21.869759],
      value: 37,
    },
    {
      name: "梧州市",
      coordinate: [110.994766, 23.480033],
      value: 38,
    },
    {
      name: "柳州市",
      coordinate: [109.375468, 24.948002],
      value: 40,
    },
    {
      name: "百色市",
      coordinate: [106.289292, 23.985913],
      value: 77,
    },
    {
      name: "桂林市",
      coordinate: [110.519005, 25.354947],
      value: 63,
    },
    {
      name: "北海市",
      coordinate: [109.341064, 21.666854],
      value: 93,
    },
    {
      name: "钦州市",
      coordinate: [109.019375, 22.171606],
      value: 53,
    },
  ],
  changeData: null,
  chartSetting: {
    mapName: "地市业务办理数",
    axis: {
      property: "name",
    },
    series: {
      property: "value",
    },
    centerPoint: {
      name: "南宁市",
      value: [108.467414, 23.055856],
    },
    changeData: null,
    coordinateData: guangxiCoordinateJson,
    labelFontSize: 12,
    layoutCenter: ["50%", "50%"],
    layoutSize: "100%",
    bubbleSize: 50,
    colorList: ["#40cfffbd", "#1f4299d6"],
    borderColor: "#172c72",
    bubbleColor: "#ff940f",
    unit: "",
    mapZoom: 1.2,
  },
});

const statisticsDiagramChart = reactive({
  label: "拓扑图",
  lineData: [
    {
      source: "监控平台",
      target: "企业网站",
    },
    {
      source: "企业网站",
      target: "监控平台",
    },
    {
      source: "监控平台",
      target: "智慧城市项目",
    },
    {
      source: "智慧城市项目",
      target: "监控平台",
    },
    {
      source: "监控平台",
      target: "小程序应用",
    },
    {
      source: "小程序应用",
      target: "监控平台",
    },
    {
      source: "监控平台",
      target: "电商项目",
    },
    {
      source: "电商项目",
      target: "监控平台",
    },
    {
      source: "App应用",
      target: "监控平台",
    },
    {
      source: "监控平台",
      target: "App应用",
    },
    {
      source: "H5场景应用",
      target: "监控平台",
    },
    {
      source: "监控平台",
      target: "H5场景应用",
    },
  ],
  // 飞线数据
  flyLineData: [
    // 企业网站
    {
      coords: [
        [275, 30],
        [275, 180],
      ],
    },
    {
      coords: [
        [275, 180],
        [275, 30],
      ],
    },
    // 智慧城市项目
    {
      coords: [
        [275, 180],
        [500, 250],
      ],
    },
    {
      coords: [
        [500, 250],
        [275, 180],
      ],
    },
    // 小程序应用
    {
      coords: [
        [275, 180],
        [500, 120],
      ],
    },
    {
      coords: [
        [500, 120],
        [275, 180],
      ],
    },
    // 电商项目
    {
      coords: [
        [275, 180],
        [275, 320],
      ],
    },
    {
      coords: [
        [275, 320],
        [275, 180],
      ],
    },
    // App应用
    {
      coords: [
        [50, 100],
        [275, 180],
      ],
    },
    {
      coords: [
        [275, 180],
        [50, 100],
      ],
    },
    // H5场景应用
    {
      coords: [
        [50, 250],
        [275, 180],
      ],
    },
    {
      coords: [
        [275, 180],
        [50, 250],
      ],
    },
  ],
  // 图表数据
  chartData: [
    {
      name: "监控平台",
      category: 1,
      value: [275, 180],
    },
    {
      name: "智慧城市项目",
      category: 2,
      value: [500, 250],
    },
    {
      name: "小程序应用",
      category: 2,
      value: [500, 120],
    },
    {
      name: "企业网站",
      category: 2,
      value: [275, 30],
    },
    {
      name: "App应用",
      category: 2,
      value: [50, 100],
    },
    {
      name: "电商项目",
      category: 2,
      value: [275, 320],
    },
    {
      name: "H5场景应用",
      category: 2,
      value: [50, 250],
    },
  ],
  // 提示
  tooltip: {
    formatter: (params) => {
      console.log(params)
      const scale = 1;
      const fontSize = 14;
      const lightHeightColor = "#ffe66d";
      const dotColor = "#00e6ff";

      const { marker } = params;
      const { extraData, name } = params.data;

      if (extraData?.users && extraData?.companines) {
        const { users, companines } = extraData;

        return `<div style="font-size:${fontSize * scale}px;">
        <div><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${dotColor};"></span> ${name}</div>
        <div style="margin-top: ${
          10 * scale
        }px">服务用户：<span style="color:${lightHeightColor};" >${users}</span> 人</div>
        <div style="margin-top: 10px">服务企业：<span style="color:${lightHeightColor}; margin: 10px 0" >${companines}</span> 家</div>
        </div>`;
      }

      return "";
    },
  },
  labelFontSize: 14,
});
</script>

<style lang="scss" scoped>
@import "@/styles/components-demo.scss";

.component-list-item {
  border: 1px solid #18265b;

  &__title {
    background-color: #18265b;
    margin-top: 0;
  }
}
</style>
