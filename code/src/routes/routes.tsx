import { RouteObject } from "react-router-dom";
import { lazy } from "react";

import RootLayout from "@/layouts/root-layout/RootLayout";
import ProtectedLayout from "@/layouts/protected-layout/ProtectedLayout";

import routePaths from "@/constants/routes";

import protectedRoutes from "@/routes/protectedRoutes";
import guestRoutes from "@/routes/guestRoutes";

const ErrorPage = lazy(() => import("@/pages/error/ErrorPage"));
const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"));

const routes: RouteObject[] = [
  {
    path: routePaths.home.path,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          ...guestRoutes,
          {
            element: <ProtectedLayout />,
            children: protectedRoutes
          }
        ]
      }
    ]
  },
  {
    path: routePaths.any.path,
    element: <NotFoundPage />
  }
];

export default routes;
