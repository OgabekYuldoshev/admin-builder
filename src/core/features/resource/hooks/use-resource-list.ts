import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import {
	type ResourceConfig,
	type ResourceList,
	resourceListSchema,
	useApiInstance,
} from "../../../shared";

interface UseResourceListProps {
	metaData: {
		resourceName: string;
		resourceConfig: ResourceConfig;
	};
}

export function useResourceList({ metaData }: UseResourceListProps) {
	const http = useApiInstance();

	const resourceListApi = useCallback(async () => {
		const {
			url,
			method = "GET",
			responseTransform,
		} = metaData.resourceConfig.api.list;

		const { data } = await http({
			url,
			method,
		});
		if (responseTransform) {
			return responseTransform(data);
		}

		const validatedData = resourceListSchema.safeParse(data);

		if (!validatedData.success) {
			throw new Error(validatedData.error.message);
		}

		return validatedData.data;
	}, [metaData, http]);

	const initialData = {
		items: [],
		total: 0,
		limit: 0,
	} as ResourceList;

	const { data = initialData, ...args } = useQuery({
		queryKey: ["resource-list", metaData.resourceName],
		queryFn: resourceListApi,
		initialData,
		placeholderData: keepPreviousData,
		retry: false,
	});

	return {
		...data,
		...args,
	};
}
