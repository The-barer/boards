import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Pages/Layout";
import HomePage from "../Pages/Home";
import Auth from "../Pages/Auth";
import { ErrorPage } from "../Pages/ErrorPage";
import { Secret } from "../Pages/Secret";
import { ProtectedRoute } from "../Components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/main",
        element: (
          <ProtectedRoute>
            <Secret />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/auth", element: <Auth /> },
]);
