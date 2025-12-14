import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks";
import { SplashScreen } from "./splash-screen";

export function ProtectedRoute() {
	const { status } = useAuth();
	const location = useLocation();

	if (status === "checking") {
		return <SplashScreen />;
	}

	if (status === "unauthenticated") {
		return <Navigate to="/login" replace state={{ from: location.pathname }} />;
	}

	return <Outlet />;
}

