import type { ResourceConfig } from "./app-config";

export interface Resource {
  key: string;
  config: ResourceConfig;
  api: {
    list(params: ListParams): Promise<any>;
    create<TValues>(values: TValues): Promise<any>;
    update<TValues>(id: string, values: TValues): Promise<any>;
    delete(id: string): Promise<any>;
    single(id: string): Promise<any>;
  };
}

interface ListParams {
  page: number;
  limit: number;
}
