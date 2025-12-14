import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants";
import type { CustomMutationOptions, Resource } from "../../../types";
import { resourceSingleResponseValidationSchema } from "../validations";

interface UseCreateProps extends CustomMutationOptions<any> {
  resource: Resource;
}

export function useCreate({ resource, ...options }: UseCreateProps) {
  return useMutation({
    mutationKey: [QUERY_KEY, resource.key, "create"],
    mutationFn: async <TValues>(values: TValues) => {
      const data = await resource.api.create<TValues>(values);
      const validatedData = resourceSingleResponseValidationSchema.parse(data);
      return validatedData;
    },
    ...options,
  });
}
