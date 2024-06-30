import { renderHook } from "@testing-library/react";
import useStickyHeader from "./useStickyHeader";

type RenderUseStickyHeaderOptions = {
  headerElement?: HTMLDivElement | null;
  scrollHandleElement?: HTMLDivElement | null;
};

const mockedObserveFn = jest.fn();
const mockedUnobserveFn = jest.fn();

let mockedOptions: Partial<IntersectionObserverInit> | undefined;
let observerCallback: (entry?: { isIntersecting: boolean }) => void;

const rightIntersectionOptions = { rootMargin: "300px" };
const headerStyleWithoutIntersection = "--top: -112px";
const headerStyleWithIntersection = "--top: 0";

global.IntersectionObserver = jest.fn((callback, options) => {
  observerCallback = (entry = { isIntersecting: true }) => {
    callback([entry as IntersectionObserverEntry], {} as IntersectionObserver);
  };

  mockedOptions = options;

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
      Object.defineProperty(headerElement, "clientHeight", {
        configurable: true,
        value: 112
      });

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

    mockedOptions = undefined;
    observerCallback = () => {};

    jest.clearAllMocks();
  });

  it("Should not call observe function or return ref if there is no at least one ref assigned to html element", async () => {
    const { result } = renderUseStickyHeader({
      headerElement: null
    });

    expect(result.current.headerRef.current).toBeNull();

    expect(mockedObserveFn).not.toHaveBeenCalled();
  });

  it("Should call observe and unobserve if refs are asigned", async () => {
    const { unmount } = renderUseStickyHeader();

    expect(mockedObserveFn).toHaveBeenCalled();

    unmount();

    expect(mockedUnobserveFn).toHaveBeenCalled();
  });

  it("Should set --top css variable to negative element's height if there is no intersection", async () => {
    const { result } = renderUseStickyHeader();

    observerCallback({ isIntersecting: false });

    const headerElement = result.current.headerRef.current;

    expect(headerElement).toHaveStyle(headerStyleWithoutIntersection);
  });

  it("Should set --top css variable to 0 when intersection is detected", async () => {
    const { result } = renderUseStickyHeader();

    observerCallback();

    const headerElement = result.current.headerRef.current;

    expect(headerElement).toHaveStyle(headerStyleWithIntersection);
  });

  it("Should change --top value after intersection reappears", async () => {
    const { result } = renderUseStickyHeader();

    const headerElement = result.current.headerRef.current;

    observerCallback();

    expect(headerElement).toHaveStyle(headerStyleWithIntersection);

    observerCallback({ isIntersecting: false });

    expect(headerElement).toHaveStyle(headerStyleWithoutIntersection);

    observerCallback();

    expect(headerElement).toHaveStyle(headerStyleWithIntersection);
  });

  it("Should be called with the right options", async () => {
    renderUseStickyHeader();

    expect(mockedOptions).toEqual(rightIntersectionOptions);
  });
});
