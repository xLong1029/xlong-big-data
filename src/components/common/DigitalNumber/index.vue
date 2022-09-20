<template>
  <div v-if="numbers && numbers.length" class="digital-number">
    <div
      v-for="(item, index) in numbers"
      :key="'number' + index"
      class="digital-number-item"
    >
      <CountUp :delay="countUpOption.delay" :endVal="item" :options="countUpOption" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import hooks from "@/hooks";

const { useCountUp } = hooks;
const { CountUp, countUpOption } = useCountUp();

const props = defineProps({
  data: {
    type: [String, Number],
    default: "0",
  },
});

const numbers = ref([]);

watch(
  () => props.data,
  (val) => {
    numbers.value = val?.toString().split("") || [];
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
@font-face {
  font-family: Lets-go-Digital;
  src: url("./../../../assets/font/Lets-go-Digital.ttf");
}

.digital-number {
  display: flex;
  justify-content: center;

  &-item {
    font-family: "Lets-go-Digital";
    font-size: size(32);
    width: size(40);
    height: size(50);
    background: #0a498f;
    border: size(1) solid #54bcbc;
    border-radius: size(4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00ffff;

    & + & {
      margin-left: size(12);
    }
  }
}
</style>
