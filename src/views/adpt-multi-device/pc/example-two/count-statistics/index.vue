<template>
  <BorderFrame>
    <div class="count-container">
      <div
        v-for="(item, index) in list"
        :key="'count' + index"
        class="count-item"
      >
        <div class="count-item__icon icon__circle">
          <img class="icon__content" :src="item.img" />
        </div>
        <div class="count-item__content ml-20">
          <div class="count-item__number number">
            <span class="number__value mr-10" :style="{ color: item.valueColor}">
              {{ item.value }}
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
import iconCover from "@/assets/images/icon-cover.png";
import iconApp from "@/assets/images/icon-app.png";
import iconVip from "@/assets/images/icon-vip.png";

const { useScreenModuleData } = hooks;

const isFrist = ref(true);

const list = ref([
  {
    name: "覆盖城市数",
    img: iconCover,
    unit: "个",
    value: 0,
    valueColor: "#45f3fd",
    changeNum: 0,
  },
  {
    name: "维护应用数",
    img: iconApp,
    unit: "个",
    value: 0,
    valueColor: "#71ffaa",
    changeNum: 0,
  },
  {
    name: "Vip用户数",
    img: iconVip,
    unit: "个",
    value: 0,
    valueColor: "#ffe66d",
    changeNum: 0,
  },
]);

const handleApiData = (data) => {
  if (!data) return false;

  const { coverCity: citys } = data.countData;

  if (!isFrist.value) {
    list.value[0].changeNum = citys - list.value[0].value;
  }

  list.value[0].value = citys;

  if (isFrist.value) {
    isFrist.value = false;
  }
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.count-container{
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.count-item {
  display: flex;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.icon {
  &__circle {
    @include background-setting(
      "./../../../../../assets/images/circle.png",
      size(75),
      size(75)
    );

    display: flex;
    align-items: center;
    justify-content: center;
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
  }
}
</style>
