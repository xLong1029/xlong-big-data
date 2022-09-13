<template>
  <BorderFrame>
    <LineTitle title="各类企业项目维护情况" />
    <div class="content">
      <DataLoading :loading="apiLoading" :data="chart.chartData">
        <template #content>
          <GradientLineChart
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
import GradientLineChart from "@/components/chart/GradientLineChart/index.vue";
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
      name: "企业官网",
      property: "web",
    },
    {
      name: "CMS系统",
      property: "cms",
    },
    {
      name: "小程序",
      property: "applets",
    },
  ],
  tooltip: {
    trigger: "axis",
    formatter: (p) => formatTooltip(p, { unit: "项", scale: contrastRatio.value }),
  },
  grid: {
    top: "12%",
    bottom: 0,
    left: "4%",
    right: "2%",
  },
  labelFontSize: 14,
  autoplay: true,
  colorList: ["#42cdff", "#21afff", "#1fff83", "#46ffea", "#ff62b5", "#ff46fd"],
});

const handleApiData = (data) => {
  chart.chartData = data?.companyProjectData || [];
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped></style>
