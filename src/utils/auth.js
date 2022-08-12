import { setLocalS, getLocalS, delLocalS } from "./index.js";

const TokenKey = 'xLongBigDataToken'

export function getToken() {
  return JSON.parse(getLocalS(TokenKey))
}

export function setToken(token) {
  return setLocalS(TokenKey, JSON.stringify(token))
}

export function removeToken() {
  return delLocalS(TokenKey)
}
