<template>
  <div class="screen-header-container">
    <div class="screen-header__left custom-breadcrumb-style">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">
          <el-icon class="mr-5"><HomeFilled /></el-icon><text>首页</text>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="screen-header__center">
      <div class="title">{{ sysTitle }}</div>
    </div>
    <div class="screen-header__right">
      <span class="screen-header__date">{{ currentDate }}</span>
      <span class="screen-header__week ml-10">{{ currentWeek }}</span>
      <span class="screen-header__time ml-10">{{ currentTime }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import hooks from "@/hooks";
// 工具
import { logInfo, setLocalS, getLocalS, clearTimer } from "@/utils";

const { useCommon, useDateTime } = hooks;
const { router, sysTitle } = useCommon();

const {
  currentTime,
  currentDate,
  currentWeek,
  dateTimeTimer,
  getDateTimeFormat,
  getCurrentDateTime,
} = useDateTime();

const title = ref("");

onMounted(() => {
  init();

  title.value = router.currentRoute.value.meta.title;
});

onUnmounted(() => {
  clearTimer([dateTimeTimer.value]);
});

// 初始化
const init = () => {
  logInfo("第一次加载页面");
  setLocalS("refreshTime", getDateTimeFormat(new Date()));

  setTime();
  // 实时更新时间
  dateTimeTimer.value = setInterval(() => {
    setTime();
  }, 1000);
};

const setTime = () => {
  const { hours, minutes } = getCurrentDateTime();

  // 如果是一直展示的大屏，每20分钟进行判断，到达凌晨4点则刷新
  if (minutes % 20 === 0 && hours == 4) {
    // if (minutes === 47) {// 测试用
    const refreshTime = getLocalS("refreshTime");
    const nowTime = getDateTimeFormat(new Date());

    if (nowTime != refreshTime) {
      logInfo("即将重载页面...");
      location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";
@font-face {
  font-family: PangMenZhengDaoBiaoTiTi;
  src: url("./../../../assets/font/PangMenZhengDaoBiaoTiTi.ttf");
}

.screen-header {
  &-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    color: color(white);
    text-align: center;
    width: 100%;
    height: size(55);
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-image: url("./../../../assets/images/top-bg.png");
    background-position: center top;
    display: flex;
    justify-content: space-between;
    padding-top: size(10);

    .title {
      @include gradient-font(bottom, color(blue), color(white));

      font-family: "PangMenZhengDaoBiaoTiTi";
      font-size: size(34);
      margin-top: size(-8);
      letter-spacing: size(2);
      line-height: size(42);
    }
  }

  &__center {
    width: 40%;
  }

  &__left,
  &__right {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: size(16);
    border-bottom: size(2) solid;
    line-height: size(55);
  }

  &__left {
    padding-left: size(var(--app-screen-spacing));
    border-image: linear-gradient(to right, #0fadf9, transparent) 1;
  }

  &__right {
    justify-content: flex-end;
    padding-right: size(var(--app-screen-spacing));
    border-image: linear-gradient(to left, #0fadf9, transparent) 1;
  }

  &__time {
    font-weight: bold;
    color: color(yellow);
  }
}
</style>
