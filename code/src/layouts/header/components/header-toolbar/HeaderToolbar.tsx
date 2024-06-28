import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AuthModal from "@/layouts/modals/auth/AuthModal";
import AppBadge from "@/components/app-badge/AppBadge";
import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppContainer from "@/components/app-container/AppContainer";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppLogo from "@/components/app-logo/AppLogo";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";

import { useModalContext } from "@/context/ModalContext";
import { logout, useIsAuthSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";

import "@/layouts/header/components/header-toolbar/HeaderToolbar.scss";

const HeaderToolbar = () => {
  const { openModal } = useModalContext();
  const isAuthenticated = useIsAuthSelector();
  const dispatch = useAppDispatch();

  // @TODO: use dynamic value instead of hardcoded
  const itemsInCartCount = 10;

  const badgeContentTypography = (
    <AppTypography variant="caption-small">{itemsInCartCount}</AppTypography>
  );

  const handleOpenAuthModal = () => {
    openModal(<AuthModal />);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const AuthButton = isAuthenticated ? (
    <AppButton onClick={handleLogout}>
      <AppTypography translationKey="logout.label" />
    </AppButton>
  ) : (
    <AppButton onClick={handleOpenAuthModal}>
      <AppTypography translationKey="login.label" />
    </AppButton>
  );

  return (
    <AppBox className="header__wrapper">
      <AppContainer maxWidth="xl" className="header__toolbar">
        <AppBox className="header__toolbar-logo">
          <AppLink to="/">
            <AppLogo className="header__toolbar-logo-image" />
          </AppLink>
        </AppBox>
        <AppBox className="header__toolbar-icons">
          <AppIconButton>
            <AppBadge
              badgeContent={badgeContentTypography}
              variant="dark"
              size="small"
            >
              <ShoppingCartIcon
                className="header__toolbar-cart-icon"
                fontSize="large"
              />
            </AppBadge>
          </AppIconButton>
          {AuthButton}
        </AppBox>
      </AppContainer>
    </AppBox>
  );
};

export default HeaderToolbar;
