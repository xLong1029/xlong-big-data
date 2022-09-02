import { handleMock, handleResponse } from "./../mock-handle.js";
import { deepClone } from "./../../utils";
import Mock from "mockjs";
const Random = Mock.Random;

let serviceCompanines = 3004;
let serviceUsers = 60293;
let developApps = 55;
let monitorServers = 10;

export default [
  {
    url: "/api/screen/data",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        const { nav } = config.query;

        // 导航一
        if (nav == 0) {

          // 模拟数据变化
          serviceCompanines += [1, 2, 3][Math.floor(Math.random()*3)];
          serviceUsers += [1, 2, 3][Math.floor(Math.random()*3)];

          return handleResponse(200, "success", {
            serviceCompanines,
            serviceUsers,
            developApps,
            monitorServers
          });
        }

        // 导航二
        else if (nav == 1) {
          return handleResponse(200, "success", {

          });
        }
      }),
  },
];
