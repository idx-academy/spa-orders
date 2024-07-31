import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import DashboardOrdersFilterDrawer from "@/containers/dashboard-orders-filter-drawer/DashboardOrdersFilterDrawer";
import { AdminOrderFilters } from "@/containers/dashboard-orders-filter-drawer/hooks/use-filtered-admin-orders/useFilteredAdminOrders.types";

import { deliveryMethods } from "@/constants/deliveryMethods";
import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { DeliveryMethod } from "@/types/delivery.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

const mockApplyFilters = jest.fn();
const mockCheckFilterActive = jest.fn(() => true);
const mockResetFilterByKey = jest.fn();
const mockUpdateFilterByKey = jest.fn();
const mockResetFilters = jest.fn();
const mockCloseFilterDrawer = jest.fn();

const defaultFilters: AdminOrderFilters = {
  paid: false,
  price: { start: 100, end: 1000 },
  statuses: new Set(),
  timespan: "",
  "delivery-methods": new Set()
};

type RenderAndMock = {
  activeFiltersCount?: number;
  filters?: Partial<AdminOrderFilters>;
};

const renderAndMock = ({
  activeFiltersCount = 0,
  filters: filtersFromArgs = {}
}: RenderAndMock = {}) => {
  const filters = { ...defaultFilters, ...filtersFromArgs };

  return renderWithProviders(
    <DashboardOrdersFilterDrawer
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
  describe("apply filters and drawer actions", () => {
    test("applies filters and closes drawer when apply filters button is pressed", () => {
      renderAndMock();
      const applyFilterButton = screen.getByRole("button", {
        name: "dashboardTabs.orders.filters.applyFiltersButton"
      });
      fireEvent.click(applyFilterButton);
      expect(mockApplyFilters).toHaveBeenCalled();
      expect(mockCloseFilterDrawer).toHaveBeenCalled();
    });
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
      const end = 1500;

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
        "reset-filter-button-dashboardTabs.orders.filters.price"
      );
      fireEvent.click(resetButton);
      expect(mockResetFilterByKey).toHaveBeenCalledWith("price");
    });
  });

  describe("order status checkboxes", () => {
    beforeEach(() => {
      renderAndMock();
    });

    test("renders checkboxes with correct labels and checked state", () => {
      Object.entries(orderStatusesTranslationKeys).forEach(
        ([status, translationKey]) => {
          const checkbox = screen.getByLabelText(translationKey);
          expect(checkbox).toBeInTheDocument();

          if (
            defaultFilters.statuses.has(
              status as keyof typeof orderStatusesTranslationKeys
            )
          ) {
            expect(checkbox).toBeChecked();
          } else {
            expect(checkbox).not.toBeChecked();
          }
        }
      );
    });
  });

  describe("checkbox list changes", () => {
    beforeEach(() => {
      renderAndMock();
    });

    test("adds value to set when checkbox is checked", () => {
      const checkbox = screen.getByLabelText(deliveryMethods[0].translationKey);
      fireEvent.click(checkbox);
      expect(mockUpdateFilterByKey).toHaveBeenCalledWith(
        "delivery-methods",
        new Set(["NOVA"])
      );
    });

    test("handles checkbox list change correctly for delivery methods", () => {
      const deliveryMethodCheckbox = screen.getByLabelText(
        deliveryMethods[0].translationKey
      );
      fireEvent.click(deliveryMethodCheckbox);
      expect(mockUpdateFilterByKey).toHaveBeenCalledWith(
        "delivery-methods",
        expect.any(Set)
      );
    });
  });

  describe("timespan filter", () => {
    beforeEach(() => {
      renderAndMock();
    });

    test("date period select has the correct className from inputProps", () => {
      const timespanSelect = screen.getByRole("combobox");

      expect(timespanSelect).toHaveClass(
        "order-tab-filters__date-period-select"
      );
    });

    test("uses default value from filters", () => {
      const timespanSelect = screen.getByRole("combobox");
      fireEvent.mouseDown(timespanSelect);
      const selectedOption = screen.getAllByText("select.defaultOption");
      expect(selectedOption[0]).toBeInTheDocument();
    });

    test("updates correctly", async () => {
      const timespanSelect = screen.getByRole("combobox");
      fireEvent.mouseDown(timespanSelect);

      const optionToSelect = screen.getByRole("option", {
        name: "timespan.last7Days"
      });

      act(() => {
        fireEvent.click(optionToSelect);
      });

      await waitFor(() => {
        expect(mockUpdateFilterByKey).toHaveBeenCalledWith(
          "timespan",
          "last-week"
        );
      });

      expect(optionToSelect).toBeInTheDocument();
    });

    test("resets correctly", () => {
      const resetButton = screen.getByTestId(
        "reset-filter-button-dashboardTabs.orders.filters.timespan"
      );
      fireEvent.click(resetButton);
      expect(mockResetFilterByKey).toHaveBeenCalledWith("timespan");
    });
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
        "reset-filter-button-dashboardTabs.orders.filters.other"
      );
      fireEvent.click(resetButton);
      expect(mockResetFilterByKey).toHaveBeenCalledWith("paid");
    });
  });

  describe("delivery methods filter", () => {
    test("updates correctly", () => {
      const mockFilters = {
        ...defaultFilters,
        "delivery-methods": new Set(["NOVA" as DeliveryMethod])
      };

      renderAndMock({ filters: mockFilters });

      const deliveryMethodCheckbox = screen.getByLabelText(
        deliveryMethods[0].translationKey
      );
      fireEvent.click(deliveryMethodCheckbox);

      expect(mockUpdateFilterByKey).toHaveBeenCalledWith(
        "delivery-methods",
        new Set<DeliveryMethod>()
      );
    });

    test("resets correctly", () => {
      renderAndMock();

      const resetButton = screen.getByTestId(
        "reset-filter-button-dashboardTabs.orders.filters.deliveryMethod"
      );
      fireEvent.click(resetButton);

      expect(mockResetFilterByKey).toHaveBeenCalledWith("delivery-methods");
    });

    test("applies filters and closes drawer on apply filters button click", () => {
      renderAndMock();

      const applyFilterButton = screen.getByRole("button", {
        name: "dashboardTabs.orders.filters.applyFiltersButton"
      });
      fireEvent.click(applyFilterButton);

      expect(mockApplyFilters).toHaveBeenCalled();
      expect(mockCloseFilterDrawer).toHaveBeenCalled();
    });
  });

  describe("clear filters", () => {
    beforeEach(() => {
      renderAndMock({ activeFiltersCount: 1 });
    });

    test("resets order status filter correctly", () => {
      const resetButton = screen.getByTestId(
        "reset-filter-button-dashboardTabs.orders.filters.status"
      );
      fireEvent.click(resetButton);
      expect(mockResetFilterByKey).toHaveBeenCalledWith("statuses");
    });

    test("resets all filters correctly", () => {
      const resetButton = screen.getByTestId("FilterListOffIcon");
      fireEvent.click(resetButton);
      expect(mockResetFilters).toHaveBeenCalled();
    });
  });

  describe("active filters button", () => {
    test("renders 'clear all filters' button when activeFiltersCount > 0", () => {
      renderAndMock({ activeFiltersCount: 1 });
      const clearAllFiltersButton = screen.getByTestId("FilterListOffIcon");
      expect(clearAllFiltersButton).toBeInTheDocument();
    });

    test("does not render 'clear all filters' button when activeFiltersCount is 0", () => {
      renderAndMock({ activeFiltersCount: 0 });
      const clearAllFiltersButton = screen.queryByTestId("FilterListOffIcon");
      expect(clearAllFiltersButton).toBeNull();
    });
  });
});
