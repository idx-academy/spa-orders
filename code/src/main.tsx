import { createRoot } from "react-dom/client";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { IntlProvider } from "react-intl";
import Router from "@/router";
<<<<<<< HEAD
import '@/styles/scss/global.scss'
import { theme } from "../styles/muiTheme";
=======
import { theme } from "@/styles/muiTheme"
>>>>>>> 01c457b (test for page wrapper)

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
