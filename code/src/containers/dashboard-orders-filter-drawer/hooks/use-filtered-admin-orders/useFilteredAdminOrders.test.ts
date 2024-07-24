import { renderHook } from "@testing-library/react";

import useFilteredAdminOrders from "@/containers/dashboard-orders-filter-drawer/hooks/use-filtered-admin-orders/useFilteredAdminOrders";

import useFiltersWithApply from "@/hooks/use-filters-with-apply/useFiltersWithApply";
import { useGetAdminOrdersQuery } from "@/store/api/ordersApi";
import timeSpanToDateRange from "@/utils/time-span-to-date-range/timeSpanToDateRange";

jest.mock("@/store/api/ordersApi", () => ({
  useGetAdminOrdersQuery: jest.fn()
}));
jest.mock("@/hooks/use-filters-with-apply/useFiltersWithApply");
jest.mock("@/utils/time-span-to-date-range/timeSpanToDateRange");

const mockUseFiltersWithApply = useFiltersWithApply as jest.Mock;
const mockUseGetAdminOrdersQuery = useGetAdminOrdersQuery as jest.Mock;
const mockTimeSpanToDateRange = timeSpanToDateRange as jest.Mock;

describe("useFilteredAdminOrders", () => {
  beforeEach(() => {
    mockUseFiltersWithApply.mockReturnValue({
      filters: {},
      appliedFilters: {},
      activeFiltersCount: 0,
      actions: {}
    });
    mockUseGetAdminOrdersQuery.mockReturnValue({
      data: { content: [] },
      isLoading: false
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("initial state is correct", () => {
    const { result } = renderHook(useFilteredAdminOrders);
    expect(result.current).toMatchObject({
      filters: {},
      filterActions: {},
      activeFiltersCount: 0,
      orders: [],
      isLoading: false
    });
  });

  test("dateRange is undefined when timespan is not provided", () => {
    mockUseFiltersWithApply.mockReturnValueOnce({
      filters: {},
      appliedFilters: {}, // timespan not included
      activeFiltersCount: 0,
      actions: {}
    });

    const { result } = renderHook(() => useFilteredAdminOrders());
    expect(result.current).toEqual({
      activeFiltersCount: 0,
      filterActions: {},
      filters: {},
      isLoading: false,
      orders: []
    });
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
      data: null, // Simulate API returning null
      isLoading: false
    });

    const { result } = renderHook(() => useFilteredAdminOrders());
    expect(result.current.orders).toEqual([]);
  });

  test("orders is an empty array when ordersResponse has no content", () => {
    mockUseGetAdminOrdersQuery.mockReturnValueOnce({
      data: {}, // No content
      isLoading: false
    });

    const { result } = renderHook(() => useFilteredAdminOrders());
    expect(result.current.orders).toEqual([]);
  });

  describe("with filters", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("applies timespan filter correctly", () => {
      const mockTimespan = { start: "2021-01-01", end: "2021-01-31" };
      mockUseFiltersWithApply.mockReturnValueOnce({
        filters: {},
        appliedFilters: { timespan: mockTimespan },
        activeFiltersCount: 1,
        actions: {}
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
      expect(result.current).toMatchObject({
        activeFiltersCount: 0,
        isLoading: false,
        orders: []
      });
    });

    test("applies delivery-methods filter correctly", () => {
      const deliveryMethods = new Set(["method1", "method2"]);
      const expectedOrders = [
        { id: 1, name: "Order 1", deliveryMethod: "method1" }
      ];

      mockUseFiltersWithApply.mockReturnValueOnce({
        filters: {},
        appliedFilters: { "delivery-methods": deliveryMethods },
        activeFiltersCount: 1,
        actions: {}
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
        filters: {},
        appliedFilters: { statuses: statusesSet },
        activeFiltersCount: 1,
        actions: {}
      });

      mockUseGetAdminOrdersQuery.mockImplementation((queryParameters) => {
        expect(queryParameters.statuses).toEqual(Array.from(statusesSet));
        return { data: { content: [] }, isLoading: false };
      });

      renderHook(() => useFilteredAdminOrders());
    });

    test("handles empty delivery-methods set correctly", () => {
      mockUseFiltersWithApply.mockReturnValueOnce({
        filters: {},
        appliedFilters: { "delivery-methods": new Set() },
        activeFiltersCount: 0,
        actions: {}
      });

      const { result } = renderHook(() => useFilteredAdminOrders());
      expect(mockUseGetAdminOrdersQuery).toHaveBeenCalledWith({
        isPaid: undefined,
        totalLess: undefined,
        totalMore: undefined,
        statuses: undefined,
        deliveryMethods: [],
        createdBefore: undefined,
        createdAfter: undefined
      });
      expect(result.current.orders).toEqual([]);
    });
  });
});
