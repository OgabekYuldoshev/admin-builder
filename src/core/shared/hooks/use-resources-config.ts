import { useConfigContext } from "../lib/create-config-provider";

export function useResourcesConfig() {
	const { config } = useConfigContext();
	return config.resources;
}
