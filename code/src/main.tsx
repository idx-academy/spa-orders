import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { StyledEngineProvider } from "@mui/material";

import App from "@/App";

import PageLoadingFallback from "@/layouts/page-loading-fallback/PageLoadingFallback";

import I18nProivider from "@/context/I18nProvider";
import { ModalProvider } from "@/context/ModalContext";
import { store } from "@/store/store";

import "@/styles/global.scss";

const domNode = document.getElementById("app") as HTMLElement;
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <I18nProivider>
        <ModalProvider>
          <Suspense fallback={<PageLoadingFallback fullScreen />}>
            <App />
          </Suspense>
        </ModalProvider>
      </I18nProivider>
    </StyledEngineProvider>
  </Provider>
);
