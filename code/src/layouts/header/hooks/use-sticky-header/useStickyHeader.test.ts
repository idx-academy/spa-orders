import { renderHook } from "@testing-library/react";

import useStickyHeader from "@/layouts/header/hooks/use-sticky-header/useStickyHeader";

type RenderUseStickyHeaderOptions = {
  headerElement?: HTMLDivElement | null;
  scrollHandleElement?: HTMLDivElement | null;
};

const mockedObserveFn = jest.fn();
const mockedUnobserveFn = jest.fn();

let observerOptions: Partial<IntersectionObserverInit> | undefined;
let observerCallback: (entry?: { isIntersecting: boolean }) => void;

const rightIntersectionOptions = { rootMargin: "300px" };
const headerStyleWithoutIntersection = "--top: -322px";
const headerStyleWithIntersection = "--top: 0";

global.IntersectionObserver = jest.fn((callback, options) => {
  observerCallback = (entry = { isIntersecting: true }) => {
    callback([entry as IntersectionObserverEntry], {} as IntersectionObserver);
  };

  observerOptions = options;

  return {
    observe: mockedObserveFn,
    unobserve: mockedUnobserveFn,
    disconnect: jest.fn(),
    takeRecords: jest.fn(),
    root: null,
    rootMargin: "0px",
    thresholds: []
  };
});

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
  const returnedValue = renderHook(() => {
    const hookReturnedValue = useStickyHeader();

    headerElement &&
      Object.defineProperty(headerElement, "clientHeight", { value: 112 });

    hookReturnedValue.headerRef.current = headerElement;
    hookReturnedValue.scrollHandleRef.current = scrollHandleElement;

    return hookReturnedValue;
  });

  return returnedValue;
};

describe("Test useStickyHeader", () => {
  afterEach(() => {
    initialHeaderElement = document.createElement("div");
    initialScrollHandleElement = document.createElement("div");

    observerOptions = undefined;
    observerCallback = () => {};

    jest.clearAllMocks();
  });

  test("Should not call observe function or return ref if there is no at least one ref assigned to html element", () => {
    const { result } = renderUseStickyHeader({
      headerElement: null
    });

    expect(result.current.headerRef.current).toBeNull();

    expect(mockedObserveFn).not.toHaveBeenCalled();
  });

  test("Should call observe and unobserve if refs are asigned", () => {
    const { unmount } = renderUseStickyHeader();

    expect(mockedObserveFn).toHaveBeenCalled();

    unmount();

    expect(mockedUnobserveFn).toHaveBeenCalled();
  });

  test("Should set --top css variable to negative element's height if there is no intersection", () => {
    const { result } = renderUseStickyHeader();

    observerCallback({ isIntersecting: false });

    const headerElement = result.current.headerRef.current;

    expect(headerElement).toHaveStyle(headerStyleWithoutIntersection);
  });

  test("Should set --top css variable to 0 when intersection is detected", () => {
    const { result } = renderUseStickyHeader();

    observerCallback();

    const headerElement = result.current.headerRef.current;

    expect(headerElement).toHaveStyle(headerStyleWithIntersection);
  });

  test("Should change --top value after intersection reappears", () => {
    const { result } = renderUseStickyHeader();

    const headerElement = result.current.headerRef.current;

    observerCallback();

    expect(headerElement).toHaveStyle(headerStyleWithIntersection);

    observerCallback({ isIntersecting: false });

    expect(headerElement).toHaveStyle(headerStyleWithoutIntersection);

    observerCallback();

    expect(headerElement).toHaveStyle(headerStyleWithIntersection);
  });

  test("Should be called with the right options", () => {
    renderUseStickyHeader();

    expect(observerOptions).toEqual(rightIntersectionOptions);
  });
});
