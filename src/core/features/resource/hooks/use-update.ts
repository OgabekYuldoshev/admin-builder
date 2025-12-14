import { useMutation } from "@tanstack/react-query";
import type {
	CustomMutationOptions,
	InternalSingleResponse,
	Resource,
} from "../../../types";
import { QUERY_KEY } from "../constants";
import { resourceSingleResponseValidationSchema } from "../validations";

interface UseUpdateProps extends CustomMutationOptions<InternalSingleResponse> {
	resource: Resource;
	id: string;
}

export function useUpdate({ resource, id, ...options }: UseUpdateProps) {
	return useMutation({
		mutationKey: [QUERY_KEY, resource.key, "update", id],
		mutationFn: async <TValues>(values: TValues) => {
			const data = await resource.api.update(id, values);
			const parsed =
				await resourceSingleResponseValidationSchema.safeParse(data);
			if (!parsed.success) {
				throw new Error(
					parsed.error.issues.map((issue) => issue.message).join(", "),
				);
			}
			return parsed.data;
		},
		...options,
	});
}
