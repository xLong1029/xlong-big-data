/*
 * 模块 : 屏幕尺寸响应
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-08-19
 * 版本 : version 1.0
 */

import { isFunction } from "lodash";

export default function () {
  /**
   * 初始化屏幕尺寸改变事件
   */
  const initResizeEvent = (handleResizeScreen) => {
    if (handleResizeScreen && isFunction(handleResizeScreen)) {
      window.addEventListener("resize", handleResizeScreen);
    }
  };

  /**
   * 销毁屏幕尺寸改变事件
   */
  const destroyResizeEvent = (handleResizeScreen) => {
    if (handleResizeScreen && isFunction(handleResizeScreen)) {
      window.removeEventListener("resize", handleResizeScreen);
    }
  };

  return {
    initResizeEvent,
    destroyResizeEvent,
  };
}
