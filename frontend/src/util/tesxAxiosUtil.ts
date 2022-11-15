import axios from "axios";
import { useSelector } from "react-redux";
import { useAppSelector } from "../Store/hooks";
import testApiSlice, { selectTestApi } from "../Store/slice/testApi";

// const API_URL = "http://localhost:8005/api";

// let testAxiosInstance = axios.create({
//   baseURL: API_URL,
// });

export function testAxiosGet(url: string) {
  console.log("AXIOS URL => ", url);
  return axios.get(url);
}

export function testAxiosPost(url: string, method: string, body: any) {
  //   return testAxiosInstance({
  //     url: url,
  //     method: method,
  //     data: body,
  //   });
}
export function testAxiosPut(url: string, method: string) {
  //   return testAxiosInstance({
  //     url: url,
  //     method: method,
  //   });
}
export function testAxiosDelete(url: string, method: string) {
  //   return testAxiosInstance({
  //     url: url,
  //     method: method,
  //   });
}
