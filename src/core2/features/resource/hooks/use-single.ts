import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type {
  CustomQueryOptions,
  InternalSingleResponse,
  Resource,
} from "../../../types";
import { QUERY_KEY } from "../constants";
import { resourceSingleResponseValidationSchema } from "../validations";

interface UseSingleProps extends CustomQueryOptions<InternalSingleResponse> {
  resource: Resource;
  id: any;
}

export function useSingle({ resource, id, ...options }: UseSingleProps) {
  const initialData = {
    item: {},
  } as InternalSingleResponse;

  const { data = initialData, ...args } = useQuery({
    queryKey: [QUERY_KEY, resource.key, "single", id],
    queryFn: async () => {
      const data = await resource.api.single({ id });
      const validatedData = resourceSingleResponseValidationSchema.parse(data);
      return validatedData;
    },
    initialData,
    placeholderData: keepPreviousData,
    retry: false,
    ...options,
  });

  return { ...data, ...args };
}
