/*
 * 模块 : 监控平台请求数据配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-09-03
 * 版本 : version 1.0
 */
import { provide, ref } from "vue";
import Api from "@/api/screen";
import { ElMessage } from "element-plus";
import { clearTimer } from "@/utils";

export default function (handleResizeScreen) {
  const apiLoading = ref(false);
  provide("getApiLoading", apiLoading);

  const apiData = ref(null);
  provide("getApiData", apiData);

  const apiTimer = ref(null);

  const getApiDataTimer = ref(null);

  /**
   * 通过导航获取大屏数据
   * @param {*} nav 
   */
  const getScreenData = (nav) => {
    Api.GetScreenData(nav)
      .then((res) => {
        const { code, message, data } = res;
        if (code === 200) {
          apiData.value = data;

          clearTimer([getApiDataTimer.value]);
          getApiDataTimer.value = setTimeout(() => {
            apiLoading.value = false;
          }, 500);
        } else {
          ElMessage.error(message);
        }
      })
      .catch((err) => {
        console.log(err);
        apiLoading.value = false;
      });
  };

  return {
    apiLoading,
    apiData,
    apiTimer,
    getScreenData,
  };
}
