import { MantineProvider } from "@mantine/core";
import { theme } from "../config";

export function withMantine(Component: React.ComponentType<any>) {
  return (props: any) => (
    <MantineProvider theme={theme}>
      <Component {...props} />
    </MantineProvider>
  );
}
