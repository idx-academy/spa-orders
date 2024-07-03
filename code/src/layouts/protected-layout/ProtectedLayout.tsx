import { Navigate, Outlet } from "react-router-dom";
import routePaths from "@/constants/routes";
import PageLoadingFallback from "@/layouts/page-loading-fallback/PageLoadingFallback";
import {
  useIsAuthLoadingSelector,
  useIsAuthSelector
} from "@/store/slices/userSlice";

const ProtectedLayout = () => {
  const isAuthenticated = useIsAuthSelector();
  const isLoading = useIsAuthLoadingSelector();

  if (isLoading) {
    return <PageLoadingFallback fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={routePaths.home.path} />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
