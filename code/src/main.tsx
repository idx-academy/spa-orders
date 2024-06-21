import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import I18nProivider from "@/shared/i18n/I18nProvider";
import { StyledEngineProvider } from "@mui/material";

import Router from "@/router";
import { store } from "@/store/store";

import "@/styles/global.scss";

const App = () => {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <I18nProivider>
          <Router />
        </I18nProivider>
      </StyledEngineProvider>
    </Provider>
  );
};

const domNode = document.getElementById("app") as HTMLElement;
const root = createRoot(domNode);

root.render(<App />);
