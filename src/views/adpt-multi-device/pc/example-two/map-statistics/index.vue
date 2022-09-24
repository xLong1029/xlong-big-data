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
                @active-index-change="handleActiveIndexChange"
              >
                <swiper-slide v-for="(item, index) in msgList" :key="index">
                  <div class="msg-item">
                    <span class="msg-item__content ellipsis"
                      >{{ item.content }}</span
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
import { reactive, ref, inject, onMounted, onUnmounted } from "vue";
import StarContainer from "@/components/common/StarContainer/index.vue";
import MsgMap from "@/components/chart/MsgMap/index.vue";
import geoJson from "@/assets/json/guangxi.json";
import Api from "@/api/screen";
import { clearTimer } from "@/utils";
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
  delay: 4500, // 与请求有时间差才能替换数据
  observer: true,
  observeParents: true,
  reverseDirection: true, // 反向
  disableOnInteraction: true,
});

const modules = [Scrollbar, Autoplay];

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

          // 替换对应索引数据
          activeMsgIndex.value--
          if (activeMsgIndex.value < 0) {
            activeMsgIndex.value = 5;
          }
          msgList.value[activeMsgIndex.value] = data?.newMsg || {};
        } else {
          isFirst.value = false;
          msgList.value = data?.msgData || [];
        }

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

const handleActiveIndexChange = (params) => {
  // if(activeMsgIndex.value === 0){
  //   activeMsgIndex.value = 5;
  // }
  // console.log(activeMsgIndex.value--);
};
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

  &__time{
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
