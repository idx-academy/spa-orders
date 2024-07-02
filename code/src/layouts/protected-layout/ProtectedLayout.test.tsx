import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/utils/test-utils";
import ProtectedLayout from "@/layouts/protected-layout/ProtectedLayout";
import { useIsAuthSelector } from "@/store/slices/userSlice";
import routePaths from "@/constants/routes";

jest.mock("@/store/slices/userSlice", () => ({
  __esModule: true,
  useIsAuthSelector: jest.fn()
}));

jest.mock("@/layouts/page-loading-fallback/PageLoadingFallback", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-fallback">Loading...</div>
}));

type HookOutput = Partial<ReturnType<typeof useIsAuthSelector>>;

const renderWithMock = (useIsAuthSelectorHookOutput: HookOutput = {}) => {
  (useIsAuthSelector as jest.Mock).mockReturnValue({
    isLoading: false,
    isAuthenticated: false,
    ...useIsAuthSelectorHookOutput
  });

  renderWithProviders(<ProtectedLayout />);
};

describe("ProtectedLayout", () => {
  it("renders loading fallback when loading", () => {
    renderWithMock({ isLoading: true });

    const loader = screen.getByTestId("loading-fallback");
    expect(loader).toBeInTheDocument();
  });

  it("redirects to home when not authenticated", () => {
    renderWithMock();

    expect(window.location.pathname).toBe(routePaths.home.path);
  });

  it("renders Outlet when authenticated", () => {
    renderWithMock({ isAuthenticated: true });

    const loader = screen.queryByTestId("loading-fallback");
    expect(loader).not.toBeInTheDocument();
  });
});
