import { useEffect } from "react";
import { useAppState } from "../app-state";

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
	const { auth } = useAppState();

	useEffect(() => {
		void auth.initialize();
	}, [auth]);

	return <>{children}</>;
}

