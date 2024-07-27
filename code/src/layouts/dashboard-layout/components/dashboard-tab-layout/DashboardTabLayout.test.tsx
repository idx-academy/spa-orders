import { useLocation } from "react-router-dom";

import DashboardTabLayout from "@/layouts/dashboard-layout/components/dashboard-tab-layout/DashboardTabLayout";

import routePaths from "@/constants/routes";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: jest.fn()
}));

const activeTabPath = "/dashboard/orders";

const renderAndMock = (pathname: string) => {
  (useLocation as jest.Mock).mockReturnValue({
    pathname
  });

  renderWithProviders(
    <DashboardTabLayout tabs={[]} activeTabPath={activeTabPath} />
  );
};

describe("DashboardTabLayout", () => {
  test("does not redirect to activeTabPath when we already on valid tab", () => {
    renderAndMock(routePaths.dashboard.orders.path);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("redirects to activeTabPath when we are on dashboard path", () => {
    renderAndMock(routePaths.dashboard.path);
    expect(mockNavigate).toHaveBeenCalledWith(activeTabPath);
  });
});
