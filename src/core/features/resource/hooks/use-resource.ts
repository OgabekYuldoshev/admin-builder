import { useMemo } from "react";
import { useAppState } from "../../../app-state";

export function useResource(resourceName: string) {
	const { resourceRegistry } = useAppState();

	return useMemo(
		() => resourceRegistry.getResource(resourceName),
		[resourceName, resourceRegistry],
	);
}
