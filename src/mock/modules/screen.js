import { handleMock, handleResponse } from "./../mock-handle.js";
import { deepClone } from "./../../utils";
import Mock from "mockjs";
const Random = Mock.Random;

export default [
  {
    url: "/api/screen/list",
    method: "get",
    response: (config) =>
      handleMock(config, () => {
        return handleResponse(200, "success", {});
      }),
  },
];
