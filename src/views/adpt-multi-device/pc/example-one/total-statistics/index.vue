<template>
  <div class="total-statistics-container">
    <StarContainer>
      <div class="statistics-1">
        <StatisticsDataFrame :name="statisticsData1.name">
          <template #value>
            <span :style="`color: ${statisticsData1.valueColor}`">
              <CountTo :end-val="statisticsData1.value" />
            </span>
          </template>
        </StatisticsDataFrame>
      </div>

      <div class="statistics-2">
        <StatisticsDataFrame :name="statisticsData2.name" direction="right">
          <template #value>
            <span :style="`color: ${statisticsData2.valueColor}`">
              <CountTo :end-val="statisticsData2.value" />
            </span>
          </template>
        </StatisticsDataFrame>
      </div>

      <div class="statistics-3">
        <StatisticsDataFrame :name="statisticsData3.name">
          <template #value>
            <span :style="`color: ${statisticsData3.valueColor}`">
              <CountTo :end-val="statisticsData3.value" />
            </span>
          </template>
        </StatisticsDataFrame>
      </div>

      <div class="statistics-4">
        <StatisticsDataFrame :name="statisticsData4.name" direction="right">
          <template #value>
            <span :style="`color: ${statisticsData4.valueColor}`">
              <CountTo :end-val="statisticsData4.value" />
            </span>
          </template>
        </StatisticsDataFrame>
      </div>
    </StarContainer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import StarContainer from "@/components/common/StarContainer/index.vue";
import StatisticsDataFrame from "@/components/common/StatisticsDataFrame/index.vue";
import CountTo from "@/components/common/CountTo/index.vue";

const statisticsData1 = ref({
  name: "服务企业数量",
  value: 3004,
  valueColor: "#ffe66d",
});

const statisticsData2 = ref({
  name: "服务用户数量",
  value: 60293,
  valueColor: "#45f3fd",
});

const statisticsData3 = ref({
  name: "开发应用总数",
  value: 55,
  valueColor: "#71ffaa",
});

const statisticsData4 = ref({
  name: "监控服务器数量",
  value: 10,
  valueColor: "#fd65b9",
});
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";
.total-statistics-container {
  @include background-setting(
    "./../../../../../assets/images/buildings.png",
    "auto",
    100%
  );
  background-position: center center;
  background-size: auto 90%;
  position: relative;
  overflow: hidden;
}

.statistics-1,
.statistics-2,
.statistics-3,
.statistics-4 {
  position: absolute;
}

.statistics-1 {
  top: 2%;
  left: 50%;
  transform: translateX(-160%);
}

.statistics-2 {
  top: 2%;
  right: 50%;
  transform: translateX(150%);
}

.statistics-3 {
  left: 5%;
  top: 40%;
}

.statistics-4 {
  right: 5%;
  top: 40%;
}

// @media screen and (max-width: 1700px) {
//   .statistics-3 {
//     transform: translateX(-200%);
//   }

//   .statistics-4 {
//     transform: translateX(200%);
//   }
// }

// @media screen and (max-width: 1600px) {
//   .statistics-3 {
//     transform: translateX(-180%);
//   }

//   .statistics-4 {
//     transform: translateX(180%);
//   }
// }

// @media screen and (max-width: 1600px) {
//   .statistics-3 {
//     transform: translateX(-180%);
//   }

//   .statistics-4 {
//     transform: translateX(180%);
//   }
// }
</style>
