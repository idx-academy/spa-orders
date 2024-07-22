import { act, renderHook } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";

import parseFiltersFromParams from "@/hooks/use-filters-with-apply/parse-filters-from-params/parseFiltersFromParams";
import serializeToQueryString from "@/hooks/use-filters-with-apply/serialize-to-query-string/serializeToQueryString";
import useFiltersWithApply from "@/hooks/use-filters-with-apply/useFiltersWithApply";

jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn()
}));

jest.mock(
  "@/hooks/use-filters-with-apply/parse-filters-from-params/parseFiltersFromParams"
);
jest.mock(
  "@/hooks/use-filters-with-apply/serialize-to-query-string/serializeToQueryString"
);

const mockSetSearchParams = jest.fn();

describe("useFiltersWithApply", () => {
  let defaultFilters: Record<string, unknown>;

  beforeEach(() => {
    defaultFilters = { filter1: "default1", filter2: "default2" };

    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams
    ]);

    (parseFiltersFromParams as jest.Mock).mockReturnValue({
      defaultActiveFilters: new Set(),
      defaultFiltersFromParams: defaultFilters
    });

    (serializeToQueryString as jest.Mock).mockImplementation((value: object) =>
      value.toString()
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("initializes with default filters correctly", () => {
    const { result } = renderHook(() => useFiltersWithApply(defaultFilters));

    expect(result.current.filters).toEqual(defaultFilters);
    expect(result.current.appliedFilters).toEqual({});
    expect(result.current.activeFiltersCount).toBe(0);
  });

  test("updates a filter by key correctly", () => {
    const { result } = renderHook(() => useFiltersWithApply(defaultFilters));

    act(() => {
      result.current.actions.updateFilterByKey("filter1", "updated1");
    });

    expect(result.current.filters.filter1).toBe("updated1");
    expect(result.current.activeFiltersCount).toBe(1);
  });

  test("resets a filter by key correctly", () => {
    const { result } = renderHook(() => useFiltersWithApply(defaultFilters));

    act(() => {
      result.current.actions.updateFilterByKey("filter1", "updated1");
      result.current.actions.resetFilterByKey("filter1");
    });

    expect(result.current.filters.filter1).toBe("default1");
    expect(result.current.activeFiltersCount).toBe(0);
  });

  test("resets all filters correctly", () => {
    const { result } = renderHook(() => useFiltersWithApply(defaultFilters));

    act(() => {
      result.current.actions.updateFilterByKey("filter1", "updated1");
      result.current.actions.updateFilterByKey("filter2", "updated2");
      result.current.actions.resetFilters();
    });

    expect(result.current.filters).toEqual(defaultFilters);
    expect(result.current.activeFiltersCount).toBe(0);
  });

  test("applies filters correctly", () => {
    const { result } = renderHook(() => useFiltersWithApply(defaultFilters));

    act(() => {
      result.current.actions.updateFilterByKey("filter1", "updated1");
      result.current.actions.updateFilterByKey("filter2", "updated2");
    });

    act(() => {
      result.current.actions.applyFilters();
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({ filter1: "updated1", filter2: "updated2" })
    );

    (parseFiltersFromParams as jest.Mock).mockReturnValue({
      defaultActiveFilters: new Set(["filter1"]),
      defaultFiltersFromParams: { filter1: "updated1" }
    });

    act(() => {
      result.current.actions.resetFilterByKey("filter1");
    });

    act(() => {
      result.current.actions.applyFilters();
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({ filter2: "updated2" })
    );
  });

  test("checks if a filter is active correctly", () => {
    const { result } = renderHook(() => useFiltersWithApply(defaultFilters));

    act(() => {
      result.current.actions.updateFilterByKey("filter1", "updated1");
    });

    expect(result.current.actions.checkFilterActive("filter1")).toBe(true);
    expect(result.current.actions.checkFilterActive("filter2")).toBe(false);
  });

  test("populates appliedFilters correctly", () => {
    (parseFiltersFromParams as jest.Mock).mockReturnValueOnce({
      defaultActiveFilters: new Set(["filter1", "filter2"]),
      defaultFiltersFromParams: { filter1: "updated1", filter2: "updated2" }
    });

    const { result } = renderHook(() => useFiltersWithApply(defaultFilters));

    act(() => {
      result.current.actions.updateFilterByKey("filter1", "updated1");
      result.current.actions.updateFilterByKey("filter2", "updated2");
    });

    expect(result.current.appliedFilters).toEqual({
      filter1: "updated1",
      filter2: "updated2"
    });
  });
});
