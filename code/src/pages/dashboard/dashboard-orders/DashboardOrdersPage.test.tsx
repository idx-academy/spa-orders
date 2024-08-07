import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";

import useFilteredAdminOrders from "@/containers/dashboard-orders-filter-drawer/hooks/use-filtered-admin-orders/useFilteredAdminOrders";

import DashboardOrdersPage from "@/pages/dashboard/dashboard-orders/DashboardOrdersPage";
import { AdminOrder } from "@/types/order.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

const mockSetIsFilterDrawerOpen = jest.fn();

const mockApplyFilters = jest.fn();

const mockResetFilterByKey = jest.fn();
const mockUpdateFilterByKey = jest.fn();

jest.mock(
  "@/containers/dashboard-orders-filter-drawer/hooks/use-filtered-admin-orders/useFilteredAdminOrders"
);

jest.mock("@/containers/tables/orders-table/OrdersTable", () => ({
  __esModule: true,
  default: () => <div>OrdersTable</div>
}));

type DashboardTabContainerProps = {
  closeFilterDrawer: () => void;
};

jest.mock(
  "@/containers/dashboard-orders-filter-drawer/DashboardOrdersFilterDrawer",
  () => ({
    __esModule: true,
    default: ({ closeFilterDrawer }: DashboardTabContainerProps) => (
      <button data-testid="close-drawer" onClick={closeFilterDrawer}>
        Close drawer
      </button>
    )
  })
);

// don't change this mock because otherwise it will not work
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn().mockImplementation(jest.requireActual("react").useState)
}));

const defaultArgs = {
  filters: {},
  searchFilters: {},
  filterActions: {},
  searchActions: {
    updateFilterByKey: mockUpdateFilterByKey,
    applyFilters: mockApplyFilters,
    resetFilterByKey: mockResetFilterByKey
  },
  activeFiltersCount: 0,
  orders: [],
  isLoading: false,
  totalPages: 1
};

type RenderAndMock = {
  isLoading?: boolean;
  orders?: AdminOrder;
  activeFiltersCount?: number;
  totalPages?: number;
  searchFilters?: { accountEmail?: string };
  mockUseStateValue?: boolean;
};

const renderAndMock = ({ mockUseStateValue, ...args }: RenderAndMock = {}) => {
  (useFilteredAdminOrders as jest.Mock).mockReturnValue({
    ...defaultArgs,
    ...args
  });

  if (mockUseStateValue !== undefined) {
    (useState as jest.Mock).mockReturnValueOnce([
      mockUseStateValue,
      mockSetIsFilterDrawerOpen
    ]);

    // use render instead of renderWithProviders because it does not work with mock useState for some reason
    render(<DashboardOrdersPage />);
  } else {
    renderWithProviders(<DashboardOrdersPage />);
  }
};

describe("DashboardOrdersPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    renderAndMock({ mockUseStateValue: false });
    expect(useState).toHaveBeenCalledWith(false);

    const closeDrawerButtonFromPlayground =
      screen.queryByTestId("close-drawer");
    expect(closeDrawerButtonFromPlayground).not.toBeInTheDocument();

    const filterButton = screen.getByTestId("filter-button");
    fireEvent.click(filterButton);

    expect(mockSetIsFilterDrawerOpen).toHaveBeenCalledWith(true);
  });

  test("closes filter drawer correctly", async () => {
    renderAndMock({ mockUseStateValue: true });
    expect(useState).not.toHaveBeenCalledWith(true); // initial value for use state in this component is always false, required for mutation tests

    const closeDrawerButtonFromPlayground = screen.getByTestId("close-drawer");
    expect(closeDrawerButtonFromPlayground).toBeInTheDocument();

    fireEvent.click(closeDrawerButtonFromPlayground);
    expect(mockSetIsFilterDrawerOpen).toHaveBeenCalledWith(false);
  });

  test("applays search by email filter correctly", () => {
    renderAndMock();
    const searchInput = screen.getByPlaceholderText(
      /dashboardTabs.orders.search/
    );
    expect(searchInput).toHaveValue("");

    typeIntoInput(searchInput, "user");
    expect(searchInput).toHaveValue("user");

    expect(mockUpdateFilterByKey).toHaveBeenCalledWith("accountEmail", "user");

    const searchButton = screen.getByTestId("SearchIcon");
    fireEvent.click(searchButton);
    expect(mockApplyFilters).toHaveBeenCalledWith({
      additionalParams: { page: "1" }
    });
  });

  test("clears search by email filter correctly", () => {
    renderAndMock();
    const searchInput = screen.getByPlaceholderText(
      /dashboardTabs.orders.search/
    );
    typeIntoInput(searchInput, "user");
    expect(mockUpdateFilterByKey).toHaveBeenCalledWith("accountEmail", "user");

    const clearButton = screen.getByTestId("ClearIcon");

    fireEvent.click(clearButton);
    waitFor(() => {
      expect(searchInput).toHaveValue("");
    });
    expect(mockResetFilterByKey).toHaveBeenCalledWith("accountEmail");
    expect(mockApplyFilters).toHaveBeenCalled();
  });

  test("renders with existing accountEmail filter correctly", () => {
    const accountEmail = "user@example.com";
    renderAndMock({ searchFilters: { accountEmail } });

    const searchInput = screen.getByPlaceholderText(
      /dashboardTabs.orders.search/
    );
    expect(searchInput).toHaveValue(accountEmail);

    expect(mockUpdateFilterByKey).not.toHaveBeenCalled();
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
