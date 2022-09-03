<template>
  <BorderFrame>
    <LineTitle :title="`${year}年承接项目类别`" />
    <div class="content">
      <DataLoading :loading="apiLoading" :data="chartData">
        <template #content>
          <div v-for="(item, index) in chartData" :key="'chart' + index" class="chart-module">
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
        </template>
      </DataLoading>
    </div>
  </BorderFrame>
</template>

<script setup>
import { reactive, ref, inject, watch } from "vue";
import LineTitle from "@/components/common/LineTitle/index.vue";
import BorderFrame from "@/components/common/BorderFrame/index.vue";
import DataLoading from "@/components/common/DataLoading/index.vue";
import CirclePercentChart from "@/components/chart/CirclePercentChart/index.vue";
import useChartOption from "@/hooks/modules/useChartOption";

const apiData = inject("getApiData");
const apiLoading = inject("getApiLoading");
const contrastRatio = inject("getContrastRatio") ?? 1;

const { customTooltip } = useChartOption();

const chartData = ref([]);

const colorList = ref([
  ["#3cc9df", "#76ffb9"],
  ["#d55800", "#f7b500"],
  ["#2aa4ff", "#3de6ff"],
]);

const year = new Date().getFullYear();

const handleApiData = (data) => {
  if (!data) return false;

  chartData.value = data.projectTypePercentData;
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
:deep(.data-loading-container) {
  justify-content: space-around;
}

.chart-module{
  width: 33.33%;
  height: 100%;
}
</style>
