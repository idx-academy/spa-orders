import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import ProtectedLayout from "@/layouts/protected-layout/ProtectedLayout";
import RootLayout from "@/layouts/root-layout/RootLayout";

import routePaths from "@/constants/routes";
import guestRoutes from "@/routes/guestRoutes";
import protectedRoutes from "@/routes/protectedRoutes";

const ErrorPage = lazy(() => import("@/pages/error/ErrorPage"));
const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"));

const routes: RouteObject[] = [
  {
    path: routePaths.home.path,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      ...guestRoutes,
      {
        element: <ProtectedLayout />,
        children: protectedRoutes
      }
    ]
  },
  {
    path: "*",
    element: <RootLayout />,
    children: [{ path: "*", element: <NotFoundPage /> }]
  }
];

export default routes;
