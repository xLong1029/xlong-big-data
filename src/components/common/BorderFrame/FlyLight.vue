<template>
  <div :class="`border-frame-container border-frame-fly-light ${direction}`">
    <i class="top"></i>
    <i class="bottom"></i>
    <div class="border-frame-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineOptions(
  {
    name: "BorderFrameFlyLight"
  }
);

const props = defineProps({
  direction: {
    type: String,
    default: "right", // left || right
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/screen-mixin.scss";
.border-frame-container {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  // border: 1px solid rgba(32, 254, 255, 0.3);
  overflow: hidden;
}

.border-frame-fly-light {
  &.left {
    &::before {
      animation: oneLeft 8s linear infinite;
    }

    .bottom {
      animation: twoLeft 8s linear 2s infinite;
    }

    &::after {
      animation: threeLeft 8s linear 4s infinite;
    }

    .top {
      animation: fourLeft 8s linear 6s infinite;
    }
  }

  &.right {
    &::before {
      animation: oneRight 8s linear infinite;
    }
    .top {
      animation: fourRight 8s linear 2s infinite;
    }

    &::after {
      animation: threeRight 8s linear 4s infinite;
    }

    .bottom {
      animation: twoRight 8s linear 6s infinite;
    }
  }

  &::before {
    content: " ";
    position: absolute;
    width: 1px;
    height: 100%;
    top: -100%;
    left: 0;
    background-image: linear-gradient(0deg, transparent, #03e9f4, transparent);
  }

  &::after {
    content: " ";
    position: absolute;
    width: 1px;
    height: 100%;
    bottom: -100%;
    right: 0;
    background-image: linear-gradient(360deg, transparent, #03e9f4, transparent);
  }

  .top,
  .bottom {
    position: absolute;
    display: inline-block;
    height: 1px;
    width: 100%;
  }

  .top {
    top: 0;
    right: -100%;
    background-image: linear-gradient(270deg, transparent, #03e9f4, transparent);
  }

  .bottom {
    bottom: 0;
    left: -100%;
    background-image: linear-gradient(270deg, transparent, #03e9f4, transparent);
  }
}

.border-frame-content{
  // padding: size(15);
  position: relative;
  z-index: 1;
  height: 100%;
}

@keyframes oneLeft {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

@keyframes twoLeft {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

@keyframes threeLeft {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}

@keyframes fourLeft {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

@keyframes oneRight {
  0% {
    top: 100%;
  }
  50%,
  100% {
    top: -100%;
  }
}

@keyframes twoRight {
  0% {
    left: 100%;
  }
  50%,
  100% {
    left: -100%;
  }
}

@keyframes threeRight {
  0% {
    bottom: 100%;
  }
  50%,
  100% {
    bottom: -100%;
  }
}

@keyframes fourRight {
  0% {
    right: 100%;
  }
  50%,
  100% {
    right: -100%;
  }
}
</style>
