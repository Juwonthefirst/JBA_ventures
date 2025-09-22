import { createBrowserRouter } from "react-router";
import MainPage from "./pages/main-page.tsx";
import PropertyPage from "./pages/property-page.tsx";
import BaseAdminPage from "./pages/admin/base-admin-page.tsx";
import MainAdminPage from "./pages/admin/main-admin-page.tsx";
import CreatePropertyPage from "./pages/admin/create-property-page.tsx";
import UpdatePropertyPage from "./pages/admin/update-property-page.tsx";
import NotFoundPage from "./pages/404-page.tsx";
import HeaderLayout from "./pages/header-layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HeaderLayout,
    children: [
      { index: true, Component: MainPage },
      { path: "/about", Component: MainPage },
      { path: "/map", Component: MainPage },
    ],
  },
  {
    path: "/:id",
    Component: PropertyPage,
  },
  {
    path: "/admin",
    Component: BaseAdminPage,
    children: [
      { index: true, Component: MainAdminPage },
      { path: "/admin/add", Component: CreatePropertyPage },
      { path: "/admin/:id", Component: UpdatePropertyPage },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

export default router;
