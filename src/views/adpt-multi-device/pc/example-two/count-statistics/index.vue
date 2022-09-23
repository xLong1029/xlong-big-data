<template>
  <BorderFrame>
    <div class="count-container">
      <div v-for="(item, index) in list" :key="'count' + index" class="count-item">
        <div class="count-item__icon">
          <div class="icon__circle animate-rotation"></div>
          <img class="icon__content" :src="item.img" />
        </div>
        <div class="count-item__content ml-20">
          <div class="count-item__number number">
            <span class="number__value mr-5" :style="{ color: item.valueColor }">
              <FadeNum v-model:value="item.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :endVal="item.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
            <span class="number__unit">
              {{ item.unit }}
            </span>
          </div>
          <div class="count-item__name mt-5">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </BorderFrame>
</template>

<script setup>
import { ref } from "vue";
import hooks from "@/hooks";
import FadeNum from "@/components/common/FadeNum/index.vue";
import iconCover from "@/assets/images/icon-cover.png";
import iconApp from "@/assets/images/icon-app.png";
import iconVip from "@/assets/images/icon-vip.png";

const { useCountUp, useScreenModuleData } = hooks;
const { CountUp, countUpOption } = useCountUp();

const isFrist = ref(true);

const list = ref([
  {
    name: "累计覆盖城市",
    img: iconCover,
    unit: "个",
    value: 0,
    valueColor: "#45f3fd",
    changeNum: 0,
  },
  {
    name: "正常运行应用",
    img: iconApp,
    unit: "个",
    value: 0,
    valueColor: "#71ffaa",
    changeNum: 0,
  },
  {
    name: "Vip注册用户",
    img: iconVip,
    unit: "个",
    value: 0,
    valueColor: "#ffe66d",
    changeNum: 0,
  },
]);

const handleApiData = (data) => {
  if (!data) return false;

  const { coverCities: cities, normalApps: apps, vipUsers: vips } = data.countData;

  if (!isFrist.value) {
    list.value[0].changeNum = cities - list.value[0].value;
    list.value[1].changeNum = apps - list.value[1].value;
    list.value[2].changeNum = vips - list.value[2].value;
  }

  list.value[0].value = cities;
  list.value[1].value = apps;
  list.value[2].value = vips;

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

  &__number{
    :deep(.change-num){
      top: size(-10);
    }
  }
}

.icon {
  &__circle {
    @include background-setting(
      "./../../../../../assets/images/circle.png",
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
