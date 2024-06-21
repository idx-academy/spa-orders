import { ReactNode } from "react";
import AppHeader from "@/layouts/app-header/AppHeader";
import IntroBanner from "@/layouts/intro-banner/IntroBanner";
import AppFooter from "@/layouts/app-footer/AppFooter";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import "@/shared/modules/application/application.scss";

type ApplicationProps = {
  children?: ReactNode;
};

const Application = ({ children }: ApplicationProps) => {
  return (
    <>
      <AppHeader />
      <IntroBanner />
      <PageWrapper>{children}</PageWrapper>
      <Subintro />
      <AppFooter />
    </>
  );
};

export default Application;
