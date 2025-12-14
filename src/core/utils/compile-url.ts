import { compile } from "path-to-regexp";

export function compileUrl(
	url: string,
	params: Record<string, string | string[]>,
) {
	try {
		return compile(url)(params);
	} catch (error) {
		console.error("Compiling url with params failed", url, params, error);

		return Object.entries(params).reduce(
			(acc, [key, value]) => acc.replace(`:${key}`, String(value)),
			url,
		);
	}
}
