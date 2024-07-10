import { fireEvent, screen } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";

import DashboardTabs from "@/layouts/dashboard-tabs/DashboardTabs";
import {
  DASHBOARD_TAB_NAMES,
  dashboardTabs
} from "@/layouts/dashboard-tabs/DashboardTabs.constants";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const activeTabClassName = "dashboard-tabs__label-item--active";
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

type Params = Record<string, string>;

const useUseSearchParamsMock = (params?: Params) => {
  (useSearchParams as jest.Mock).mockReturnValue([
    new URLSearchParams(params),
    mockSetSearchParams
  ]);
};

const renderWithMockSearchParams = (params?: Params) => {
  useUseSearchParamsMock(params);
  const { rerender } = renderWithProviders(<DashboardTabs />);

  return {
    rerenderWithSearchParams: (rerenderedParams?: Params) => {
      useUseSearchParamsMock(rerenderedParams);
      rerender(<DashboardTabs />);
    }
  };
};

describe("DashboardTabs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders default tab if not tab query parameter is present", () => {
    renderWithMockSearchParams();
    expect(mockSetSearchParams).toHaveBeenCalledWith({
      tab: defaultTabName
    });
  });

  test("renders default tab if tab from search params was not found", () => {
    renderWithMockSearchParams({ tab: "not-existing" });
    expect(mockSetSearchParams).toHaveBeenCalledWith({
      tab: defaultTabName
    });
  });

  test("opens tab provided into url by 'tab' key if it exists on constants", () => {
    renderWithMockSearchParams({ tab: DASHBOARD_TAB_NAMES.USERS });
    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });

  test("changes tab correctly", () => {
    const { rerenderWithSearchParams } = renderWithMockSearchParams();

    const ordersTabLabelBox = screen.getByText("dashboardTabs.orders.label")
      .parentElement as HTMLDivElement;

    fireEvent.click(ordersTabLabelBox);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      tab: DASHBOARD_TAB_NAMES.ORDERS
    });

    rerenderWithSearchParams({ tab: DASHBOARD_TAB_NAMES.ORDERS });
    expect(ordersTabLabelBox).toHaveClass(activeTabClassName);

    rerenderWithSearchParams({ tab: DASHBOARD_TAB_NAMES.PRODUCTS });
    expect(ordersTabLabelBox).not.toHaveClass(activeTabClassName);
  });

  test("renders corresponding tab content correctly", () => {
    renderWithMockSearchParams({ tab: DASHBOARD_TAB_NAMES.USERS });

    const usersTabContent = screen.getByText("UsersTab");
    expect(usersTabContent).toBeInTheDocument();

    const ordersTabContent = screen.queryByText("OrdersTab");
    expect(ordersTabContent).not.toBeInTheDocument();
  });
});
