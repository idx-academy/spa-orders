import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import I18nProivider from "@/shared/i18n/I18nProvider";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";

import Router from "@/router";
import { theme } from "@/styles/muiTheme";
import { store } from "@/store/store";

import "@/styles/scss/global.scss";

const App = () => {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <I18nProivider>
            <Router />
          </I18nProivider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

const domNode = document.getElementById("app") as HTMLElement;
const root = createRoot(domNode);

root.render(<App />);
