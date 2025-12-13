import { useQuery, type QueryOptions } from "@tanstack/react-query";
import type { Resource } from "../../../types";
import { BASE_QUERY_KEY } from "../constants";
import type { CustomQueryOptions } from "../types";

interface UseResourceSingleProps extends CustomQueryOptions {
  id: string;
  resource: Resource;
}

export function useResourceSingle({
  id,
  resource,
  ...queryOptions
}: UseResourceSingleProps) {
  const queryKey = [BASE_QUERY_KEY, "single", resource.key, id];
  const { data, ...args } = useQuery({
    queryKey,
    queryFn: () => resource.api.single(id),
    ...queryOptions,
  });
  return { ...data, ...args };
}
