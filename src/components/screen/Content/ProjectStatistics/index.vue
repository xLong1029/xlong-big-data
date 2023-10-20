<template>
  <BorderFrameOne>
    <BorderFrameFlyLight>
      <FlexContent>
        <BorderFrameTitleFour title="服务项目类型" />
        <div class="content">
          <DataLoading :loading="apiLoading" :data="chart.chartData">
            <SegmentPieChart
              :chart-data="chart.chartData"
              :axis="chart.axis"
              :series="chart.series"
              :scale="contrastRatio"
              :tooltip="chart.tooltip"
              :label-font-size="chart.labelFontSize"
              :center="chart.center"
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
import { reactive, ref } from "vue";
import SegmentPieChart from "@/components/chart/SegmentPieChart/index.vue";
import hooks from "@/hooks";

const { useChartOption, useScreenModuleData } = hooks;
const { formatTooltip } = useChartOption();

const chart = reactive({
  chartData: [],
  axis: {
    property: "name",
  },
  series: {
    property: "value",
  },
  labelFontSize: 14,
  center: ["35%", "50%"],
  tooltip: {
    trigger: "item",
    formatter: (p) => {
      const scale = contrastRatio.value;
      const fontSize = 14;

      const { name, marker, color, value } = p;

      return `<div style="font-size:${fontSize * scale}px;">
        ${marker} ${name}
        <span style="color:${color};" >${value}</span> 个 <span style="color:${color};" >（${(
        (value / total.value) *
        100
      ).toFixed(2)}%）</span>
        </div>`;

      // return `<div style="font-size:${fontSize}px;">
      //   ${marker} ${name}
      //   <span style="color:${color};" >${value}</span>个
      //   </div>`;
    },
  },
  colorList: [
    "#ffbf4b",
    "#fd65b9",
    "#b14bff",
    // "#653fff",
    "#3886fb",
    "#45f3fd",
    "#97ff84",
  ],
  autoplay: true,
});

const total = ref(0);

const handleApiData = (data) => {
  chart.chartData = data?.projectStatisticsData || [];

  total.value = 0;

  chart.chartData.forEach((e) => {
    total.value += e.value;
  });
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped></style>
