import { useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  DashboardTabName,
  dashboardTabs
} from "@/layouts/dashboard-tabs//DashboardTabs.constants";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

import "@/layouts/dashboard-tabs/DashboardTabs.scss";

const TAB_QUERY_KEY = "tab";

const DashboardTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromQuery = searchParams.get(TAB_QUERY_KEY);

  const handleSetActiveTab = (tab: DashboardTabName) => {
    setSearchParams({ [TAB_QUERY_KEY]: tab });
  };

  useLayoutEffect(() => {
    if (tabFromQuery === null) {
      handleSetActiveTab("users");
    }
  }, []);

  const tabContent = dashboardTabs.find((tab) => tab.name === tabFromQuery);

  return (
    <AppBox className="dashboard-tabs">
      <AppBox className="dashboard-tabs__label-container">
        {dashboardTabs.map((tab) => (
          <AppBox
            key={tab.name}
            onClick={() => handleSetActiveTab(tab.name)}
            className={cn(
              "dashboard-tabs__label-item",
              tabFromQuery === tab.name && "dashboard-tabs__label-item--active"
            )}
          >
            {tab.icon}
            <AppTypography translationKey={tab.labelTranslationKey} />
          </AppBox>
        ))}
      </AppBox>
      <AppBox className="dashboard-tabs__content-container">
        {tabContent?.content}
      </AppBox>
    </AppBox>
  );
};

export default DashboardTabs;
