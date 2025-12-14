import axios, { type AxiosRequestConfig } from "axios";
import type { HttpConfig } from "../types";

type HttpClientOptions = {
	getAccessToken?: () => string | null;
	onUnauthorized?: () => void;
	refreshToken?: () => Promise<string | null>;
};

export function createHttpClient(config: HttpConfig, options?: HttpClientOptions) {
	const instance = axios.create({
		baseURL: config.baseURL,
		headers: config.headers,
	});

	instance.interceptors.request.use((requestConfig) => {
		const token =
			options?.getAccessToken?.() ??
			(typeof window !== "undefined"
				? window.localStorage.getItem("accessToken")
				: null);
		if (token) {
			requestConfig.headers = {
				...requestConfig.headers,
				Authorization: `Bearer ${token}`,
			};
		}
		return requestConfig;
	});

	instance.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
				error.config ?? {};
			const status = error?.response?.status;
			const canRefresh =
				!originalRequest._retry &&
				status === 401 &&
				typeof options?.refreshToken === "function";

			if (canRefresh && options?.refreshToken) {
				originalRequest._retry = true;
				try {
					const newToken = await options.refreshToken();
					if (newToken) {
						originalRequest.headers = {
							...originalRequest.headers,
							Authorization: `Bearer ${newToken}`,
						};
						return instance(originalRequest);
					}
				} catch {
					// fallthrough to logout
				}
				options?.onUnauthorized?.();
			}

			return Promise.reject(error);
		},
	);

	return instance;
}

export type HttpClient = ReturnType<typeof createHttpClient>;
