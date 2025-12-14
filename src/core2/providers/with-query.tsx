import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ComponentType } from "react";

const queryClient = new QueryClient();

export function withQuery<P extends object = object>(
	Component: ComponentType<P>,
) {
	return function QueryWrapper(props: P) {
		return (
			<QueryClientProvider client={queryClient}>
				<Component {...props} />
			</QueryClientProvider>
		);
	};
}
