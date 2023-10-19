<template>
  <div :class="`border-frame-container border-frame-fly-light ${direction}`">
    <i class="top"></i>
    <i class="bottom"></i>
    <div class="border-frame-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "BorderFrameFlyLight",
};
</script>

<script setup>
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
  border: 1px solid rgba(32, 254, 255, 0.3);
  overflow: hidden;
}

.border-frame-fly-light {
  &.left {
    &::before {
      animation: oneLeft 4s linear infinite;
    }

    .bottom {
      animation: twoLeft 4s linear 1s infinite;
    }

    &::after {
      animation: threeLeft 4s linear 2s infinite;
    }

    .top {
      animation: fourLeft 4s linear 3s infinite;
    }
  }

  &.right {
    &::before {
      animation: oneRight 4s linear infinite;
    }
    .top {
      animation: fourRight 4s linear 1s infinite;
    }

    &::after {
      animation: threeRight 4s linear 2s infinite;
    }

    .bottom {
      animation: twoRight 4s linear 3s infinite;
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

body {
  height: 100%;
  background-color: #0f222b;
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
