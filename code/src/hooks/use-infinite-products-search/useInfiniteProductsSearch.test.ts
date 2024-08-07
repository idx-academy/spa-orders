import { skipToken } from "@reduxjs/toolkit/query/react";
import { act, renderHook, waitFor } from "@testing-library/react";

import { useLocaleContext } from "@/context/i18n/I18nProvider";
import useDebouncedValue from "@/hooks/use-debounced-value/useDebouncedValue";
import useInfiniteProductsSearch from "@/hooks/use-infinite-products-search/useInfiniteProductsSearch";
import { useGetUserProductsBySearchQuery } from "@/store/api/productsApi";

jest.mock("@/hooks/use-debounced-value/useDebouncedValue");
jest.mock("@/context/i18n/I18nProvider");
jest.mock("@/store/api/productsApi");

type MockContent = {
  id: number;
  name: string;
};

type MockDataContent = {
  content: MockContent[];
  last: boolean;
};

type MockData = {
  data?: MockDataContent | null;
  isLoading: boolean;
  isError: boolean;
};

const mockLocaleContext = useLocaleContext as jest.Mock;
const mockUseDebouncedValue = useDebouncedValue as jest.Mock;
const mockUseGetUserProductsBySearchQuery =
  useGetUserProductsBySearchQuery as jest.Mock;

const defaultMockData: MockData = {
  data: null,
  isLoading: false,
  isError: false
};

const baseMockData = {
  isLoading: false,
  isError: false
};

const initialMockData: MockData = {
  ...baseMockData,
  data: {
    content: [{ id: 1, name: "test" }],
    last: false
  }
};

const newMockData: MockData = {
  ...baseMockData,
  data: {
    content: [{ id: 2, name: "test2" }],
    last: true
  }
};

const searchByQueryParams = {
  searchQuery: "test",
  lang: "en",
  page: 0,
  size: 8
};

const setup = (mockData = defaultMockData) => {
  mockLocaleContext.mockReturnValue({ locale: "en" });
  mockUseDebouncedValue.mockImplementation((value) => value);
  mockUseGetUserProductsBySearchQuery.mockReturnValue(mockData);
};

describe("useInfiniteProductsSearch", () => {
  beforeEach(() => {
    setup();
  });

  describe("Query Parameters", () => {
    test("sets query parameters when debouncedQuery.length >= minQueryLength", async () => {
      mockUseDebouncedValue.mockImplementation((value) => value);
      const mockData = { content: [{ id: 1, name: "test" }], last: false };
      mockUseGetUserProductsBySearchQuery.mockReturnValue({
        data: mockData,
        isLoading: false,
        isError: false
      });

      renderHook(() =>
        useInfiniteProductsSearch({ query: "test", minQueryLength: 4 })
      );

      await waitFor(() => {
        expect(mockUseGetUserProductsBySearchQuery).toHaveBeenCalledWith(
          searchByQueryParams
        );
      });
    });

    test("returns skipToken when debouncedQuery.length < minQueryLength", async () => {
      mockUseDebouncedValue.mockImplementation((value) => value);
      mockUseGetUserProductsBySearchQuery.mockReturnValue({
        data: null,
        isLoading: false,
        isError: false
      });

      renderHook(() =>
        useInfiniteProductsSearch({ query: "tes", minQueryLength: 4 })
      );

      await waitFor(() => {
        expect(mockUseGetUserProductsBySearchQuery).toHaveBeenCalledWith(
          skipToken
        );
      });
    });
  });

  test("initializes with default values", () => {
    const { result } = renderHook(() =>
      useInfiniteProductsSearch({ query: "" })
    );

    expect(result.current.searchProducts).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  test("resets search when debounced query changes", () => {
    setup(initialMockData);
    const { result, rerender } = renderHook(
      ({ query }) => useInfiniteProductsSearch({ query }),
      {
        initialProps: { query: "test" }
      }
    );

    act(() => {
      rerender({ query: "new query" });
    });

    expect(result.current.searchProducts).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  test("loads and appends data correctly", async () => {
    setup(initialMockData);
    const { result, rerender } = renderHook(
      ({ query }) => useInfiniteProductsSearch({ query }),
      {
        initialProps: { query: "test" }
      }
    );

    await waitFor(() =>
      expect(result.current.searchProducts).toEqual(initialMockData.data)
    );

    setup(newMockData);
    act(() => {
      result.current.loadNextPage();
      rerender({ query: "test" });
    });

    await waitFor(() =>
      expect(result.current.searchProducts?.content).toHaveLength(2)
    );
    expect(result.current.searchProducts?.content[0]).toEqual({
      id: 1,
      name: "test"
    });
    expect(result.current.searchProducts?.content[1]).toEqual({
      id: 2,
      name: "test2"
    });
  });

  test("does not load next page if it is the last page", async () => {
    setup(newMockData);
    const { result } = renderHook(() =>
      useInfiniteProductsSearch({ query: "test" })
    );

    await waitFor(() =>
      expect(result.current.searchProducts).toEqual(newMockData.data)
    );

    act(() => {
      result.current.loadNextPage();
    });

    expect(result.current.searchProducts?.content).toHaveLength(1);
  });

  test("handles loading and error states", () => {
    const loadingMockData: MockData = {
      ...baseMockData,
      isLoading: true
    };

    setup(loadingMockData);
    const { result } = renderHook(() =>
      useInfiniteProductsSearch({ query: "test" })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);

    const errorMockData: MockData = {
      ...baseMockData,
      isError: true
    };

    setup(errorMockData);
    const { result: errorResult } = renderHook(() =>
      useInfiniteProductsSearch({ query: "test" })
    );

    expect(errorResult.current.isLoading).toBe(false);
    expect(errorResult.current.isError).toBe(true);
  });

  test("increments currentPage when loadNextPage is called and not last page", async () => {
    setup(initialMockData);
    const { result } = renderHook(() =>
      useInfiniteProductsSearch({ query: "test" })
    );

    await waitFor(() =>
      expect(result.current.searchProducts).toEqual(initialMockData.data)
    );

    act(() => {
      result.current.loadNextPage();
    });

    await waitFor(() => {
      expect(result.current.searchProducts?.content).toHaveLength(1);
      expect(result.current.searchProducts?.content[0]).toEqual({
        id: 1,
        name: "test"
      });
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    act(() => {
      result.current.loadNextPage();
    });

    await waitFor(() => {
      expect(result.current.searchProducts?.content).toHaveLength(1);
    });
  });

  test("does not increment currentPage when loadNextPage is called and last page", async () => {
    setup(newMockData);
    const { result } = renderHook(() =>
      useInfiniteProductsSearch({ query: "test" })
    );

    await waitFor(() =>
      expect(result.current.searchProducts).toEqual(newMockData.data)
    );

    act(() => {
      result.current.loadNextPage();
    });

    await waitFor(() => {
      expect(result.current.searchProducts?.content).toHaveLength(1);
      expect(result.current.searchProducts?.content[0]).toEqual({
        id: 2,
        name: "test2"
      });
    });

    act(() => {
      result.current.loadNextPage();
    });

    await waitFor(() => {
      expect(result.current.searchProducts?.content).toHaveLength(1);
      expect(result.current.searchProducts?.content[0]).toEqual({
        id: 2,
        name: "test2"
      });
    });
  });
});
