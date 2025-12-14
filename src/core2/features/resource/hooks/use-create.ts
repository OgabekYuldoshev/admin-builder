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
      const parsed = await resourceSingleResponseValidationSchema.safeParse(data);
      if(!parsed.success) {
        throw new Error(parsed.error.issues.map((issue) => issue.message).join(", "));
      }
      return parsed.data;
    },
    ...options,
  });
}
