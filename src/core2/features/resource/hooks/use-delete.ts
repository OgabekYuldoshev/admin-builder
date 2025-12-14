import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants";
import type {
  InternalSingleResponse,
  CustomMutationOptions,
  Resource,
} from "../../../types";
import { resourceSingleResponseValidationSchema } from "../validations";

interface UseDeleteProps extends CustomMutationOptions<InternalSingleResponse> {
  resource: Resource;
  id: string;
}

export function useDelete({ resource, id, ...options }: UseDeleteProps) {
  return useMutation({
    mutationKey: [QUERY_KEY, resource.key, "delete", id],
    mutationFn: async () => {
      const data = await resource.api.delete(id);
      const parsed = await resourceSingleResponseValidationSchema.safeParse(data);
      if(!parsed.success) {
        throw new Error(parsed.error.issues.map((issue) => issue.message).join(", "));
      }
      return parsed.data;
    },
    ...options,
  });
}
