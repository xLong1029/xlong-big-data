import Mock from "mockjs";
import { handleMock, handleResponse } from "./../mock-handle.js";
import guangXiCityJson from "./../../assets/json/guangxi-city.json";

const Random = Mock.Random;

let statisticsData = {
  serviceCompanines: Random.integer(3000, 3500),
  serviceUsers: Random.integer(6000, 6500),
  developApps: 55,
  monitorServers: 10,
};

let projectStatistics = [
  { value: 10, name: "智慧城市项目" },
  { value: 10, name: "小程序应用" },
  { value: 20, name: "企业网站" },
  { value: 5, name: "电商项目" },
  { value: 5, name: "App应用" },
  { value: 5, name: "H5场景应用" },
];

let projectType = [
  {
    num: Random.integer(50, 60),
    name: "网站/应用开发",
  },
  {
    num: Random.integer(25, 35),
    name: "UI/平面设计",
  },
  {
    num: Random.integer(15, 20),
    name: "推广运营",
  },
];

let companyType = [
  "国有企业",
  "外商投资企业",
  "集体企业",
  "股份制企业",
  "私营企业",
];

const weekday = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];

// 获取星期数据
const getWeekData = () => {
  let currentWeek = new Date().getDay() - 1;
  currentWeek = currentWeek < 0 ? 7 : currentWeek;

  return weekday.map((name, i) => {
    const obj = {
      mobile: i <= currentWeek ? Random.integer(500, 2500) : 0,
      pc: i <= currentWeek ? Random.integer(1000, 6000) : 0,
    };
    return {
      name,
      ...obj,
    };
  });
};
let weekData = getWeekData();

// 获取项目类别占比
const getProjectTypePercentData = () => {
  let total = 0;

  for (let i = 0; i < projectType.length; i++) {
    total += projectType[i].num;
  }

  return projectType.map(({ name, num }) => ({
    name,
    percent: ((num / total) * 100).toFixed(2),
  }));
};
let projectTypePercentData = getProjectTypePercentData();

// 获取地市数据
const getCityData = () => {
  return guangXiCityJson.map(({ name, coordinate }) => ({
    name,
    coordinate,
    companines: Random.integer(50, 200),
    users: Random.integer(1000, 4000),
  }));
};
let cityData = getCityData();

// 获取企业项目
const getCompanyProjectData = () => {
  return companyType.map((name) => {
    const web = Random.integer(10, 60);
    const cms = Random.integer(20, 30);
    const applets = Random.integer(15, 50);
    const design = Random.integer(15, 50);
    const all = web + cms + applets + design;

    return {
      name,
      web,
      cms,
      applets,
      design,
      all,
    };
  });
};
let companyProjectData = getCompanyProjectData();

// 获取服务企业数量
const getCompaninesData = () => {
  let average = statisticsData.serviceCompanines / companyType.length;
  let arr = [];
  let last = statisticsData.serviceCompanines;
  for (let i = 0; i < companyType.length; i++) {
    let num = Random.integer(
      Math.floor(average - 200),
      Math.floor(average + 200)
    );

    arr.push({
      name: companyType[i],
      num: i < companyType.length - 1 ? num : last,
    });

    last -= num;
  }
  return arr;
};
let companinesData = getCompaninesData();

export default [
  {
    url: "/api/screen/data",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        const { nav } = config.query;

        // 导航一
        if (nav == 0) {
          // 总数统计
          const serviceCompaninesChangeNum = [1, 2, 3][Random.integer(0, 2)];
          const serviceUsersChangeNum = [1, 2, 3][Random.integer(0, 2)];
          statisticsData.serviceCompanines += serviceCompaninesChangeNum;
          statisticsData.serviceUsers += serviceUsersChangeNum;

          // 各地市服务数据统计
          cityData[Random.integer(0, cityData.length - 1)].companines +=
            serviceCompaninesChangeNum;
          cityData[Random.integer(0, cityData.length - 1)].users +=
            serviceUsersChangeNum;

          return handleResponse(200, "success", {
            statisticsData,
            weekData,
            projectTypePercentData,
            cityData,
            companyProjectData,
            companinesData,
            projectStatistics
          });
        }

        // 导航二
        else if (nav == 1) {
          return handleResponse(200, "success", {
            weekData,
          });
        }
      }),
  },
];
