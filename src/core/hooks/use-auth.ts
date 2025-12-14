import { useSyncExternalStore } from "react";
import { useAppState } from "../app-state";

export function useAuth() {
	const { auth } = useAppState();

	const snapshot = useSyncExternalStore(
		auth.subscribe,
		auth.getSnapshot,
		auth.getSnapshot,
	);

	return {
		...snapshot,
		login: auth.login,
		logout: auth.logout,
		refreshTokens: auth.refreshTokens,
		fetchUser: auth.fetchUser,
	};
}

