import { useConfigContext } from "../lib/create-config-provider";

export function useApiConfig() {
	const { config } = useConfigContext();

	return config.api;
}
