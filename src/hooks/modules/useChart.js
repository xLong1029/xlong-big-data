import {
  ref,
  reactive,
  shallowReactive,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import * as echarts from "echarts";

export default function (props) {
  const defaultOption = reactive({
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,0.6)",
      borderWidth: 0,
      textStyle: {
        fontSize: 12,
        color: "#FFFFFF",
      },
    },
  });

  const chart = shallowReactive({
    value: null,
  });
  const container = ref(null);
  const option = ref(null);

  const setOption = () => {
    chart.value?.setOption({ ...defaultOption, ...option.value });
  };

  onMounted(() => {});

  onUnmounted(() => {
    chart.value?.dispose();
    chart.value = null;
  });

  watch([option, container], ([opt, dom]) => {
    if (dom && !chart.value) {
      chart.value = echarts.init(dom, "dark");
    }
    setOption();
  });

  return {
    chart,
    echarts,
    option,
    container,
  };
}
