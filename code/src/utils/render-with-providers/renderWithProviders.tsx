import { RenderOptions, render } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { StyledEngineProvider } from "@mui/material/styles";
import { StateFromReducersMapObject, configureStore } from "@reduxjs/toolkit";

import I18nProivider from "@/context/I18nProvider";
import { DrawerProvider } from "@/context/drawer/DrawerContext";
import { ModalProvider } from "@/context/modal/ModalContext";
import { reducer } from "@/store/reducer";

type ExtendedRenderOptions = RenderOptions & {
  initialEntries?: string[];
  preloadedState: StateFromReducersMapObject<typeof reducer>;
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
        <I18nProivider>
          <ModalProvider>
            <DrawerProvider>
              <StyledEngineProvider injectFirst>
                {children}
              </StyledEngineProvider>
            </DrawerProvider>
          </ModalProvider>
        </I18nProivider>
      </MemoryRouter>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default renderWithProviders;
