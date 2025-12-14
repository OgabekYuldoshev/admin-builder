import axios, { type AxiosInstance } from "axios";
import type { HttpConfig } from "../types";

let httpClient: AxiosInstance | null = null;

export function createHttpClient(config: HttpConfig) {
	if (!httpClient) {
		httpClient = axios.create({
			baseURL: config.baseURL,
			headers: config.headers,
		});
	}
	return httpClient;
}

export type HttpClient = ReturnType<typeof createHttpClient>;
