import { createBrowserRouter } from "react-router";
import MainPage from "./pages/main-page.tsx";
import PropertyPage from "./pages/property-page.tsx";
import AboutPage from "./pages/about-page.tsx";
import NotFoundPage from "./pages/404-page.tsx";
import HeaderLayout from "./pages/header-layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HeaderLayout,
    children: [
      { index: true, Component: MainPage },
      { path: "/about", Component: AboutPage },
      { path: "/map", Component: MainPage },
    ],
  },
  {
    path: "/:id",
    Component: PropertyPage,
  },
  {
    path: "/admin",
    lazy: async () => {
      const { default: BaseAdminLayout } = await import(
        "./pages/admin/base-admin-layout.tsx"
      );
      return { Component: BaseAdminLayout };
    },

    children: [
      {
        index: true,
        lazy: async () => {
          const { default: MainAdminPage } = await import(
            "./pages/admin/main-admin-page.tsx"
          );
          return { Component: MainAdminPage };
        },
      },
      {
        path: "/admin/add",
        lazy: async () => {
          const { default: CreatePropertyPage } = await import(
            "./pages/admin/create-property-page.tsx"
          );
          return { Component: CreatePropertyPage };
        },
      },
      {
        path: "/admin/:id",
        lazy: async () => {
          const { default: UpdatePropertyPage } = await import(
            "./pages/admin/update-property-page.tsx"
          );
          return { Component: UpdatePropertyPage };
        },
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

export default router;
