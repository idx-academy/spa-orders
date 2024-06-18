import { createRoot } from "react-dom/client";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import I18nProivider from "@/shared/i18n/I18nProvider";
import Router from "@/router";
import '@/styles/scss/global.scss'
import { theme } from "@/styles/muiTheme"

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <I18nProivider>
          <Router />
        </I18nProivider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const domNode = document.getElementById("app") as HTMLElement;
const root = createRoot(domNode);

root.render(<App />);
