import { defineStore } from "pinia";

const useScreenStore = defineStore("screen", {
  state: () => ({
    // 当前模式：AdptMultiDevice 多设备自适应 | Normal 正常
    mode: "Normal"
  }),
  getters: {
    screenMode(){
      return this.mode
    }
  },
  actions: {
    setScreenMode(mode) {
      this.mode = mode;

      // 设置单位
      const element = document.getElementsByTagName("html")[0];
      if (mode === "AdptMultiDevice") {
        element.style.setProperty("--app-base-unit", "0.01rem"); // 对应根字体大小为100px
      } else {
        element.style.setProperty("--app-base-unit", "1px");
      }
    }
  }
})

export default useScreenStore;