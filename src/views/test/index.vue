<template>
  <div class="test-container">
    <!-- 测试页面 -->
    <div class="box">
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
// .test-container {
//   box-sizing: border-box;
//   min-height: 100vh;
//   padding: 20px;
//   text-align: center;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 20px;
// }

.box{
 display: flex;
width: 100vw;
height: 100vh;

}

.top{
 width: 300px;
height: 100%;

}

.bottom{
  flex:1;
  height: 100%;;
}
</style>
