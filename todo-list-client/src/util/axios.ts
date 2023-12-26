import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

httpClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");

  if (token) config.headers.Authorization = "Bearer " + token;

  return config;
});
