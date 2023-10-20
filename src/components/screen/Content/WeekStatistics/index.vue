<template>
  <BorderFrameOne class="week-statistics-container">
    <BorderFrameFlyLight>
      <FlexContent>
        <BorderFrameTitleFour title="监控平台周访问量">
          <template #extra>
            <span class="unit">(单位：次)</span>
          </template>
        </BorderFrameTitleFour>
        <div class="content">
          <DataLoading :loading="apiLoading" :data="chart.chartData">
            <BarChart
              :chart-data="chart.chartData"
              :axis="chart.axis"
              :series="chart.series"
              :scale="contrastRatio"
              :tooltip="chart.tooltip"
              :grid="chart.grid"
              :label-font-size="chart.labelFontSize"
              :value-label-visible="chart.valueLabelVisible"
              :chart-direction="chart.chartDirection"
              :autoplay="chart.autoplay"
              :color-list="chart.colorList"
            />
          </DataLoading>
        </div>
      </FlexContent>
    </BorderFrameFlyLight>
  </BorderFrameOne>
</template>

<script setup>
import { reactive } from "vue";
import BarChart from "@/components/chart/BarChart/index.vue";
import hooks from "@/hooks";

const { useChartOption, useScreenModuleData } = hooks;
const { formatTooltip } = useChartOption();

const chart = reactive({
  chartData: [],
  axis: {
    property: "name",
  },
  series: [
    {
      name: "移动端访问量",
      property: "mobile",
    },
    {
      name: "PC端访问量",
      property: "pc",
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
    formatter: (p) => formatTooltip(p, { unit: "次", scale: contrastRatio.value }),
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
  autoplay: true,
  colorList: ["#4992ff", "#7cffb2"],
});

const handleApiData = (data) => {
  let chartData = data?.weekData || [];
  chart.chartData = chartData.reverse();
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.week-statistics-container {
  @include line-title-set-unit();
}
</style>
