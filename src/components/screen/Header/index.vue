<template>
  <div class="screen-header-container">
    <div class="screen-header__left custom-breadcrumb-style">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/adpt-multi-device' }">
          <el-icon class="mr-5"><HomeFilled /></el-icon><text>首页</text>
        </el-breadcrumb-item>
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
import { onMounted, onUnmounted } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import hooks from "@/hooks";
// 工具
import { logInfo, setLocalS, getLocalS, clearTimer } from "@/utils";

const { useCommon, useDateTime } = hooks;
const { sysTitle } = useCommon();

const {
  currentTime,
  currentDate,
  currentWeek,
  dateTimeTimer,
  getDateTimeFormat,
  getCurrentDateTime,
} = useDateTime();

onMounted(() => {
  init();
});

onUnmounted(() => {
  clearTimer([dateTimeTimer.value]);
});

// 初始化
const init = () => {
  logInfo("第一次加载页面");
  setLocalS("refreshTime", getDateTimeFormat(new Date()));
  setTimer();
};

// 设置时间定时器
const setTimer = () => {
  clearTimer([dateTimeTimer.value]);

  // 实时更新时间
  dateTimeTimer.value = setInterval(() => {
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
  }, 1000);
};
</script>

<style lang="scss" scoped>
.screen-header {
  &-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    color: #fff;
    text-align: center;
    width: 100%;
    height: calc(70 * var(--app-base-unit));
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("./../../../assets/images/top-bg.png");
    background-position: center top;
    

    .title {
      background-image: -webkit-linear-gradient(bottom, #fff, #72feff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: calc(30 * var(--app-base-unit));
      font-weight: bold;
      padding-top: calc(12 * var(--app-base-unit));
      letter-spacing: calc(2* var(--app-base-unit));
    }
  }

  &__left,
  &__right {
    position: absolute;
    top: calc(15 * var(--app-base-unit));
  }

  &__left {
    width: 30%;
    left: calc(20 * var(--app-base-unit));
    top: calc(20 * var(--app-base-unit));
    display: flex;
    align-items: center;
  }

  &__right {
    right: calc(20 * var(--app-base-unit));
    font-size: calc(20 * var(--app-base-unit));
  }

  &__time {
    font-weight: bold;
    color: var(--app-yellow-color);
  }
}
</style>
