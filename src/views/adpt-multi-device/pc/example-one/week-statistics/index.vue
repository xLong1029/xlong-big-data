<template>
  <BorderFrame>
    <LineTitle title="本周监控平台访问量" />
    <div class="content">
      <DataLoading :loading="apiLoading" :data="chart.chartData">
        <template #content>
          <BarChart
            :chart-data="chart.chartData"
            :axis="chart.axis"
            :series="chart.series"
            :scale="contrastRatio"
            :tooltip="chart.tooltip"
            :grid="chart.grid"
            :legend="chart.legend"
            :label-font-size="chart.labelFontSize"
            :value-label-visible="chart.valueLabelVisible"
            :chart-direction="chart.chartDirection"
            :autoplay="chart.autoplay"
          />
        </template>
      </DataLoading>
    </div>
  </BorderFrame>
</template>

<script setup>
import { reactive, inject, watch } from "vue";
import LineTitle from "@/components/common/LineTitle/index.vue";
import BorderFrame from "@/components/common/BorderFrame/index.vue";
import DataLoading from "@/components/common/DataLoading/index.vue";
import BarChart from "@/components/chart/BarChart/index.vue";
import useChartOption from "@/hooks/modules/useChartOption";

const apiData = inject("getApiData");
const apiLoading = inject("getApiLoading");
const contrastRatio = inject("getContrastRatio") ?? 1;

const { customTooltip } = useChartOption();

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
      var obj = {};

      // const horizontalPosIndex = +(pos[0] < size.viewSize[0] / 2);
      const verticalPosIndex = +(pos[1] < size.viewSize[1] / 2);

      // obj[["left", "right"][horizontalPosIndex]] = "1%";   // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
      obj["right"] = "10";
      obj[["bottom", "top"][verticalPosIndex]] = [
        [size.viewSize[1] - pos[1] + 10, pos[1] + 10][verticalPosIndex],
      ]; // 鼠标在上方时 tooltip 显示到下方，鼠标在下方时 tooltip 显示到上方。
      return obj;
    },
    formatter: (p) => customTooltip(p, { unit: "次", scale: contrastRatio.value }),
  },
  grid: {
    top: "12%",
    bottom: 0,
    left: "1%",
    right: "7%",
  },
  legend: {},
  valueLabelVisible: false,
  labelFontSize: 14,
  chartDirection: "vertical",
  autoplay: true,
});

const handleApiData = (data) => {
  if (!data) return false;

  chart.chartData = data.weekData || [];
};

watch(
  () => apiData.value,
  (val) => {
    handleApiData(val);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped></style>
