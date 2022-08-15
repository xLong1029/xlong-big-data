<template>
  <transition mode="out-in" name="fade">
    <component :is="components[activeNavIndex]" />
  </transition>
</template>

<script setup>
import { inject } from "vue";
import ExampleOne from "./example-one/index.vue";
import ExampleTwo from "./example-two/index.vue";

const activeNavIndex = inject("getActiveNavIndex");
const components = [ExampleOne, ExampleTwo];
</script>

<style lang="scss" scoped>
</style>
