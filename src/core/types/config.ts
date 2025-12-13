import type { ColumnDef } from "@tanstack/react-table";
import type { LoginResponse, ResourceListResponse } from "../schema";
import type { ZodSchema } from "zod";

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

type BaseFieldConfig = {
  label: string;
  validationSchema: ZodSchema;
  description?: string;
  placeholder?: string;
  visible?: boolean | ((values: Record<string, any>) => boolean);
  transform?: (value: any, allValues: Record<string, any>) => any;
};

export interface TextField extends BaseFieldConfig {
  type: "text";
  defaultValue?: string;
}

export interface TextAreaField extends BaseFieldConfig {
  type: "textarea";
  defaultValue?: string;
  rows?: number;
}

export interface SelectField extends BaseFieldConfig {
  type: "select";
  defaultValue?: string;
  options: { label: string; value: string }[];
}

export interface NumberField extends BaseFieldConfig {
  type: "number";
  defaultValue?: number;
  min?: number;
  max?: number;
}

export interface SwitchField extends BaseFieldConfig {
  type: "switch";
  defaultValue?: boolean;
}

export interface DateField extends BaseFieldConfig {
  type: "date";
  defaultValue?: Date;
}

export type ResourceFieldConfig =
  | TextField
  | NumberField
  | DateField
  | TextAreaField
  | SelectField
  | SwitchField;

export type ResourceConfig = {
  metaData: {
    label: string;
    description?: string;
  };
  endpoints: ResourceEndpointsConfig;
  list: {
    columns: ColumnDef<any>[];
  };
  form: {
    fields: Record<string, ResourceFieldConfig>;
  };
};

export type AppConfig = {
  api: ApiConfig;
  auth: AuthConfig;
  resources: Record<string, ResourceConfig>;
};
