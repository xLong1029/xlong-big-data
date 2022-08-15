<template>
  <div ref="container" :style="{ height, width }" />
</template>

<script setup>
import { watch, defineProps, defineEmits, computed, defineExpose } from "vue";
import hooks from "@/hooks";

const props = defineProps({
  option: {
    type: Object,
    default() {
      return {};
    },
  },
  width: {
    type: [Number, String],
    default: "100%",
  },
  height: {
    type: [Number, String],
    default: "100%",
  },
  seriesIndex: {
    type: Number,
    default: 0,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 1500,
  },
  hoverActive: {
    type: Boolean,
    default: false,
  },
  highlightSeriesIndex: {
    type: Array,
    default: () => [0],
  },
});

const emit = defineEmits(["activeIndexChange"]);

const { useChart, useChartAutoPlay } = hooks;

const chartData = computed(() => props.option.series?.[props.seriesIndex]?.data ?? []);

// 渲染图表
const { chart, option, container } = useChart();

watch(
  () => props.option,
  (val) => {
    option.value = val ?? {};
  },
  {
    immediate: true,
  }
);

// 自动播放tooltip
const { activeIndex, autoplay } = useChartAutoPlay({
  duration: props.duration,
  data: chartData,
});

watch(
  () => props.autoplay,
  (e) => {
    autoplay.value = e;
  },
  {
    immediate: true,
  }
);

watch(activeIndex, (val, preval) => {
  chart.value?.dispatchAction({
    type: "downplay",
    seriesIndex: props.highlightSeriesIndex,
    dataIndex: preval,
  });
  chart.value?.dispatchAction({
    type: "highlight",
    seriesIndex: props.highlightSeriesIndex,
    dataIndex: val,
  });
  chart.value?.dispatchAction({
    type: "showTip",
    seriesIndex: [0],
    dataIndex: val,
  });

  emit("activeIndexChange", val);
});

watch(chart, (chartIns) => {
  if (chartIns && props.autoplay) {
    chartIns.getZr().on("mousemove", function (e) {
      if (e.topTarget) {
        autoplay.value = false;
      } else {
        autoplay.value = true;
      }
    });
    chartIns.getDom().addEventListener("mouseout", function (e) {
      autoplay.value = true;
    });
    chartIns.on("mouseover", function (e) {
      if (e.dataIndex !== activeIndex.value) {
        chartIns?.dispatchAction({
          type: "downplay",
          seriesIndex: props.highlightSeriesIndex,
          dataIndex: activeIndex.value,
        });
        if (props.hoverActive) {
          setActiveIndex(e.dataIndex);
        }
      }
    });
  }
});

const setActiveIndex = (index) => {
  activeIndex.value = index;
};

defineExpose({
  setActiveIndex,
});
</script>
