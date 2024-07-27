import { screen } from "@testing-library/react";
import { useLocation } from "react-router-dom";

import { DashboardTab as DashboardTabType } from "@/layouts/dashboard-layout/DashboardLayout.types";
import { dashboardManagerTabs } from "@/layouts/dashboard-layout/components/dashboard-manager-tab-layout/DashboardManagerLayout.constants";
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

type RenderAndMock = {
  pathname: string;
  tabs: DashboardTabType[];
};

const renderAndMock = ({
  pathname = routePaths.dashboard.orders.path,
  tabs = []
}: Partial<RenderAndMock> = {}) => {
  (useLocation as jest.Mock).mockReturnValue({
    pathname
  });

  renderWithProviders(
    <DashboardTabLayout tabs={tabs} activeTabPath={activeTabPath} />
  );
};

describe("DashboardTabLayout", () => {
  test("renders tabs correctly", () => {
    renderAndMock({ tabs: dashboardManagerTabs });

    const tabLabels = screen.getAllByTestId("dashboard-tab-label");
    expect(tabLabels).toHaveLength(dashboardManagerTabs.length);
  });

  test("does not redirect to activeTabPath when we already on valid tab", () => {
    renderAndMock();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("redirects to activeTabPath when we are on dashboard path", () => {
    renderAndMock({ pathname: routePaths.dashboard.path });
    expect(mockNavigate).toHaveBeenCalledWith(activeTabPath);
  });
});
