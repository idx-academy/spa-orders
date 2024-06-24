import { RouteObject } from "react-router-dom";

// @TODO: Add lazy imports
import RootLayout from "@/layouts/root-layout/RootLayout";
import ErrorPage from "@/pages/error/ErrorPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import HomePage from "@/pages/home/HomePage";
import ProductsPage from "@/pages/products/ProductsPage";

const routes: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [{ index: true, element: <HomePage /> }]
      }
    ]
  },
  {
    path: "/products",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [{ index: true, element: <ProductsPage /> }]
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
];

export default routes;
