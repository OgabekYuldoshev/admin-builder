import type { ResourceConfig } from "./app-config";
import type {
	InternalListResponse,
	InternalSingleResponse,
	ListParams,
} from "./utils";

export interface Resource {
	key: string;
	config: ResourceConfig;
	api: {
		list(params: ListParams): Promise<InternalListResponse>;
		create<TValues>(values: TValues): Promise<InternalSingleResponse>;
		update<TValues>(id: string, values: TValues): Promise<InternalSingleResponse>;
		delete(id: string): Promise<InternalSingleResponse>;
		single(id: string): Promise<InternalSingleResponse>;
	};
}
