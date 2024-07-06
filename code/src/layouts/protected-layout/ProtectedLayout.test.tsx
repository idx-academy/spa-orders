import { screen } from "@testing-library/react";

import ProtectedLayout from "@/layouts/protected-layout/ProtectedLayout";

import routePaths from "@/constants/routes";
import {
  useIsAuthLoadingSelector,
  useIsAuthSelector
} from "@/store/slices/userSlice";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/store/slices/userSlice", () => ({
  __esModule: true,
  useIsAuthSelector: jest.fn(),
  useIsAuthLoadingSelector: jest.fn()
}));

jest.mock("@/layouts/page-loading-fallback/PageLoadingFallback", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-fallback">Loading...</div>
}));

type RenderWithAuth = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

const renderWithAuth = ({
  isAuthenticated = false,
  isLoading = false
}: Partial<RenderWithAuth> = {}) => {
  (useIsAuthLoadingSelector as jest.Mock).mockReturnValue(isLoading);
  (useIsAuthSelector as jest.Mock).mockReturnValue(isAuthenticated);

  renderWithProviders(<ProtectedLayout />);
};

describe("ProtectedLayout", () => {
  it("renders loading fallback when loading", () => {
    renderWithAuth({ isLoading: true });

    const loader = screen.getByTestId("loading-fallback");
    expect(loader).toBeInTheDocument();
  });

  it("redirects to home when not authenticated", () => {
    renderWithAuth();

    expect(window.location.pathname).toBe(routePaths.home.path);
  });

  it("renders Outlet when authenticated", () => {
    renderWithAuth({ isAuthenticated: true });

    const loader = screen.queryByTestId("loading-fallback");
    expect(loader).not.toBeInTheDocument();
  });
});
