import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import "@/shared/modules/application/application.scss";
import AppBanner from "@/layouts/app-banner/AppBanner";

type ApplicationProps = {
  children: ReactNode;
};

const Application = ({ children }: ApplicationProps) => {
  return (
    <div className="application">
      <h1 className="application__header">
        <FormattedMessage id="application.header" />
      </h1>
      <AppBanner/>
      {children}
    </div>
  );
};

export default Application;
