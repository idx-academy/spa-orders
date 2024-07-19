import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { StyledEngineProvider } from "@mui/material";

import App from "@/App";

import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";

import { I18nProvider } from "@/context/i18n/I18nProvider";
import { store } from "@/store/store";

import "@/styles/global.scss";

const domNode = document.getElementById("app") as HTMLElement;
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <I18nProvider>
        <Suspense fallback={<PageLoadingFallback fullScreen />}>
          <App />
        </Suspense>
      </I18nProvider>
    </StyledEngineProvider>
  </Provider>
);
