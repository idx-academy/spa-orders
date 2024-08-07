import { RenderOptions, render } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { StyledEngineProvider } from "@mui/material/styles";
import { StateFromReducersMapObject, configureStore } from "@reduxjs/toolkit";

import { DrawerProvider } from "@/context/drawer/DrawerContext";
import { I18nProvider } from "@/context/i18n/I18nProvider";
import { ModalProvider } from "@/context/modal/ModalContext";
import { reducer } from "@/store/reducer";

type ExtendedRenderOptions = RenderOptions & {
  initialEntries?: string[];
  preloadedState: StateFromReducersMapObject<typeof reducer>;
};

export const setupMockIntersectionObserver = () => {
  let observerOptions: Partial<IntersectionObserverInit> | undefined;
  let observerCallback: (entry?: { isIntersecting: boolean }) => void = () => {};

  const mockedObserveFn = jest.fn();
  const mockedUnobserveFn = jest.fn();

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

  return {
    mockedObserveFn,
    mockedUnobserveFn,
    getObserverOptions: () => observerOptions,
    triggerObserverCallback: (entry: { isIntersecting: boolean }) => observerCallback(entry)
  };
};
const renderWithProviders = (
  ui: ReactElement,
  {
    initialEntries = ["/"],
    preloadedState,
    ...renderOptions
  }: Partial<ExtendedRenderOptions> = {}
) => {
  const store = configureStore({
    reducer,
    preloadedState
  });

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <I18nProvider>
          <ModalProvider>
            <DrawerProvider>
              <StyledEngineProvider injectFirst>
                {children}
              </StyledEngineProvider>
            </DrawerProvider>
          </ModalProvider>
        </I18nProvider>
      </MemoryRouter>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default renderWithProviders;
