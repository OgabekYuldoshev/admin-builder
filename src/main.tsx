import { createTheme, MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import { AppLayout } from "./components/Layout";

const theme = createTheme({
  primaryColor: "blue",
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <AppLayout>
        <div>
          <h1>Welcome to Admin Builder</h1>
          <p>Your professional admin panel is ready!</p>
        </div>
      </AppLayout>
    </MantineProvider>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
