import { createSafeContext } from "@mantine/core";
import type { AppConfig } from "../types";
import { createHttpClient } from "../utils";
import { createResourceRegistry } from "./create-resource-registry";
import { createRouter } from "./create-router";

export function createAppState(appConfig: AppConfig) {
  const httpClient = createHttpClient(appConfig.http);
  const resourceRegistry = createResourceRegistry({
    appConfig,
    httpClient,
  });

  const appRouter = createRouter();

  return {
    resourceRegistry,
    httpClient,
    appConfig,
    appRouter,
  };
}

export type AppState = ReturnType<typeof createAppState>;

export const [AppStateProvider, useAppState] = createSafeContext<AppState>(
  "App state not found!"
);
