import { renderHook } from "@testing-library/react";

import useInfiniteScroll from "@/hooks/use-infinite-scroll/useInfiniteScroll";
import { setupMockIntersectionObserver } from "@/utils/setup-mock-intersection-observer/setupMockIntersectionObserver";

type MockAndRenderProps = {
  item?: HTMLLIElement;
  isIntersecting?: boolean;
};

const { mockedObserveFn, mockedUnobserveFn, triggerObserverCallback } =
  setupMockIntersectionObserver();

const mockAndRender = ({
  item,
  isIntersecting = false
}: MockAndRenderProps = {}) => {
  const loadNextPage = jest.fn();
  const { result } = renderHook(() => useInfiniteScroll(loadNextPage));

  result.current(item ?? null);

  if (item) {
    triggerObserverCallback({ isIntersecting });
  }

  return { loadNextPage, result, item };
};

describe("useInfiniteScroll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("calls loadNextPage when the last item is intersecting", () => {
    const item = document.createElement("li");

    const { loadNextPage } = mockAndRender({
      item,
      isIntersecting: true
    });

    expect(loadNextPage).toHaveBeenCalled();
    expect(mockedUnobserveFn).toHaveBeenCalledWith(item);
  });

  test("does not call loadNextPage when the last item is not intersecting", () => {
    const item = document.createElement("li");
    const { loadNextPage } = mockAndRender({ item });

    expect(loadNextPage).not.toHaveBeenCalled();
    expect(mockedUnobserveFn).not.toHaveBeenCalled();
  });

  test("returns early when item is null", () => {
    mockAndRender();

    expect(mockedObserveFn).not.toHaveBeenCalled();
    expect(mockedUnobserveFn).not.toHaveBeenCalled();
  });
});
