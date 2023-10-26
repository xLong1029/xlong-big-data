<template>
  <BorderFrameOne>
    <BorderFrameFlyLight>
      <FlexContent>
        <BorderFrameTitleFour title="项目收益" />
        <div class="content">
          <DataLoading :loading="apiLoading" :data="list">
            <div class="number">
              <div class="number__text">总收益</div>
              <DigitalNumber :data="money" :oldData="oldMoney" />
              <div class="number__text">万元</div>
            </div>
            <div class="spinning-ball mt-20">
              <div class="spinning-ball__bottom"></div>
              <div class="spinning-ball__wrapper">
                <div class="spinning-ball__content">
                  <div
                    v-for="(item, index) in list"
                    :key="'' + index"
                    :class="[`ball ball${index + 1}`, isHover && 'stop-move']"
                    @mouseenter="isHover = true"
                    @mouseleave="isHover = false"
                  >
                    <div class="spinning-ball__title">{{ item.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </DataLoading>
        </div>
      </FlexContent>
    </BorderFrameFlyLight>
  </BorderFrameOne>
</template>

<script setup>
import { ref } from "vue";
import DigitalNumber from "@/components/common/DigitalNumber/index.vue";
import { deepClone } from "@/utils";
import hooks from "@/hooks";

const { useScreenModuleData } = hooks;

const list = ref([]);

const isHover = ref(false);

const money = ref(0);
const oldMoney = ref(0);

const handleApiData = (data) => {
  oldMoney.value = deepClone(money.value);

  list.value = data?.hotProjectData.filter((e, i) => i < 6) || [];
  money.value = data?.money || 0;
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

:deep(.data-loading-container) {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: inherit;
}

.spinning-ball {
  width: 100%;
  height: 100%;
  position: relative;

  &__wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__content {
    width: size(260);
    height: size(260);
    border-radius: 50%;
    color: #1f6f9b;
    transform-style: preserve-3d;
    transform: rotateZ(90deg) rotateY(70deg);
    transform-origin: center;
  }

  &__bottom {
    height: 65%;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    background: url("./../../../../assets/images/spinning-ball-bottom.png") center center
      no-repeat;
    background-size: 100% auto;
    opacity: 0.75;
  }

  &__title {
    text-align: center;
    font-size: size(16);
    font-weight: bold;
    color: #fff;
    width: 60%;
  }
}

.ball {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  top: 0;
  left: -15%;
  right: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  background: url("./../../../../assets/images/ball.png") center center no-repeat;
  background-size: auto 75%;
  animation: move 30s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    .spinning-ball__title {
      color: color(blue);
    }
  }

  &.stop-move {
    animation-play-state: paused !important;
  }

  &.ball2 {
    animation: move2 30s linear infinite;
  }

  &.ball3 {
    animation: move3 30s linear infinite;
  }

  &.ball4 {
    animation: move4 30s linear infinite;
  }

  &.ball5 {
    animation: move5 30s linear infinite;
  }

  &.ball6 {
    animation: move6 30s linear infinite;
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

@keyframes move {
  from {
    transform: rotateZ(0) translateX(size(130)) rotateZ(0) rotateY(-70deg) rotate(-90deg);
  }

  to {
    transform: rotateZ(360deg) translateX(size(130)) rotateZ(-360deg) rotateY(-70deg)
      rotate(-90deg);
  }
}

@keyframes move2 {
  from {
    transform: rotateZ(-60deg) translateX(size(130)) rotateZ(60deg) rotateY(-70deg)
      rotate(-90deg);
  }

  to {
    transform: rotateZ(300deg) translateX(size(130)) rotateZ(-300deg) rotateY(-70deg)
      rotate(-90deg);
  }
}

@keyframes move3 {
  from {
    transform: rotateZ(-120deg) translateX(size(130)) rotateZ(120deg) rotateY(-70deg)
      rotate(-90deg);
  }

  to {
    transform: rotateZ(240deg) translateX(size(130)) rotateZ(-240deg) rotateY(-70deg)
      rotate(-90deg);
  }
}

@keyframes move4 {
  from {
    transform: rotateZ(-180deg) translateX(size(130)) rotateZ(180deg) rotateY(-70deg)
      rotate(-90deg);
  }

  to {
    transform: rotateZ(180deg) translateX(size(130)) rotateZ(-180deg) rotateY(-70deg)
      rotate(-90deg);
  }
}

@keyframes move5 {
  from {
    transform: rotateZ(-240deg) translateX(size(130)) rotateZ(240deg) rotateY(-70deg)
      rotate(-90deg);
  }

  to {
    transform: rotateZ(120deg) translateX(size(130)) rotateZ(-120deg) rotateY(-70deg)
      rotate(-90deg);
  }
}

@keyframes move6 {
  from {
    transform: rotateZ(60deg) translateX(size(130)) rotateZ(-60deg) rotateY(-70deg)
      rotate(-90deg);
  }

  to {
    transform: rotateZ(420deg) translateX(size(130)) rotateZ(-420deg) rotateY(-70deg)
      rotate(-90deg);
  }
}
</style>
