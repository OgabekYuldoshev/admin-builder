export type StoredTokens = {
	accessToken: string | null;
	refreshToken: string | null;
};

function getStorage(): Storage | null {
	if (typeof window === "undefined") return null;
	return window.localStorage;
}

export function readTokens(): StoredTokens {
	const storage = getStorage();
	if (!storage) {
		return { accessToken: null, refreshToken: null };
	}

	return {
		accessToken: storage.getItem("accessToken"),
		refreshToken: storage.getItem("refreshToken"),
	};
}

export function saveTokens(tokens: Partial<StoredTokens>) {
	const storage = getStorage();
	if (!storage) return;

	if (tokens.accessToken !== undefined) {
		if (tokens.accessToken === null) storage.removeItem("accessToken");
		else storage.setItem("accessToken", tokens.accessToken);
	}

	if (tokens.refreshToken !== undefined) {
		if (tokens.refreshToken === null) storage.removeItem("refreshToken");
		else storage.setItem("refreshToken", tokens.refreshToken);
	}
}

export function clearTokens() {
	saveTokens({ accessToken: null, refreshToken: null });
}

