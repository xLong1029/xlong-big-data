<template>
  <div class="total-statistics-container">
    <!-- <StarContainer> -->
      <Particles id="starParticles" class="particles-star"/>
      <div class="bg">
        <img class="bg__buildings animate-bounce" :src="buildings" />
        <img class="bg__bottom" :src="buildingsBottom" />
        <!-- <img class="bg__light animate-scale" :src="buildingsLight" /> -->
      </div>
      
      <div class="statistics-1">
        <StatisticsDataFrame :name="serviceCompanines.name">
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
        </StatisticsDataFrame>
      </div>

      <div class="statistics-2">
        <StatisticsDataFrame :name="serviceUsers.name" direction="right">
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
        </StatisticsDataFrame>
      </div>

      <div class="statistics-3">
        <StatisticsDataFrame :name="developApps.name">
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
        </StatisticsDataFrame>
      </div>

      <div class="statistics-4">
        <StatisticsDataFrame :name="monitorServers.name" direction="right">
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
        </StatisticsDataFrame>
      </div>
    <!-- </StarContainer> -->
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
// import StarContainer from "@/components/common/StarContainer/index.vue";
import Particles from "@/components/common/Particles/index.vue";
import StatisticsDataFrame from "@/components/common/StatisticsDataFrame/index.vue";
import FadeNum from "@/components/common/FadeNum/index.vue";
import hooks from "@/hooks";
import buildings from "@/assets/images/buildings.png";
import buildingsBottom from "@/assets/images/buildings-bottom.png";
// import buildingsLight from "@/assets/images/buildings-light.png";

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

.bg {
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &__buildings {
    width: auto;
    display: block;
    height: 95%;
    margin: 0 auto;
  }

  &__bottom {
    position: absolute;
    height: 50%;
    width: auto;
    bottom: 2%;
  }

  // &__light{
  //   position: absolute;
  //   height: 55%;
  //   bottom: 2%;
  // }
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

.particles-star{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

@media screen and (max-width: 1840px) {
  .bg {
    &__buildings {
      height: auto;
      max-width: 70%;
      max-height: 80%;
      margin: 0 auto;
    }

    &__bottom {
      width: 80%;
      height: auto;
      bottom: 5%;
    }
  }
}
</style>
