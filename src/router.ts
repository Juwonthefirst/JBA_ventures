import { createBrowserRouter } from "react-router";
import MainPage from "./pages/main-page.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		Component: MainPage,
	},
	{
		path: "/:1",
		Component: "",
	},
]);

export default router;
