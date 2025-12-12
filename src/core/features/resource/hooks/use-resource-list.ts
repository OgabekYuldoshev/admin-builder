import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	PAGE_KEY,
	PAGE_SIZE_KEY,
} from "../../../constants";
import {
	type ResourceConfig,
	type ResourceList,
	resourceListSchema,
	useApiInstance,
} from "../../../shared";

type Params = Record<string, string | number>;

interface UseResourceListProps {
	params: Params;
	metaData: {
		resourceName: string;
		resourceConfig: ResourceConfig;
	};
}

export function useResourceList({ params, metaData }: UseResourceListProps) {
	const http = useApiInstance();

	const defaultParams = {
		[PAGE_KEY]: DEFAULT_PAGE,
		[PAGE_SIZE_KEY]: DEFAULT_PAGE_SIZE,
		...params,
	} as Params;

	const resourceListApi = useCallback(
		async (params: Params) => {
			const {
				url,
				method = "GET",
				responseTransform,
			} = metaData.resourceConfig.api.list;

			const { data } = await http({
				url,
				method,
				params: method === "GET" ? params : undefined,
				data: method === "POST" ? params : undefined,
			});
			if (responseTransform) {
				return responseTransform(data);
			}

			const validatedData = resourceListSchema.safeParse(data);

			if (!validatedData.success) {
				throw new Error(validatedData.error.message);
			}

			return validatedData.data;
		},
		[metaData, http],
	);

	const initialData = {
		items: [],
		total: 0,
		limit: 0,
	} as ResourceList;

	const { data = initialData, ...args } = useQuery({
		queryKey: ["resource-list", metaData.resourceName, defaultParams],
		queryFn: () => resourceListApi(defaultParams),
		initialData,
		placeholderData: keepPreviousData,
		retry: false,
	});

	return {
		...data,
		...args,
	};
}
