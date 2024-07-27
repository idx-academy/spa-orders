import { PropsWithChildren, Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DashboardTab as DashboardTabType } from "@/layouts/dashboard-layout/DashboardLayout.types";
import DashboardTab from "@/layouts/dashboard-layout/components/dashboard-tab/DashboardTab";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";

import AppBox from "@/components/app-box/AppBox";

import routePaths from "@/constants/routes";

import "@/layouts/dashboard-layout/components/dashboard-tab-layout/DashboardTabLayout.scss";

type DashboardTabLayoutProps = PropsWithChildren<{
  tabs: DashboardTabType[];
  activeTabPath: string;
}>;

const DashboardTabLayout = ({
  tabs,
  children,
  activeTabPath
}: DashboardTabLayoutProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === routePaths.dashboard.path) {
      navigate(activeTabPath);
    }
  }, [navigate, pathname]);

  const tabLabels = tabs.map((tab) => (
    <DashboardTab key={tab.name} tab={tab} />
  ));

  return (
    <PageWrapper className="dashboard-page" data-cy="dashboard-page">
      <AppBox className="dashboard-tabs">
        <AppBox className="dashboard-tabs__label-container">{tabLabels}</AppBox>
        <AppBox className="dashboard-tabs__content-container">
          <Suspense
            fallback={
              <PageLoadingFallback className="dashboard-tabs__loading-fallback" />
            }
          >
            {children}
          </Suspense>
        </AppBox>
      </AppBox>
    </PageWrapper>
  );
};

export default DashboardTabLayout;
