import { useConfigContext } from "../lib/create-config-provider";

export function useEntitiesConfig() {
	const { config } = useConfigContext();
	return config.entities;
}
