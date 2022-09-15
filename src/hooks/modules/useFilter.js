/*
 * 模块 : 过滤器
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2021-11-01
 * 版本 : version 1.0
 */

export default function() {
  /**
   * 数字每三位加逗号
   *
   * @param {Number} num 数值
   */
  const toThousands = num => {
      num = (num || 0).toString();
      let number = 0,
          floatNum = "",
          intNum = "";
      // 判断是否有小数位，有则截取小数点后的数字
      if (num.indexOf(".") > 0) {
          number = num.indexOf("."); // 获取小数点出现的位置
          floatNum = num.substr(number); // 截取arr.substr(form, length)
          intNum = num.substring(0, number); // 截取arr.substring(start, end)
      } else {
          intNum = num;
      }
      let result = [],
          counter = 0;
      intNum = intNum.split("");
      // 利用3的倍数，向数组插入','
      for (let i = intNum.length - 1; i >= 0; i--) {
          counter++;
          result.unshift(intNum[i]);
          if (!(counter % 3) && i != 0) {
              result.unshift(",");
          }
      }
      return result.join("") + floatNum || "";
  };

  /**
   * 判断值是否为空，若为空则返回'-'
   * @param value
   */
  const isNull = value => {
      return value &&
          value !== null &&
          value !== undefined &&
          value !== "" &&
          value !== "Null" &&
          value !== "null" &&
          value !== " " ?
          value :
          "-";
  };

  return {
      toThousands,
      isNull
  };
}