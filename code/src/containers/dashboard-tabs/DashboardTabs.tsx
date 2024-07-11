import { useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  DASHBOARD_TAB_NAMES,
  DashboardTabName,
  dashboardTabs
} from "@/containers/dashboard-tabs/DashboardTabs.constants";
import DashboardTab from "@/containers/dashboard-tabs/components/dashboard-tab/DashboardTab";

import AppBox from "@/components/app-box/AppBox";

import "@/containers/dashboard-tabs/DashboardTabs.scss";

export type DashboardTabSearchParam = DashboardTabName | null;

const TAB_QUERY_KEY = "tab";

const DashboardTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromQuery = searchParams.get(
    TAB_QUERY_KEY
  ) as DashboardTabSearchParam;

  const handleSetActiveTab = (tab: DashboardTabName) => {
    setSearchParams({ [TAB_QUERY_KEY]: tab });
  };

  useLayoutEffect(() => {
    const tabNames =
      Object.values<DashboardTabSearchParam>(DASHBOARD_TAB_NAMES);

    if (!tabNames.includes(tabFromQuery)) {
      handleSetActiveTab(dashboardTabs[0].name);
    }
  }, []);

  const tabLabels = dashboardTabs.map((tab) => (
    <DashboardTab
      key={tab.name}
      tab={tab}
      onActive={handleSetActiveTab}
      isTabActive={tabFromQuery === tab.name}
    />
  ));

  const tabContent = dashboardTabs.find((tab) => tab.name === tabFromQuery);

  return (
    <AppBox className="dashboard-tabs">
      <AppBox className="dashboard-tabs__label-container">{tabLabels}</AppBox>
      <AppBox className="dashboard-tabs__content-container">
        {tabContent?.content}
      </AppBox>
    </AppBox>
  );
};

export default DashboardTabs;
