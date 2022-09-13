<template>
  <BorderFrame>
    <LineTitle :title="chart.title" />
    <div class="content">
      <DataLoading :loading="apiLoading" :data="chart.chartData">
        <template #content>
          <div class="wave-container">
            <div class="animate-wave wave1">
              <div class="animate-wave wave2">
                <div class="animate-wave wave3"></div>
              </div>
            </div>
          </div>
          <GradientRadarChart
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
import GradientRadarChart from "@/components/chart/GradientRadarChart/index.vue";
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
  radius: 55,
  colorList: ["#42cdff", "#1fff83"],
});

const handleApiData = (data) => {
  chart.chartData = data?.companinesData || [];
};

const { apiLoading, contrastRatio } =
  useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped>
.wave-container {
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translateX(-50%) translateY(-50%);

  .wave1 {
    width: size(150);
    height: size(150);
    border-radius: 50%;
  }

  .wave2 {
    width: size(80);
    height: size(80);
    border-radius: 50%;
  }

  .wave3 {
    width: size(30);
    height: size(30);
    border-radius: 50%;
  }
}
</style>
