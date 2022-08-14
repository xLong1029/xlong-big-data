/*
 * 模块 : 大屏页面视图
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-01-07
 * 版本 : version 1.0
 */

import { ref, reactive, markRaw } from "vue";

export default function() {
    // 是否加载完毕
    const isLoaded = ref(false);
    // 视图
    const views = reactive({});
    // 默认取PC视图组件，为了保留加载效果
    const viewActive = ref("pc");

    /**
     * 根据屏幕尺寸变化显示视图
     */
    const setViews = () => {
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;

        if (width > 1024) {
            // 超宽屏大于 21：9
            if (width / height >= 21 / 9) {
                viewActive.value = "wideScreen";
            } else {
                viewActive.value = "pc";
            }
        } else {
            viewActive.value = "mobile";
        }

        return { width, height };
    };

    /**
     * 初始化视图
     *
     * @param { Component } PCView PC
     * @param { Component } WideScreenView 超宽屏
     * @param { Component } MobileView 数值
     */
    const initViews = (PCView, WideScreenView, MobileView) => {
        views.pc = PCView ? markRaw(PCView) : null;
        views.wideScreen = WideScreenView ? markRaw(WideScreenView) : null;
        views.mobile = MobileView ? markRaw(MobileView) : null;
        return true;
    };

    return {
        isLoaded,
        views,
        viewActive,
        initViews,
        setViews
    };
}