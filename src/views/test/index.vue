<template>
  <div class="wrapper">
    <div class="inner">
      <div class="chart" id="chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-liquidfill";
import { onMounted, markRaw, reactive, toRefs } from "vue";
export default {
  setup() {
    let state = reactive({
      myCharts: null,
      options: {},
      data: { name: "1111", value: 1 },
      list: [],
      color: "#2bf9ed",
    });
    let data = state.data;
    let value = data.value;
    state.list.push({ name: data.name, value: data.value });

    for (let i = 0; i < 1; i++) {
      if (value - 0.1 > 0) {
        value -= 0.1;
        state.list.push({ name: data.name, value: value });
      }
    }
    state.options = {
      // 提示框组件
      tooltip: {
        show: false,
      },
      series: [
        {
          type: "liquidFill",
          name: "全国就业率",
          radius: "40%",
          center: ["50%", "50%"],
          shape: "circle",
          phase: 0,
          direction: "right",
          outline: {
            show: true,
            borderDistance: 0, // 边框线与图表的距离 数字
            itemStyle: {
              opacity: 1,
              borderWidth: 0,
              borderColor: state.color,
            },
          },
          // 图形样式
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#c5e87e" }, //柱图渐变色
              { offset: 0.5, color: state.color }, //柱图渐变色
            ]),
            opacity: 0.5,
            shadowBlur: 10,
          },
          backgroundStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: state.color }, //柱图渐变色
              { offset: 0.4, color: "#44C0C1" }, //柱图渐变色
            ]),
            opacity: 0.5,
          },
          // 图形的高亮样式
          emphasis: {
            itemStyle: {
              opacity: 1,
            },
          },
          // 图形上的文本标签
          label: {
            fontSize: 40,
            fontWeight: 600,
            color: "#fff",
          },
          data: state.list,
        },
        {
          name: "Access From",
          type: "pie",
          radius: ["43%", "50%"],
          center: ["50%", "50%"],
          startAngle: 340,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: 0.4,
              name: "Direct",
              itemStyle: {
                color: state.color,
              },
            },
            {
              value: 0.6,
              name: "Direct",
              itemStyle: {
                color: "rgba(240, 248, 255, 0)",
              },
            },
          ],
          emphasis: {
            disabled: true,
          },
        },
      ],
    };

    onMounted(() => {
      state.myCharts = markRaw(echarts.init(document.getElementById("chart")));
      state.myCharts.setOption(state.options);
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style>
#chart {
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0a1534;
}
#chart::before {
  position: absolute;
  content: "";
  border: 2px dashed #2bf9ed;
  width: 46%;
  height: 46%;
  border-radius: 100%;
}
</style>
