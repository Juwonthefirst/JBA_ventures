import { createBrowserRouter } from "react-router";
import MainPage from "./pages/main-page.tsx";
import PropertyPage from "./pages/property-page.tsx";
import BaseAdminPage from "./pages/admin/base-admin-page.tsx";
import MainAdminPage from "./pages/admin/main-admin-page.tsx";
import CreatePropertyPage from "./pages/admin/create-property-page.tsx";

const router = createBrowserRouter([
    {
        path: "/admin",
        Component: MainPage
    },
    {
        path: "/:id",
        Component: PropertyPage
    },
    {
        path: "/",
        Component: BaseAdminPage,
        children: [
            { index: true, Component: MainAdminPage },
            { path: "/admin/add", Component: CreatePropertyPage },
            { path: "/admin/:id", Component: "" }
        ]
    }
]);

export default router;
