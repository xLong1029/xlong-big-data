<template>
  <BorderFrame>
    <div class="count">
      <div class="count-item">
        <div class="icon__circle">
          <img class="icon__content" :src="iconCover" />
        </div>
        <div>
          <div class="number">
            <span class="number__content">13</span
            ><span class="number__unit">个</span>
          </div>
          <div>当前覆盖城市</div>
        </div>
      </div>
      <!-- <div
          class="count-list-item"
          v-for="(item, index) in list"
          :key="'task-item' + index"
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
        </div> -->
    </div>
  </BorderFrame>
</template>

<script setup>
import { ref } from "vue";
import hooks from "@/hooks";
import iconCover from "@/assets/images/icon-cover.png";

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

.count-item{
  display: flex;
}

.icon {
  &__circle {
  }

  &__content {
    width: size(30);
    height: size(30);
  }
}

.number {
  display: flex;
  align-items: center;
  justify-content: center;

  &__text {
    font-size: size(20);
    margin: 0 size(12);
  }
}
</style>
