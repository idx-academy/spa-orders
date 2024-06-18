import { createRoot } from 'react-dom/client';
import { IntlProvider } from "react-intl";
import Router from "@/router";
import '@/styles/scss/global.scss'

const App = () => {
  return (
    <IntlProvider locale="en">
      <Router />
    </IntlProvider>
  );
};


const domNode = document.getElementById("app") as HTMLElement;
const root = createRoot(domNode);

root.render(<App />);