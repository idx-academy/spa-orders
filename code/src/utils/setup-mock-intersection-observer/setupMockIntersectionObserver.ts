export const setupMockIntersectionObserver = () => {
  let observerOptions: Partial<IntersectionObserverInit> | undefined;
  let observerCallback: (entry?: {
    isIntersecting: boolean;
  }) => void = () => {};

  const mockedObserveFn = jest.fn();
  const mockedUnobserveFn = jest.fn();

  global.IntersectionObserver = jest.fn((callback, options) => {
    observerCallback = (entry = { isIntersecting: true }) => {
      callback(
        [entry as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
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

  return {
    mockedObserveFn,
    mockedUnobserveFn,
    getObserverOptions: () => observerOptions,
    triggerObserverCallback: (entry: { isIntersecting: boolean }) =>
      observerCallback(entry)
  };
};
