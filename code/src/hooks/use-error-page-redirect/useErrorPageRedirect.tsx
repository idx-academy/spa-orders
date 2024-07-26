import {
  Location,
  Navigate,
  NavigateProps,
  useLocation,
  useNavigate
} from "react-router-dom";

import { errorPages } from "@/hooks/use-error-page-redirect/useErrorPageRedirect.constants";
import {
  ErrorPageState,
  RedirectConfig
} from "@/hooks/use-error-page-redirect/useErrorPageRedirect.types";

const createRedirectConfig = ({
  errorType,
  ...state
}: RedirectConfig = {}): NavigateProps => {
  return {
    to: errorPages[errorType ?? "unknown"],
    state,
    replace: true
  } as const;
};

const useErrorPageRedirect = () => {
  const navigate = useNavigate();
  const { state }: Location<ErrorPageState | null> = useLocation();

  const redirect = (config?: RedirectConfig) => {
    const { to, ...navigateConfig } = createRedirectConfig(config);
    navigate(to, navigateConfig);
  };

  const renderRedirectComponent = (config?: RedirectConfig) => {
    return <Navigate {...createRedirectConfig(config)} />;
  };

  return { state, redirect, renderRedirectComponent } as const;
};

export default useErrorPageRedirect;
