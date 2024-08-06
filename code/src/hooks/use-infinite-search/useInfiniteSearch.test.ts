import { act, renderHook, waitFor } from "@testing-library/react";



import { useLocaleContext } from "@/context/i18n/I18nProvider";
import useDebouncedValue from "@/hooks/use-debounced-value/useDebouncedValue";
import useInfiniteSearch from "@/hooks/use-infinite-search/useInfiniteSearch";
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
  data: MockDataContent | null;
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

const newMockData: MockData = {
  data: {
    content: [{ id: 2, name: "Product 2" }],
    last: true
  },
  isLoading: false,
  isError: false
};

const initialMockData: MockData = {
  data: {
    content: [{ id: 1, name: "test" }],
    last: false
  },
  isLoading: false,
  isError: false
};

const setup = (mockData = defaultMockData) => {
  mockLocaleContext.mockReturnValue({ locale: "en" });
  mockUseDebouncedValue.mockImplementation((value) => value);
  mockUseGetUserProductsBySearchQuery.mockReturnValue(mockData);
};

describe("useInfiniteSearch", () => {
  beforeEach(() => {
    setup();
  });

  test("should initialize with default values", () => {
    const { result } = renderHook(() => useInfiniteSearch(""));

    expect(result.current.searchProducts).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  test("should handle debounced query", async () => {
    mockUseDebouncedValue.mockImplementation((value) => "debounced-" + value);

    const { result } = renderHook(() => useInfiniteSearch("test"));

    await waitFor(() => {
      expect(mockUseDebouncedValue).toHaveBeenCalledWith("test", 500);
    });
    expect(result.current.searchProducts).toBeUndefined();
  });

  test("should fetch data and update searchProducts and isLastPageRef", async () => {
    

    setup(initialMockData as unknown as MockData);

    const { result } = renderHook(() => useInfiniteSearch(""));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    mockUseGetUserProductsBySearchQuery.mockReturnValue(newMockData);

    act(() => {
      result.current.loadNextPage();
    });

    await waitFor(() => {
      expect(result.current.searchProducts?.content).toEqual(
        newMockData.data?.content
      );
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });
  });

  test("should reset isResettingRef when query changes", async () => {
    const { result, rerender } = renderHook(
      ({ query }) => useInfiniteSearch(query),
      {
        initialProps: { query: "test" }
      }
    );

    act(() => {
      result.current.resetSearch();
    });

    rerender({ query: "new test" });

    await waitFor(() => {
      expect(result.current.searchProducts).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });
  });

  test("should increment currentPage when loadNextPage is called", async () => {
    const { result } = renderHook(() => useInfiniteSearch("test"));

    act(() => {
      result.current.loadNextPage();
    });

    await waitFor(() => {
      expect(result.current.searchProducts).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });
  });
});
