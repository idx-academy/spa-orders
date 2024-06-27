import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, StateFromReducersMapObject } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import { StyledEngineProvider } from "@mui/material/styles";

import productsReducer from "@/store/slices/productsSlice";
import I18nProivider from "@/context/I18nProvider";

const reducer = {
  products: productsReducer
};

type ExtendedRenderOptions = RenderOptions & {
  initialEntries?: string[];
  preloadedState: StateFromReducersMapObject<typeof reducer>;
};

export const renderWithProviders = (
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
          <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
        </I18nProivider>
      </MemoryRouter>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
