<template>
  <div class="statistics-data" :class="`statistics-data-${direction}`">
    <div class="statistics-data__value">
      <slot name="value">
        <span :style="`color: ${valueColor}`">{{ value }}</span>
      </slot>
    </div>
    <div class="statistics-data__name">
      <slot name="name">
        <span :style="`color: ${nameColor}`">{{ name }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: "left", // left || right
  },
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

.statistics-data {
  top: size(20);
  display: flex;
  flex-direction: column;

  &-left {
    @include background-setting(
      "./../../../assets/images/border-left.png",
      size(232),
      size(198)
    );

    padding: size(1) size(30) size(115) size(15);
  }

  &-right {
    @include background-setting(
      "./../../../assets/images/border-right.png",
      size(232),
      size(198)
    );

    padding: size(1) size(15) size(115) size(35);
  }

  &__value {
    display: flex;
    align-items: center;
    justify-content: center;
    height: size(48);
    font-size: size(27);
    font-weight: bold;
  }

  &__name {
    display: flex;
    align-items: center;
    justify-content: center;
    height: size(32);
  }
}
</style>
