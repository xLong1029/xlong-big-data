import { isArray, isFunction } from "lodash";

/**
 * 输出信息
 *
 * @returns {*} msg
 */
export function logInfo(msg) {
  const production = process.env.NODE_ENV === "production";
  if (!production) {
    console.log(msg);
    return true;
  }
  return false;
}

/**
 * 防抖动
 *
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * localstorage写入本地缓存
 *
 * @param {*} key key名
 * @param {*} value 值
 */
 export function setLocalS(key, value) {
  localStorage.setItem(key, value);
}

/**
 * localstorage获取本地缓存
 *
 * @param {*} key key名
 */
export function getLocalS(key) {
  const res = localStorage.getItem(key);
  if (res && res !== "null") return res;
  else return false;
}

/**
 * localstorage删除本地储存
 *
 * @param {*} key key名
 */
export function delLocalS(key) {
  localStorage.removeItem(key);
}

/**
 * 深克隆
 *
 * @param {Array} source
 */
 export function deepClone(source) {
  const copy = JSON.stringify(source);
  return JSON.parse(copy);
}

/**
 * 是否为外部链接
 *
 * @param {string} path
 * @returns {Boolean}
 */
 export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 获取参数对象
 *
 * @param {string} url
 * @returns {Object}
 */
 export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * 清除定时器
 *
 * @returns {*} timers
 */
 export function clearTimer(timers) {
  timers.forEach((e) => {
      if (e) {
          clearInterval(e);
      }
      e = null;
  });
}

// 自定义tooltip
export const customTooltip = (params, opt = {}) => {
  const p = isArray(params) ? params : [params];
  const {
    unit = "",
    fontSize = 14,
    names,
    markers,
    seriesNames,
    values,
    showTotal,
    valueFixed
  } = opt;
  let total = 0;
  const unitList=isArray(unit)?unit:[unit]
  let html= p.reduce((res, item, index) => {
    
    const name = isFunction(names)
      ? names(item.name)
      : names?.[index] ?? item.name;

    const marker = isFunction(markers)
      ? markers(item.marker)
      : markers?.[index] ?? item.marker;

    const seriesName = isFunction(seriesNames)
      ? seriesNames(item.seriesName)
      : seriesNames?.[index] ?? item.seriesName;

    const value = isFunction(values)
      ? values(item.value)
      : values?.[index] ?? item.value;

    total += value * 1;
    if (!res) {
      res = `<div style="font-size:${fontSize * 1.1}px;margin-bottom:${0.67 *
        fontSize}px;">${name}</div>`;
    }
    return (
      res +
      `<div style="font-size:${fontSize}px;margin-bottom:${0.53 *
        fontSize}px;">${marker} ${seriesName}<span style="color:#ff921f;" >${valueFixed?(value).toFixed(valueFixed)*1:value}</span>  ${unitList[index%unitList.length]}</div>`
    );
  }, "");
  if(showTotal){
    html+=` <div>总计：<span style="font-size:${fontSize * 1.1}px;color:#ff921f;">${total.toFixed(3)}</span><span> ${unit}</span></div>`
  }
  return html;
};