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
    update<TId, TValues>(
      id: TId,
      values: TValues
    ): Promise<InternalSingleResponse>;
    delete<TId>(id: TId): Promise<InternalSingleResponse>;
    single<TId>(id: TId): Promise<InternalSingleResponse>;
  };
}
