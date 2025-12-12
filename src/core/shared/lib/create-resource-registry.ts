import type { AxiosInstance } from "axios";
import type { ResourceConfig } from "../types";
import type { Resource } from "../types/resource";

interface ResourceRegistryOptions {
  apiClient: AxiosInstance;
}

export function createResourceRegistry({ apiClient }: ResourceRegistryOptions) {
  const resources = new Map<string, Resource>();

  function register(resourceName: string, resourceConfig: ResourceConfig) {
    const apiConfig = resourceConfig.api;

    const api = {
      async list(params: any) {
        const { url, method = "GET", responseTransform } = apiConfig.list;
        const { data } = await apiClient({
          url,
          method,
          params: method === "GET" ? params : undefined,
          data: method === "POST" ? params : undefined,
        });
        if (responseTransform) {
          return responseTransform(data);
        }
      },
    };

    console.log(resourceName, resourceConfig);
  }

  function get(resourceName: string) {
    const resource = resources.get(resourceName);
    if (!resource) {
      throw new Error(`Resource ${resourceName} not found`);
    }
    return resource;
  }

  return {
    register,
    get,
  };
}
