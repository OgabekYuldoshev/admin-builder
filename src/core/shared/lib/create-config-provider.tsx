import type { AppConfig } from "../types";
import { createSafeContext } from "./create-safe-context";

interface ConfigProviderProps {
  config: AppConfig;
}

export const [ConfigProvider, useConfigContext] =
  createSafeContext<ConfigProviderProps>("Config not found");
