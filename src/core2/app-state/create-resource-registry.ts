import type { AppConfig, ResourceConfig } from "../types";
import type { Resource } from "../types/resource";
import type { HttpClient } from "../utils";
import { compileUrl } from "../utils";

interface ResourceRegistryProps {
	httpClient: HttpClient;
	appConfig: AppConfig;
}

export function createResourceRegistry({
	appConfig,
	httpClient,
}: ResourceRegistryProps) {
	const resources = new Map<string, Resource>();

	for (const [resourceKey, resourceConfig] of Object.entries(
		appConfig.resources,
	)) {
		const api = buildResourceApi({ resourceConfig, httpClient });

		resources.set(resourceKey, {
			key: resourceKey,
			config: resourceConfig,
			api,
		});
	}

	function getResource(resourceKey: string) {
		const resource = resources.get(resourceKey);
		if (!resource) {
			throw new Error(`Resource ${resourceKey} not found`);
		}
		return resource;
	}

	return {
		getResource,
	};
}

function buildResourceApi({
	resourceConfig,
	httpClient,
}: {
	resourceConfig: ResourceConfig;
	httpClient: HttpClient;
}): Resource["api"] {
	const endpoints = resourceConfig.endpoints;

	return {
		async list(params) {
			const { url, method = "GET", responseTransform } = endpoints.list;
			const { data } = await httpClient.request({
				url,
				method,
				...(method === "GET" ? { params } : { data: params }),
			});

			if (responseTransform) {
				return responseTransform(data);
			}

			return data;
		},
		async create(values) {
			const { url, method = "POST", requestTransform } = endpoints.create;
			const { data } = await httpClient.request({
				url,
				method,
				data: values,
			});

			if (requestTransform) {
				return requestTransform(data);
			}

			return data;
		},
		async update(id, values) {
			const { url, method = "PUT", requestTransform } = endpoints.update;
			const { data } = await httpClient.request({
				url: compileUrl(url, { id }),
				method,
				data: values,
			});

			if (requestTransform) {
				return requestTransform(data);
			}

			return data;
		},
		async delete(id) {
			const { url, method = "DELETE", requestTransform } = endpoints.delete;
			const { data } = await httpClient.request({
				url: compileUrl(url, { id }),
				method,
			});

			if (requestTransform) {
				return requestTransform(data);
			}

			return data;
		},
		async single(id) {
			const { url, method = "GET", responseTransform } = endpoints.single;
			const { data } = await httpClient.request({
				url: compileUrl(url, { id }),
				method,
			});

			if (responseTransform) {
				return responseTransform(data);
			}

			return data;
		},
	};
}
