/*
 * 模块 : 大屏视图
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-08-15
 * 版本 : version 1.0
 */

import { ref, reactive, markRaw } from "vue";

export default function () {
  // 视图加载
  const viewLoaded = ref(false);
  // 视图
  const views = reactive({});
  // 默认取PC视图组件，为了保留加载效果
  const viewActive = ref(null);

  /**
   * 设置当前视图
   *
   * @param { String } viewName 视图组件名称
   */
  const setView = (viewName) => {
    viewActive.value = viewName;
  };

  /**
   * 初始化视图
   *
   * @param { Object } viewObjects 视图对象
   */
  const initViews = (viewObjects) => {
    for (let i in viewObjects) {
      views[i] = markRaw(viewObjects[i]) || null;
    }
    return true;
  };

  return {
    viewLoaded,
    views,
    viewActive,
    setView,
    initViews,
  };
}
