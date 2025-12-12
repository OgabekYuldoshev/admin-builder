import { useMemo } from "react";
import { getApiClient } from "../api";
import { useApiConfig } from "./use-api-config";

export function useApiInstance() {
	const apiConfig = useApiConfig();
	return useMemo(() => getApiClient(apiConfig), [apiConfig]);
}
