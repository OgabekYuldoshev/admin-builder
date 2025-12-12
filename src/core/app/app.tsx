import "@mantine/core/styles.css";

import { RouterProvider } from "react-router";
import type { AppConfig } from "../shared";
import { withProviders } from "./providers";
import { appRouter } from "./router";

interface AppProps {
  config: AppConfig;
}

function BaseApp({ config }: AppProps) {
  console.log(config);
  return <RouterProvider router={appRouter} />;
}

export const App = withProviders(BaseApp);
