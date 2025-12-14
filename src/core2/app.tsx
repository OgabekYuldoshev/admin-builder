import "./assets/styles/main.css";

import { useRef } from "react";
import { withProviders } from "./providers";
import type { AppConfig } from "./types";
import { AppStateProvider, createAppState } from "./app-state";

export interface AppProps {
  config: AppConfig;
}

function InternalApp({ config }: AppProps) {
  const appStateRef = useRef(createAppState(config));

  console.log(appStateRef.current)
  return (
    <AppStateProvider value={appStateRef.current}>
      <div>salom</div>
    </AppStateProvider>
  );
}

export const App = withProviders(InternalApp);
