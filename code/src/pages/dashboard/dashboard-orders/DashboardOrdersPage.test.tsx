import { fireEvent, screen } from "@testing-library/react";
import React, { useState } from "react";

import useFilteredAdminOrders from "@/containers/dashboard-orders-filter-drawer/hooks/use-filtered-admin-orders/useFilteredAdminOrders";

import DashboardOrdersPage from "@/pages/dashboard/dashboard-orders/DashboardOrdersPage";
import { AdminOrder } from "@/types/order.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockSetIsFilterDrawerOpen = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn()
}));

jest.mock(
  "@/containers/dashboard-orders-filter-drawer/hooks/use-filtered-admin-orders/useFilteredAdminOrders"
);

jest.mock("@/containers/tables/orders-table/OrdersTable", () => ({
  __esModule: true,
  default: () => <div>OrdersTable</div>
}));

jest.mock(
  "@/containers/dashboard-orders-filter-drawer/DashboardOrdersFilterDrawer",
  () => ({
    __esModule: true,
    default: () => <div>OrdersTabFilterDrawer</div>
  })
);

type RenderAndMock = {
  isLoading?: boolean;
  orders?: AdminOrder;
  activeFiltersCount?: number;
  totalPages?: number;
};

const defaultArgs = {
  filters: {},
  filterActions: {},
  activeFiltersCount: 0,
  orders: [],
  isLoading: false,
  totalPages: 1
};

const renderAndMock = (args: RenderAndMock = {}) => {
  (useState as jest.Mock).mockImplementation((init) => [
    init,
    mockSetIsFilterDrawerOpen
  ]);

  (useFilteredAdminOrders as jest.Mock).mockReturnValue({
    ...defaultArgs,
    ...args
  });

  renderWithProviders(<DashboardOrdersPage />);
};

describe("OrdersTab", () => {
  test("renders loading element correctly", () => {
    renderAndMock({ isLoading: true });

    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders typography with filters count when activeFiltersCount is greater than zero", () => {
    const activeFiltersCount = 2;
    renderAndMock({ activeFiltersCount });

    const buttonTypography = screen.getByText(
      `dashboardTabs.orders.filters.titleWithCount/count:${activeFiltersCount}`
    );
    expect(buttonTypography).toBeInTheDocument();
  });

  test("renders typography without active filters count", () => {
    renderAndMock();

    const buttonTypography = screen.getByText(
      "dashboardTabs.orders.filters.title"
    );
    expect(buttonTypography).toBeInTheDocument();
  });

  test("opens filter drawer correctly", () => {
    renderAndMock();

    const filterButton = screen.getByTestId("filter-button");
    fireEvent.click(filterButton);

    expect(mockSetIsFilterDrawerOpen).toHaveBeenCalledWith(true);
  });

  test.skip("closes filter drawer correctly", async () => {
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [false, mockSetIsFilterDrawerOpen])
      .mockImplementationOnce(() => [true, mockSetIsFilterDrawerOpen]);

    renderAndMock();

    const filterButton = screen.getByTestId("filter-button");
    fireEvent.click(filterButton);

    const drawerContent = await screen.findByText("OrdersTabFilterDrawer");
    expect(drawerContent).toBeInTheDocument();

    // @TODO: close drawer

    expect(mockSetIsFilterDrawerOpen).toHaveBeenCalledWith(false);
  });

  test("Should not render pagination if there are one page", () => {
    renderAndMock();

    const prevPageButton = screen.queryByLabelText("Go to previous page");

    expect(prevPageButton).not.toBeInTheDocument();
  });

  test("Should render pagination if there are more than one page", () => {
    const totalPages = 2;
    renderAndMock({ totalPages });

    const prevPageButton = screen.getByLabelText("Go to previous page");

    expect(prevPageButton).toBeInTheDocument();
  });
});
