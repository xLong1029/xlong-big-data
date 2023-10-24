<template>
  <div class="home-container">
    <h1>欢迎使用{{ sysTitle }}</h1>
    <p>请选择您要预览的示例</p>
    <div class="list-container mt-20">
      <div class="list-item">
        <div class="list-item__desc">
          <h3>多设备尺寸自适应</h3>
          <p>一套设计稿，根据平台（移动端、PC端和超宽屏幕设备）自适应展示对应内容</p>          
        </div>
        <div class="list-item__btn">
          <el-button type="primary" @click="toPage('/adpt-multi-device')">预览</el-button>
        </div>
      </div>
      <div class="list-item">
        <div class="list-item__desc">
          <h3>自适应缩放</h3>
          <p>固定设计稿，根据屏幕保持原来的高宽比进行自适应缩放，适合用于指定屏幕尺寸展示的情况</p>
          <!-- <p>（若设计稿为1920*1080px，PC端正常预览，若设计稿为16:9的宽屏模式，PC底部会出现滚动条，可进行滚动预览）</p> -->
        </div>
        <div class="list-item__btn">
          <el-button type="primary" @click="toPage('/adpt-scale')">预览</el-button>
        </div>
      </div>
      <div class="list-item">
        <div class="list-item__desc">
          <h3>组件示例</h3>
          <p>列出项目中部分常用的自定义组件，有空会更新...</p>          
        </div>
        <div class="list-item__btn">
          <el-button type="primary" @click="toPage('/components')">预览</el-button>
        </div>
      </div>
    </div>
    <div class="copyright">
        Copyright © {{ year }}
        <a class="link" target="blank" href="https://github.com/xLong1029">
          {{ copyrightCompany }}
        </a>
        All Rights Reserved.
      </div>
  </div>
</template>

<script setup>
import hooks from "@/hooks";
import { ref } from "vue";

const { useCommon, useDateTime } = hooks;

const { sysTitle, copyrightCompany, toPage } = useCommon();

const { getCurrentDateTime } = useDateTime();
const { gregorianYear } = getCurrentDateTime();

const year = ref(`${gregorianYear}-${gregorianYear + 1}`);
</script>

<style lang="scss" scoped>
.home-container {
  box-sizing: border-box;
  min-height: 100vh;
  padding: size(20);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.list-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: size(20);
  border: size(1) solid color(white);
  border-radius: size(4);
  margin-bottom: size(20);

  &__desc{
    text-align: left;
    margin-right: size(40);

    h3{
      margin: 0;
      color: color(blue);
    }
  }
}

.copyright {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 24px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);

  .link {
    color: color(white);
    &:hover{
      color: color(blue);
    }
  }
}
</style>
