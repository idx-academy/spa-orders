import { setupMockIntersectionObserver } from "@/utils/setup-mock-intersection-observer/setupMockIntersectionObserver";

const options = { rootMargin: "10px" };
const element = document.createElement("div");
const callback = jest.fn();
const entry = { isIntersecting: false };

const initObserver = (callback = () => {}, options = {}) => {
  return new IntersectionObserver(callback, options);
};

describe("setupMockIntersectionObserver", () => {
  let mockObserver: ReturnType<typeof setupMockIntersectionObserver>;

  beforeEach(() => {
    mockObserver = setupMockIntersectionObserver();
  });

  test("initializes observerCallback with no-op function", () => {
    expect(typeof mockObserver.triggerObserverCallback).toBe("function");
    expect(mockObserver.triggerObserverCallback()).toBeUndefined();
  });

  test("calls observe method correctly", () => {
    const observer = initObserver();
    observer.observe(element);

    expect(mockObserver.mockedObserveFn).toHaveBeenCalledWith(element);
  });

  test("calls unobserve method correctly", () => {
    const observer = initObserver();
    observer.unobserve(element);

    expect(mockObserver.mockedUnobserveFn).toHaveBeenCalledWith(element);
  });

  test("returns observer options", () => {
    initObserver(callback, options);
    expect(mockObserver.getObserverOptions()).toEqual(options);
  });

  test("triggers observer callback with entry", () => {
    initObserver(callback);

    mockObserver.triggerObserverCallback(entry);

    expect(callback).toHaveBeenCalledWith([entry], {});
  });

  test("triggers observer callback with default entry", () => {
    initObserver(callback);

    mockObserver.triggerObserverCallback();

    expect(callback).toHaveBeenCalledWith([entry], {});
  });
});
