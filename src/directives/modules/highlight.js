
import {
  isString,
  cssToInline,
  createUUID,
  getClassNames
} from "./../utils";

const defalutStyle = {
  color: "#ffe66d",
  fontSize: 14,
  fontWeight: "bold",
  margin: "0 6px",
  fontStyle: "italic",
};

const HIGH_LIGHT_ORIGIN_CLASS = "hight-light__origin";
const HIGH_LIGHT_CLASS = "hight-light";

/**
 * 获取绑定属性值
 * @param {*} binding 
 * @returns 
 */
const getBindingValue = (binding) => {
  const include = binding.value?.include || [];
  const exclude = binding.value?.exclude || [];
  const styleObj = binding.value?.style || {};
  const classNames = getClassNames(binding.value?.class || "");

  return { include, exclude, styleObj, classNames }
}

const highlight = (el, binding, vnode, prevNode) => {
  const content = el?.dataset?.content || el.innerHTML;  

  // 获取el下的子元素
  let orginElWrap = el.querySelector(`.${HIGH_LIGHT_ORIGIN_CLASS}`);
  let highlightElWrap = el.querySelector(`.${HIGH_LIGHT_CLASS}`);

  // 新增节点-原始数据
  if (!orginElWrap) {
    orginElWrap = document.createElement("div");
    orginElWrap.classList.add(HIGH_LIGHT_ORIGIN_CLASS);
    orginElWrap.style.display = "none";
  }
  orginElWrap.innerHTML = content;

  // 新增节点-高亮数据
  if (!highlightElWrap) {
    highlightElWrap = document.createElement("div");
    highlightElWrap.classList.add(HIGH_LIGHT_CLASS);
  }

  
  el.innerHTML = "";
  el.appendChild(orginElWrap);
  el.appendChild(highlightElWrap);

  let { include, exclude, styleObj, classNames } = getBindingValue(binding);

  // 合并样式
  const mergeStyle = {
    ...defalutStyle,
    ...styleObj,
  };

  // 修改字体属性
  mergeStyle.fontSize = isString(mergeStyle.fontSize)
    ? mergeStyle.fontSize
    : mergeStyle.fontSize + "px";

  // 转换成行内样式
  let styleStr = cssToInline(mergeStyle);

  let propStyle = styleStr ? `style="${styleStr}"` : "";
  let propClass = classNames ? `class="${classNames}"` : "";

  const replacement = ($2) => `<span ${propClass} ${propStyle}>${$2}</span>`;

  let innerHTML = orginElWrap.innerHTML;

  const exMap = new Map();

  // 排除部分
  exclude.forEach((item) => {
    innerHTML = innerHTML.replaceAll(item, (res) => {
      const key = createUUID();
      exMap.set(key, res);
      return key;
    });
  });

  // 高亮部分替换
  include.forEach(
    (e) => (innerHTML = innerHTML.replaceAll(e, replacement))
  );

  [...exMap.keys()].forEach((item) => {
    innerHTML = innerHTML.replace(item, exMap.get(item));
  });

  highlightElWrap.innerHTML = innerHTML;
};

export default {
  created: highlight,
  updated: highlight,
};
