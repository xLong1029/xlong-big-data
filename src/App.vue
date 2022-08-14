<template>
  <el-config-provider :locale="locale">
    <div
      class="app-container"
      v-loading="sysLoading"
      element-loading-text="系统初始化，请稍后..."
    >
      <!-- 添加key值，解决线上“地址变化路由不更新”的问题 -->
      <router-view :key="$route.fullPath" />
    </div>
  </el-config-provider>
</template>

<script setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import hooks from "@/hooks";
import { logInfo } from "@/utils";

const { useCommon } = hooks;

const { router, currentEnv, sysLoading } = useCommon();

const locale = zhCn;

console.log(`current environment is ${currentEnv.value}`);


if (window.performance.navigation.type === 1) {
  logInfo("页面被刷新");
} else {
  logInfo("首次进入页面");
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-size: 100% 100%;
  overflow: hidden;
}
</style>
