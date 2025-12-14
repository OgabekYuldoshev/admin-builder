import type { ColumnDef } from "@tanstack/react-table";
import type { ZodType } from "zod";

export type HttpConfig = {
  baseURL: string;
  headers?: Record<string, string>;
};

export type AuthConfig = {
  login: {
    url: string;
    responseTransform?: (data: any) => any;
  };
  user: {
    url: string;
    responseTransform?: (data: any) => any;
  };
};

type BaseEndpointConfig = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
};

export type EndpointsConfig = {
  list: BaseEndpointConfig & {
    responseTransform?: (data: any) => any;
  };
  create: BaseEndpointConfig & {
    requestTransform?: (data: any) => any;
  };
  update: BaseEndpointConfig & {
    requestTransform?: (data: any) => any;
  };
  delete: BaseEndpointConfig & {
    requestTransform?: (data: any) => any;
  };
  single: BaseEndpointConfig & {
    responseTransform?: (data: any) => any;
  };
};

type BaseFieldConfig = {
  label: string;
  validationSchema: ZodType;
  description?: string;
  placeholder?: string;
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

export type FormFieldConfig =
  | TextField
  | NumberField
  | DateField
  | TextAreaField
  | SelectField
  | SwitchField;

export type FormFieldType = FormFieldConfig["type"];

export type ResourceConfig = {
  label: string;
  description?: string;
  endpoints: EndpointsConfig;
  list: {
    columns: ColumnDef<any>[];
  };
  form: {
    fields: Record<string, FormFieldConfig>;
  };
};

export type AppConfig = {
  http: HttpConfig;
  auth: AuthConfig;
  resources: Record<string, ResourceConfig>;
};
