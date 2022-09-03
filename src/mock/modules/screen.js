import Mock from "mockjs";
import { handleMock, handleResponse } from "./../mock-handle.js";
import guangXiCityJson from "./../../assets/json/guangxi-city.json";

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
    name: "网站/应用开发",
  },
  {
    num: 31,
    name: "UI/平面设计",
  },
  {
    num: 18,
    name: "推广运营",
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
let weekData = getWeekData();

// 获取项目类别占比
const getProjectTypePercentData = () => {
  let total = 0;

  for (let i = 0; i < projectType.length; i++) {
    total += projectType[i].num
  }

  return projectType.map(({ name, num }) => {
    return {
      name,
      percent: (num / total * 100).toFixed(2)
    }
  })
}
let projectTypePercentData = getProjectTypePercentData();

// 获取地市数据
const getCityData = () => {
  // console.log(guangXiCityJson);

  return guangXiCityJson.map(({ name, coordinate }) => {
    return {
      name,
      coordinate,
      companines: Math.floor(Math.random() * 150 + 50),
      users: Math.floor(Math.random() * 3000 + 1000)
    }
  })
}

let cityData = getCityData();

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
            projectTypePercentData,
            cityData
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
