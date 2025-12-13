import type { MutationOptions, QueryOptions } from "@tanstack/react-query";

export type CustomQueryOptions = Omit<QueryOptions, "queryKey" | "queryFn">;
export type CustomMutationOptions = Omit<MutationOptions, "mutationFn">;
