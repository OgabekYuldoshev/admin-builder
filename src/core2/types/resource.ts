import type { ResourceListResponse } from "../schema";
import type { ResourceConfig } from "./config";

export interface Resource {
  config: ResourceConfig;
  api: {
    list(): Promise<ResourceListResponse>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<any>;
    single(id: string): Promise<any>;
  };
}
