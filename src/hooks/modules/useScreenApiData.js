/*
 * 模块 : 监控平台请求数据配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2023-10-26
 * 版本 : version 2.0
 */
import { provide, ref, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import { clearTimer } from "@/utils";

export default function () {
  const apiLoading = ref(false);
  provide("getApiLoading", apiLoading);

  const apiData = ref(null);
  provide("getApiData", apiData);

  const getApiDataTimer = ref(null);

  /**
   * 获取大屏数据
   * @param apiFuntion 大屏Api
   * @param params 大屏Api参数
   * @returns
   */
  const getScreenData = (apiFuntion, params = null) => {
    if (!apiFuntion) {
      console.log("apiFuntion is undefined");
      return false;
    }

    apiFuntion(params)
      .then((res) => {
        const { code, message, data } = res;
        if (code === 200) {
          apiData.value = data;
          apiLoading.value = false;
        } else {
          ElMessage.error(message);
        }
      })
      .catch((err) => {
        console.log(err);
        apiLoading.value = false;
      });
  };

  /**
   * 开始轮询获取数据
   * @param getData
   * @param duration 延迟时间
   */
  const startLoopGetData = (getData = null, duration = 60000) => {
    stopLoopGetData();
    if (typeof getData === "function") {
      getData();
      getApiDataTimer.value = setInterval(getData, duration);
    } else {
      console.log("getData is not a fuction");
    }
  };

  /**
   * 轮询获取数据
   */
  const stopLoopGetData = () => {
    clearTimer([getApiDataTimer.value]);
  };

  onUnmounted(() => {
    stopLoopGetData();
  });

  return {
    apiLoading,
    apiData,
    getApiDataTimer,
    getScreenData,
    startLoopGetData,
    stopLoopGetData,
  };
}
