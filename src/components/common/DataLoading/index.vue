<template>
  <div
    class="data-loading-container"
    v-loading="loading"
    :element-loading-text="loadingText"
  >
    <slot v-if="checkData(data)" name="content"></slot>
    <slot v-else name="empty">
      <el-empty :description="emptyDescription" />
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: "加载中...",
  },
  data: {
    type: [Object, Array],
    default: () => null,
  },
  emptyDescription: {
    type: String,
    default: "暂无数据",
  },
});

const checkData = (data) => {
  if (data) {
    if (data.constructor == Array) return data.length;
    else if (data.constructor == Object) return true;
  }

  return false;
};
</script>

<style lang="scss" scoped>
.data-loading-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
