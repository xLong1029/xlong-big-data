<template>
  <div class="screen-nav-container">
    <div class="screen-nav__left" :class="{ 'is-active': active === 0 }">
      <span class="nav-text" @click="emit('change-nav', 0)">导航一</span>
    </div>
    <div class="screen-nav__right" :class="{ 'is-active': active === 1 }">
      <span class="nav-text" @click="emit('change-nav', 1)">导航二</span>
    </div>
  </div>
</template>

<script setup>
import hooks from "@/hooks";

// eslint-disable-next-line
const props = defineProps({
  active: {
    type: Number,
    default: 0,
  },
});

// eslint-disable-next-line
const emit = defineEmits(["change-nav"]);

const { useCommon } = hooks;
const { sysTitle } = useCommon();
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";

.screen-nav {
  &-container {
    position: fixed;
    bottom: size(2);
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 999;
    color: color(white);
    width: 60%;
    height: size(40);
    display: flex;
    justify-content: center;

    .nav-text {
      @include gradient-font(bottom, color(blue), color(white));
      font-weight: bold;
      font-size: size(22);
      cursor: pointer;
      padding: size(2) 10%;

      &:hover {
        @include gradient-font(bottom, color(yellow), color(white));
      }
    }
  }

  &__left,
  &__right {
    image-rendering: -webkit-optimize-contrast;

    &.is-active {
      .nav-text {
        @include gradient-font(bottom, color(white), color(white));
      }
    }
  }

  &__left {
    @include background-setting(
      "./../../../assets/images/nav-left-bg.png",
      50%,
      100%
    );
    background-position: right bottom;
    text-align: right;
    padding-right: 1%;

    &.is-active {
      background-image: url("./../../../assets/images/nav-left-active-bg.png");
    }
  }

  &__right {
    @include background-setting(
      "./../../../assets/images/nav-right-bg.png",
      50%,
      100%
    );
    background-position: left bottom;
    text-align: left;
    padding-left: 1%;

    &.is-active {
      background-image: url("./../../../assets/images/nav-right-active-bg.png");
    }
  }
}

@media screen and (max-width: 1366px) {
  .screen-nav {
    &-container{
      width: 80%;
    }
  }
}

@media screen and (max-width: 1024px) {
  .screen-nav {
    &-container{
      width: 100%;

      .nav-text{
        font-size: size(14);
        line-height: size(30);
        padding: size(2) 15%;
      }
    }

    &__left,
    &__right {
      background-size: 120% 100%;
    }
  }
}

@media screen and (max-width: 768px) {
  .screen-nav {
    &__left,
    &__right {
      background-size: 120% 100%;
    }
  }
}

@media screen and (max-width: 640px) {
}

@media screen and (max-width: 560px) {
  .screen-nav {
    &__left,
    &__right {
      background-size: 140% 100%;
    }
  }
}

@media screen and (max-width: 414px) {
  .screen-nav {
    &__left,
    &__right {
      background-size: 160% 100%;
    }
  }
}

@media screen and (max-width: 375px) {
}
</style>
