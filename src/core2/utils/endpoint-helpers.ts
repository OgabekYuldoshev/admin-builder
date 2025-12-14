import {
  IconHttpDelete,
  IconHttpGet,
  IconHttpPost,
  IconHttpPut,
} from "@tabler/icons-react";
import type { BaseEndpointConfig } from "../types/app-config";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "blue",
  POST: "green",
  PUT: "orange",
  DELETE: "red",
} as const;

const METHOD_ICONS: Record<HttpMethod, typeof IconHttpGet> = {
  GET: IconHttpGet,
  POST: IconHttpPost,
  PUT: IconHttpPut,
  DELETE: IconHttpDelete,
} as const;

const DEFAULT_METHOD: HttpMethod = "GET";

export function getMethodColor(method?: string): string {
  return METHOD_COLORS[method as HttpMethod] || "gray";
}

export function getMethodIcon(method?: string) {
  return METHOD_ICONS[method as HttpMethod] || METHOD_ICONS[DEFAULT_METHOD];
}

export function getEndpointMethod(
  endpointConfig: BaseEndpointConfig
): HttpMethod {
  return (endpointConfig.method || DEFAULT_METHOD) as HttpMethod;
}

