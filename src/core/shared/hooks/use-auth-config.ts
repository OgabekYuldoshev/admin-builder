import { useConfigContext } from "../lib/create-config-provider";

export function useAuthConfig() {
	const { config } = useConfigContext();

	return config.auth;
}
