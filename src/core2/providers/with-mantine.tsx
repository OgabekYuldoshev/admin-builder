import { createTheme, MantineProvider } from "@mantine/core";
import type { ComponentType } from "react";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  primaryColor: "blue",
});

export function withMantine<P extends object = object>(
  Component: ComponentType<P>
) {
  return function MantineWrapper(props: P) {
    return (
      <MantineProvider theme={theme}>
        <Notifications />
        <Component {...props} />
      </MantineProvider>
    );
  };
}
