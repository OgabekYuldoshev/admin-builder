import { useResourcesConfig } from "./use-resources-config";

export function useResourceConfig(resourceName: string) {
	const resources = useResourcesConfig();

	if (!(resourceName in resources)) {
		throw new Error(`Resource ${resourceName} not found`);
	}

	return resources[resourceName];
}
