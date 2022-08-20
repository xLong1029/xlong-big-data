import { handleMock, handleResponse } from "./../mock-handle.js";
import { deepClone } from "./../../utils";
import Mock from "mockjs";
const Random = Mock.Random;

export default [
  {
    url: "/api/screen/data",
    method: "get",
    response: (config) =>
      handleMock(config, () => {

        console.log(config);
        
        return handleResponse(200, "success", {});
      }),
  },
];
