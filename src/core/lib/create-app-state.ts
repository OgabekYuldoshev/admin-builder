import type { AppConfig } from "../types/config";
import { createSafeContext } from "../utils";
import { createApiClient } from "./create-api-client";
import { createResourceRegistry } from "./create-resource-registry";
import { createRouter } from "./create-router";

export function createAppState(config: AppConfig) {
  //   Create api client
  const apiClient = createApiClient(config.api);
  //   Create resource registry
  const resourceRegistry = createResourceRegistry({
    apiClient,
  });

  //   Register resources
  for (const [resourceKey, resourceConfig] of Object.entries(
    config.resources
  )) {
    resourceRegistry.register(resourceKey, resourceConfig);
  }

  const { router } = createRouter();

  return {
    apiClient,
    resourceRegistry,
    config,
    router,
  };
}

export type AppState = ReturnType<typeof createAppState>;

export const [AppStateProvider, useAppState] = createSafeContext<AppState>(
  "App state not found!"
);
