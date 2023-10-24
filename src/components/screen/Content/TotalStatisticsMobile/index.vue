<template>
  <div class="total-statistics-mobile-container">
    <div class="statistics-card-list">
      <div class="statistics-card-item">
        <StatisticsCardOne :name="serviceCompanines.name">
          <template #value>
            <span :style="`color: ${serviceCompanines.valueColor}`">
              <FadeNum v-model:value="serviceCompanines.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :startVal="serviceCompanines.oldValue"
                  :endVal="serviceCompanines.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
          </template>
        </StatisticsCardOne>
      </div>
      <div class="statistics-card-item">
        <StatisticsCardOne :name="serviceUsers.name" direction="right">
          <template #value>
            <span :style="`color: ${serviceUsers.valueColor}`">
              <FadeNum v-model:value="serviceUsers.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :startVal="serviceUsers.oldValue"
                  :endVal="serviceUsers.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
          </template>
        </StatisticsCardOne>
      </div>
      <div class="statistics-card-item">
        <StatisticsCardOne :name="developApps.name">
          <template #value>
            <span :style="`color: ${developApps.valueColor}`">
              <CountUp
                :delay="countUpOption.delay"
                :startVal="developApps.oldValue"
                :endVal="developApps.value"
                :options="countUpOption"
              />
            </span>
          </template>
        </StatisticsCardOne>
      </div>
      <div class="statistics-card-item">
        <StatisticsCardOne :name="monitorServers.name" direction="right">
          <template #value>
            <span :style="`color: ${monitorServers.valueColor}`">
              <CountUp
                :delay="countUpOption.delay"
                :startVal="monitorServers.oldValue"
                :endVal="monitorServers.value"
                :options="countUpOption"
              />
            </span>
          </template>
        </StatisticsCardOne>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import StatisticsCardOne from "@/components/common/StatisticsCard/One.vue";
import FadeNum from "@/components/common/FadeNum/index.vue";
import hooks from "@/hooks";

const { useCountUp, useScreenModuleData } = hooks;
const { CountUp, countUpOption } = useCountUp();

const isFrist = ref(true);

const serviceCompanines = reactive({
  name: "服务企业数量",
  oldValue: 0,
  value: 0,
  valueColor: "#ffe66d",
  changeNum: 0,
});

const serviceUsers = reactive({
  name: "服务用户数量",
  oldValue: 0,
  value: 0,
  valueColor: "#45f3fd",
  changeNum: 0,
});

const developApps = reactive({
  name: "开发应用总数",
  oldValue: 0,
  value: 0,
  valueColor: "#71ffaa",
  changeNum: 0,
});

const monitorServers = reactive({
  name: "监控服务器数量",
  oldValue: 0,
  value: 0,
  valueColor: "#fd65b9",
  changeNum: 0,
});

const handleApiData = (data) => {
  if (!data) return false;

  const {
    serviceCompanines: companines,
    serviceUsers: users,
    developApps: apps,
    monitorServers: servers,
  } = data.statisticsData;

  if (!isFrist.value) {
    serviceCompanines.oldValue = serviceCompanines.value;
    serviceUsers.oldValue = serviceUsers.value;

    serviceCompanines.changeNum = companines - serviceCompanines.value;
    serviceUsers.changeNum = users - serviceUsers.value;
  }

  serviceCompanines.value = companines;
  serviceUsers.value = users;

  developApps.value = apps;
  monitorServers.value = servers;

  if (isFrist.value) {
    isFrist.value = false;
  }
};

useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.total-statistics-container {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.statistics-card-list {
  display: flex;
  flex-wrap: wrap;
}

.statistics-card-item {
  width: 50%;
  padding: size(10) 0;

  &:nth-child(2n){
    padding-left: size(7.5);
  }

  &:nth-child(2n + 1){
    padding-right: size(7.5);
  }
}


@media screen and (max-width: 560px) {
  .statistics-card-item {
    width: 100%;
    padding: size(10) 0 !important;
  }
}
</style>
