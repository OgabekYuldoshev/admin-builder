import axios, { type AxiosInstance } from "axios";
import type { AppConfig } from "../types";

let axiosInstance: AxiosInstance | null = null;

export const getApiClient = (config: AppConfig["api"]) => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
    });
  }

  return axiosInstance;
};

export const createApiClient = (config: AppConfig["api"]) => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
    });
  }

  return axiosInstance;
};
