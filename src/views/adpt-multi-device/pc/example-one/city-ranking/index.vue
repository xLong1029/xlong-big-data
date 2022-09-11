<template>
  <BorderFrame>
    <LineTitle title="各地市服务用户排行" />
    <div class="content">
      <DataLoading :loading="apiLoading" :data="chart.chartData">
        <template #content>
          <RankingBarChart
            :title="chart.title"
            :chart-data="chart.chartData"
            :axis="chart.axis"
            :series="chart.series"
            :scale="contrastRatio"
            :label-font-size="chart.labelFontSize"
            :top-num="chart.topNum"
            :top-colors="chart.topColors"
            :default-colors="chart.defaultColors"
            :grid="chart.grid"
          />
        </template>
      </DataLoading>
    </div>
  </BorderFrame>
</template>

<script setup>
import { reactive } from "vue";
import RankingBarChart from "@/components/chart/RankingBarChart/index.vue";
import hooks from "@/hooks";

const { useScreenModuleData } = hooks;

const chart = reactive({
  chartData: [],
  axis: {
    property: "name",
  },
  series: {
    property: "users",
  },
  labelFontSize: 14,
  topNum: 3,
  topColors: ["#9749ff", "#ff65e5"],
  defaultColors: ["#3368ff", "#50ffef"],
  grid: {
    right: 0
  }
});

const handleApiData = (data) => {
  chart.chartData = data?.cityData || [];
};

const { apiData, apiLoading, contrastRatio } =
  useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped></style>
