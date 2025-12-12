import "@mantine/core/styles.css";

import { RouterProvider } from "react-router";
import { AppStateProvider, createAppState, type AppConfig } from "../shared";
import { ConfigProvider } from "../shared/lib/create-config-provider";
import { withProviders } from "./providers";
import { appRouter } from "./router";
import { useState } from "react";

interface AppProps {
  config: AppConfig;
}

function BaseApp({ config }: AppProps) {
  const [appState] = useState(() => createAppState(config));
  return (
    <AppStateProvider value={appState}>
      <ConfigProvider value={{ config }}>
        <RouterProvider router={appRouter} />
      </ConfigProvider>
    </AppStateProvider>
  );
}

export const App = withProviders(BaseApp);
