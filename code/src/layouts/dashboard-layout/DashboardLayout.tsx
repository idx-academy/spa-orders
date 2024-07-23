import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { dashboardTabs } from "@/layouts/dashboard-layout/DashboardLayout.constants";
import DashboardTab from "@/layouts/dashboard-layout/components/dashboard-tab/DashboardTab";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";

import AppBox from "@/components/app-box/AppBox";

import "@/layouts/dashboard-layout/DashboardLayout.scss";

const DashboardLayout = () => {
  const tabLabels = dashboardTabs.map((tab) => (
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
            <Outlet />
          </Suspense>
        </AppBox>
      </AppBox>
    </PageWrapper>
  );
};

export default DashboardLayout;
