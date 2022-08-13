import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import mocks from "./index.js";

export function setupProdMockServer() {
    createProdMockServer([...mocks]);
}