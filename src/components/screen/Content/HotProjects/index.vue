<template>
  <BorderFrameOne>
    <BorderFrameFlyLight>
      <FlexContent>
    <BorderFrameTitleFour title="热门项目" />
    <div class="content">
      <DataLoading :loading="apiLoading" :data="tags">
        <div ref="contentRef" class="tag-content">
          <div
            v-if="contentEle && contentEle.length"
            class="word-cloud__wrapper"
            :style="{ width: `${width}px`, height: `${height}px` }"
          >
            <div
              v-for="(item, index) in tags"
              :key="'tag' + index"
              class="word-cloud__tag"
              :style="{
                backgroundSize: '100% 100%',
                opacity: contentEle[index].style.opacity,
                transform: contentEle[index].style.transform,
                zIndex: contentEle[index].style.zIndex,
              }"
              @mousemove="handleMouseMove"
              @mouseout="handleMouseOut"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </DataLoading>
    </div>
  </FlexContent>
    </BorderFrameFlyLight>
  </BorderFrameOne>
</template>

<script setup>
import { ref, nextTick, watch } from "vue";
import { clearTimer } from "@/utils";
import hooks from "@/hooks";

const { useScreenModuleData } = hooks;

const isFirst = ref(true);

const tags = ref([]);
const direction = ref(-1); // -1 横向顺时针, 1 横向逆时针, -2 纵向顺时针, 2 纵向逆时针
const width = ref(0);
const height = ref(0);
const contentEle = ref([]);
const speed = ref(800); // 越小越快
const duration = ref(100);
const timer = ref(null);
const contentRef = ref();

const init = (data) => {
  width.value = contentRef.value?.clientWidth ?? 0;
  height.value = contentRef.value?.clientHeight ?? 0;

  const RADIUSX = width.value / 2;
  const RADIUSY = (height.value - 20) / 2;

  contentEle.value = data.map((e, i) => {
    const k = -1 + (2 * (i + 1) - 1) / data.length;
    const a = Math.acos(k);
    const b = a * Math.sqrt(data.length * Math.PI);
    const x = RADIUSX * Math.sin(a) * Math.cos(b);
    const y = RADIUSY * Math.sin(a) * Math.sin(b);
    const z = RADIUSX * Math.cos(a);

    return { x, y, z, style: {} };
  });
};

const animate = () => {
  rotateX();
  rotateY();
  move();
};

const runTags = (duration) => {
  clearTimer([timer.value]);

  animate();

  timer.value = setInterval(() => {
    animate();
  }, duration);
};

const rotateX = () => {
  const angleX = [-1, 1].includes(direction.value)
    ? Math.PI / Infinity
    : Math.PI / ((Number(direction.value) / 2) * Number(speed.value));
  const cos = Math.cos(angleX);
  const sin = Math.sin(angleX);
  contentEle.value = contentEle.value.map((t) => {
    const y1 = t.y * cos - t.z * sin;
    const z1 = t.z * cos + t.y * sin;

    return {
      ...t,
      y: y1,
      z: z1,
    };
  });
};

const rotateY = () => {
  const angleY = [-2, 2].includes(direction.value)
    ? Math.PI / Infinity
    : Math.PI / (Number(direction.value) * Number(speed.value));

  const cos = Math.cos(angleY);
  const sin = Math.sin(angleY);

  contentEle.value = contentEle.value.map((t) => {
    const x1 = t.x * cos - t.z * sin;
    const z1 = t.z * cos + t.x * sin;
    return {
      ...t,
      x: x1,
      z: z1,
    };
  });
};

const move = () => {
  const CX = width.value / 2;
  const CY = height.value / 2;

  contentEle.value = contentEle.value.map((singleEle) => {
    const { x, y, z } = singleEle;
    const fallLength = width.value * 1.3;
    const RADIUS = width.value / 2;
    const scale = fallLength / (fallLength - z);
    const alpha = (z + RADIUS) / (2 * RADIUS);
    const left = `${x + CX - 15}px`;
    const top = `${y + CY - 15}px`;
    const transform = `translate(${left}, ${top}) scale(${scale})`;
    const style = {
      ...singleEle.style,
      opacity: alpha + 0.5,
      zIndex: parseInt(scale * 100, 10),
      transform,
    };

    return {
      x,
      y,
      z,
      style,
    };
  });
};

const handleMouseMove = (e) => {
  clearTimer([timer.value]);
};

const handleMouseOut = (e) => {
  runTags(duration.value);
};

const startCloud = () => {
  nextTick(() => {
    init(tags.value);
    runTags(duration.value);
  });
};

const handleApiData = (data) => {
  tags.value = data?.hotProjectData || [];
};

const { apiLoading, contrastRatio } = useScreenModuleData(handleApiData);

watch(
  () => apiLoading.value,
  (val) => {
    if (!val && isFirst.value) {
      isFirst.value = false;
      startCloud();
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => contrastRatio.value,
  () => {
    contentEle.value = [];
    startCloud();
  }
);
</script>

<style lang="scss" scoped>
.tag-content {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>

<style lang="scss">
.word-cloud__tag {
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
  color: #ffffff;
  text-decoration: none;
  font-size: size(14);
  cursor: pointer;
  padding: size(5) size(20);
  border: size(1) solid transparent;
  border-radius: size(30);
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(#011432c2, #011a38),
    linear-gradient(#42cdff, #1fff8396);

  &:hover {
    color: color(yellow);
  }
}
</style>
