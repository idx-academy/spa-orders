import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { StyledEngineProvider } from "@mui/material/styles";

import productsReducer from "@/store/slices/productsSlice";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  initialEntries?: string[];
  preloadedState?: any
  store?: ReturnType<typeof configureStore>;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    initialEntries = ["/"],
    preloadedState = {},
    store = configureStore({
      reducer: productsReducer,
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children?: ReactNode }) => (
    <Provider store={store}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
      </BrowserRouter>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};