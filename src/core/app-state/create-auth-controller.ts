import type { AuthConfig } from "../types";
import type { HttpClient } from "../utils";
import { clearTokens, readTokens, saveTokens } from "../utils/token-storage";

export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export interface AuthSnapshot<TUser = any> {
	status: AuthStatus;
	user: TUser | null;
	accessToken: string | null;
	refreshToken: string | null;
}

export interface AuthController<TUser = any> {
	subscribe: (listener: () => void) => () => void;
	getSnapshot: () => AuthSnapshot<TUser>;
	initialize: () => Promise<void>;
	login: (credentials: Record<string, any>) => Promise<TUser>;
	logout: (silent?: boolean) => void;
	refreshTokens: () => Promise<string | null>;
	fetchUser: () => Promise<TUser>;
}

type CreateAuthControllerParams = {
	authConfig: AuthConfig;
	httpClient: HttpClient;
	onLogout?: () => void;
};

export function createAuthController({
	authConfig,
	httpClient,
	onLogout,
}: CreateAuthControllerParams): AuthController {
	let snapshot: AuthSnapshot = {
		status: "checking",
		user: null,
		accessToken: null,
		refreshToken: null,
	};

	const listeners = new Set<() => void>();

	function setSnapshot(next: Partial<AuthSnapshot>) {
		snapshot = { ...snapshot, ...next };
		listeners.forEach((listener) => {
			listener();
		});
	}

	function getSnapshot() {
		return snapshot;
	}

	function subscribe(listener: () => void) {
		listeners.add(listener);
		return () => listeners.delete(listener);
	}

	async function fetchUser() {
		const { data } = await httpClient.get(authConfig.user.url);
		const user = authConfig.user.responseTransform
			? authConfig.user.responseTransform(data)
			: data;
		setSnapshot({ user, status: "authenticated" });
		return user;
	}

	async function refreshTokens(): Promise<string | null> {
		if (!authConfig.refresh) {
			return null;
		}

		const { url, method = "POST", responseTransform } = authConfig.refresh;
		const { data } = await httpClient.request({ url, method });
		const tokens = responseTransform ? responseTransform(data) : data;

		if (!tokens?.accessToken) {
			return null;
		}

		saveTokens({
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken ?? null,
		});

		setSnapshot({
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken ?? null,
		});

		return tokens.accessToken;
	}

	async function login(credentials: Record<string, any>) {
		const { url } = authConfig.login;
		const { data } = await httpClient.post(url, credentials);

		const parsed = authConfig.login.responseTransform
			? authConfig.login.responseTransform(data)
			: data;

		if (parsed?.accessToken) {
			saveTokens({
				accessToken: parsed.accessToken,
				refreshToken: parsed.refreshToken ?? null,
			});
			setSnapshot({
				accessToken: parsed.accessToken,
				refreshToken: parsed.refreshToken ?? null,
			});
		}

		const user = await fetchUser();
		return user;
	}

	function logout(silent?: boolean) {
		clearTokens();
		setSnapshot({
			status: "unauthenticated",
			user: null,
			accessToken: null,
			refreshToken: null,
		});
		if (!silent) {
			onLogout?.();
		}
	}

	async function initialize() {
		const stored = readTokens();
		if (stored.accessToken) {
			setSnapshot({
				accessToken: stored.accessToken,
				refreshToken: stored.refreshToken,
				status: "checking",
			});
			try {
				await fetchUser();
			} catch {
				logout(true);
			}
		} else {
			setSnapshot({ status: "unauthenticated", user: null });
		}
	}

	return {
		subscribe,
		getSnapshot,
		initialize,
		login,
		logout,
		refreshTokens,
		fetchUser,
	};
}

