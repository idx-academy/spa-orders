import { Navigate } from "react-router-dom";

import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";

import routePaths from "@/constants/routes";
import {
  useIsAuthLoadingSelector,
  useIsAuthSelector,
  useUserDetailsSelector
} from "@/store/slices/userSlice";
import { NonEmptyArray } from "@/types/common";
import { UserRole } from "@/types/user.types";

type ProtectedRouteProps = {
  element: JSX.Element;
  allowedRoles: NonEmptyArray<UserRole>;
  unauthorizedRedirectPath?: string;
  forbiddenRedirectPath?: string;
};

const ProtectedRoute = ({
  element,
  allowedRoles,
  unauthorizedRedirectPath = routePaths.home.path,
  forbiddenRedirectPath = routePaths.home.path
}: ProtectedRouteProps) => {
  const isAuthenticated = useIsAuthSelector();
  const userDetails = useUserDetailsSelector();
  const isLoading = useIsAuthLoadingSelector();

  if (isLoading) {
    return <PageLoadingFallback fullScreen />;
  }

  if (!isAuthenticated || !userDetails) {
    return <Navigate to={unauthorizedRedirectPath} />;
  }

  const hasAccessToResource = allowedRoles.includes(userDetails.role);

  if (!hasAccessToResource) {
    return <Navigate to={forbiddenRedirectPath} />;
  }

  return element;
};

export default ProtectedRoute;
