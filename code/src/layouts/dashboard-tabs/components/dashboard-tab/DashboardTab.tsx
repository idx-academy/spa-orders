import {
  DashboardTabName,
  DashboardTab as DashboardTabType
} from "@/layouts/dashboard-tabs/DashboardTabs.constants";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

type DashboardTabProps = {
  tab: DashboardTabType;
  onActive: (tab: DashboardTabName) => void;
  isTabActive: boolean;
};

const DashboardTab = ({ tab, onActive, isTabActive }: DashboardTabProps) => {
  const activeClassName = isTabActive && "dashboard-tabs__label-item--active";

  const handleSetActiveTab = () => {
    onActive(tab.name);
  };

  return (
    <AppBox
      key={tab.name}
      onClick={handleSetActiveTab}
      className={cn("dashboard-tabs__label-item", activeClassName)}
      data-testid="dashboard-tab-label"
    >
      {tab.icon}
      <AppTypography
        component="span"
        translationKey={tab.labelTranslationKey}
      />
    </AppBox>
  );
};

export default DashboardTab;
