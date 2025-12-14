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
  id: string;
}

export function useSingle({ resource, id, ...options }: UseSingleProps) {
  const initialData = {
    item: {},
  } as InternalSingleResponse;

  const { data = initialData, ...args } = useQuery({
    queryKey: [QUERY_KEY, resource.key, "single", id],
    queryFn: async () => {
      const data = await resource.api.single(id);
      const parsed = await resourceSingleResponseValidationSchema.safeParse(
        data
      );
      if (!parsed.success) {
        throw new Error(parsed.error.issues.map((issue) => issue.message).join(", "));
      }
      return parsed.data;
    },
    initialData,
    placeholderData: keepPreviousData,
    retry: false,
    ...options,
  });

  return { ...data, ...args };
}
