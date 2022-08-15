<template>
  <div class="pc-container">
    <transition mode="out-in" name="fade">
      <component :is="components[activeNavIndex]" />
    </transition>
  </div>
</template>

<script setup>
import { inject } from "vue";
import ExampleOne from "./example-one/index.vue";
import ExampleTwo from "./example-two/index.vue";

const activeNavIndex = inject("getActiveNavIndex");
const components = [ExampleOne, ExampleTwo];
</script>

<style lang="scss" scoped>
.pc-container {
  padding: size(15);
  height: 100%;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
