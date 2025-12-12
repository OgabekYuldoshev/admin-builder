import type { ColumnDef } from "@tanstack/react-table";
import type { ZodSchema } from "zod";

type BasicApiConfig = {
	url: string;
	response?: {
		validationSchema: ZodSchema;
		transform?: (data: any) => any;
	};
};

type ApiConfig = {
	list: BasicApiConfig;
	create: BasicApiConfig;
	update: BasicApiConfig;
	delete: BasicApiConfig;
	single: BasicApiConfig;
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
			response?: {
				validationSchema?: ZodSchema;
				transform?: (data: any) => any;
			};
		};
	};
	entities: {
		[key: string]: {
			label: string;
			api: ApiConfig;
			list: {
				columns: ColumnConfig;
			};
			fields: FieldConfig;
		};
	};
};
