# xlong-big-data

数据监控大屏基础框架，一套框架适应多端平台（移动端、PC端和超宽屏幕设备）

## 项目截图


## 目录结构

```
│  .browserslistrc
│  .env.development // 开发环境配置
│  .env.production // 生产环境配置
│  .env.release // release正式库环境配置
│  .eslintrc.js
│  .gitignore
│  babel.config.js // babel配置
│  package.json
│  vue.config.js // vue配置文件
│  README.md
│
├─src
│  │  main.js // 项目入口js
│  │  element-plus.js // element-plus按需引入
│  │  setting.js // 项目配置
│  │  App.vue // 根组件
│  │
│  ├─assets // 资源目录，这里的资源会被wabpack构建
│  │
│  ├─api // api接口文件
│  │
│  ├─store  // 应用级数据（state）
│  │  │
│  │  └─modules // 分模块
│  │
│  ├─styles  // 样式
│  │
│  ├─mock // json数据
│  │
│  ├─hooks // 方法钩子
│  │
│  ├─components // 功能组件
│  │
│  ├─views // 视图
│  │
│  ├─utils // 通用工具函数
│  │    index.js
│  │
│  └─router  // 路由配置
│     index.js
│
└─pubilc
   │ favicon.ico // 图标
   │ index.html // 首页入口文件
   │  
   └─static // 静态资源，不会被wabpack构建
```

## 本地运行
1. 安装前台依赖
> npm install
2. 运行前台项目
> npm run serve
3. 访问地址：http://localhost:8686

## 项目打包
1. 测试版本
> npm run build:test 
2. 正式版本
> npm run build:release