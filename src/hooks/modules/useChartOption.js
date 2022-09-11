
import { deepClone } from "@/utils";

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
   * 格式化提示
   *
   * @param {*} params formatter 需要的数据集
   * @param {*} opt 配置项
   * @returns 显示文本
   */
  const formatTooltip = (params, opt = {}) => {
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
      // 缩放比例
      scale = 1
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
        res = `<div style="font-size:${fontSize}px; transform:scale(${scale});">
        ${name}
        </div>`;
      }
      return (
        res +
        `<div style="font-size:${fontSize}px; transform:scale(${scale}); margin-top:${0.5 * fontSize}px;">
        ${marker} ${seriesName}
        <span style="color:${lightHeightTextColor};">
        ${valueFixed ? value.toFixed(valueFixed) * 1 : value}
        </span> 
        ${unitList[index % unitList.length]}
        </div>`
      );
    }, "");
    if (showTotal) {
      html += `
      <div style="font-size:${fontSize}px; transform:scale(${scale});">
        总计：
        <span style="color:${lightHeightTextColor};">
          ${total.toFixed(3)}
        </span>
        <span> ${unit}</span>
      </div>`;
    }
    return html;
  };

  /**
   * 比较数据大小
   * 
   * @param {*} propertys 
   * @returns 
   */
  const compareData = (propertys) => {
    return function (a, b) {
      let value1 = 0;
      let value2 = 0;
      propertys.forEach(e => {
        value1 += a[e];
        value2 += b[e];
      });
      return value2 - value1;
    };
  };

  /**
   * 数据排序
   * 
   * @param {*} data 
   * @returns 
   */
  const sortData = (data, series) => {
    // 解决因为排序改变图表数据，切换图表时导致死循环的问题
    let tempData = deepClone(data);

    // 处理属性值
    let propertys = [];
    if (series.constructor == Array) {
      series.forEach(e => propertys.push(e.property));
    }
    else if (series.constructor == Object) {
      propertys = [series.property];
    };

    // 图表数据排序
    tempData.sort(compareData(propertys));
    return tempData;
  };

  return {
    getAxisData,
    formatTooltip,
    compareData,
    sortData
  };
}
