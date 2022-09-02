<template>
  <div class="total-statistics-container">
    <StarContainer>
      <div class="statistics-1">
        <StatisticsDataFrame :name="serviceCompanines.name">
          <template #value>
            <span :style="`color: ${serviceCompanines.valueColor}`">
              <FadeNum v-model:value="serviceCompanines.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :endVal="serviceCompanines.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
          </template>
        </StatisticsDataFrame>
      </div>

      <div class="statistics-2">
        <StatisticsDataFrame :name="serviceUsers.name" direction="right">
          <template #value>
            <span :style="`color: ${serviceUsers.valueColor}`">
              <FadeNum v-model:value="serviceUsers.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :endVal="serviceUsers.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
          </template>
        </StatisticsDataFrame>
      </div>

      <div class="statistics-3">
        <StatisticsDataFrame :name="developApps.name">
          <template #value>
            <span :style="`color: ${developApps.valueColor}`">
              <CountUp
                :delay="countUpOption.delay"
                :endVal="developApps.value"
                :options="countUpOption"
              />
            </span>
          </template>
        </StatisticsDataFrame>
      </div>

      <div class="statistics-4">
        <StatisticsDataFrame :name="monitorServers.name" direction="right">
          <template #value>
            <span :style="`color: ${monitorServers.valueColor}`">
              <CountUp
                :delay="countUpOption.delay"
                :endVal="monitorServers.value"
                :options="countUpOption"
              />
            </span>
          </template>
        </StatisticsDataFrame>
      </div>
    </StarContainer>
  </div>
</template>

<script setup>
import { reactive, inject, watch, ref } from "vue";
import StarContainer from "@/components/common/StarContainer/index.vue";
import StatisticsDataFrame from "@/components/common/StatisticsDataFrame/index.vue";
// import CountTo from "@/components/common/CountTo/index.vue";
import FadeNum from "@/components/common/FadeNum/index.vue";
import hooks from "@/hooks";

const { useCountUp } = hooks;
const { CountUp, countUpOption } = useCountUp();

const apiData = inject("getApiData");
const isFrist = ref(true);

const serviceCompanines = reactive({
  name: "服务企业数量",
  value: 0,
  valueColor: "#ffe66d",
  changeNum: 0,
});

const serviceUsers = reactive({
  name: "服务用户数量",
  value: 0,
  valueColor: "#45f3fd",
  changeNum: 0,
});

const developApps = reactive({
  name: "开发应用总数",
  value: 0,
  valueColor: "#71ffaa",
  changeNum: 0,
});

const monitorServers = reactive({
  name: "监控服务器数量",
  value: 0,
  valueColor: "#fd65b9",
  changeNum: 0,
});

const getApiData = (data) => {
  if (!data) return false;

  if (!isFrist.value) {
    serviceCompanines.changeNum = data.serviceCompanines - serviceCompanines.value;
    serviceUsers.changeNum = data.serviceUsers - serviceUsers.value;
  }

  serviceCompanines.value = data.serviceCompanines;
  serviceUsers.value = data.serviceUsers;

  developApps.value = data.developApps;
  monitorServers.value = data.monitorServers;

  if (isFrist.value) {
    isFrist.value = false;
  }
};

watch(
  () => apiData.value,
  (val) => {
    getApiData(val);
  },
  {
    immediate: true,
  }
);
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
