<template>
  <StarContainer>
    <DataLoading :loading="apiLoading" :data="chart.chartData">
      <template #content>
        <MsgMap
          :geo-data="geoJson"
          :scale="contrastRatio"
          :chart-data="chart.chartData"
          :change-data="chart.changeData"
          :coordinate-data="chart.coordinateData"
          :center-point="chart.centerPoint"
          :axis="chart.axis"
          :series="chart.series"
          :map-name="chart.mapName"
          :map-zoom="1.2"
          :label-font-size="chart.labelFontSize"
        />
      </template>
    </DataLoading>
  </StarContainer>
</template>

<script setup>
import { reactive, ref, inject, onMounted, onUnmounted } from "vue";
import StarContainer from "@/components/common/StarContainer/index.vue";
import MsgMap from "@/components/chart/MsgMap/index.vue";
import geoJson from "@/assets/json/guangxi.json";
import Api from "@/api/screen";
import { clearTimer } from "@/utils";

const contrastRatio = inject("getContrastRatio", 1);

const apiLoading = ref(false);
const apiTimer = ref(null);

const isFirst = ref(true); // 第一次加载

const chart = reactive({
  mapName: "guangxi",
  axis: {
    property: "name",
  },
  series: {
    property: "visit",
  },
  chartData: [],
  centerPoint: {
    name: "南宁市",
    value: [108.467414, 23.055856],
  },
  changeData: null,
  coordinateData: {},
  labelFontSize: 14,
});

onMounted(() => {
  isFirst.value = true;
  init();
});

onUnmounted(() => {
  clearTimer([apiTimer.value]);
});

const init = () => {
  clearTimer([apiTimer.value]);

  apiLoading.value = true;
  getMapData();
  apiTimer.value = setInterval(() => {
    getMapData();
  }, 3500);
};

const getMapData = () => {
  Api.GetMapData()
    .then((res) => {
      const { code, message, data } = res;
      if (code === 200) {
        if (!isFirst.value) {
          chart.changeData = data?.changeMapObj || null;
        } else {
          isFirst.value = false;
        }

        chart.chartData = data?.mapData || [];
        chart.coordinateData = data?.coordinateData || [];

        setTimeout(() => {
          apiLoading.value = false;
        }, 500);
      } else {
        ElMessage.error(message);
      }
    })
    .catch((err) => {
      console.log(err);
      apiLoading.value = false;
    });
};
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.week-statistics-container {
  @include line-title-set-unit();
}
</style>
