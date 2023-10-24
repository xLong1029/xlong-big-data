<template>
  <BorderFrameOne>
    <BorderFrameFlyLight>
      <FlexContent>
        <BorderFrameTitleFour title="数据监控" />
        <div class="content">
          <DataLoading :loading="apiLoading" :data="chart.chartData">
            <StatisticsDiagram
              :chart-data="chart.chartData"
              :line-data="chart.lineData"
              :fly-line-data="chart.flyLineData"
              :scale="contrastRatio"
              :tooltip="chart.tooltip"
              :label-font-size="chart.labelFontSize"
            />
          </DataLoading>
        </div>
      </FlexContent>
    </BorderFrameFlyLight>
  </BorderFrameOne>
</template>

<script setup>
import { reactive, watch } from "vue";
import StatisticsDiagram from "@/components/chart/StatisticsDiagram/index.vue";
import hooks from "@/hooks";

const { useScreenModuleData } = hooks;

const chart = reactive({
  lineData: [
    {
      source: "监控平台",
      target: "企业网站",
    },
    {
      source: "企业网站",
      target: "监控平台",
    },
    {
      source: "监控平台",
      target: "智慧城市项目",
    },
    {
      source: "智慧城市项目",
      target: "监控平台",
    },
    {
      source: "监控平台",
      target: "小程序应用",
    },
    {
      source: "小程序应用",
      target: "监控平台",
    },
    {
      source: "监控平台",
      target: "电商项目",
    },
    {
      source: "电商项目",
      target: "监控平台",
    },
    {
      source: "App应用",
      target: "监控平台",
    },
    {
      source: "监控平台",
      target: "App应用",
    },
    {
      source: "H5场景应用",
      target: "监控平台",
    },
    {
      source: "监控平台",
      target: "H5场景应用",
    },
  ],
  // 飞线数据
  flyLineData: [
    // 企业网站
    {
      coords: [
        [275, 30],
        [275, 180],
      ],
    },
    {
      coords: [
        [275, 180],
        [275, 30],
      ],
    },
    // 智慧城市项目
    {
      coords: [
        [275, 180],
        [500, 250],
      ],
    },
    {
      coords: [
        [500, 250],
        [275, 180],
      ],
    },
    // 小程序应用
    {
      coords: [
        [275, 180],
        [500, 120],
      ],
    },
    {
      coords: [
        [500, 120],
        [275, 180],
      ],
    },
    // 电商项目
    {
      coords: [
        [275, 180],
        [275, 320],
      ],
    },
    {
      coords: [
        [275, 320],
        [275, 180],
      ],
    },
    // App应用
    {
      coords: [
        [50, 100],
        [275, 180],
      ],
    },
    {
      coords: [
        [275, 180],
        [50, 100],
      ],
    },
    // H5场景应用
    {
      coords: [
        [50, 250],
        [275, 180],
      ],
    },
    {
      coords: [
        [275, 180],
        [50, 250],
      ],
    },
  ],
  // 图表数据
  chartData: [
    {
      name: "监控平台",
      category: 1,
      value: [275, 180],
    },
    {
      name: "智慧城市项目",
      category: 2,
      value: [500, 250],
    },
    {
      name: "小程序应用",
      category: 2,
      value: [500, 120],
    },
    {
      name: "企业网站",
      category: 2,
      value: [275, 30],
    },
    {
      name: "App应用",
      category: 2,
      value: [50, 100],
    },
    {
      name: "电商项目",
      category: 2,
      value: [275, 320],
    },
    {
      name: "H5场景应用",
      category: 2,
      value: [50, 250],
    },
  ],
  // 提示
  tooltip: {
    formatter: (params) => {
      const scale = contrastRatio.value;
      const fontSize = 14;
      const lightHeightColor = "#ffe66d";
      const dotColor = "#00e6ff";

      const { marker } = params;
      const { extraData, name } = params.data;

      if (extraData?.users && extraData?.companines) {
        const { users, companines } = extraData;

        return `<div style="font-size:${fontSize * scale}px;">
        <div><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${dotColor};"></span> ${name}</div>
        <div style="margin-top: ${
          10 * scale
        }px">服务用户：<span style="color:${lightHeightColor};" >${users}</span> 人</div>
        <div style="margin-top: 10px">服务企业：<span style="color:${lightHeightColor}; margin: 10px 0" >${companines}</span> 家</div>
        </div>`;
      }

      return "";
    },
  },
  labelFontSize: 14,
});

const handleApiData = (data) => {
  const monitorData = data?.projectMonitorData || [];

  if (monitorData.length) {
    chart.chartData = chart.chartData.map((e) => {
      const obj = monitorData.find((o) => o.name === e.name);
      return {
        ...e,
        extraData: {
          users: obj?.users || null,
          companines: obj?.companines || null,
        },
      };
    });
  }
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

// :deep(.content) {
//   padding-bottom: size(15);
//   height: calc(100% - size(30)) !important;
// }

:deep(.data-loading-container) {
  align-items: flex-start;
}
</style>
