import { ChangeEvent, useState } from "react";

import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AuthModal from "@/layouts/modals/auth/AuthModal";

import AppBadge from "@/components/app-badge/AppBadge";
import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppContainer from "@/components/app-container/AppContainer";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppInputWithIcon from "@/components/app-input-with-icon/AppInputWithIcon";
import AppLink from "@/components/app-link/AppLink";
import AppLoader from "@/components/app-loader/AppLoader";
import AppLogo from "@/components/app-logo/AppLogo";
import AppTypography from "@/components/app-typography/AppTypography";

import routes from "@/constants/routes";
import { useModalContext } from "@/context/ModalContext";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import {
  logout,
  useIsAuthLoadingSelector,
  useIsAuthSelector
} from "@/store/slices/userSlice";

import "@/layouts/header/components/header-toolbar/HeaderToolbar.scss";

const HeaderToolbar = () => {
  const { openModal } = useModalContext();
  const isAuthenticated = useIsAuthSelector();
  const isLoadingAuth = useIsAuthLoadingSelector();
  const dispatch = useAppDispatch();

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

  // @TODO: use dynamic value instead of hardcoded
  const itemsInCartCount = 10;

  const handleLogout = () => {
    dispatch(logout());
  };

  const badgeContentTypography = (
    <AppTypography variant="caption-small">{itemsInCartCount}</AppTypography>
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

  const authButton = loadingButton || logoutButton || signInButton;

  const loadingOrdersButton = isLoadingAuth && <AppLoader />;

  const authenticatedOrdersButton = isAuthenticated && !isLoadingAuth && (
    <AppIconButton to={routes.orders.path} component={AppLink}>
      <ListAltIcon className="header__toolbar-icon" fontSize="large" />
    </AppIconButton>
  );

  const ordersButton = loadingOrdersButton || authenticatedOrdersButton;

  const cartButton = isLoadingAuth ? (
    <AppLoader />
  ) : (
    <AppIconButton>
      <AppBadge
        badgeContent={badgeContentTypography}
        variant="dark"
        size="small"
      >
        <ShoppingCartIcon className="header__toolbar-icon" fontSize="large" />
      </AppBadge>
    </AppIconButton>
  );

  return (
    <AppBox className="header__wrapper">
      <AppContainer maxWidth="xl" className="header__toolbar">
        <AppLink to="/">
          <AppLogo className="header__toolbar-logo-image" />
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
            <AppBox>
              {ordersButton}
              {cartButton}
            </AppBox>
            {authButton}
          </AppBox>
        </AppBox>
      </AppContainer>
    </AppBox>
  );
};

export default HeaderToolbar;
