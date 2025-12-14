import { createSafeContext } from "@mantine/core";
import type { AppConfig } from "../types";
import { createHttpClient } from "../utils";
import { createResourceRegistry } from "./create-resource-registry";

export function createAppState(appConfig: AppConfig) {
  const httpClient = createHttpClient(appConfig.http);
  const resourceRegistry = createResourceRegistry({
    appConfig,
    httpClient,
  });

  return {
    resourceRegistry,
    httpClient,
    appConfig,
  };
}

export type AppState = ReturnType<typeof createAppState>;

export const [AppStateProvider, useAppState] = createSafeContext<AppState>(
  "App state not found!"
);
