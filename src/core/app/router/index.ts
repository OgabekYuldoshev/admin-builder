import { createBrowserRouter } from "react-router";
import { AppLayout } from "../../widgets";

const importFromPages = () => import("../../pages");

export const appRouter = createBrowserRouter([
	{
		path: "/",
		Component: AppLayout,
		children: [
			{
				index: true,
				async lazy() {
					const { HomePage } = await importFromPages();

					return {
						Component: HomePage,
					};
				},
			},
		],
	},
	{
		path: "/login",
		async lazy() {
			const { LoginPage } = await importFromPages();

			return {
				Component: LoginPage,
			};
		},
	},
]);
