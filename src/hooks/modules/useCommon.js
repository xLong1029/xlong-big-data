/*
 * 模块 : 通用模块
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-08-11
 * 版本 : version 1.0
 */
import { useRoute, useRouter } from "vue-router";
import useStore from "@/store";
import { storeToRefs } from "pinia";
import { isExternal, getQueryObject } from "@/utils";

export default function() {
  const route = useRoute();
  const router = useRouter();
  const store = useStore();

  const { useAppStore, useScreenStore } = store;

  const { sysTitle, currentEnv, sysLoading, copyrightCompany } = storeToRefs(useAppStore());
  const { setSysLoading } = useAppStore();
  const { setScreenMode } = useScreenStore();

  /**
   * 跳转页面
   *
   * @param {String} url 地址
   */
   const toPage = (url) => {
    if (isExternal(url)) {
      window.open(url);
      return;
    }

    const path = url.split("?")[0];
    router.push({ path, query: getQueryObject(url) });
  };

  return {
    route,
    router,
    store,
    sysTitle,
    currentEnv,
    sysLoading,
    copyrightCompany,
    setSysLoading,
    setScreenMode,
    toPage
  };
}
