<template>
  <div class="border-frame-container border-frame-2">
    <svg class="border-svg-container border-svg-top-left" width="0" height="0">
      <polyline class="stroke-width2" points="0, 34 0, 0 34, 0"></polyline>
      <polyline class="stroke-width5" points="-18, 0 0, 0 0, 18"></polyline>
      <polyline class="stroke-width5" points="0, -18 0, 0 18, 0"></polyline>
    </svg>
    <svg class="border-svg-container border-svg-top-right" width="0" height="0">
      <polyline class="stroke-width2" points="0, 34 0, 0 34, 0"></polyline>
      <polyline class="stroke-width5" points="-18, 0 0, 0 0, 18"></polyline>
      <polyline class="stroke-width5" points="0, -18 0, 0 18, 0"></polyline>
    </svg>
    <svg class="border-svg-container border-svg-bottom-left" width="0" height="0">
      <polyline class="stroke-width2" points="0, 34 0, 0 34, 0"></polyline>
      <polyline class="stroke-width5" points="-18, 0 0, 0 0, 18"></polyline>
      <polyline class="stroke-width5" points="0, -18 0, 0 18, 0"></polyline>
    </svg>
    <svg class="border-svg-container border-svg-bottom-right" width="0" height="0">
      <polyline class="stroke-width2" points="0, 34 0, 0 34, 0"></polyline>
      <polyline class="stroke-width5" points="-18, 0 0, 0 0, 18"></polyline>
      <polyline class="stroke-width5" points="0, -18 0, 0 18, 0"></polyline>
    </svg>
    <div class="border-frame-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineOptions(
  {
    name: "BorderFrameTwo"
  }
);
</script>

<style lang="scss" scoped>
.border-frame-container {
  position: relative;
  z-index: 10;
  width: 100%;
  border: size(1) solid transparent;
  border-image: linear-gradient(#0b64ad, #0a345c) 20 20;
  box-shadow: rgba(69, 112, 144, 0.3) 0px 0px size(34) inset;

  height: 100%;
}

.border-svg-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.border-svg-top-left {
  top: size(-1);
  left: size(-1);
}

.border-svg-top-right {
  top: size(-1);
  right: size(-1);
  transform: scaleX(-1);
}

.border-svg-bottom-left {
  bottom: size(-1);
  left: size(-1);
  transform: scaleY(-1);
}

.border-svg-bottom-right {
  bottom: size(-1);
  right: size(-1);
  transform: rotate(180deg);
}

.border-svg-container .stroke-width2 {
  stroke-width: size(2);
  stroke: #3d93d9;
}

.border-svg-container .stroke-width5 {
  stroke-width: size(5);
  stroke: #369bed;
}

.border-svg-container > polyline {
  fill: none;
  stroke-width: 1;
}

.border-frame-content {
  height: 100%;
  position: relative;
  z-index: 1;
}
</style>
