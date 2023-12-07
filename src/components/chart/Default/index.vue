<template>
  <div ref="container" :style="{ height, width }" />
</template>

<script setup>
import { watch, computed } from "vue";
import hooks from "@/hooks";

defineOptions(
  {
    name: "Chart"
  }
);

const props = defineProps({
  // 配置项
  option: {
    type: Object,
    default() {
      return {};
    },
  },
  // 宽度
  width: {
    type: [Number, String],
    default: "100%",
  },
  // 高度
  height: {
    type: [Number, String],
    default: "100%",
  },
  // 系列列表索引
  seriesIndex: {
    type: Number,
    default: 0,
  },
  // 是否自动播放
  autoplay: {
    type: Boolean,
    default: false,
  },
  // 持续时间
  duration: {
    type: Number,
    default: 1500,
  },
  // 鼠标经过
  hoverActive: {
    type: Boolean,
    default: false,
  },
  // 高亮系列列表索引
  highlightSeriesIndex: {
    type: Array,
    default: () => [0],
  },
});

const emit = defineEmits(["active-index-change"]);

const { useChart, useAutoPlay } = hooks;

const chartData = computed(() => props.option?.series?.[props.seriesIndex]?.data ?? []);

const { chart, option, container } = useChart();

const { activeIndex, autoplay } = useAutoPlay({
  duration: props.duration,
  data: chartData,
});

watch(
  () => props.option,
  (val) => {
    option.value = val ?? {};
  },
  {
    immediate: true,
  }
);

const setAutoplay = (val) => (autoplay.value = val);

const setActiveIndex = (index) => (activeIndex.value = index);

watch(
  () => props.autoplay,
  (val) => {
    setAutoplay(val);
  },
  {
    immediate: true,
  }
);

watch(activeIndex, (val, preval) => {
  const { highlightSeriesIndex: seriesIndex } = props;
  chart.value?.dispatchAction({
    type: "downplay",
    seriesIndex,
    dataIndex: preval,
  });

  chart.value?.dispatchAction({
    type: "highlight",
    seriesIndex,
    dataIndex: val,
  });

  chart.value?.dispatchAction({
    type: "showTip",
    seriesIndex: [0],
    dataIndex: val,
  });

  emit("active-index-change", val);
});

watch(
  () => chart.value,
  (newChart) => {
    const { autoplay } = props;
    if (newChart && autoplay) {
      newChart.getZr().on("mousemove", (e) => {
        if (e.topTarget) {
          setAutoplay(false);
        } else {
          setAutoplay(true);
        }
      });
      newChart.getDom().addEventListener("mouseout", (e) => {
        setAutoplay(true);
      });
      newChart.on("mouseover", (e) => {
        const { highlightSeriesIndex: seriesIndex, hoverActive } = props;
        if (e.dataIndex !== activeIndex.value) {
          newChart?.dispatchAction({
            type: "downplay",
            seriesIndex,
            dataIndex: activeIndex.value,
          });
          if (hoverActive) {            
            setActiveIndex(e.dataIndex);
          }
        }
      });
    }
  }
);

defineExpose({
  setActiveIndex,
  chart,
});
</script>
