import { defineStore } from "pinia";

import { sysTitle, copyrightCompany } from "@/settings";

const useAppStore = defineStore("app", {
  state: () => ({
    // 系统初始化loading
    sysLoading: true,
    // 当前环境
    currentEnv: process.env.VUE_APP_ENV,
    // 系统标题
    sysTitle,
    // 版权公司名称
    copyrightCompany,
  }),
  getters: {
    // sysTitle(){
    //   return this.sysTitle
    // },
    // copyrightCompany(){
    //   return this.copyrightCompany
    // },
  },
  actions: {
    setSysLoading(sysLoading) {
      this.sysLoading = sysLoading;
    }
  }
})

export default useAppStore;