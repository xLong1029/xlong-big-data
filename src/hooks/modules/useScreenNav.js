/*
 * 模块 : 大屏导航模块
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-08-15
 * 版本 : version 1.0
 */
import { provide, ref } from "vue";

export default function () {
  const activeNavIndex = ref(0);

  provide("getActiveNavIndex", activeNavIndex);

  /**
   * 导航改变事件
   *
   * @param {number} val 导航索引
   */
  const handleChangeNav = (val) => (activeNavIndex.value = val);

  return {
    activeNavIndex,
    handleChangeNav,
  };
}
