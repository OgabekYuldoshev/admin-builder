import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type {
	CustomQueryOptions,
	InternalListResponse,
	ListParams,
	Resource,
} from "../../../types";
import { QUERY_KEY } from "../constants";
import { resourceListResponseValidationSchema } from "../validations";

interface UseListProps extends CustomQueryOptions<InternalListResponse> {
	resource: Resource;
	params?: ListParams;
}

export function useList({ resource, params, ...options }: UseListProps) {
	const defaultParams: ListParams = {
		page: 1,
		limit: 10,
		...params,
	};

	const initialData = {
		items: [],
		total: 0,
		limit: 0,
	} as InternalListResponse;

	const { data = initialData, ...args } = useQuery({
		queryKey: [QUERY_KEY, resource.key, "list", defaultParams],
		queryFn: async () => {
			const data = await resource.api.list(defaultParams);
			const parsed = await resourceListResponseValidationSchema.safeParse(data);
			if (!parsed.success) {
				throw new Error(
					parsed.error.issues.map((issue) => issue.message).join(", "),
				);
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
