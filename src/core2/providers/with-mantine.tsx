import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import type { ComponentType } from "react";

const theme = createTheme({
  primaryColor: "blue",
});

export function withMantine<P extends object = object>(
  Component: ComponentType<P>
) {
  return function MantineWrapper(props: P) {
    return (
      <MantineProvider theme={theme}>
        <Component {...props} />
      </MantineProvider>
    );
  };
}
