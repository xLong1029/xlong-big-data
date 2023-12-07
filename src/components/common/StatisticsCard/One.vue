<template>
  <div class="statistics-card-container statistics-card-1">
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
    name: "StatisticsCardOne"
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
$border: 2px solid #279cd1;

.statistics-card-container {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  // border: 1px solid #0851ad;
  background: rgba(48, 94, 141, 0.25);
  padding: size(8) size(10);

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: size(10);
    height: size(10);
  }

  &::before {
    left: size(-1);
    top: size(-1);

    border-left: $border;
    border-top: $border;
  }

  &::after {
    right: size(-1);
    bottom: size(-1);

    border-right: $border;
    border-bottom: $border;
  }
}

.statistics-card-content {
  width: 100%;
  height: 100%;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: size(10);
    height: size(10);
  }

  &::before {
    right: size(-1);
    top: size(-1);

    border-right: $border;
    border-top: $border;
  }

  &::after {
    left: size(-1);
    bottom: size(-1);

    border-left: $border;
    border-bottom: $border;
  }
}

.statistics-card {
  display: flex;
  flex-direction: column;
  padding: size(10);
  align-items: center;
  justify-content: center;

  &__value {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: size(30);
    font-weight: bold;
  }

  &__name {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: size(16);
    margin-top: size(10);
  }
}
</style>
