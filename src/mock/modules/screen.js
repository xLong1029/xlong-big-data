import Mock from "mockjs";
import { handleMock, handleResponse } from "./../mock-handle.js";
import guangxiCityJson from "./../../assets/json/guangxi-city.json";

const Random = Mock.Random;

let statisticsData = {
  serviceCompanines: Random.integer(3000, 3500),
  serviceUsers: Random.integer(60000, 65000),
  developApps: 55,
  monitorServers: 10,
  money: 131,
};

let countData = {
  coverCities: 13,
  normalApps: 55,
  vipUsers: statisticsData.serviceUsers - Random.integer(10000, 20000),
}

let projectDescription = [
  {
    title: "项目研发",
    desciption:
      "我们拥有顶尖的IT技术团队，拥有一套完善的技术标准和技术架构，可以为企业提供信息化支持和解决方案。可开发但不限于H5响应式网站、企业管理系统、小程序和门户网站。",
  },
  {
    title: "设计服务",
    desciption:
      "我们拥有专业的设计师，可以为您提供整站页面设计、App设计、平面广告图以及微信/QQ表情包等服务。",
  },
  {
    title: "项目申报",
    desciption:
      "我们拥有丰富的行业取到和项目申报经验，可以协助企业获得政府支持和关注，为企业发展添砖加瓦。可申请的项目资金包括但不限于科技资金、文化资金和创新资金等。",
  },
  {
    title: "推广运营",
    desciption:
      "我们拥有专业的运营团队，可以为您提供网站SEO、公众号图文托管维护、H5策划吸粉和用户运营等服务。",
  },
];

let projectStatisticsData = [
  { value: Random.integer(5, 10), name: "智慧城市项目" },
  { value: Random.integer(5, 10), name: "小程序应用" },
  { value: Random.integer(5, 20), name: "企业网站" },
  { value: Random.integer(1, 5), name: "电商项目" },
  { value: Random.integer(1, 5), name: "App应用" },
  { value: Random.integer(1, 5), name: "H5场景应用" },
];

let projects = [
  { name: "智慧灯杆", status: -1, type: "web" },
  { name: "智慧园区", status: 1, type: "web" },
  { name: "智慧物流", status: 1, type: "web" },
  { name: "扫码抗疫情", status: 1, type: "app" },
  { name: "在线开发票", status: 1, type: "web" },
  { name: "柳州乘车码", status: 1, type: "app" },
  { name: "医疗照护", status: -1, type: "web" },
  { name: "大数据驾驶舱", status: 1, type: "web" },
  { name: "OA办公", status: 1, type: "web" },
  { name: "项目申报", status: -1, type: "project" },
  { name: "H5邀请函", status: 1, type: "design" },
  { name: "微信表情包", status: 1, type: "design" },
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
  return guangxiCityJson.map(({ name, coordinate }) => ({
    name,
    coordinate,
    companines: Random.integer(50, 200),
    users: Random.integer(1000, 4000),
    visit: Random.integer(20, 100),
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
  const average = statisticsData.serviceCompanines / companyType.length;
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

// 获取项目使用情况
const getProjectUseData = () => {
  return projects.map((e) => ({
    ...e,
    users: Random.integer(
      Math.floor(statisticsData.serviceUsers / 2),
      Math.floor(statisticsData.serviceUsers)
    ),
    companines: Random.integer(
      Math.floor(statisticsData.serviceCompanines / 2),
      Math.floor(statisticsData.serviceCompanines)
    ),
  }));
};
let projectUseData = getProjectUseData();

// 获取热门项目
const getHotProjectData = () => {
  let data = projectUseData.sort(
    (a, b) => b.users + b.companines - (a.users + a.companines)
  );

  return data.slice(0, 8);
};
let hotProjectData = getHotProjectData();

// 获取监控项目数据
const getProjecttMonitorData = () => {
  return projectStatisticsData.map((e) => ({
    ...e,
    users: Random.integer(
      Math.floor(statisticsData.serviceUsers / 2),
      Math.floor(statisticsData.serviceUsers)
    ),
    companines: Random.integer(
      Math.floor(statisticsData.serviceCompanines / 2),
      Math.floor(statisticsData.serviceCompanines)
    ),
  }));
};
let projectMonitorData = getProjecttMonitorData();

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
          const serviceUsersChangeNum = Random.integer(50, 200);
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
            projectStatisticsData,
          });
        }

        // 导航二
        else if (nav == 1) {
          // 收益统计
          statisticsData.money += Random.integer(1, 5);

          // 正常运营应用数量统计
          const maintanApps = (projects.filter(e => e.status === -1)).length;
          countData.normalApps = statisticsData.developApps - maintanApps;

          const vipUsersChangeNum = [1, 2, 3][Random.integer(0, 2)];
          countData.vipUsers += vipUsersChangeNum;

          return handleResponse(200, "success", {
            money: statisticsData.money,
            projectDescription,
            weekData,
            hotProjectData,
            projectUseData,
            projectMonitorData,
            cityData,
            countData
          });
        }
      }),
  },
];
