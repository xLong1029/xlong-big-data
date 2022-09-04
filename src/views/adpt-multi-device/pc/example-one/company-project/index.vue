<template>
  <BorderFrame>
    <LineTitle title="企业常用项目统计" />
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
    left: "2%",
    right: "6%",
  },
  labelFontSize: 14,
  autoplay: true,
  colorList: ["#42cdff", "#1473ff", "#1fff83","#39ddff",  "#ff4a95", "#9e55ff"],
});

const handleApiData = (data) => {
  console.log(data);
  chart.chartData = data?.companyProjectData || [];
};

const { apiData, apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped></style>
