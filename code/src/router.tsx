import { BrowserRouter } from "react-router-dom";
import Application from "@/shared/modules/application/application";
import { appRoutes } from "@/modules";

const Router = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Application>
          {appRoutes}
        </Application>
      </BrowserRouter>
    </>
  );
};

export default Router;
