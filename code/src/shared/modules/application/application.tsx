import { ReactNode } from "react";
import AppHeader from "@/layouts/app-header/AppHeader";
import AppBanner from "@/layouts/app-banner/AppBanner";
import AppFooter from "@/layouts/app-footer/AppFooter";
import "@/shared/modules/application/application.scss";

type ApplicationProps = {
  children: ReactNode;
};

const Application = ({ children }: ApplicationProps) => {
  return (
    <>
      <AppHeader />
      <AppBanner />
      {children}
      <AppFooter />
    </>
  );
};

export default Application;
