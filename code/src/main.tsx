import { createRoot } from "react-dom/client";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { IntlProvider } from "react-intl";
import Router from "@/router";
import '@/styles/scss/global.scss'
import { theme } from "@/styles/muiTheme"

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <IntlProvider locale="en">
          <Router />
        </IntlProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const domNode = document.getElementById("app") as HTMLElement;
const root = createRoot(domNode);

root.render(<App />);
