import { resourceListResponseSchema } from "../schema";
import type { Resource, ResourceConfig } from "../types";
import type { ApiClient } from "./create-api-client";
import { compile } from "path-to-regexp";

interface ResourceRegistryProps {
  apiClient: ApiClient;
}

export function createResourceRegistry({ apiClient }: ResourceRegistryProps) {
  const resources = new Map<string, Resource>();

  function buildResourceApi(resourceConfig: ResourceConfig): Resource["api"] {
    const apiConfig = resourceConfig.endpoints;

    function compileUrl(
      url: string,
      params?: Record<string, string | string[]>
    ): string {
      if (!params) return url;
      try {
        const toPath = compile(url);
        return toPath(params);
      } catch {
        return Object.entries(params).reduce(
          (acc, [key, value]) => acc.replace(`:${key}`, String(value)),
          url
        );
      }
    }

    return {
      // List resources endpoint
      async list({ params }) {
        const { url, method = "GET", responseTransform } = apiConfig.list;
        const { data } = await apiClient.request({
          url,
          method,
          params,
        });

        if (responseTransform) {
          return responseTransform(data);
        }

        return resourceListResponseSchema.parse(data);
      },
      // Create resource endpoint
      async create(values) {
        const { url, method = "POST", requestTransform } = apiConfig.create;
        const { data } = await apiClient.request({
          url,
          method,
          data: values,
        });
        if (requestTransform) {
          return requestTransform(data);
        }
        return data;
      },
      // Update resource endpoint
      async update(id, values) {
        const { url, method = "PUT", requestTransform } = apiConfig.update;

        const { data } = await apiClient.request({
          url: compileUrl(url, { id }),
          method,
          data: values,
        });
        if (requestTransform) {
          return requestTransform(data);
        }
        return data;
      },
      // Delete resource endpoint
      async delete(id) {
        const { url, method = "DELETE", requestTransform } = apiConfig.delete;
        const { data } = await apiClient.request({
          url: compileUrl(url, { id }),
          method,
        });
        if (requestTransform) {
          return requestTransform(data);
        }
        return data;
      },
      // Single resource endpoint
      async single(id) {
        const { url, method = "GET", responseTransform } = apiConfig.single;
        const { data } = await apiClient.request({
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

  function register(resourceKey: string, resourceConfig: ResourceConfig) {
    const resourceApi = buildResourceApi(resourceConfig);
    const resource = {
      key: resourceKey,
      config: resourceConfig,
      api: resourceApi,
    };
    resources.set(resourceKey, resource);
  }

  function get(resourceKey: string) {
    const resource = resources.get(resourceKey);
    if (!resource) {
      throw new Error(`Resource ${resourceKey} not found`);
    }
    return resource;
  }

  return {
    register,
    get,
  };
}

export type ResourceRegistry = ReturnType<typeof createResourceRegistry>;
