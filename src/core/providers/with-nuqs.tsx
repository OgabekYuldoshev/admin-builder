import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import type { ComponentType } from "react";

export function withNuqs<P extends object = object>(
	Component: ComponentType<P>,
) {
	return function QueryWrapper(props: P) {
		return (
			<NuqsAdapter>
				<Component {...props} />
			</NuqsAdapter>
		);
	};
}
