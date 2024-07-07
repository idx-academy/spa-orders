import { screen } from "@testing-library/react";
import { Navigate } from "react-router-dom";

import { ROLES } from "@/constants/common";
import ProtectedRoute from "@/routes/protected-route/ProtectedRoute";
import {
  useIsAuthLoadingSelector,
  useIsAuthSelector,
  useUserDetailsSelector
} from "@/store/slices/userSlice";
import { UserRole } from "@/types/user.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/store/slices/userSlice", () => ({
  useIsAuthLoadingSelector: jest.fn(),
  useIsAuthSelector: jest.fn(),
  useUserDetailsSelector: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(() => null)
}));

jest.mock("@/layouts/page-loading-fallback/PageLoadingFallback", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>
}));

type RenderComponent = {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole;
  forbiddenRedirectPath: string;
  unauthorizedRedirectPath: string;
};

const renderComponent = ({
  isAuthenticated = false,
  isLoading = false,
  role,
  forbiddenRedirectPath,
  unauthorizedRedirectPath
}: Partial<RenderComponent> = {}) => {
  (useIsAuthLoadingSelector as jest.Mock).mockReturnValue(isLoading);
  (useIsAuthSelector as jest.Mock).mockReturnValue(isAuthenticated);
  (useUserDetailsSelector as jest.Mock).mockReturnValue(role ? { role } : null);

  return renderWithProviders(
    <ProtectedRoute
      element={<div>Protected Content</div>}
      allowedRoles={[ROLES.ADMIN]}
      forbiddenRedirectPath={forbiddenRedirectPath}
      unauthorizedRedirectPath={unauthorizedRedirectPath}
    />
  );
};

describe("ProtectedRoute", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading fallback initially", () => {
    renderComponent({ isLoading: true });

    const loadingComponent = screen.getByText("Loading...");
    expect(loadingComponent).toBeInTheDocument();
  });

  test("redirects to unauthorized path if user is not authenticated", () => {
    renderComponent();

    expect(Navigate).toHaveBeenCalled();
  });

  test("redirects to unauthorized path if userDetails is null", () => {
    renderComponent({
      isAuthenticated: true,
      unauthorizedRedirectPath: "/401"
    });

    expect(Navigate).toHaveBeenCalledWith({ to: "/401" }, {});
  });

  test("redirects to forbidden path if user does not have the required role", () => {
    renderComponent({
      isAuthenticated: true,
      role: ROLES.USER,
      forbiddenRedirectPath: "/403"
    });

    expect(Navigate).toHaveBeenCalledWith({ to: "/403" }, {});
  });

  test("renders protected element if user is authenticated and has required role", () => {
    renderComponent({
      isAuthenticated: true,
      role: ROLES.ADMIN
    });

    const protectedContent = screen.getByText("Protected Content");
    expect(protectedContent).toBeInTheDocument();
  });
});
