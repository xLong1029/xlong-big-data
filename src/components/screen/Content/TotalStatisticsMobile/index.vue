<template>
  <div class="total-statistics-mobile-container">
    <div class="statistics-card-list">
      <div class="statistics-card-item">
        <StatisticsCard :name="serviceCompanines.name">
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
        </StatisticsCard>
      </div>
      <div class="statistics-card-item">
        <StatisticsCard :name="serviceUsers.name" direction="right">
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
        </StatisticsCard>
      </div>
      <div class="statistics-card-item">
        <StatisticsCard :name="developApps.name">
          <template #value>
            <span :style="`color: ${developApps.valueColor}`">
              <CountUp
                :delay="countUpOption.delay"
                :endVal="developApps.value"
                :options="countUpOption"
              />
            </span>
          </template>
        </StatisticsCard>
      </div>
      <div class="statistics-card-item">
        <StatisticsCard :name="monitorServers.name" direction="right">
          <template #value>
            <span :style="`color: ${monitorServers.valueColor}`">
              <CountUp
                :delay="countUpOption.delay"
                :endVal="monitorServers.value"
                :options="countUpOption"
              />
            </span>
          </template>
        </StatisticsCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import StatisticsCard from "@/components/common/StatisticsCard/index.vue";
import FadeNum from "@/components/common/FadeNum/index.vue";
import hooks from "@/hooks";

const { useCountUp, useScreenModuleData } = hooks;
const { CountUp, countUpOption } = useCountUp();

const isFrist = ref(true);

const serviceCompanines = reactive({
  name: "??????????????????",
  value: 0,
  valueColor: "#ffe66d",
  changeNum: 0,
});

const serviceUsers = reactive({
  name: "??????????????????",
  value: 0,
  valueColor: "#45f3fd",
  changeNum: 0,
});

const developApps = reactive({
  name: "??????????????????",
  value: 0,
  valueColor: "#71ffaa",
  changeNum: 0,
});

const monitorServers = reactive({
  name: "?????????????????????",
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
