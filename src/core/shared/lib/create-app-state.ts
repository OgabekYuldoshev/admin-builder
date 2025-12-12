import { createApiClient } from "../api";
import type { AppConfig } from "../types";
import { createResourceRegistry } from "./create-resource-registry";
import { createSafeContext } from "./create-safe-context";

export function createAppState(config: AppConfig) {
  const apiClient = createApiClient(config.api);
  const resourceRegistry = createResourceRegistry({
    apiClient,
  });

  for (const [resourceName, resourceConfig] of Object.entries(
    config.resources
  )) {
    resourceRegistry.register(resourceName, resourceConfig);
  }

  return {
    apiClient,
    resourceRegistry,
    config,
  };
}

export type AppState = ReturnType<typeof createAppState>;

export const [AppStateProvider, useAppState] = createSafeContext<AppState>(
  "App state not found"
);
