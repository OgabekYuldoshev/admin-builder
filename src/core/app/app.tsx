import "@mantine/core/styles.css";

import { RouterProvider } from "react-router";
import type { AppConfig } from "../shared";
import { ConfigProvider } from "../shared/lib/create-config-provider";
import { withProviders } from "./providers";
import { appRouter } from "./router";

interface AppProps {
  config: AppConfig;
}

function BaseApp({ config }: AppProps) {
  return (
    <ConfigProvider value={{ config }}>
      <RouterProvider router={appRouter} />
    </ConfigProvider>
  );
}

export const App = withProviders(BaseApp);
