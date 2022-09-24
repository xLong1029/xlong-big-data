/**
 * 判断是否是字符串
 * 
 * @param {*} val 
 * @returns 
 */
export function isString(val) {
  return typeof val === "string";
}

/**
 * 判断是否是空对象
 * 
 * @param {*} val 
 * @returns 
 */
export function isPlainObject(val) {
  return toString.call(val).includes("Object");
}

/**
 * css属性转换成行内样式
 * 
 * @param {*} val 
 * @returns 
 */
export function cssToInline(val) {
  return Object.keys(val).reduce((ans, key) => {
    const prop = key.replace(/[A-Z]/g, ($0) => ("-" + $0).toLowerCase());
    const value = val[key];
    return `${ans}${prop}:${value};`;
  }, "");
}
/**
 * 生成UUID
 * 
 * @param {*} len 长度
 * @returns 
 */
export function createUUID(len = 10) {
  const alphabet = ["A", "B", "C", "E", "F", "G", "H", "I", "J", "K"];
  const factor = 10 ** len;
  const randomNum = Math.floor(factor * Math.random());
  const randomStr = randomNum
    .toString()
    .split("")
    .map((item) => alphabet[item])
    .join("");
  return randomStr;
}

/**
 * 获取calss名称
 * 
 * @param {*} val 
 * @param {*} isNest 是否嵌套属性
 * @returns 
 */
export function getClassNames(val, isNest) {
  let output = [];
  if (isString(val)) {
    output.push(val);
  }

  if (isPlainObject(val)) {
    output = Object.keys(val).filter((item) => val[item]);
  }

  if (!isNest && Array.isArray(val)) {
    output = val.map((item) => getClassNames(item, true));
  }
  return output.join(" ");
}