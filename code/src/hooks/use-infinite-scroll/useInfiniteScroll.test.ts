import { renderHook } from "@testing-library/react";

import useInfiniteScroll from "@/hooks/use-infinite-scroll/useInfiniteScroll";

const mockAndRender = (item?: HTMLLIElement, isIntersecting: boolean = false) => {
  const loadNextPage = jest.fn();
  const { result } = renderHook(() => useInfiniteScroll(loadNextPage));

  result.current(item ?? null);

  if (item) {
    const entry = { isIntersecting };
    (global.IntersectionObserver as jest.Mock).mock.calls[0][0]([entry]);
  }

  return { loadNextPage, result, item };
};

describe("useInfiniteScroll", () => {
  let observe: jest.Mock;
  let unobserve: jest.Mock;
  let disconnect: jest.Mock;

  beforeEach(() => {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();

    global.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
      disconnect,
      takeRecords: jest.fn(),
      root: null,
      rootMargin: "",
      thresholds: []
    }));

    jest.clearAllMocks();
  });

  test("calls loadNextPage when the last item is intersecting", () => {
    const item = document.createElement("li");

    const { loadNextPage } = mockAndRender(item, true);

    expect(loadNextPage).toHaveBeenCalled();
    expect(unobserve).toHaveBeenCalledWith(item);
  });

  test("does not call loadNextPage when the last item is not intersecting", () => {
    const item = document.createElement("li");
    const { loadNextPage } = mockAndRender(item);

    expect(loadNextPage).not.toHaveBeenCalled();
    expect(unobserve).not.toHaveBeenCalled();
  });

  test("returns early when item is null", () => {
    mockAndRender();

    expect(observe).not.toHaveBeenCalled();
    expect(unobserve).not.toHaveBeenCalled();
  });
});