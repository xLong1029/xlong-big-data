<template>
  <div :id="id"></div>
</template>

<script setup>
import { watch, onMounted } from "vue";
import particles from "./particles.js";
import defaultParticlesConfig from "./particlesConfig.js";

defineOptions(
  {
    name: "Particles"
  }
);

const props = defineProps({
  id: {
    required: true,
    type: String,
    default: "particlesId"
  },
  config: {
    type: Object,
    default: () => defaultParticlesConfig,
  },
});

watch(
  () => props.config,
  (val) => {
    particles(props.id, { ...defaultParticlesConfig, ...val });
  }
);

onMounted(() => {
  particles(props.id, { ...defaultParticlesConfig, ...props.config });
})
</script>

<style lang="scss" scoped>
</style>
