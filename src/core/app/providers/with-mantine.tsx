import { MantineProvider } from "@mantine/core";
import type { ComponentType } from "react";
import { theme } from "../config";

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
