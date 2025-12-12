import { useMemo } from "react";
import { useAppState } from "../lib";

export function useResource(resourceName: string) {
  const { resourceRegistry } = useAppState();

  return useMemo(() => {
    return resourceRegistry.get(resourceName);
  }, [resourceName, resourceRegistry]);
}
