import type { ComponentType } from "react";

import { withMantine } from "./with-mantine";
import { withQuery } from "./with-query";

function composeProviders<T extends ComponentType<any>>(
	...providers: Array<(C: T) => T>
) {
	return (Component: T) => {
		return providers.reduceRight(
			(AccumulatedComponent, provider) => provider(AccumulatedComponent),
			Component,
		);
	};
}

export const withProviders = composeProviders(withMantine, withQuery);
