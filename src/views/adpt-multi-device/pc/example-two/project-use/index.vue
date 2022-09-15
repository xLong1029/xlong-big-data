<template>
  <BorderFrame>
    <LineTitle title="项目使用情况" />
    <div class="content">
      <DataLoading :loading="apiLoading" :data="tabs">
        <template #content>
          <!-- <ul>
            <li
              class="project-list-item"
              v-for="(item, index) in listData"
              :key="'task-item' + index"
            >
              <div class="project-list-item__left">
                <div class="project-list-item__icon">
                  <i class="iconfont icon-caiyang"></i>
                </div>
                <div class="project-list-item__content">
                  <span class="name ellipsis ml-5">{{ item.name }}</span>
                </div>
              </div>
              <div class="project-list-item__right">
                <div class="statistics-card">
                  <span class="num yellow">{{ toThousands(item.sampleNum) }}</span>
                  <span class="mt-5 font-12 gray">采集量</span>
                </div>
                <div class="statistics-card ml-5">
                  <span
                    ><a-tag v-if="item.status === 1" color="#0095ff" class="mr-0">
                      正常
                    </a-tag></span
                  >
                  <span class="mt-5 font-12 gray">当前状态</span>
                </div>
              </div>
            </li>
          </ul> -->
        </template>
      </DataLoading>
    </div>
  </BorderFrame>
</template>

<script setup>
import { ref } from "vue";
import hooks from "@/hooks";
import descBg from "@/assets/images/desc-bg.png";
import descBgActive from "@/assets/images/desc-bg-active.png";

const { useAutoPlay, useScreenModuleData, useFilter } = hooks;

const tabs = ref([]);

const { toThousands } = useFilter();

const { activeIndex, setActiveIndex } = useAutoPlay({
  data: tabs,
  duration: 5000,
});

const handleApiData = (data) => {
  tabs.value = data?.projectDescription || [];
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.project-list {
  width: 100%;

  &-item {
    margin-bottom: 15 size(15);
    background: rgba(87, 170, 255, 0.15);
    padding: size(10);

    @include flex-space-between();

    &__left {
      width: 100%;
      display: flex;
      align-items: center;
    }

    &__right {
      // .flex-space-between();

      min-width: size(120);

      .statistics-card {
        min-width: size(60);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .num {
          height: 20px;
        }
      }
    }

    &__icon {
      background: #8675f9;
      @include pre-icon();
    }

    &__content {
      margin-left: size(10);
      display: flex;
      align-items: center;
      .name {
        font-size: size(16);
        width: size(150);
      }
    }
  }
}
</style>
