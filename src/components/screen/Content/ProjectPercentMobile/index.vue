<template>
  <BorderFrameOne class="project-percent">
    <BorderFrameFlyLight>
      <FlexContent>
        <BorderFrameTitleFour :title="`${year}年承接项目类别`" />
        <div class="content">
          <DataLoading :loading="apiLoading" :data="chartData">
            <div
              v-for="(item, index) in chartData"
              :key="'chart' + index"
              class="chart-module"
            >
              <CirclePercentChart
                width="100%"
                height="100%"
                :title="item.name"
                :chart-value="item.percent"
                :color-list="colorList[index]"
                :tooltip="{ show: false }"
                :scale="contrastRatio"
              />
            </div>
          </DataLoading>
        </div>
      </FlexContent>
    </BorderFrameFlyLight>
  </BorderFrameOne>
</template>

<script setup>
import { ref } from "vue";
import CirclePercentChart from "@/components/chart/CirclePercentChart/index.vue";
import hooks from "@/hooks";

const { useChartOption, useScreenModuleData } = hooks;

const chartData = ref([]);

const colorList = ref([
  ["#3cc9df", "#76ffb9"],
  ["#d55800", "#f7b500"],
  ["#2aa4ff", "#3de6ff"],
]);

const year = new Date().getFullYear();

const handleApiData = (data) => {
  chartData.value = data?.projectTypePercentData || [];
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped>
:deep(.data-loading-container) {
  justify-content: space-around;
  flex-direction: column;
}

.chart-module {
  margin: size(10);
  height: 30%;
  width: 100%;
}
</style>
