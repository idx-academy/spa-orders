import { ReactNode } from "react";
import AppHeader from "@/layouts/app-header/AppHeader";
import AppBanner from "@/layouts/app-banner/AppBanner";
import AppFooter from "@/layouts/app-footer/AppFooter";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import AppProductsList from "@/layouts/app-products/AppProductsList";

import "@/shared/modules/application/application.scss";

type ApplicationProps = {
  children?: ReactNode;
};

const Application = ({ children }: ApplicationProps) => {
  return (
    <>
      <AppHeader />
      <AppBanner />
      <AppProductsList />
      <PageWrapper>{children}</PageWrapper>
      <AppFooter />
    </>
  );
};

export default Application;

