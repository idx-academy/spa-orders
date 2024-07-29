import { renderHook } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";

import useFilteredAdminOrders from "@/containers/dashboard-orders-filter-drawer/hooks/use-filtered-admin-orders/useFilteredAdminOrders";

import useFiltersWithApply from "@/hooks/use-filters-with-apply/useFiltersWithApply";
import { useGetAdminOrdersQuery } from "@/store/api/ordersApi";
import timeSpanToDateRange from "@/utils/time-span-to-date-range/timeSpanToDateRange";

jest.mock("@/store/api/ordersApi", () => ({
  useGetAdminOrdersQuery: jest.fn()
}));
jest.mock("@/context/i18n/I18nProvider", () => ({
  ...jest.requireActual("@/context/i18n/I18nProvider"),
  useLocaleContext: jest.fn(() => ({ lang: "en" }))
}));
jest.mock("@/hooks/use-filters-with-apply/useFiltersWithApply");
jest.mock("@/utils/time-span-to-date-range/timeSpanToDateRange");

const mockUseFiltersWithApply = useFiltersWithApply as jest.Mock;
const mockUseGetAdminOrdersQuery = useGetAdminOrdersQuery as jest.Mock;
const mockTimeSpanToDateRange = timeSpanToDateRange as jest.Mock;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn()
}));

const mockSetSearchParams = jest.fn();

const mockFiltersWithApplyValue = {
  filters: {},
  appliedFilters: {},
  activeFiltersCount: 0,
  actions: {}
};

const mockFiltersEmpty = {
  activeFiltersCount: 0,
  filterActions: {},
  filters: {},
  isLoading: false,
  orders: []
};

describe("useFilteredAdminOrders", () => {
  beforeEach(() => {
    mockUseFiltersWithApply.mockReturnValue(mockFiltersWithApplyValue);
    mockUseGetAdminOrdersQuery.mockReturnValue({
      data: { content: [] },
      isLoading: false
    });
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams
    ]);
  });

  describe("without filters", () => {
    test("initial state is correct", () => {
      const { result } = renderHook(useFilteredAdminOrders);
      expect(result.current).toMatchObject(mockFiltersEmpty);
    });

    test("dateRange is undefined when timespan is not provided", () => {
      mockUseFiltersWithApply.mockReturnValueOnce({
        ...mockFiltersWithApplyValue,
        appliedFilters: {}
      });

      const { result } = renderHook(() => useFilteredAdminOrders());
      expect(result.current).toEqual(mockFiltersEmpty);
    });

    test("orders is assigned with content from ordersResponse", () => {
      const ordersData = [{ id: 1, name: "Order 1" }];
      mockUseGetAdminOrdersQuery.mockReturnValueOnce({
        data: { content: ordersData },
        isLoading: false
      });

      const { result } = renderHook(() => useFilteredAdminOrders());
      expect(result.current.orders).toEqual(ordersData);
    });

    test("returns empty orders array when ordersResponse is null", () => {
      mockUseGetAdminOrdersQuery.mockReturnValueOnce({
        data: null,
        isLoading: false
      });

      const { result } = renderHook(() => useFilteredAdminOrders());
      expect(result.current.orders).toEqual([]);
    });

    test("orders is an empty array when ordersResponse has no content", () => {
      mockUseGetAdminOrdersQuery.mockReturnValueOnce({
        data: {},
        isLoading: false
      });

      const { result } = renderHook(() => useFilteredAdminOrders());
      expect(result.current.orders).toEqual([]);
    });

    test("does not set default sort parameter if already present", () => {
      const searchParams = new URLSearchParams("sort=total,asc");
      (useSearchParams as jest.Mock).mockReturnValue([
        searchParams,
        mockSetSearchParams
      ]);

      renderHook(() => useFilteredAdminOrders());

      expect(mockSetSearchParams).not.toHaveBeenCalled();
      expect(searchParams.get("sort")).toEqual("total,asc");
    });
  });

  describe("with filters", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("applies timespan filter correctly", () => {
      const mockTimespan = { start: "2021-01-01", end: "2021-01-31" };
      mockUseFiltersWithApply.mockReturnValueOnce({
        ...mockFiltersWithApplyValue,
        appliedFilters: { timespan: mockTimespan },
        activeFiltersCount: 1
      });
      mockTimeSpanToDateRange.mockReturnValueOnce({
        start: new Date(mockTimespan.start),
        end: new Date(mockTimespan.end)
      });

      const { result } = renderHook(() => useFilteredAdminOrders());
      expect(mockTimeSpanToDateRange).toHaveBeenCalledWith(mockTimespan);
      expect(result.current).toBeDefined();
    });

    test("undefined timespan results in default state", () => {
      const { result } = renderHook(useFilteredAdminOrders);
      expect(result.current).toMatchObject(mockFiltersEmpty);
    });

    test("applies delivery-methods filter correctly", () => {
      const deliveryMethods = new Set(["method1", "method2"]);
      const expectedOrders = [
        { id: 1, name: "Order 1", deliveryMethod: "method1" }
      ];

      mockUseFiltersWithApply.mockReturnValueOnce({
        ...mockFiltersWithApplyValue,
        appliedFilters: { "delivery-methods": deliveryMethods },
        activeFiltersCount: 1
      });

      mockUseGetAdminOrdersQuery.mockReturnValueOnce({
        data: { content: expectedOrders },
        isLoading: false
      });

      const { result } = renderHook(() => useFilteredAdminOrders());
      expect(result.current.orders).toEqual(expectedOrders);
    });

    test("converts statuses set to array when provided", () => {
      const statusesSet = new Set(["PENDING", "SHIPPED"]);
      mockUseFiltersWithApply.mockReturnValueOnce({
        ...mockFiltersWithApplyValue,
        appliedFilters: { statuses: statusesSet },
        activeFiltersCount: 1
      });

      mockUseGetAdminOrdersQuery.mockImplementation((queryParameters) => {
        expect(queryParameters.statuses).toEqual(Array.from(statusesSet));
        return { data: { content: [] }, isLoading: false };
      });

      renderHook(() => useFilteredAdminOrders());
    });

    test("handles empty delivery-methods set correctly", () => {
      mockUseFiltersWithApply.mockReturnValueOnce({
        ...mockFiltersWithApplyValue,
        appliedFilters: { "delivery-methods": new Set() }
      });

      const { result } = renderHook(() => useFilteredAdminOrders());
      expect(mockUseGetAdminOrdersQuery).toHaveBeenCalledWith(
        expect.objectContaining({ deliveryMethods: [] })
      );
      expect(result.current.orders).toEqual([]);
    });
  });
});
