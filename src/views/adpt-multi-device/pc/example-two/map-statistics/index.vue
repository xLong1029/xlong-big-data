<template>
  <div class="map-statistics-contaienr">
    <div class="map-statistics__map">
      <StarContainer>
        <DataLoading :loading="apiLoading" :data="chart.chartData">
          <template #content>
            <MsgMap
              :geo-data="geoJson"
              :scale="contrastRatio"
              :chart-data="chart.chartData"
              :change-data="chart.changeData"
              :coordinate-data="chart.coordinateData"
              :center-point="chart.centerPoint"
              :axis="chart.axis"
              :series="chart.series"
              :map-name="chart.mapName"
              :map-zoom="1.2"
              :label-font-size="chart.labelFontSize"
            />
          </template>
        </DataLoading>
      </StarContainer>
    </div>
    <div class="map-statistics__msg">
      <BorderFrame>
        <LineTitle title="当前系统使用情况" />
        <div class="content">
          <DataLoading :loading="apiLoading" :data="msgList">
            <template #content>
              <swiper
                :speed="1000"
                slidesPerView="auto"
                :direction="'vertical'"
                :spaceBetween="15"
                :autoplay="autoplayOptions"
                :modules="modules"
                :rewind="true"
                loop
                class="swiper-container"
              >
                <swiper-slide v-for="(item, index) in msgList" :key="index">
                  <div class="msg-item">
                    <span
                      v-highlight="highlightConfig"
                      class="msg-item__content ellipsis"
                      >{{ formatContent(item.content) }}</span
                    >
                    <span class="msg-item__time">{{ item.createdTime }}</span>
                  </div>
                </swiper-slide>
              </swiper>
            </template>
          </DataLoading>
        </div>
      </BorderFrame>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, inject, watch, onMounted, onUnmounted } from "vue";
import StarContainer from "@/components/common/StarContainer/index.vue";
import MsgMap from "@/components/chart/MsgMap/index.vue";
import geoJson from "@/assets/json/guangxi.json";
import Api from "@/api/screen";
import { uniqueArr, deepClone, clearTimer } from "@/utils";
// swiper
import { Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const contrastRatio = inject("getContrastRatio", 1);

const apiLoading = ref(false);
const apiTimer = ref(null);

const isFirst = ref(true); // 第一次加载

const chart = reactive({
  mapName: "guangxi",
  axis: {
    property: "name",
  },
  series: {
    property: "visit",
  },
  chartData: [],
  centerPoint: {
    name: "南宁市",
    value: [108.467414, 23.055856],
  },
  changeData: null,
  coordinateData: {},
  labelFontSize: 14,
});

const msgList = ref([]);
const activeMsgIndex = ref(0);

const autoplayOptions = reactive({
  delay: 5000, // 与请求有时间差才能替换数据
  // observer: true,
  // observeParents: true,
  reverseDirection: true, // 反向
  disableOnInteraction: true,
});

const modules = [Scrollbar, Autoplay];

const highlightConfig = ref({
  include: [],
  style: {
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
  },
});

onMounted(() => {
  isFirst.value = true;
  init();
});

onUnmounted(() => {
  clearTimer([apiTimer.value]);
});

const init = () => {
  clearTimer([apiTimer.value]);

  apiLoading.value = true;
  getMapData();
  apiTimer.value = setInterval(() => {
    getMapData();
  }, 5000);
};

const getMapData = () => {
  Api.GetMapData()
    .then((res) => {
      const { code, message, data } = res;

      if (code === 200) {
        if (!isFirst.value) {
          chart.changeData = data?.changeMapObj || null;

          // TODO: 替换对应索引数据，有BUG
          activeMsgIndex.value--;
          if (activeMsgIndex.value < 0) {
            activeMsgIndex.value = 5;
          }
          msgList.value[activeMsgIndex.value] = data?.newMsg || {};
        } else {
          isFirst.value = false;
          msgList.value = data?.msgData || [];
        }

        /* 高亮设置 */
        const highlightList = deepClone(msgList.value).reduce((pre, cur) => {
          return [...pre, ...getHighlightList(cur.content)];
        }, []);

        const style = {
          fontSize: 14 * contrastRatio.value,
        };

        highlightConfig.value = {
          ...highlightConfig.value,
          include: uniqueArr([
            ...(highlightConfig.value?.include || []),
            ...highlightList,
          ]),
          style: { ...(highlightConfig.value?.style || {}), ...style },
        };
        /* 高亮设置 */

        chart.chartData = data?.mapData || [];
        chart.coordinateData = data?.coordinateData || [];

        setTimeout(() => {
          apiLoading.value = false;
        }, 500);
      } else {
        ElMessage.error(message);
      }
    })
    .catch((err) => {
      console.log(err);
      apiLoading.value = false;
    });
};

// 获取高亮文字，中括号内容
const getHighlightList = (val) => {
  return val.match(/(?<=\[)([^\]]*)(?=\])/g) ?? [];
};

// 格式化内容，去掉中括号
const formatContent = (val) => {
  return val.replaceAll(/\[([^\]]*)\]/g, "$1");
};

// watch(
//   () => msgList.value,
//   (val) => {
//     const highlightList = deepClone(val).reduce((pre, cur) => {
//       return [...pre, ...getHighlightList(cur.content)];
//     }, []);

//     const style = {
//       fontSize: 14 * contrastRatio.value,
//     };

//     highlightConfig.value = {
//       ...highlightConfig.value,
//       include: uniqueArr([...(highlightConfig.value?.include || []), ...highlightList]),
//       style: { ...(highlightConfig.value?.style || {}), ...style },
//     };
//   }
// );
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.week-statistics-container {
  @include line-title-set-unit();
}

.map-statistics {
  &-contaienr {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__map {
    flex: 1;
  }
}

.msg-item {
  background-image: linear-gradient(-90deg, #3dddff00 0%, #32a8ff3d 45%, #2468ff0a 100%);
  padding: size(5) size(10);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__content {
    width: 80%;
    height: size(20);
  }

  &__time {
    color: color(blue);
  }
}

.swiper-container {
  width: 100%;
  height: size(218);

  :deep(.swiper-slide) {
    height: auto;
    box-sizing: border-box;
  }
}
</style>
