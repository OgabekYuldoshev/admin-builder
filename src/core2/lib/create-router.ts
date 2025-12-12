import type { RouteObject } from "react-router";
import { createBrowserRouter } from "react-router";
import { AppLayout } from "../components/app-layout";

export function createRouter() {
  const importFromPages = () => import("../pages");

  const routes: RouteObject[] = [
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
                const { ResourceListPage } = await importFromPages();
                return {
                  Component: ResourceListPage,
                };
              },
            },
            {
              path: "create",
              async lazy() {
                const { ResourceCreatePage } = await importFromPages();
                return {
                  Component: ResourceCreatePage,
                };
              },
            },
            {
              path: ":id/update",
              async lazy() {
                const { ResourceUpdatePage } = await importFromPages();
                return {
                  Component: ResourceUpdatePage,
                };
              },
            },
          ],
        },
      ],
    },
  ];

  return {
    router: createBrowserRouter(routes),
  };
}
