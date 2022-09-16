import Mock from "mockjs";
import { handleMock, handleResponse } from "./../mock-handle.js";
import guangxiCityJson from "./../../assets/json/guangxi-city.json";

const Random = Mock.Random;

// 获取地市数据
const getCoordinateData = () => {
  return guangxiCityJson.map(({ name, coordinate }) => ({
    name,
    value: coordinate,
  }));
};
let coordinateData = getCoordinateData();

// 获取地市数据
const getMapData = () => {
  return guangxiCityJson.map(({ name, coordinate }) => ({
    name,
    coordinate,
    visit: Random.integer(20, 100),
  }));
};
let mapData = getMapData();

export default [
  {
    url: "/api/map/data",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        let changeMapIndex = Random.integer(0, mapData.length - 1);
        mapData[changeMapIndex].visit += Random.integer(1, 10);

        return handleResponse(200, "success", {
          coordinateData,
          mapData,
          changeMapObj: mapData[changeMapIndex]
        });
      }),
  },
];
