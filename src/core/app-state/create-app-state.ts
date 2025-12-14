import { createSafeContext } from "@mantine/core";
import { defaultUiConfig } from "../config";
import type { AppConfig, UiConfig } from "../types";
import { createHttpClient } from "../utils";
import { createAuthController } from "./create-auth-controller";
import { createResourceRegistry } from "./create-resource-registry";
import { createRouter } from "./create-router";

export function createAppState(appConfig: AppConfig) {
	let authController: ReturnType<typeof createAuthController> | null = null;

	const httpClient = createHttpClient(appConfig.http, {
		getAccessToken: () => authController?.getSnapshot().accessToken ?? null,
		refreshToken: () => authController?.refreshTokens() ?? Promise.resolve(null),
		onUnauthorized: () => authController?.logout(),
	});

	authController = createAuthController({
		authConfig: appConfig.auth,
		httpClient,
		onLogout: () => {
			// we keep router intact; consumer can listen through useAuth
		},
	});

	const resourceRegistry = createResourceRegistry({
		appConfig,
		httpClient,
	});

	const appRouter = createRouter();
	const uiConfig: UiConfig = {
		list: {
			...defaultUiConfig.list,
			...appConfig.ui?.list,
		},
	};

	return {
		resourceRegistry,
		httpClient,
		appConfig,
		uiConfig,
		appRouter,
		auth: authController,
	};
}

export type AppState = ReturnType<typeof createAppState>;

export const [AppStateProvider, useAppState] = createSafeContext<AppState>(
	"App state not found!",
);
