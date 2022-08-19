<template>
  <div class="screen-content">
    <div class="screen-content__left">
      <BorderFrame>
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
      </BorderFrame>
    </div>
    <div class="screen-content__center">
      <div class="screen-content__center-top">111</div>
      <div class="screen-content__center-bottom">
        <BorderFrame></BorderFrame>
      </div>
    </div>
    <div class="screen-content__left">
      <BorderFrame direction="right"></BorderFrame>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject, onMounted, shallowRef } from "@vue/runtime-core";
import BorderFrame from "@/components/common/BorderFrame/index.vue";
import BarChart from "@/components/chart/BarChart/index.vue";
import useChartOption from "@/hooks/modules/useChartOption";

const contrastRatio = inject("getContrastRatio") ?? 1;

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
    formatter: (p) => customTooltip(p, { unit: "公顷" }),
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
</script>

<style lang="scss" scoped>
.screen-content {
  padding: size(15);
  height: 100%;
  width: 100%;
  display: flex;

  &__left,
  &__right {
    width: 22%;
    height: 100%;
  }

  &__center {
    width: 56%;
    height: calc(100% - size(var(--app-screen-nav-height)));
    padding: 0 size(15);
    display: flex;
    flex-direction: column;

    &-top {
      height: 60%;
    }

    &-bottom {
      height: 40%;
      padding-top: size(15);
    }
  }
}
</style>
