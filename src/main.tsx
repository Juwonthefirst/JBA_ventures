import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router.js";

createRoot(document.getElementById("root") as HTMLDivElement).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
