<template>
  <div :id="id"></div>
</template>

<script>
export default {
  name: "Particles",
};
</script>

<script setup>
import { watch, onMounted } from "vue";
import particles from "./particles.js";
import defaultParticlesConfig from "./particlesConfig.js";

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
@import "@/styles/screen-mixin.scss";
@font-face {
  font-family: ShiShangZhongHeiJianTi;
  src: url("./../../../assets/font/ShiShangZhongHeiJianTi.ttf");
}

.line-title-container {
  width: 100%;
  height: size(30);
  line-height: size(30);
  display: flex;

  &::before {
    content: "";
    display: block;
    width: size(3);
    height: 100%;
    background: color(blue);
  }

  .title {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: size(3);

    h2 {
      color: #45f3fd;
      font-family: "ShiShangZhongHeiJianTi";
      font-weight: 500;
      font-size: size(22);
      margin-left: size(5);
      letter-spacing: size(1);
      margin-bottom: 0;
      margin-top: 0;
    }

    background-image: linear-gradient(
      270deg,
      rgba(31, 76, 162, 0) 0%,
      rgba(31, 76, 162, 0.6) 100%
    );
  }

  .text {
    display: flex;
    align-items: center;
  }
}

@media screen and (max-width: 768px) {
  .line-title-container {
    .title {
      h2 {
        font-size: size(18);
      }
    }
  }
}
</style>
