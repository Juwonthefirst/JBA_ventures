import { createBrowserRouter } from "react-router";
import MainPage from "./pages/main-page.tsx";
import PropertyPage from "./pages/property-page.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainPage
    },
    {
        path: "/:id",
        Component: PropertyPage
    }
]);

export default router;
