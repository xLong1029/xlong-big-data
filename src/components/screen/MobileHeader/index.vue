<template>
  <div class="screen-header-container">
    <div class="title">{{ sysTitle }}</div>
  </div>
</template>

<script setup>
import hooks from "@/hooks";

const { useCommon } = hooks;
const { sysTitle } = useCommon();
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";
@font-face {
  font-family: PangMenZhengDaoBiaoTiTi;
  src: url("./../../../assets/font/PangMenZhengDaoBiaoTiTi.ttf");
}

.screen-header {
  &-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    color: color(white);
    text-align: center;
    width: 100%;
    height: size(40);
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-image: url("./../../../assets/images/top-bg.png");
    background-position: center top;
    display: flex;
    justify-content: space-between;
    padding-top: size(10);
    text-align: center;

    .title {
      @include gradient-font(bottom, color(blue), color(white));

      width: 100%;
      font-family: "PangMenZhengDaoBiaoTiTi";
      font-weight: normal;
      font-size: size(22);
      letter-spacing: size(2);
      line-height: size(17);
    }
  }
}

@media screen and (max-width: 640px) {
  .screen-header {
    &-container {
      background-image: url("./../../../assets/images/mobile-top-bg.png");
      background-size: 100% 100%;

      .title {
        line-height: size(28);
        font-size: size(18);
        margin-top: size(-6);
      }
    }
  }
}

@media screen and (max-width: 560px) {
  .screen-header {
    &-container {
      .title {
        
        font-size: size(18);
        margin-top: size(-6);
      }
    }
  }
}
</style>
