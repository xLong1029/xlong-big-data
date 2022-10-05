// 不能使用import.meta.xxx
import screen from "./modules/screen.js";
import map from "./modules/map.js";
export default [...screen, ...map];