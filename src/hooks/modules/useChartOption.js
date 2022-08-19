/*
 * 模块 : 图表配置项模块
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-08-19
 * 版本 : version 1.0
 */
import { isArray, isFunction } from "lodash";

export default function () {
  /**
   * 获取坐标轴数值
   * 
   * @param {*} data 数据
   * @param {*} property 属性 
   * @returns 
   */
  const getAxisData = (data, property) => data.map((e) => e[property]);

  /**
   * 自定义提示
   * 
   * @param {*} params formatter 需要的数据集
   * @param {*} opt 配置项
   * @returns 显示文本
   */
  const customTooltip = (params, opt = {}) => {
    const p = isArray(params) ? params : [params];

    const {
      // 单位
      unit = "",
      // 字体大小
      fontSize = 14,
      // 提示标题名称
      names,
      // 标记
      markers,
      // 系列名称
      seriesNames,
      // 数值
      values,
      // 是否显示计算总值
      showTotal,
      // 数值保留几位小数
      valueFixed,
      // 高亮数值颜色
      lightHeightValColor,
    } = opt;

    let total = 0;

    const unitList = isArray(unit) ? unit : [unit];
    
    let html = p.reduce((res, item, index) => {
      const name = isFunction(names)
        ? names(item.name)
        : names?.[index] ?? item.name;

      const marker = isFunction(markers)
        ? markers(item.marker)
        : markers?.[index] ?? item.marker;

      const lightHeightTextColor = isArray(lightHeightValColor)
        ? lightHeightValColor?.[index] ?? item.color
        : lightHeightValColor ?? item.color;

      const seriesName = isFunction(seriesNames)
        ? seriesNames(item.seriesName)
        : seriesNames?.[index] ?? item.seriesName;

      const value = isFunction(values)
        ? values(item.value)
        : values?.[index] ?? item.value;

      total += value * 1;

      if (!res) {
        res = `<div style="font-size:${fontSize * 1.1}px;margin-bottom:${
          0.67 * fontSize
        }px;">${name}</div>`;
      }
      return (
        res +
        `<div style="font-size:${fontSize}px;margin-bottom:${
          0.53 * fontSize
        }px;">
        ${marker} ${seriesName}
        <span style="color:${lightHeightTextColor};" >${
          valueFixed ? value.toFixed(valueFixed) * 1 : value
        }</span> 
        ${unitList[index % unitList.length]}</div>`
      );
    }, "");
    if (showTotal) {
      html += ` <div>总计：<span style="font-size:${
        fontSize * 1.1
      }px;color:${lightHeightTextColor};">${total.toFixed(
        3
      )}</span><span> ${unit}</span></div>`;
    }
    return html;
  };

  return {
    getAxisData,
    customTooltip,
  };
}
