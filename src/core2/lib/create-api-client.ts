import type { AxiosInstance } from "axios";
import type { ApiConfig } from "../types";
import axios from "axios";

let axiosInstance: AxiosInstance | null = null;

export function createApiClient(config: ApiConfig) {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers,
    });
  }

  return axiosInstance;
}

export type ApiClient = ReturnType<typeof createApiClient>;
