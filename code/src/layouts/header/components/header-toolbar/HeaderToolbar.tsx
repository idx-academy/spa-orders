import { ChangeEvent, ReactNode, useState } from "react";

import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import CartDrawer from "@/containers/cart-drawer/CartDrawer";
import AuthModal from "@/containers/modals/auth/AuthModal";

import AppBadge from "@/components/app-badge/AppBadge";
import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppContainer from "@/components/app-container/AppContainer";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppInputWithIcon from "@/components/app-input-with-icon/AppInputWithIcon";
import AppLink from "@/components/app-link/AppLink";
import AppLoader from "@/components/app-loader/AppLoader";
import AppLogo from "@/components/app-logo/AppLogo";
import AppTooltip from "@/components/app-tooltip/AppTooltip";
import AppTypography from "@/components/app-typography/AppTypography";

import { ROLES } from "@/constants/common";
import routes from "@/constants/routes";
import { useDrawerContext } from "@/context/drawer/DrawerContext";
import { useModalContext } from "@/context/modal/ModalContext";
import useGetCart from "@/hooks/use-get-cart/useGetCart";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import cartApi from "@/store/api/cartApi";
import { clearLocalCart } from "@/store/slices/localCart";
import {
  logout,
  useIsAuthLoadingSelector,
  useIsAuthSelector,
  useUserRoleSelector
} from "@/store/slices/userSlice";

import "@/layouts/header/components/header-toolbar/HeaderToolbar.scss";

const HeaderToolbar = () => {
  const { openModal } = useModalContext();
  const { openDrawer } = useDrawerContext();
  const isAuthenticated = useIsAuthSelector();
  const isLoadingAuth = useIsAuthLoadingSelector();
  const userRole = useUserRoleSelector();
  const dispatch = useAppDispatch();

  const { data } = useGetCart();

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  // @TODO: add logic to search product
  const handleSearch = () => {
    console.log("Search:", searchValue);
  };

  const handleOpenAuthModal = () => {
    openModal(<AuthModal />);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearLocalCart());
    dispatch(cartApi.util.resetApiState());
  };

  const handleOpenCart = () => {
    openDrawer(<CartDrawer />);
  };

  const cartItemsCount = data?.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const displayedCartItemsCount =
    cartItemsCount && cartItemsCount > 99 ? "99+" : cartItemsCount;

  const badgeContent = (
    <AppTypography variant="caption-small">
      {displayedCartItemsCount}
    </AppTypography>
  );

  const badge = displayedCartItemsCount ? (
    <AppBadge
      badgeContent={badgeContent}
      variant="contained"
      size="small"
      className="header__toolbar-cart-badge"
    >
      <ShoppingCartIcon className="header__toolbar-icon" fontSize="medium" />
    </AppBadge>
  ) : (
    <ShoppingCartIcon className="header__toolbar-icon" fontSize="medium" />
  );

  const loadingButton = isLoadingAuth && <AppLoader />;

  const logoutButton = isAuthenticated ? (
    <AppButton
      onClick={handleLogout}
      variant="danger"
      size="small"
      data-testid="LogoutButton"
    >
      <LogoutIcon />
    </AppButton>
  ) : (
    <AppButton onClick={handleOpenAuthModal} data-cy="auth-button">
      <AppTypography component="span" translationKey="signIn.label" />
    </AppButton>
  );

  const signInButton = !isLoadingAuth && !isAuthenticated && (
    <AppButton onClick={handleOpenAuthModal}>
      <AppTypography translationKey="signIn.label" />
    </AppButton>
  );

  const loadingDashboardButton = isLoadingAuth && <AppLoader />;

  const isDashboardAvailable =
    (userRole === ROLES.SHOP_MANAGER || userRole === ROLES.ADMIN) &&
    !isLoadingAuth;

  const authenticatedDashboardButton = isDashboardAvailable && (
    <AppTooltip titleTranslationKey="dashboard.tooltip">
      <AppIconButton to={routes.dashboard.path} component={AppLink}>
        <DashboardCustomizeIcon fontSize="medium" />
      </AppIconButton>
    </AppTooltip>
  );

  const dashboardButton =
    loadingDashboardButton || authenticatedDashboardButton;

  const authButton = loadingButton || logoutButton || signInButton;

  const loadingOrdersButton = isLoadingAuth && <AppLoader />;

  const authenticatedOrdersButton = userRole === ROLES.USER &&
    !isLoadingAuth && (
      <AppTooltip titleTranslationKey="orders.tooltip">
        <AppIconButton to={routes.orders.path} component={AppLink}>
          <ListAltIcon className="header__toolbar-icon" fontSize="medium" />
        </AppIconButton>
      </AppTooltip>
    );

  const ordersButton = loadingOrdersButton || authenticatedOrdersButton;

  let cartButton: ReactNode = null;

  if (isLoadingAuth) {
    cartButton = <AppLoader />;
  } else if (userRole === ROLES.USER) {
    cartButton = (
      <AppTooltip titleTranslationKey="cart.tooltip">
        <AppIconButton onClick={handleOpenCart}>{badge}</AppIconButton>
      </AppTooltip>
    );
  }

  return (
    <AppBox className="header__wrapper" data-cy="header-toolbar">
      <AppContainer maxWidth="xl" className="header__toolbar">
        <AppLink to="/">
          <AppLogo className="header__toolbar-logo-image" data-cy="logo" />
        </AppLink>
        <AppBox className="header__toolbar-action">
          <AppInputWithIcon
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            onSearch={handleSearch}
          />
          <AppBox className="header__toolbar-action-icons">
            {dashboardButton}
            {ordersButton}
            {cartButton}
            {authButton}
          </AppBox>
        </AppBox>
      </AppContainer>
    </AppBox>
  );
};

export default HeaderToolbar;
