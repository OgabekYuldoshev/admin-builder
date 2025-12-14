import { createBrowserRouter, type RouteObject } from "react-router";
import { AppLayout } from "../components";
import {
	HomePage,
	LoginPage,
	ResourceCreatePage,
	ResourceListPage,
	ResourceUpdatePage,
} from "../pages";

export function createRouter() {
	const routes: RouteObject[] = [
		{
			path: "/",
			Component: AppLayout,
			children: [
				{
					index: true,
					Component: HomePage,
				},
				{
					path: ":resourceName",
					children: [
						{
							index: true,
							Component: ResourceListPage,
						},
						{
							path: "create",
							Component: ResourceCreatePage,
						},
						{
							path: ":id/update",
							Component: ResourceUpdatePage,
						},
					],
				},
			],
		},
		{
			path: "login",
			Component: LoginPage,
		},
	];

	return {
		router: createBrowserRouter(routes),
	};
}
