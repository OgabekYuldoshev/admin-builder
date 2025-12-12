import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ResourceListResponse } from "../../../schema";
import type { ListParams, Resource } from "../../../types";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../../constants";

const QUERY_KEY = "@RESOURCE";

interface UseResourceListProps {
  params?: Partial<ListParams>;
  resource: Resource;
}

export function useResourceList({
  params = {},
  resource,
}: UseResourceListProps) {
  const defaultParams: ListParams = {
    page: DEFAULT_PAGE,
    limit: DEFAULT_PAGE_SIZE,
    ...params,
  };

  const queryKey = [QUERY_KEY, "list", resource.key, defaultParams];

  const initialData = {
    items: [],
    total: 0,
    limit: 0,
  } as ResourceListResponse;

  const { data = initialData, ...args } = useQuery({
    queryKey,
    queryFn: () => resource.api.list({ params: defaultParams }),
    initialData,
    placeholderData: keepPreviousData,
    retry: false,
  });

  return { ...data, ...args };
}
