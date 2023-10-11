/*
 * 模块 : 大屏通用设置
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2023-10-08
 * 版本 : version 2.0
 */
import { provide, ref, reactive, onMounted, watch } from "vue";
import { useWindowSize } from '@vueuse/core'

export default function() {
  const { width: winWidth, height: winHeight } = useWindowSize();

  // 设计稿高宽
  const design = reactive({
    width: 1920,
    height: 1080,
    ratio: 1920 / 1080,
  });

  // 设备屏幕高宽
  const screen = reactive({
    width: 1920,
    height: 1080
  });

  // 设备屏幕和设计稿比例
  const screenRate = reactive({
    hr: 1,
    wr: 1,
    swhr: 1
  });


  // 字体可缩放的最小尺寸
  const minScreen = reactive({
    width: 1400,
    height: 820,
  });

  // 响应式比率
  const contrastRatio = ref(1);  

  // 顶级组件通过provide传递给子孙组件
  provide("getDesign", design);
  provide("getScreen", screen);
  provide("getContrastRatio", contrastRatio);

  onMounted(() => {
    handleResizeScreen(document.body.clientWidth, document.body.clientHeight);
  });

  const handleResizeScreen = (width, height) => {
    screen.width = width;
    screen.height = height;

    screenRate.hr = screen.height / design.height;
    screenRate.wr = screen.width / design.width;
    screenRate.swhr = screen.width / screen.height;

    // 横屏
    if (screenRate.swhr > 1) {
      if (screen.width > 1366) {
        // 超宽屏大于 21：9
        if (screenRate.swhr >= 21 / 9) {
          if (screenRate.swhr > design.ratio) {
            contrastRatio.value = screen.height < minScreen.height ? 0.56 : screenRate.hr * 1.2; // 以高度为基准制定
          } else {
            contrastRatio.value = screen.width < minScreen.width ? 0.6 : screenRate.wr * 1.2; // 以宽度为基准制定
          }
        } else {
          // contrastRatio.value = hr; // 以高度为基准制定
          if (screenRate.swhr > design.ratio) {
            contrastRatio.value = screen.height < minScreen.height ? 0.56 : screenRate.hr; // 以高度为基准制定
          } else {
            contrastRatio.value = screen.width < minScreen.width ? 0.6 : screenRate.wr; // 以宽度为基准制定
          }
        }
      } else {
        contrastRatio.value = 1;
      }
    }
    // 竖屏
    else {
    }

    document.documentElement.style.fontSize = contrastRatio.value * 100 + 'px';
  };

  watch(
    [winWidth, winHeight],
    ([width, height]) => {
      handleResizeScreen(width, height);
      // console.log(width, height)
    },
    {
      immediate: true
    }
  );

  return {
    design,
    screen,
    screenRate,
    minScreen,
    contrastRatio,
  };
}
