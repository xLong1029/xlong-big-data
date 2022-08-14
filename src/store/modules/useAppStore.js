import { defineStore } from "pinia";
import settings from "@/settings";

const currentEnv = import.meta.env.VITE_APP_ENV;
const { sysTitle, copyrightCompany } = settings;

const useAppStore = defineStore("app", {
  state: () => ({
    // 系统初始化loading
    sysLoading: true,
    // 当前环境
    currentEnv,
    // 系统标题
    sysTitle,
    // 版权公司名称
    copyrightCompany
  }),
  actions: {
    setSysLoading(sysLoading) {
      this.sysLoading = sysLoading;
    }
  }
})

export default useAppStore;