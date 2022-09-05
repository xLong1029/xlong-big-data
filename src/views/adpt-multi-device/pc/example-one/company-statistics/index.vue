<template>
  <BorderFrame>
    <LineTitle title="服务企业类型统计" />
    <div class="content">
      <DataLoading :loading="apiLoading" :data="chart.chartData">
        <template #content>
          <Radar
            :chart-data="chart.chartData"
            :axis="chart.axis"
            :series="chart.series"
            :scale="contrastRatio"
            :tooltip="chart.tooltip"
            :grid="chart.grid"
            :label-font-size="chart.labelFontSize"
            :autoplay="chart.autoplay"
            :color-list="chart.colorList"
          />
        </template>
      </DataLoading>
    </div>
  </BorderFrame>
</template>

<script setup>
import { reactive } from "vue";
import Radar from "@/components/chart/Radar/index.vue";
import hooks from "@/hooks";

const { useChartOption, useScreenModuleData } = hooks;
const { formatTooltip } = useChartOption();

const chart = reactive({
  chartData: [],
  axis: {
    property: "name",
  },
  series: {
    property: "num",
  },
  tooltip: {
    trigger: "axis",
    formatter: (p) => formatTooltip(p, { unit: "项", scale: contrastRatio.value }),
  },
  grid: {
    top: "12%",
    bottom: 0,
    left: "2%",
    right: "7%",
  },
  labelFontSize: 14,
  autoplay: true,
  colorList: ["#42cdff", "#21afff", "#1fff83", "#46ffea", "#ff62b5", "#ff46fd"],
});

const handleApiData = (data) => {
  console.log(data);
  chart.chartData = data?.companinesData || [];
};

const { apiData, apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped></style>
