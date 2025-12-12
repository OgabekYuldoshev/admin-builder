import "@mantine/core/styles.css";

import { RouterProvider } from "react-router";
import { withProviders } from "./providers";
import { appRouter } from "./router";

function BaseApp() {
  return <RouterProvider router={appRouter} />;
}

export const App = withProviders(BaseApp);
