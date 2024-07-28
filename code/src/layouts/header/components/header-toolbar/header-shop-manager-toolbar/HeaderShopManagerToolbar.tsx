import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LogoutIcon from "@mui/icons-material/Logout";

import AppButton from "@/components/app-button/AppButton";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppLink from "@/components/app-link/AppLink";
import AppTooltip from "@/components/app-tooltip/AppTooltip";

import routes from "@/constants/routes";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import cartApi from "@/store/api/cartApi";
import { clearLocalCart } from "@/store/slices/localCart";
import { logout } from "@/store/slices/userSlice";

import "@/layouts/header/components/header-toolbar/HeaderToolbar.scss";

const HeaderShopManagerToolbar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearLocalCart());
    dispatch(cartApi.util.resetApiState());
  };

  return (
    <>
      <AppTooltip
        titleTranslationKey="dashboard.tooltip"
        key="dashboard-button"
      >
        <AppIconButton
          to={routes.dashboard.path}
          component={AppLink}
          data-testid="header-dashboard-button"
          data-cy="dashboard-button"
        >
          <DashboardCustomizeIcon fontSize="medium" />
        </AppIconButton>
      </AppTooltip>
      <AppButton
        onClick={handleLogout}
        variant="danger"
        size="small"
        data-testid="header-logout-button"
      >
        <LogoutIcon />
      </AppButton>
    </>
  );
};

export default HeaderShopManagerToolbar;
