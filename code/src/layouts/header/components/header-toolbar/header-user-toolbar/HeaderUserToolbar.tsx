import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";

import HeaderCartButton from "@/layouts/header/components/header-toolbar/header-cart-button/HeaderCartButton";

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

const HeaderUserToolbar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearLocalCart());
    dispatch(cartApi.util.resetApiState());
  };

  return (
    <>
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
      <HeaderCartButton />
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

export default HeaderUserToolbar;
