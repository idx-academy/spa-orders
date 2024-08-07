const defaultEntry = {
  isIntersecting: true
};

type Entry = typeof defaultEntry;

export const setupMockIntersectionObserver = () => {
  let observerOptions: Partial<IntersectionObserverInit> | undefined;
  let observerCallback: (entry?: Entry) => void = () => {};

  const mockedObserveFn = jest.fn();
  const mockedUnobserveFn = jest.fn();

  global.IntersectionObserver = jest.fn((callback, options) => {
    observerCallback = (entry = defaultEntry) => {
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
    triggerObserverCallback: (entry?: Entry) => observerCallback(entry)
  };
};
