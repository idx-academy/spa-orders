import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";

import I18nProivider from "@/context/I18nProvider";
import { ModalProvider } from "@/context/ModalContext";

import { store } from "@/store/store";
import routes from "@/routes/routes";

import "@/styles/global.scss";

const App = () => {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <I18nProivider>
          <ModalProvider>
            <RouterProvider router={createBrowserRouter(routes)} />
          </ModalProvider>
        </I18nProivider>
      </StyledEngineProvider>
    </Provider>
  );
};

const domNode = document.getElementById("app") as HTMLElement;
const root = createRoot(domNode);

root.render(<App />);
