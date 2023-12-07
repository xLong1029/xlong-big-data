<template>
  <div class="statistics-card-container statistics-card-2">
    <div class="statistics-card-content statistics-card">
      <div class="statistics-card__value">
        <slot name="value">
          <span :style="`color: ${valueColor}`">{{ value }}</span>
        </slot>
      </div>
      <div class="statistics-card__name">
        <slot name="name">
          <span :style="`color: ${nameColor}`">{{ name }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions(
  {
    name: "StatisticsCardTwo"
  }
);

const props = defineProps({
  value: {
    type: [String, Number],
    default: "数值",
  },
  valueColor: {
    type: String,
    default: "#ffffff",
  },
  name: {
    type: String,
    default: "名称",
  },
  nameColor: {
    type: String,
    default: "#ffffff",
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";
.statistics-card-container {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;

  @include background-setting(
      "./../../../assets/images/frame-bg-1.png",
      100%,
      100%
    );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: size(15);
}

.statistics-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__value {
    font-size: size(28);
    font-weight: bold;
    z-index: 10;

    @include gradient-font(bottom, #0b90f5, #23f2f0);
  }

  &__name {
    font-size: size(16);
    margin-top: size(10);
  }
}
</style>
