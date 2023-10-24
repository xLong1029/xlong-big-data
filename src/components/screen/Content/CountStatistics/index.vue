<template>
  <BorderFrameOne class="count-statistics">
    <div class="count-container">
      <div class="count-item">
        <div class="count-item__icon">
          <div class="icon__circle animate-rotation"></div>
          <img class="icon__content" :src="coverCities.img" />
        </div>
        <div class="count-item__content ml-20">
          <div class="count-item__number number">
            <span class="number__value mr-5" :style="{ color: coverCities.valueColor }">
              <FadeNum v-model:value="coverCities.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :startVal="coverCities.oldValue"
                  :endVal="coverCities.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
            <span class="number__unit">
              {{ coverCities.unit }}
            </span>
          </div>
          <div class="count-item__name mt-5">{{ coverCities.name }}</div>
        </div>
      </div>

      <div class="line"></div>

      <div class="count-item">
        <div class="count-item__icon">
          <div class="icon__circle animate-rotation"></div>
          <img class="icon__content" :src="normalApps.img" />
        </div>
        <div class="count-item__content ml-20">
          <div class="count-item__number number">
            <span class="number__value mr-5" :style="{ color: normalApps.valueColor }">
              <FadeNum v-model:value="normalApps.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :startVal="normalApps.oldValue"
                  :endVal="normalApps.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
            <span class="number__unit">
              {{ normalApps.unit }}
            </span>
          </div>
          <div class="count-item__name mt-5">{{ normalApps.name }}</div>
        </div>
      </div>

      <div class="line"></div>

      <div class="count-item">
        <div class="count-item__icon">
          <div class="icon__circle animate-rotation"></div>
          <img class="icon__content" :src="vipUsers.img" />
        </div>
        <div class="count-item__content ml-20">
          <div class="count-item__number number">
            <span class="number__value mr-5" :style="{ color: vipUsers.valueColor }">
              <FadeNum v-model:value="vipUsers.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :startVal="vipUsers.oldValue"
                  :endVal="vipUsers.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
            <span class="number__unit">
              {{ vipUsers.unit }}
            </span>
          </div>
          <div class="count-item__name mt-5">{{ vipUsers.name }}</div>
        </div>
      </div>
    </div>
  </BorderFrameOne>
</template>

<script setup>
import { ref, reactive } from "vue";
import hooks from "@/hooks";
import FadeNum from "@/components/common/FadeNum/index.vue";
import iconCover from "@/assets/images/icon-cover.png";
import iconApp from "@/assets/images/icon-app.png";
import iconVip from "@/assets/images/icon-vip.png";

const { useCountUp, useScreenModuleData } = hooks;
const { CountUp, countUpOption } = useCountUp();

const isFrist = ref(true);

const coverCities = reactive({
  name: "累计覆盖城市",
  img: iconCover,
  unit: "个",
  oldValue: 0,
  value: 0,
  valueColor: "#45f3fd",
  changeNum: 0,
});

const normalApps = reactive({
  name: "正常运行应用",
  img: iconApp,
  unit: "个",
  oldValue: 0,
  value: 0,
  valueColor: "#71ffaa",
  changeNum: 0,
});

const vipUsers = reactive({
  name: "Vip注册用户",
  img: iconVip,
  unit: "个",
  oldValue: 0,
  value: 0,
  valueColor: "#ffe66d",
  changeNum: 0,
});

const handleApiData = (data) => {
  if (!data) return false;

  const { coverCities: cities, normalApps: apps, vipUsers: vips } = data.countData;

  if (!isFrist.value) {
    coverCities.oldValue = coverCities.value;
    normalApps.oldValue = normalApps.value;
    vipUsers.oldValue = vipUsers.value;

    coverCities.changeNum = cities - coverCities.value;
    normalApps.changeNum = apps - normalApps.value;
    vipUsers.changeNum = vips - vipUsers.value;
  }

  coverCities.value = cities;
  normalApps.value = apps;
  vipUsers.value = vips;

  if (isFrist.value) {
    isFrist.value = false;
  }
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.count-container {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.line {
  width: size(1);
  height: 100%;
  background: -webkit-linear-gradient(bottom, #312b6700, #12a2de, #312b6700);
}

.count-item {
  display: flex;

  &__icon {
    width: size(75);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__number {
    :deep(.change-num) {
      top: size(-10);
    }
  }
}

.icon {
  &__circle {
    @include background-setting(
      "./../../../../assets/images/circle.png",
      size(75),
      size(75)
    );

    position: absolute;
  }

  &__content {
    width: size(30);
    height: size(30);
  }
}

.number {
  display: flex;
  align-items: center;

  &__value {
    font-size: size(30);
    font-weight: bold;
  }
}
</style>
