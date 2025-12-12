import { useEntitiesConfig } from "./use-entities-config";

export function useEntityConfig(entityName: string) {
	const entities = useEntitiesConfig();

	if (!(entityName in entities)) {
		throw new Error(`Entity ${entityName} not found`);
	}

	return entities[entityName];
}
