/*
 * 模块 : CountUp计数组件配置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-09-02
 * 版本 : version 1.0
 */
import {
  ref,
  reactive,
} from "vue";
import CountUp from "vue-countup-v3";

export default function () {
  const defaultOption = reactive({
    delay: 1000,
    endVal: 120500,
    options: {
      useEasing: true,
      useGrouping: true,
      separator: ',',
      decimal: '.',
      prefix: '',
      suffix: ''
    }
  })
  const customCountUpOption = ref(null);
  const countUpOption = ref({ ...defaultOption });

  /**
   * 设置配置项
   */
  const setCountUpOption = () => {
    countUpOption.value = { ...defaultOption, ...customCountUpOption.value };
  };

  return {
    CountUp,
    countUpOption
  };
}
