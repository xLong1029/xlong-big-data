<template>
  <div class="city-statistics-container">
    <BorderFrame>
      <LineTitle title="各地市数据统计" />
      <div class="content">
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
      </div>
    </BorderFrame>
  </div>
</template>

<script setup>
import { reactive, inject, watch, ref, onMounted } from "vue";
import LineTitle from "@/components/common/LineTitle/index.vue";
import BorderFrame from "@/components/common/BorderFrame/index.vue";
import MixedLineBarChart from "@/components/chart/MixedLineBarChart/index.vue";
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
  grid: {
    top: "20%",
    bottom: "1%",
    left: "1%",
    right: "1%",
  },
  legend: {},
  colorList: ["#1c95ff", "#60ede4"],
  labelFontSize: 14,
  autoplay: true,
  barProperty: ["XJMJ"],
  lineProperty: ["MMMJ"],
  barAxisName: "企业（家）",
  lineAxisName: "用户（人）",
});

onMounted(() => {
  chart.tooltip = {
    trigger: "axis",
    formatter: (p) =>
      customTooltip(p, { unit: "公顷", fontSize: 14 * contrastRatio.value }),
  };
  chart.chartData = [
    {
      CQ: "西乡塘区",
      XJS: 18258.0,
      XJMJ: 1420385.24,
      MMS: 3808.0,
      MMMJ: 377907.26,
      DYS: 17134.0,
      DYJE: 190.7,
    },
    {
      CQ: "良庆区",
      XJS: 29082.0,
      XJMJ: 2677902.94,
      MMS: 2625.0,
      MMMJ: 308994.16,
      DYS: 18901.0,
      DYJE: 308.98,
    },
    {
      CQ: "江南区",
      XJS: 19443.0,
      XJMJ: 1738594.55,
      MMS: 2696.0,
      MMMJ: 252562.78,
      DYS: 18972.0,
      DYJE: 271.78,
    },
    {
      CQ: "邕宁区",
      XJS: 10921.0,
      XJMJ: 1011428.83,
      MMS: 784.0,
      MMMJ: 73936.52,
      DYS: 6917.0,
      DYJE: 78.7,
    },
    {
      CQ: "青秀区",
      XJS: 17729.0,
      XJMJ: 1635401.77,
      MMS: 7160.0,
      MMMJ: 774214.79,
      DYS: 27366.0,
      DYJE: 421.66,
    },
    {
      CQ: "兴宁区",
      XJS: 12162.0,
      XJMJ: 1131232.51,
      MMS: 2519.0,
      MMMJ: 236273.79,
      DYS: 13205.0,
      DYJE: 117.43,
    },
    {
      CQ: "全市",
      XJS: 107595.0,
      XJMJ: 9614945.84,
      MMS: 19592.0,
      MMMJ: 2023889.3,
      DYS: 102495.0,
      DYJE: 1389.26,
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

<style lang="scss" scoped>
.city-statistics-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    padding-top: size(20);
    height: calc(100% - size(20));
  }
}
</style>
