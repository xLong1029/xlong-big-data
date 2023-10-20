<template>
  <BorderFrameOne>
    <BorderFrameFlyLight>
      <FlexContent>
        <BorderFrameTitleFour title="项目使用情况" />
        <div class="content">
          <DataLoading :loading="apiLoading" :data="list">
            <div class="project-list">
              <Vue3SeamlessScroll :list="list" :step="0.3" :hover="true">
                <div
                  class="project-list-item"
                  v-for="(item, index) in list"
                  :key="'project-item' + index"
                >
                  <div :class="getBackgroundClassName(item)">
                    <i :class="getIconClassName(item)"></i>
                  </div>
                  <div class="project-list-item__name ellipsis">
                    {{ item.name }}
                  </div>
                  <div class="statistics-card">
                    <span class="statistics-card__num font-16">{{
                      toThousands(item.users)
                    }}</span>
                    <span class="statistics-card__text mt-5">累计使用人数</span>
                  </div>
                  <div class="statistics-card ml-10">
                    <span>
                      <el-tag v-if="item.status === 1" effect="dark" type="success"
                        >正常</el-tag
                      >
                      <el-tag v-if="item.status === -1" effect="dark" type=""
                        >维护</el-tag
                      >
                    </span>
                    <span class="statistics-card__text mt-5">当前状态</span>
                  </div>
                </div>
              </Vue3SeamlessScroll>
            </div>
          </DataLoading>
        </div>
      </FlexContent>
    </BorderFrameFlyLight>
  </BorderFrameOne>
</template>

<script setup>
import { ref } from "vue";
import hooks from "@/hooks";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

const { useScreenModuleData, useFilter } = hooks;

const tabs = ref([]);

const { toThousands } = useFilter();

const list = ref([]);

const handleApiData = (data) => {
  list.value = data?.projectUseData || [];
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);

const getBackgroundClassName = ({ type }) => {
  let className = "project-list-item__icon";
  switch (type) {
    case "web":
      className += " web";
      break;
    case "design":
      className += " design";
      break;
    case "app":
      className += " app";
      break;
    case "project":
      className += " project";
      break;
  }
  return className;
};

const getIconClassName = ({ type }) => {
  let className = "iconfont";

  switch (type) {
    case "web":
      className += " icon-webduan";
      break;
    case "design":
      className += " icon-shejimeigong";
      break;
    case "app":
      className += " icon-appyingyong";
      break;
    case "project":
      className += " icon-app";
      break;
  }

  return className;
};
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

:deep(.content) {
  padding-top: 0 !important;
}

.project-list {
  width: 100%;
  height: calc(100% - size(30));
  overflow: hidden;

  &-item {
    margin-bottom: 15 size(15);
    background: rgba(87, 170, 255, 0.15);
    padding: size(10);
    margin-bottom: size(10);
    align-items: center;

    @include flex-space-between();

    .statistics-card {
      min-width: size(60);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__num {
        display: block;
        height: size(24);
        line-height: size(24);
        color: color(yellow);
      }

      &__text {
        color: color(gray);
        font-size: size(12);
      }
    }

    &__icon {
      @include pre-icon();

      &.web {
        background-image: linear-gradient(#3368ff, #42daf5);
      }

      &.design {
        background-image: linear-gradient(#ff4ee1, #fd9d65);
      }

      &.app {
        background-image: linear-gradient(#42cdff, #3fc47b);
      }

      &.project {
        background-image: linear-gradient(#9f23fd, #6594fd);
      }
    }

    &__name {
      margin-left: size(10);
      flex: 1;
      font-size: size(16);
      min-width: size(120);
    }
  }
}
</style>
