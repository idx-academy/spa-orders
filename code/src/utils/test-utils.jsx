import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { StyledEngineProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";

import productsReducer from "@/store/slices/productsSlice";

import MockAdapter from 'axios-mock-adapter'

// import appApi from "@/store/api/appApi";

export const renderWithProviders = (
  ui,
  {
    initialEntries = "/",
    preloadedState = {},
    store = configureStore({
      reducer: { products: productsReducer },
      preloadedState
    }),
    // store = configureStore({
    //   reducer: {
    //     products: productsReducer,
    //     [appApi.reducerPath]: appApi.reducer
    //   },
    //   middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(appApi.middleware),
    //   preloadedState
    // }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
      </BrowserRouter>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export const mockAxiosClient = new MockAdapter(axiosClient)
