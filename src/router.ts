import { createBrowserRouter } from "react-router";
import MainPage from "./pages/main-page.tsx";
import PropertyPage from "./pages/property-page.tsx";
import AdminPage from "./pages/admin-page.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: AdminPage
    },
    {
        path: "/:id",
        Component: PropertyPage
    },
    {
        path: "/admin",
        Component: AdminPage
    }
]);

export default router;
