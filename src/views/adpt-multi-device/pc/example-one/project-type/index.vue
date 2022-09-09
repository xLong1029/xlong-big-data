<template>
  <BorderFrame>
    <LineTitle title="服务项目类型" />
    <div class="content">
      <DataLoading :loading="apiLoading" :data="chart.chartData">
        <template #content>
          <SegmentPieChart
            :chart-data="chart.chartData"
            :axis="chart.axis"
            :series="chart.series"
            :scale="contrastRatio"
            :tooltip="chart.tooltip"
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
    property: "num",
  },
  labelFontSize: 14,
  center: ["35%", "50%"],
  radius: 60,
  tooltip: {
    trigger: "item",
    formatter: (p) => {
      const scale = contrastRatio.value;
      const fontSize = 14;

      const { name, marker, color, value } = p;

      // return `<div style="font-size:${fontSize}px; transform:scale(${scale});">
      //   ${marker} ${name}
      //   <span style="color:${color};" >${value}</span>个 <span style="color:${color};" >（${(value / total.value * 100).toFixed(2)}%）</span>
      //   </div>`;

      return `<div style="font-size:${fontSize}px; transform:scale(${scale});">
        ${marker} ${name}
        <span style="color:${color};" >${value}</span>个
        </div>`;
    },
  },
  colorList: [
    "#45FBF7",
    "#48FF58",
    "#EAE809",
    "#FF7E3F",
    "#FF4746",
    "#E177F9",
    "#4E6BFF",
    "#5EA6FE",
  ],
});

const total = ref(0);

const handleApiData = (data) => {
  // chart.chartData = data?.companinesData || [];
  chart.chartData = [
    { value: 10, name: "智慧城市项目" },
    { value: 10, name: "小程序应用" },
    { value: 20, name: "企业网站" },
    { value: 5, name: "电商项目" },
    { value: 5, name: "App应用" },
    { value: 5, name: "H5场景应用" },
  ];

  total.value = 0;
  chart.chartData.forEach((e) => {
    total.value += e.value;
  });
};

const { apiData, apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped></style>
