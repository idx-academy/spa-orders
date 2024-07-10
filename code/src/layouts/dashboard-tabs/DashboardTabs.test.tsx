import { fireEvent, screen } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";

import DashboardTabs from "@/layouts/dashboard-tabs/DashboardTabs";
import {
  DASHBOARD_TAB_NAMES,
  dashboardTabs
} from "@/layouts/dashboard-tabs/DashboardTabs.constants";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const defaultTabName = dashboardTabs[0].name;
const mockSetSearchParams = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn()
}));

jest.mock("@/layouts/dashboard-tabs/components/users-tab/UsersTab", () => ({
  __esModule: true,
  default: () => <div>UsersTab</div>
}));

jest.mock("@/layouts/dashboard-tabs/components/orders-tab/OrdersTab", () => ({
  __esModule: true,
  default: () => <div>OrdersTab</div>
}));

const renderWithMockSearchParams = (params?: Record<string, string>) => {
  (useSearchParams as jest.Mock).mockReturnValue([
    new URLSearchParams(params),
    mockSetSearchParams
  ]);

  renderWithProviders(<DashboardTabs />);
};

describe("DashboardTabs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders default tab if not tab query parameter is present", () => {
    renderWithMockSearchParams();
    expect(mockSetSearchParams).toHaveBeenCalledWith({ tab: defaultTabName });
  });

  test("renders default tab if tab from search params was not found", () => {
    renderWithMockSearchParams({ tab: "not-existing" });
    expect(mockSetSearchParams).toHaveBeenCalledWith({ tab: defaultTabName });
  });

  test("opens tab provided into url by 'tab' key if it exists on constants", () => {
    renderWithMockSearchParams({ tab: DASHBOARD_TAB_NAMES.USERS });
    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });

  test("changes tab correctly", () => {
    renderWithMockSearchParams();

    const ordersTabLabelBox = screen.getByText("dashboardTabs.orders.label")
      .parentElement as HTMLDivElement;

    fireEvent.click(ordersTabLabelBox);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      tab: DASHBOARD_TAB_NAMES.ORDERS
    });
  });

  test("renders corresponding tab content correctly", () => {
    renderWithMockSearchParams({ tab: DASHBOARD_TAB_NAMES.USERS });

    const usersTabContent = screen.getByText("UsersTab");
    expect(usersTabContent).toBeInTheDocument();

    const ordersTabContent = screen.queryByText("OrdersTab");
    expect(ordersTabContent).not.toBeInTheDocument();
  });
});
