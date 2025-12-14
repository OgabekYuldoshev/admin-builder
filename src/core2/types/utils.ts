import type { MutationOptions, QueryOptions } from "@tanstack/react-query";

export interface ListParams {
  page: number;
  limit: number;
}

export interface InternalListResponse<T = any> {
  items: T[];
  total: number;
  limit: number;
}
export interface InternalSingleResponse<T = any> {
  item: T;
}

export type CustomQueryOptions<T = any> = Omit<
  QueryOptions<T>,
  "queryKey" | "queryFn"
>;

export type CustomMutationOptions<T = any> = Omit<
  MutationOptions<T>,
  "mutationKey" | "mutationFn"
>;
