# xlong-big-data

## 介绍


* 该项目仅作学习参考，请勿商用

## 项目展示

> DEMO地址：https://xlong1029.github.io/xlong-map-admin/

## 项目说明

#### 1. 前后端分离开发模式

- **前端**：Vite + Vue3
- **后端**：Mock.js模拟请求

#### 2. 项目用到技术、框架与插件

[Vue3](https://v3.vuejs.org/)<br/>
[Vite](https://cn.vitejs.dev/)<br/>
[Mockjs](http://mockjs.com/)<br/>
[Element Plus](https://github.com/element-plus)<br/>

## 部分项目运行截图


## 目录结构

```
│  .env.development // 开发环境配置
│  .env.production // 生产环境配置
│  .env.release // release环境配置
│  .gitignore
│  package.json
│  vite.config.js // 配置文件
│  README.md
│  index.html // 入口文件
│
├─pubilc
│   favicon.ico // 图标
│
├─src
│  │  main.js // 项目入口js
│  │  permission.js // 路由权限配置
│  │  settings.js // 设置文件
│  │  App.vue // 根组件
│  │
│  ├─assets // 资源目录，这里的资源会被wabpack构建
│  ├─api // api接口文件
│  ├─store  // 应用级数据（state）
│  ├─styles  // 样式
│  │
│  ├─mock // 模拟请求数据
│  │  │  index.js
│  │  │  mock-handle.js // 数据处理
│  │  │  mock-server.js // 正式环境使用配置
│  │  │
│  │  └─modules
│  │
│  ├─config // 项目配置
│  │    index.js
│  │
│  ├─components // 组件
│  │  │
│  │  ├─common // 通用组件
│  │  │
│  │  ├─screen // 大屏组件
│  │  │
│  │  └─charts // 图表组件
│  │
│  ├─views // 视图
│  │  │
│  │  ├─home // 首页
│  │  ├─adpt-multi-device // 多设备自适应示例
│  │  ├─adpt-scale // 自适应缩放示例
│  │  └─test // 保留的测试页面
│  │
│  ├─utils // 通用工具函数
│  │    index.js
│  │    auth.js // 读写token
│  │    calendar.js // 日历
│  │
│  └─router  // 路由配置
│     │  index.js
│     │
│     └─modules // 分模块的动态路由
│
└─static // 静态资源
```

## 本地运行
1. 安装依赖
> npm install
2. 运行项目
> npm run dev
3. 访问地址：http://localhost:8686

## 作者联系方式

QQ：381612175
TEL: 18376686974

github：https://github.com/xLong1029/

站酷主页：http://xlong.zcool.com.cn/

UI 中国：http://i.ui.cn/ucenter/358591.html

- 此项目做学习 Vue3 + Vite 测试使用，ArcGis 我只是外行