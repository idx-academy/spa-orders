import { ReactNode } from "react";

import AppHeader from "@/layouts/app-header/AppHeader";
import AppBanner from "@/layouts/app-banner/AppBanner";
import AppFooter from "@/layouts/app-footer/AppFooter";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import BestSellers from "@/layouts/best-sellers/BestSellers";

import "@/shared/modules/application/application.scss";

type ApplicationProps = {
  children?: ReactNode;
};

const Application = ({ children }: ApplicationProps) => {
  return (
    <>
      <AppHeader />
      <AppBanner />
      <BestSellers />
      <PageWrapper>{children}</PageWrapper>
      <AppFooter />
    </>
  );
};

export default Application;

