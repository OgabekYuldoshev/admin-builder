import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants";
import type {
  InternalSingleResponse,
  CustomMutationOptions,
  Resource,
} from "../../../types";
import { resourceSingleResponseValidationSchema } from "../validations";

interface UseUpdateProps extends CustomMutationOptions<InternalSingleResponse> {
  resource: Resource;
  id: any;
}

export function useUpdate({ resource, id, ...options }: UseUpdateProps) {
  return useMutation({
    mutationKey: [QUERY_KEY, resource.key, "update", id],
    mutationFn: async <TValues>(values: TValues) => {
      const data = await resource.api.update(id, values);
      const validatedData = resourceSingleResponseValidationSchema.parse(data);
      return validatedData;
    },
    ...options,
  });
}
