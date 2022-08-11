"use strict";
const settings = require("./src/settings.js");
const path = require("path");

const title = settings.sysTitle;
const port = settings.webPort;

function resolve(dir) {
    return path.join(__dirname, dir);
}

// 获取打包文件
function getOutputDir() {
    let dir = "xLongBigDataScreen";

    switch (process.env.VUE_APP_ENV) {
        case "test":
            dir = "xLongBigDataScreenTest";
            break;
        case "release":
            dir = "xLongBigDataScreenRelease";
            break;
    }

    return dir;
}

// 相关配置请参考 https://cli.vuejs.org/config/
module.exports = {
    publicPath: "/",
    outputDir: getOutputDir(),
    assetsDir: "static",
    lintOnSave: process.env.NODE_ENV === "development",
    productionSourceMap: false,
    // 代理服务
    devServer: {
        port
    },
    configureWebpack: config => {
        // 修复因vue3更新导致Can‘t import the named export ‘bypassFilter‘ from non EcmaScript module报错问题
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto"
        });

        Object.assign(config.resolve, {
            // 定义别名和插件位置
            alias: {
                "@": resolve("src")
            }
        });
    },
    chainWebpack: config => {
        config.plugins.delete("preload");
        config.plugins.delete("prefetch");

        config.plugin("html").tap(args => {
            // 修改配置名称
            args[0].title = title;
            return args;
        });
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@use "@/styles/variables.scss" as *;@use "@/styles/screen.scss" as *;`,
            },
        },
    },
};