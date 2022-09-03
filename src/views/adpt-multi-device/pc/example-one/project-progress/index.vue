<template>
  <BorderFrame>
    <LineTitle title="项目进度概览" />
    <div class="content">
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
    </div>
  </BorderFrame>
</template>

<script setup>
import { reactive, inject, watch, ref, onMounted } from "vue";
import LineTitle from "@/components/common/LineTitle/index.vue";
import BorderFrame from "@/components/common/BorderFrame/index.vue";
import BarChart from "@/components/chart/BarChart/index.vue";
import useChartOption from "@/hooks/modules/useChartOption";

const apiData = inject("getApiData");
const contrastRatio = inject("getContrastRatio") ?? 1;

const isFrist = ref(true);

const { customTooltip } = useChartOption();

const chart = reactive({
  chartData: [],
  axis: {
    property: "CQ",
  },
  series: [
    {
      name: "一手房成交面积",
      property: "XJMJ",
    },
    {
      name: "二手房成面积",
      property: "MMMJ",
    },
  ],
  tooltip: {},
  grid: {},
  legend: {},
  valueLabelVisible: false,
  labelFontSize: 14,
  chartDirection: "vertical",
  autoplay: true,
});

onMounted(() => {
  chart.tooltip = {
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
    formatter: (p) =>
      customTooltip(p, { unit: "公顷", scale: contrastRatio.value }),
  };
  chart.chartData = [
    {
      CQ: "其他",
      XJS: 10921.0,
      XJMJ: 1011428.83,
      MMS: 784.0,
      MMMJ: 73936.52,
      DYS: 6917.0,
      DYJE: 78.7,
    },
    {
      CQ: "未开工",
      XJS: 19443.0,
      XJMJ: 1738594.55,
      MMS: 2696.0,
      MMMJ: 252562.78,
      DYS: 18972.0,
      DYJE: 271.78,
    },
    {
      CQ: "已开工未结项",
      XJS: 29082.0,
      XJMJ: 2677902.94,
      MMS: 2625.0,
      MMMJ: 308994.16,
      DYS: 18901.0,
      DYJE: 308.98,
    },
    {
      CQ: "已结项",
      XJS: 18258.0,
      XJMJ: 1420385.24,
      MMS: 3808.0,
      MMMJ: 377907.26,
      DYS: 17134.0,
      DYJE: 190.7,
    },
  ];
});

const handleApiData = (data) => {
  if (!data) return false;
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
