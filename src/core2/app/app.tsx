import "@mantine/core/styles.css";

import { Suspense, useState } from "react";
import { withProviders } from "./providers";
import { createAppState } from "../lib/create-app-state";
import { AppStateProvider } from "../lib/create-app-state";
import type { AppConfig } from "../types";
import { RouterProvider } from "react-router";
import { SplashScreen } from "../components";

interface AppProps {
  config: AppConfig;
}

function BaseApp({ config }: AppProps) {
  const [appState] = useState(() => createAppState(config));

  return (
    <AppStateProvider value={appState}>
      <Suspense fallback={<SplashScreen />}>
        <RouterProvider router={appState.router} />
      </Suspense>
    </AppStateProvider>
  );
}

export const App = withProviders(BaseApp);
