import "./assets/styles/main.css";

import { useRef } from "react";
import { withProviders } from "./providers";
import type { AppConfig } from "./types";
import { AppStateProvider, createAppState } from "./app-state";
import { RouterProvider } from "react-router";

export interface AppProps {
  config: AppConfig;
}

function InternalApp({ config }: AppProps) {
  const appStateRef = useRef(createAppState(config));

  return (
    <AppStateProvider value={appStateRef.current}>
      <RouterProvider router={appStateRef.current.appRouter.router} />
    </AppStateProvider>
  );
}

export const App = withProviders(InternalApp);
