import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants";
import type {
  InternalSingleResponse,
  CustomMutationOptions,
  Resource,
} from "../../../types";
import { resourceSingleResponseValidationSchema } from "../validations";

interface UseCreateProps extends CustomMutationOptions<InternalSingleResponse> {
  resource: Resource;
}

export function useCreate({ resource, ...options }: UseCreateProps) {
  return useMutation({
    mutationKey: [QUERY_KEY, resource.key, "create"],
    mutationFn: async <TValues>(values: TValues) => {
      const data = await resource.api.create(values);
      const validatedData = resourceSingleResponseValidationSchema.parse(data);
      return validatedData;
    },
    ...options,
  });
}
