<template>
  <BorderFrame>
    <LineTitle title="项目收益" />
    <div class="content">
      <DataLoading :loading="apiLoading" :data="list">
        <template #content>
          <div class="baseBG"></div>
          <div class="circle-wrapper">
            <div
              v-for="(item, index) in list"
              :key="'circle' + index"
              class="circle-item"
            >
              <div
                :class="['circle circle1', isHover && 'stop-move']"
                @mouseenter="isHover = true"
                @mouseleave="isHover = false"
              >
                <div class="title">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </template>
      </DataLoading>
    </div>
  </BorderFrame>
</template>

<script setup>
import { ref } from "vue";
import hooks from "@/hooks";

const list = ref([
  {
    name: "以地控税",
  },
  {
    name: "地灾监测",
  },
  {
    name: "审计系统",
  },
  {
    name: "工业园区",
  },
  {
    name: "智慧林业",
  },
  {
    name: "上林城管",
  },
]);

const isHover = ref(false);
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

:deep(.data-loading-container) {
  position: relative;
}

.baseBG {
  height: 72%;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  position: absolute;
  background: url("./../../../../../assets/images/baseBG.png") center center no-repeat;
  background-size: auto 70%;
  background-position: 50% 100%;
}

.circle-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.circle-item {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  color: #1f6f9b;
  transform-style: preserve-3d;
  transform: rotateZ(90deg) rotateY(70deg);
  transform-origin: center;
}

.circle-item .circle {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  // background: #555;
  background: url("./../../../../../assets/images/ringBG.png") center center no-repeat;
  background-size: auto 80%;
  background-position: 50% 100%;
  animation: move 30s linear infinite;
  cursor: pointer;
}

.stop-move {
  animation-play-state: paused !important;
}

.circle-item .circle2 {
  animation: move2 30s linear infinite;
}

.circle-item .circle3 {
  animation: move3 30s linear infinite;
}

.circle-item .circle4 {
  animation: move4 30s linear infinite;
}

.circle-item .circle5 {
  animation: move5 30s linear infinite;
}

.circle-item .circle6 {
  animation: move6 30s linear infinite;
}

.title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  width: 60%;
  transform: translateX(30px) translateY(75px);
}
</style>
