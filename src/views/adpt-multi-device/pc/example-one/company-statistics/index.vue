<template>
  <BorderFrame>
    <LineTitle :title="chart.title" />
    <div class="content">
      <DataLoading :loading="apiLoading" :data="chart.chartData">
        <template #content>
          <RadarChart
            :title="chart.title"
            :chart-data="chart.chartData"
            :axis="chart.axis"
            :series="chart.series"
            :scale="contrastRatio"
            :label-font-size="chart.labelFontSize"
            :radius="chart.radius"
            :center="chart.center"
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
import RadarChart from "@/components/chart/RadarChart/index.vue";
import hooks from "@/hooks";

const { useScreenModuleData } = hooks;

const chart = reactive({
  title: "服务企业数量统计",
  chartData: [],
  axis: {
    property: "name",
  },
  series: {
    property: "num",
  },
  labelFontSize: 14,
  center: ["50%", "57%"],
  radius: 62,
  colorList: ["#42cdff", "#1fff83"],
});

const handleApiData = (data) => {
  console.log(data);
  chart.chartData = data?.companinesData || [];
};

const { apiData, apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped></style>
