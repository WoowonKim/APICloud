import axios from "axios";

const API_URL = "http://localhost:8005/api";

let axiosInstance = axios.create({
  baseURL: API_URL,
});

function getHeaders() {
  const token = window.localStorage.getItem("token");
  return {
    Authorization: token && `Bearer ${token}`,
  };
}

export function axiosPost(url: string, data: any) {
  return axiosInstance({
    method: "POST",
    url,
    data,
    headers: getHeaders(),
  });
}

// delete is a reserved name
export function axiosDel(url: string) {
  return axiosInstance({
    method: "DELETE",
    url,
    headers: getHeaders(),
  });
}

export function axiosGet(url: string) {
  return axiosInstance({
    method: "GET",
    url,
    headers: getHeaders(),
  });
}

export function axiosPatch(url: string, data: any) {
  return axiosInstance({
    method: "PATCH",
    url,
    data,
    headers: getHeaders(),
  });
}
