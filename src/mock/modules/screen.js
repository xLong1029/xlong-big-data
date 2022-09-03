import { handleMock, handleResponse } from "./../mock-handle.js";
import { deepClone } from "./../../utils";
import calendar from "./../../utils/calendar";
import Mock from "mockjs";
const Random = Mock.Random;

let statisticsData = {
  serviceCompanines: 3004,
  serviceUsers: 60293,
  developApps: 55,
  monitorServers: 10
}

let projectType = [
  {
    num: 55,
    name: "研发项目",
  },
  {
    num: 26,
    name: "设计项目",
  },
  {
    num: 18,
    name: "其他项目",
  },
]

// 获取星期数据
const getWeekData = () => {
  const now = new Date();
  const currentWeek = now.getDay();

  const weekday = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日"
  ];

  return weekday.map((name, i) => {
    const obj = {
      mobile: i <= currentWeek ? Math.floor(Math.random() * 2000 + 500) : 0,
      pc: i <= currentWeek ? Math.floor(Math.random() * 5000 + 1000) : 0
    }
    return {
      name,
      ...obj
    }
  })
}
const weekData = getWeekData();

// 获取项目类别占比
const getProjectTypePercentData = () => {
  let total = 0;

  for (let i = 0; i < projectType.length; i++) {
    console.log(111, projectType[i]);
    total += projectType[i].num
  }

  return projectType.map(({ name, num }) => {
    return {
      name,
      percent: (num / total * 100).toFixed(2)
    }
  })
}
const projectTypePercentData = getProjectTypePercentData();

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
          statisticsData.serviceCompanines += [1, 2, 3][Math.floor(Math.random() * 3)];
          statisticsData.serviceUsers += [1, 2, 3][Math.floor(Math.random() * 3)];

          return handleResponse(200, "success", {
            statisticsData,
            weekData,
            projectTypePercentData
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
