<template>
    <div class="rate-change-container" :class="{'up': num > 0, 'down': num < 0}">
    <span class="rate-change__symbol">
      <svg v-if="num !== 0" class="icon" viewBox="0 0 1024 1024">
        <path
          d="M470.016 976.896q-44.032 0-59.392-20.48t-15.36-65.536q0-20.48-0.512-64.512t-1.024-93.696-1.536-96.768-1.024-74.752q0-39.936-7.68-62.464t-35.328-21.504q-20.48 0-48.64-1.024t-49.664 0q-35.84 0-45.568-19.456t13.824-50.176q24.576-30.72 57.344-72.704t67.584-86.016 68.096-87.04 58.88-75.776q23.552-29.696 45.568-30.72t46.592 26.624q24.576 29.696 56.832 69.632t67.072 82.432 68.608 83.968 60.416 73.216q29.696 35.84 23.04 58.88t-43.52 23.04q-11.264 0-25.088 0.512t-29.184 1.024-30.208 1.024-27.136 0.512q-25.6 1.024-32.256 16.384t-5.632 41.984q0 29.696 0.512 77.824t1.024 100.352 1.536 101.376 1.024 79.872q0 13.312-2.048 27.648t-9.728 26.112-21.504 19.968-36.352 8.192q-27.648 0-52.736 0.512t-56.832 1.536z"
          p-id="6020"
        ></path>
      </svg>
    </span>
    <span class="rate-change__num"> {{ Math.abs(num) }}% </span>
  </div>
</template>

<script setup name="RateChange">
const props = defineProps({
  // 数值
  num: {
    type: Number,
    default: 0,
  },
});
</script>
<style lang="scss" scoped>
.rate-change {
  &-container {
    font-size: size(28);
    font-weight: bold;
    display: flex;
    align-items: center;
    color: #23f2f0;

    &.down {
      color: color(red);

      .icon {
        fill: color(red);        
        transform: rotate(180deg);
      }
    }

    &.up {
      color: #1fff83;

      .icon {
        fill: #1fff83;
      }
    }
  }

  &__symbol {
    font-size: size(18);
    margin-right: size(3);
    margin-top: size(5);
  }

  &__num {
  }
}

.icon {
  width: size(18);
  height: size(18);
}
</style>
