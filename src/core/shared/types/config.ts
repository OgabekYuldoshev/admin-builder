import type { ColumnDef } from "@tanstack/react-table";
import type { ZodSchema } from "zod";

type BasicApiConfig = {
	url: string;
};

type ListApiConfig = BasicApiConfig & {
	responseTransform?: (data: any) => {
		items: any[];
		total: number;
		limit: number;
	};
};

type SingleApiConfig = BasicApiConfig & {
	responseTransform?: (data: any) => any;
};

type CreateApiConfig = BasicApiConfig & {
	requestTransform?: (data: any) => any;
};

type UpdateApiConfig = BasicApiConfig & {
	requestTransform?: (data: any) => any;
};

type DeleteApiConfig = BasicApiConfig & {
	requestTransform?: (data: any) => any;
};

type ApiConfig = {
	list: ListApiConfig;
	create: CreateApiConfig;
	update: UpdateApiConfig;
	delete: DeleteApiConfig;
	single: SingleApiConfig;
};

type ColumnConfig = ColumnDef<any>;

type BaseFieldConfig = {
	label: string;
	type: "text" | "number" | "select" | "date" | "checkbox";
	validationSchema: ZodSchema;
};

type FieldConfig = Record<string, BaseFieldConfig>;

export type AppConfig = {
	api: {
		baseUrl: string;
		headers?: Record<string, string>;
	};
	auth: {
		login: {
			url: string;
			responseTransform?: (data: any) => {
				accessToken: string;
				refreshToken: string;
			};
		};
		user: {
			url: string;
			responseTransform?: (data: any) => any;
		};
	};
	entities: {
		[key: string]: {
			label: string;
			api: ApiConfig;
			list: {
				columns?: ColumnConfig;
			};
			fields: FieldConfig;
		};
	};
};
