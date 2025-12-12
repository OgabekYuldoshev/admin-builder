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
			{
				path: ":resourceName",
				children: [
					{
						index: true,
						async lazy() {
							const { TemplateListPage } = await importFromPages();

							return {
								Component: TemplateListPage,
							};
						},
					},
					{
						path: "create",
						async lazy() {
							const { TemplateCreatePage } = await importFromPages();

							return {
								Component: TemplateCreatePage,
							};
						},
					},
					{
						path: ":id/update",
						async lazy() {
							const { TemplateUpdatePage } = await importFromPages();

							return {
								Component: TemplateUpdatePage,
							};
						},
					},
				],
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
