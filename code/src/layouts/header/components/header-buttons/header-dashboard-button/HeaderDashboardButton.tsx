import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppLink from "@/components/app-link/AppLink";
import AppTooltip from "@/components/app-tooltip/AppTooltip";

import routes from "@/constants/routes";

const HeaderDashboardButton = () => {
  return (
    <AppTooltip titleTranslationKey="dashboard.tooltip" key="dashboard-button">
      <AppIconButton
        to={routes.dashboard.path}
        component={AppLink}
        data-testid="header-dashboard-button"
        data-cy="dashboard-button"
      >
        <DashboardCustomizeIcon fontSize="medium" />
      </AppIconButton>
    </AppTooltip>
  );
};

export default HeaderDashboardButton;
