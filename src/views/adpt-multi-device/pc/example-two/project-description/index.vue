<template>
  <BorderFrame>
    <LineTitle title="服务介绍" />
    <div class="content">
      <div class="tab-title">
        <div
          class="tab-title-item"
          :class="{ 'is-active': index === activeIndex }"
          v-for="(item, index) in tabs"
          :key="'tab' + index"
          @click="setActiveIndex(index)"
        >
          <div class="tab-title-item__text">{{ item.title }}</div>
          <div v-if="index === activeIndex" class="tab-title-item__light animate-scale"></div>
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
  </BorderFrame>
</template>

<script setup>
import { ref } from "vue";
import hooks from "@/hooks";
import descBg from "@/assets/images/desc-bg.png";
import descBgActive from "@/assets/images/desc-bg-active.png";

const { useAutoPlay } = hooks;

const tabs = ref([
  {
    title: "项目研发",
    desciption:
      "我们拥有顶尖的IT技术团队，拥有一套完善的技术标准和技术架构，可以为企业提供信息化支持和解决方案。可开发但不限于H5响应式网站、企业管理系统、小程序和门户网站。",
  },
  {
    title: "设计服务",
    desciption:
      "我们拥有专业的设计师，可以为您提供整站页面设计、App设计、平面广告图以及微信/QQ表情包等服务。",
  },
  {
    title: "项目申报",
    desciption:
      "我们拥有丰富的行业取到和项目申报经验，可以协助企业获得政府支持和关注，为企业发展添砖加瓦。可申请的项目资金包括但不限于科技资金、文化资金和创新资金等。",
  },
  {
    title: "推广运营",
    desciption:
      "我们拥有专业的运营团队，可以为您提供网站SEO、公众号图文托管维护、H5策划吸粉和用户运营等服务。",
  },
]);

const { activeIndex, setActiveIndex } = useAutoPlay({
  data: tabs,
  duration: 5000,
});
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.tab-title {
  display: flex;
  width: 100%;

  &-item {
    width: 25%;
    margin: size(5);
    font-size: size(20);
    text-align: center;
    position: relative;
    cursor: pointer;

    &__text {
      font-weight: bold;
      background-image: linear-gradient(180deg, #72ffe6, #178be9);
      background-clip: text;
      color: transparent;
    }

    &.is-active {
      .tab-title-item__text {
        background-image: linear-gradient(180deg, #fabb13, #f08814);
      }
    }

    &__light {
      position: absolute;
      top: size(30);
      left: 12%;
      @include background-setting(
        "./../../../../../assets/images/light.png",
        76%,
        size(25)
      );
    }

    &__img {
      width: 70%;
      margin-top: size(10);
    }
  }
}

.tab-content {
  text-indent: 2em;
  line-height: 2;
  font-size: size(16);
  margin-top: size(10);  
  margin-bottom: 0;
}
</style>
