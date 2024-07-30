import { DashboardTab as DashboardTabType } from "@/layouts/dashboard-layout/DashboardLayout.types";

import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

type DashboardTabProps = {
  tab: DashboardTabType;
};

const DashboardTab = ({ tab }: DashboardTabProps) => {
  return (
    <AppLink
      key={tab.name}
      className={cn("dashboard-tabs__label-item")}
      data-testid="dashboard-tab-label"
      data-cy={`dashboard-tab-${tab.name}`}
      to={tab.name}
      isNavLink
    >
      {tab.icon}
      <AppTypography
        component="span"
        translationKey={tab.labelTranslationKey}
      />
    </AppLink>
  );
};

export default DashboardTab;
