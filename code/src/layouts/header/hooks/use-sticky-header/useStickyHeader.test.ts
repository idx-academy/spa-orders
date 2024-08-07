import { renderHook } from "@testing-library/react";

import useStickyHeader from "@/layouts/header/hooks/use-sticky-header/useStickyHeader";

import { setupMockIntersectionObserver } from "@/utils/setup-mock-intersection-observer/setupMockIntersectionObserver";

type RenderUseStickyHeaderOptions = {
  headerElement?: HTMLDivElement | null;
  scrollHandleElement?: HTMLDivElement | null;
};

const {
  mockedObserveFn,
  mockedUnobserveFn,
  getObserverOptions,
  triggerObserverCallback
} = setupMockIntersectionObserver();

const headerStyleWithoutIntersection = "--top: -322px";
const headerStyleWithIntersection = "--top: 0";

let initialHeaderElement = document.createElement("div");
let initialScrollHandleElement = document.createElement("div");

const defaultOptions = {
  headerElement: initialHeaderElement,
  scrollHandleElement: initialScrollHandleElement
};

const renderUseStickyHeader = ({
  headerElement = initialHeaderElement,
  scrollHandleElement = initialScrollHandleElement
}: RenderUseStickyHeaderOptions = defaultOptions) => {
  return renderHook(() => {
    const hookReturnedValue = useStickyHeader();

    if (headerElement) {
      Object.defineProperty(headerElement, "clientHeight", { value: 112 });
    }

    hookReturnedValue.headerRef.current = headerElement;
    hookReturnedValue.scrollHandleRef.current = scrollHandleElement;

    return hookReturnedValue;
  });
};

describe("Test useStickyHeader", () => {
  afterEach(() => {
    initialHeaderElement = document.createElement("div");
    initialScrollHandleElement = document.createElement("div");

    jest.clearAllMocks();
  });

  test("Should not call observe function or return ref if there is no at least one ref assigned to HTML element", () => {
    const { result } = renderUseStickyHeader({ headerElement: null });

    expect(result.current.headerRef.current).toBeNull();
    expect(mockedObserveFn).not.toHaveBeenCalled();
  });

  test("Should call observe and unobserve if refs are assigned", () => {
    const { unmount } = renderUseStickyHeader();

    expect(mockedObserveFn).toHaveBeenCalled();
    unmount();
    expect(mockedUnobserveFn).toHaveBeenCalled();
  });

  test("Should set --top CSS variable to negative element's height if there is no intersection", () => {
    const { result } = renderUseStickyHeader();

    triggerObserverCallback({ isIntersecting: false });

    const headerElement = result.current.headerRef.current;
    expect(headerElement).toHaveStyle(headerStyleWithoutIntersection);
  });

  test("Should set --top CSS variable to 0 when intersection is detected", () => {
    const { result } = renderUseStickyHeader();

    triggerObserverCallback({ isIntersecting: true });

    const headerElement = result.current.headerRef.current;
    expect(headerElement).toHaveStyle(headerStyleWithIntersection);
  });

  test("Should change --top value after intersection reappears", () => {
    const { result } = renderUseStickyHeader();

    const headerElement = result.current.headerRef.current;

    triggerObserverCallback({ isIntersecting: true });
    expect(headerElement).toHaveStyle(headerStyleWithIntersection);

    triggerObserverCallback({ isIntersecting: false });
    expect(headerElement).toHaveStyle(headerStyleWithoutIntersection);

    triggerObserverCallback({ isIntersecting: true });
    expect(headerElement).toHaveStyle(headerStyleWithIntersection);
  });

  test("Should be called with the right options", () => {
    renderUseStickyHeader();
    expect(getObserverOptions()).toEqual({ rootMargin: "300px" });
  });
});
