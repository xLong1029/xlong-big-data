<template>
  <div class="component-list">
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
        <CirclePercentChart
          :title="circlePercentChart.chartData.name"
          :chart-value="circlePercentChart.chartData.percent"
          :color-list="circlePercentChart.chartSetting.colorList"
          :radius="circlePercentChart.chartSetting.radius"
          :center="circlePercentChart.chartSetting.center"
          :legend="circlePercentChart.chartSetting.legend"
          :tooltip="circlePercentChart.chartSetting.tooltip"
          :grid="circlePercentChart.chartSetting.grid"
          :label-font-size="circlePercentChart.chartSetting.labelFontSize"
          :title-font-size="circlePercentChart.chartSetting.titleFontSize"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ circlePercentChart.label }}</div>
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
  </div>
</template>

<script setup>
import { reactive } from "vue";
import BarChart from "@/components/chart/BarChart/index.vue";
import CirclePercentChart from "@/components/chart/CirclePercentChart/index.vue";
import PieChart from "@/components/chart/PieChart/index.vue";
import DoughnutChart from "@/components/chart/DoughnutChart/index.vue";
import hooks from "@/hooks";

const { useChartOption } = hooks;
const { formatTooltip } = useChartOption();

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
    labelFontSize: 24,
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

      return `<div style="font-size:${fontSize*scale}px;">
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
      show: false
    },
    gird: {
      top: "2%",
      bottom: "1%",
      left: "1%",
      right: "1%",
    },
  },
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
