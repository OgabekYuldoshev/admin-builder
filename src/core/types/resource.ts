import type { ResourceListResponse } from "../schema";
import type { ResourceConfig } from "./config";
import type { ListParams } from "./list";

export interface Resource {
  key: string;
  config: ResourceConfig;
  api: {
    list(value: { params: ListParams }): Promise<ResourceListResponse>;
    create<TData>(data: TData): Promise<any>;
    update<TData>(id: string, data: TData): Promise<any>;
    delete(id: string): Promise<any>;
    single(id: string): Promise<any>;
  };
}
