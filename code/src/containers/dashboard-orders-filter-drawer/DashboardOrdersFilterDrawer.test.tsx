import { fireEvent, screen } from "@testing-library/react";

import OrdersTabFilterDrawer from "@/containers/dashboard-tabs/components/orders-tab-filter-drawer/OrdersTabFilterDrawer";
import { AdminOrderFilters } from "@/containers/dashboard-tabs/hooks/use-filtered-admin-orders/useFilteredAdminOrders.types";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

const mockApplyFilters = jest.fn();
const mockCheckFilterActive = jest.fn(() => true);
const mockResetFilterByKey = jest.fn();
const mockUpdateFilterByKey = jest.fn();
const mockResetFilters = jest.fn();

const mockCloseFilterDrawer = jest.fn();

type RenderAndMock = {
  activeFiltersCount?: number;
  filters?: Partial<AdminOrderFilters>;
};

const defaultFilters: AdminOrderFilters = {
  paid: false,
  price: { start: 100, end: 1000 },
  statuses: new Set(),
  timespan: "",
  "delivery-methods": new Set()
};

const renderAndMock = ({
  activeFiltersCount = 0,
  filters: filtersFromArgs = {} as AdminOrderFilters
}: RenderAndMock = {}) => {
  const filters = { ...defaultFilters, ...filtersFromArgs };

  return renderWithProviders(
    <OrdersTabFilterDrawer
      activeFiltersCount={activeFiltersCount}
      filters={filters}
      filterActions={{
        applyFilters: mockApplyFilters,
        checkFilterActive: mockCheckFilterActive,
        resetFilterByKey: mockResetFilterByKey,
        updateFilterByKey: mockUpdateFilterByKey,
        resetFilters: mockResetFilters
      }}
      closeFilterDrawer={mockCloseFilterDrawer}
    />
  );
};

describe("OrdersTabFilterDrawer", () => {
  test("applies filters and closes drawer when we press aply filters button", () => {
    renderAndMock();

    const applyFilterButton = screen.getByRole("button", {
      name: "dashboardTabs.orders.filters.applyFiltersButton"
    });
    fireEvent.click(applyFilterButton);

    expect(mockApplyFilters).toHaveBeenCalled();
    expect(mockCloseFilterDrawer).toHaveBeenCalled();
  });

  describe("price filter", () => {
    let rangeEndInput: HTMLElement, rangeStartInput: HTMLElement;

    beforeEach(() => {
      renderAndMock();
      rangeEndInput = screen.getByTestId("range-end");
      rangeStartInput = screen.getByTestId("range-start");
    });

    test("uses default value from filters", () => {
      expect(rangeStartInput).toHaveValue(100);
      expect(rangeEndInput).toHaveValue(1000);
    });

    test("updates correctly", async () => {
      const start = 90;
      const end = 15;

      await typeIntoInput(rangeStartInput, start);
      expect(mockUpdateFilterByKey).toHaveBeenCalledWith("price", {
        start,
        end: defaultFilters.price.end
      });

      await typeIntoInput(rangeEndInput, end);
      expect(mockUpdateFilterByKey).toHaveBeenCalledWith("price", {
        start,
        end
      });
    });

    test("resets correctly", () => {
      const resetButton = screen.getByTestId(
        `reset-filter-button-dashboardTabs.orders.filters.price`
      );

      fireEvent.click(resetButton);
      expect(mockResetFilterByKey).toHaveBeenCalledWith("price");
    });
  });

  describe("timespan filter", () => {
    beforeEach(() => {
      renderAndMock();
    });

    test("uses default value from filters", () => {});

    test("updates correctly", () => {});

    test("resets correctly", () => {});
  });

  describe("isPaid filter", () => {
    let checkbox: HTMLInputElement;

    beforeEach(() => {
      renderAndMock();
      checkbox = screen.getByLabelText("dashboardTabs.orders.filters.isPaid");
    });

    test("uses default value from filters", () => {
      expect(checkbox.checked).toBe(defaultFilters.paid);
    });

    test("updates correctly", () => {
      fireEvent.click(checkbox);

      expect(mockUpdateFilterByKey).toHaveBeenCalledWith(
        "paid",
        !defaultFilters.paid
      );
    });

    test("resets correctly", () => {
      const resetButton = screen.getByTestId(
        `reset-filter-button-dashboardTabs.orders.filters.other`
      );

      fireEvent.click(resetButton);
      expect(mockResetFilterByKey).toHaveBeenCalledWith("paid");
    });
  });
});
