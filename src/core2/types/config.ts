import type { ColumnDef } from "@tanstack/react-table";
import type { LoginResponse, ResourceListResponse } from "../schema";

export type ApiConfig = {
  baseURL: string;
  headers?: Record<string, string>;
};

export type AuthConfig = {
  login: {
    url: string;
    responseTransform?: (data: any) => LoginResponse;
  };
  user: {
    url: string;
    responseTransform?: (data: any) => any;
  };
};

type ResourceBaseApiConfig = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
};

export type ResourceEndpointsConfig = {
  list: ResourceBaseApiConfig & {
    responseTransform?: (data: any) => ResourceListResponse;
  };
  create: ResourceBaseApiConfig & {
    requestTransform?: (data: any) => any;
  };
  update: ResourceBaseApiConfig & {
    requestTransform?: (data: any) => any;
  };
  delete: ResourceBaseApiConfig & {
    requestTransform?: (data: any) => any;
  };
  single: ResourceBaseApiConfig & {
    responseTransform?: (data: any) => any;
  };
};

export type ResourceConfig = {
  metaData: {
    label: string;
    description?: string;
  };
  endpoints: ResourceEndpointsConfig;
  list: {
    columns: ColumnDef<any>[];
  };
};

export type AppConfig = {
  api: ApiConfig;
  auth: AuthConfig;
  resources: Record<string, ResourceConfig>;
};
