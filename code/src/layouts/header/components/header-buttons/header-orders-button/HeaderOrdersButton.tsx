import ListAltIcon from "@mui/icons-material/ListAlt";

import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppLink from "@/components/app-link/AppLink";
import AppTooltip from "@/components/app-tooltip/AppTooltip";

import routes from "@/constants/routes";

const HeaderOrdersButton = () => {
  return (
    <AppTooltip titleTranslationKey="orders.tooltip">
      <AppIconButton
        to={routes.orders.path}
        component={AppLink}
        data-cy="orders-button"
        data-testid="header-orders-button"
      >
        <ListAltIcon className="header__toolbar-icon" fontSize="medium" />
      </AppIconButton>
    </AppTooltip>
  );
};

export default HeaderOrdersButton;
