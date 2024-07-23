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

const filterKeys = {
  filter1: "filter1",
  filter2: "filter2"
};

const defaultFilters = {
  [filterKeys.filter1]: "default1",
  [filterKeys.filter2]: "default2"
};

const updatedFilters = {
  [filterKeys.filter1]: "updated1",
  [filterKeys.filter2]: "updated2"
};

const renderAndMock = () => {
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

  const { result } = renderHook(() => useFiltersWithApply(defaultFilters));
  return result;
};

describe("useFiltersWithApply", () => {
  let result: ReturnType<typeof renderAndMock>;

  beforeEach(() => {
    result = renderAndMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("initializes with default filters correctly", () => {
    expect(result.current.filters).toEqual(defaultFilters);
    expect(result.current.appliedFilters).toEqual({});
    expect(result.current.activeFiltersCount).toBe(0);
  });

  test("updates a filter by key correctly", () => {
    act(() => {
      result.current.actions.updateFilterByKey(
        "filter1",
        updatedFilters.filter1
      );
    });

    expect(result.current.filters.filter1).toBe(updatedFilters.filter1);
    expect(result.current.activeFiltersCount).toBe(1);
  });

  test("resets a filter by key correctly", () => {
    act(() => {
      result.current.actions.updateFilterByKey(
        "filter1",
        updatedFilters.filter1
      );
      result.current.actions.resetFilterByKey(filterKeys.filter1);
    });

    expect(result.current.filters.filter1).toBe(defaultFilters.filter1);
    expect(result.current.activeFiltersCount).toBe(0);
  });

  test("resets all filters correctly", () => {
    act(() => {
      result.current.actions.updateFilterByKey(
        "filter1",
        updatedFilters.filter1
      );
      result.current.actions.updateFilterByKey(
        "filter2",
        updatedFilters.filter2
      );
      result.current.actions.resetFilters();
    });

    expect(result.current.filters).toEqual(defaultFilters);
    expect(result.current.activeFiltersCount).toBe(0);
  });

  test("applies filters correctly", () => {
    act(() => {
      result.current.actions.updateFilterByKey(
        "filter1",
        updatedFilters.filter1
      );
      result.current.actions.updateFilterByKey(
        "filter2",
        updatedFilters.filter2
      );
    });

    act(() => {
      result.current.actions.applyFilters();
    });

    const mockDelete = jest.fn();
    jest
      .spyOn(URLSearchParams.prototype, "delete")
      .mockImplementationOnce(mockDelete);

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams(updatedFilters)
    );
    expect(mockDelete).not.toHaveBeenCalled();

    (parseFiltersFromParams as jest.Mock).mockReturnValue({
      defaultActiveFilters: new Set([filterKeys.filter1]),
      defaultFiltersFromParams: { filter1: updatedFilters.filter1 }
    });

    act(() => {
      result.current.actions.resetFilterByKey(filterKeys.filter1);
    });

    act(() => {
      result.current.actions.applyFilters();
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({ filter2: updatedFilters.filter2 })
    );
    expect(mockDelete).toHaveBeenCalled();
  });

  test("checks if a filter is active correctly", () => {
    act(() => {
      result.current.actions.updateFilterByKey(
        filterKeys.filter1,
        updatedFilters.filter1
      );
    });

    expect(result.current.actions.checkFilterActive(filterKeys.filter1)).toBe(
      true
    );
    expect(result.current.actions.checkFilterActive(filterKeys.filter2)).toBe(
      false
    );
  });

  test("populates appliedFilters correctly", () => {
    (parseFiltersFromParams as jest.Mock).mockReturnValueOnce({
      defaultActiveFilters: new Set([filterKeys.filter1, filterKeys.filter2]),
      defaultFiltersFromParams: updatedFilters
    });

    const { result } = renderHook(() => useFiltersWithApply(defaultFilters));

    act(() => {
      result.current.actions.updateFilterByKey(
        filterKeys.filter1,
        updatedFilters.filter1
      );
      result.current.actions.updateFilterByKey(
        filterKeys.filter2,
        updatedFilters.filter2
      );
    });

    expect(result.current.appliedFilters).toEqual(updatedFilters);
  });
});
