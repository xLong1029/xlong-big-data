<template>
  <BorderFrameOne>
    <BorderFrameFlyLight>
      <FlexContent>
        <BorderFrameTitleFour title="各地市服务数据统计" />
        <div class="content">
          <DataLoading :loading="apiLoading" :data="chart.chartData">
            <MixedLineBarChart
              :chart-data="chart.chartData"
              :axis="chart.axis"
              :series="chart.series"
              :scale="contrastRatio"
              :tooltip="chart.tooltip"
              :grid="chart.grid"
              :legend="chart.legend"
              :color-list="chart.colorList"
              :label-font-size="chart.labelFontSize"
              :bar-property="chart.barProperty"
              :bar-axisName="chart.barAxisName"
              :line-property="chart.lineProperty"
              :line-axisName="chart.lineAxisName"
              :autoplay="chart.autoplay"
            />
          </DataLoading>
        </div>
      </FlexContent>
    </BorderFrameFlyLight>
  </BorderFrameOne>
</template>

<script setup>
import { reactive } from "vue";
import MixedLineBarChart from "@/components/chart/MixedLineBarChart/index.vue";
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
    formatter: (p) =>
      formatTooltip(p, { unit: ["家", "人"], scale: contrastRatio.value }),
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
});

const handleApiData = (data) => {
  chart.chartData = data?.cityData || [];
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped></style>
