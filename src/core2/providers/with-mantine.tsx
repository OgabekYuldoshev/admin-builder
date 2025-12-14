import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { ComponentType } from "react";

const theme = createTheme({
	primaryColor: "blue",
});

export function withMantine<P extends object = object>(
	Component: ComponentType<P>,
) {
	return function MantineWrapper(props: P) {
		return (
			<MantineProvider theme={theme}>
				<Notifications position="top-right" withinPortal />
				<Component {...props} />
			</MantineProvider>
		);
	};
}
