import { useMemo } from "react";
import type { AppConfig } from "../../../types/app-config";

export interface Statistics {
  totalResources: number;
  totalEndpoints: number;
  totalColumns: number;
  baseURL: string;
}

export function useStatistics(appConfig: AppConfig): Statistics {
  return useMemo(() => {
    const resources = Object.entries(appConfig.resources);

    const totalResources = resources.length;
    const totalEndpoints = resources.reduce(
      (acc, [, config]) => acc + Object.keys(config.endpoints).length,
      0
    );
    const totalColumns = resources.reduce(
      (acc, [, config]) => acc + config.list.columns.length,
      0
    );

    return {
      totalResources,
      totalEndpoints,
      totalColumns,
      baseURL: appConfig.http.baseURL,
    };
  }, [appConfig]);
}

