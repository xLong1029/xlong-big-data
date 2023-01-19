<template>
  <chart
    :option="option"
    :width="width"
    :height="height"
    :duration="duration"
    :autoplay="autoplay"
  />
</template>

<script>
import Chart from '@/components/chart/Default/index.vue'
export default {
  name: 'DoughnutChart',
  components: {
    Chart
  },
  props: {
    title: {
      type: String,
      default: '标题'
    },
    // 宽度
    width: {
      type: [Number, String],
      default: '100%'
    },
    // 高度
    height: {
      type: [Number, String],
      default: '100%'
    },
    // 图表数据
    chartData: {
      type: Array,
      default: () => []
    },
    // 指示器数值配置
    axis: {
      type: Object,
      default: () => ({
        name: '名称',
        property: 'name'
      })
    },
    // 数值配置
    series: {
      type: Object,
      default: () => ({
        name: '名称',
        property: 'name'
      })
    },
    // 颜色列表
    colorList: {
      type: Array,
      default: () => [
        '#ffbf4b',
        '#fd65b9',
        '#b14bff',
        '#3886fb',
        '#45f3fd',
        '#97ff84'
      ]
    },
    // 缩放基数
    scale: {
      type: Number,
      default: 1
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: false
    },
    // 持续时间
    duration: {
      type: Number,
      default: 1500
    },
    // 文本大小
    labelFontSize: {
      type: Number,
      default: 14
    },
    // 图例
    legend: {
      type: Object,
      default: () => ({})
    },
    // 网格
    grid: {
      type: Object,
      default: () => ({
        containLabel: true
      })
    },
    // 提示
    tooltip: {
      type: Object,
      default: () => ({})
    },
    // 饼图半径
    radius: {
      type: Array,
      default: () => ['60%', '70%']
    },
    // 饼图中心
    center: {
      type: Array,
      default: () => ['50%', '45%']
    },
    // 单位
    unit: {
      type: String,
      default: '%'
    },
    // 圆角样式
    borderRadius: {
      type: [String, Number, Array],
      default: 0
    }
  },
  data() {
    return {
      option: null
    }
  },
  watch: {
    chartData: {
      handler: function(data) {
        this.setOption(data)
      },
      immediate: true
    }
  },
  methods: {
    setOption(chartData = []) {
      const {
        axis,
        series,
        colorList,
        scale,
        labelFontSize,
        legend,
        grid,
        tooltip,
        radius,
        center,
        unit,
        borderRadius
      } = this

      const fontSize = labelFontSize * scale
      const fontColor = '#333333'

      // 提示
      const customTooltip = {
        textStyle: {
          fontSize,
          color: fontColor
        },
        trigger: 'item',
        ...tooltip
      }

      // 图例
      const customLegend = {
        bottom: 'bottom',
        textStyle: {
          color: fontColor,
          fontSize
        },
        ...legend
      }

      // 网格
      const customGrid = {
        top: '1%',
        bottom: '1%',
        left: '1%',
        right: '1%',
        containLabel: true,
        ...grid
      }

      this.option = {
        tooltip: customTooltip,
        legend: customLegend,
        grid: customGrid,
        color: colorList,
        series: [
          {
            type: 'pie',
            center,
            radius,
            label: {
              formatter: `{b}: {c}${unit}`
            },
            itemStyle: {
              borderRadius
            },
            labelLine: {
              length: 2 * scale,
              length2: 2 * scale,
              show: false
            },
            data: chartData.map((e) => ({
              name: e[axis.property],
              value: e[series.property]
            }))
          }
        ]
      }
    }
  }
}
</script>
