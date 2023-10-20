<template>
  <BorderFrameOne>
    <BorderFrameFlyLight>
      <FlexContent>
        <BorderFrameTitleFour title="服务介绍" />
        <div class="content">
          <DataLoading :loading="apiLoading" :data="tabs">
            <div class="tab-wrapper">
              <div class="tab-title">
                <div
                  class="tab-title-item"
                  :class="{ 'is-active': index === activeIndex }"
                  v-for="(item, index) in tabs"
                  :key="'tab' + index"
                  @click="setActiveIndex(index)"
                >
                  <div class="tab-title-item__text">{{ item.title }}</div>
                  <div
                    v-if="index === activeIndex"
                    class="tab-title-item__light animate-scale"
                  ></div>
                  <img
                    class="tab-title-item__img"
                    :src="index === activeIndex ? descBgActive : descBg"
                  />
                </div>
              </div>
              <p class="tab-content">
                {{ tabs[activeIndex].desciption }}
              </p>
            </div>
          </DataLoading>
        </div>
      </FlexContent>
    </BorderFrameFlyLight>
  </BorderFrameOne>
</template>

<script setup>
import { ref } from "vue";
import hooks from "@/hooks";
import descBg from "@/assets/images/desc-bg.png";
import descBgActive from "@/assets/images/desc-bg-active.png";

const { useAutoPlay, useScreenModuleData } = hooks;

const tabs = ref([]);

const { activeIndex, setActiveIndex } = useAutoPlay({
  data: tabs,
  duration: 5000,
});

const handleApiData = (data) => {
  tabs.value = data?.projectDescription || [];
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";
@font-face {
  font-family: ShiShangZhongHeiJianTi;
  src: url("./../../../../assets/font/ShiShangZhongHeiJianTi.ttf");
}

.tab-wrapper {
  width: 100%;
  height: 100%;
}

.tab-title {
  display: flex;
  width: 100%;

  &-item {
    width: 25%;
    margin: 0 size(5);
    font-size: size(20);
    text-align: center;
    position: relative;
    cursor: pointer;

    &__text {
      font-weight: bold;
      font-family: "ShiShangZhongHeiJianTi";
      @include gradient-font(-90deg, #72ffe6, #178be9);
    }

    &.is-active {
      .tab-title-item__text {
        @include gradient-font(-90deg, #fae313, #ffb223);
      }
    }

    &__light {
      position: absolute;
      top: size(30);
      left: 12%;
      @include background-setting("./../../../../assets/images/light.png", 75%, size(25));
    }

    &__img {
      width: 70%;
      margin-top: size(10);
    }
  }
}

.tab-content {
  text-indent: 2em;
  line-height: 1.8;
  font-size: size(14);
  margin-top: size(15);
  margin-bottom: 0;
}
</style>
