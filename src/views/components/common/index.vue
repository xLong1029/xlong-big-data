<template>
  <div class="component-list">
    <div class="component-list-item">
      <FlexContent>
        <DigitalNumber
          :data="digitalNumber.data.number"
          :oldData="digitalNumber.data.oldNumber"
        />
      </FlexContent>
      <div class="component-list-item__title">{{ digitalNumber.label }}</div>
    </div>
    <div class="component-list-item">
      <FlexContent>
        <div class="fire">
          <Fire />
        </div>
      </FlexContent>
      <div class="component-list-item__title">{{ fire.label }}</div>
    </div>
    <div class="component-list-item">
      <FlexContent>
        <div class="statistics-card-one">
          <StatisticsCardOne :name="statisticsCardOne.data.name" direction="right">
            <template #value>
              <span :style="`color: ${statisticsCardOne.data.valueColor}`">
                  <CountUp
                    :delay="countUpOption.delay"
                    :startVal="statisticsCardOne.data.oldNumber"
                    :endVal="statisticsCardOne.data.number"
                    :options="countUpOption"
                  />
              </span>
            </template>
          </StatisticsCardOne>
        </div>
      </FlexContent>
      <div class="component-list-item__title">{{ statisticsCardOne.label }}</div>
    </div>
    <div class="component-list-item">
      <FlexContent>
        <div class="statistics-card-one">
          <StatisticsCardTwo :name="statisticsCardTwo.data.name">
            <template #value>
              <CountUp
                :delay="countUpOption.delay"
                :startVal="statisticsCardTwo.data.oldNumber"
                :endVal="statisticsCardTwo.data.number"
                :options="countUpOption"
              />
            </template>
          </StatisticsCardTwo>
        </div>
      </FlexContent>
      <div class="component-list-item__title">{{ statisticsCardTwo.label }}</div>
    </div>
    <div class="component-list-item">
      <FlexContent>
        <div class="rate-change">
          <RateChange :num="rateChange.data.oneRate" />
          <RateChange :num="rateChange.data.twoRate" />
          <RateChange
            :num="rateChange.data.threeRate"
          />
        </div>
      </FlexContent>
      <div class="component-list-item__title">{{ rateChange.label }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import DigitalNumber from "@/components/common/DigitalNumber/index.vue";
import StatisticsCardOne from "@/components/common/StatisticsCard/One.vue";
import StatisticsCardTwo from "@/components/common/StatisticsCard/Two.vue";
import Fire from "@/components/common/Fire/index.vue";
import hooks from "@/hooks";

const { useCountUp } = hooks;
const { CountUp, countUpOption } = useCountUp();

const digitalNumber = reactive({
  label: "电子数字",
  data: {
    oldNumber: 89,
    number: 2568,
  },
});

const fire = reactive({
  label: "火苗动画",
});

const statisticsCardOne = reactive({
  label: "数值统计卡片一",
  data: {
    valueColor: "#ffe66d",
    name: "当前统计数",
    oldNumber: 89,
    number: 2568,
  },
});

const statisticsCardTwo = reactive({
  label: "数值统计卡片二",
  data: {
    name: "当前统计数",
    oldNumber: 89,
    number: 2568,
  },
});

const rateChange = reactive({
  label: "比率变化",
  data: {
    oneRate: 5,
    twoRate: -5,
    threeRate: 0,
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/components-demo.scss";

.flex-content-container {
  align-items: center;
  justify-content: center;
}
.fire {
  width: 200px;
  max-width: 100%;
  height: 200px;
  display: flex;
}

.statistics-card-one {
  height: 120px;
  width: 250px;
  max-width: 100%;
}

.rate-change{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>
