import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AppBadge from "@/components/app-badge/AppBadge";
import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppContainer from "@/components/app-container/AppContainer";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";

import Logo from "@/assets/images/logo.jpeg";

import "@/layouts/header/components/header-toolbar/HeaderToolbar.scss";

const HeaderToolbar = () => {
  // @TODO: use dynamic value instead of hardcoded
  const itemsInCartCount = 10;

  const badgeContentTypography = (
    <AppTypography variant="caption-small">{itemsInCartCount}</AppTypography>
  );

  return (
    <AppContainer maxWidth="xl" className="header__wrapper">
      <AppBox className="header__toolbar">
        <AppBox className="header__toolbar-logo">
          <AppLink to="/">
            <AppBox
              component="img"
              src={Logo}
              alt="Logo"
              className="header__toolbar-logo-image"
            />
          </AppLink>
        </AppBox>
        <AppBox className="header__toolbar-icons">
          <AppIconButton>
            <AppBadge
              badgeContent={badgeContentTypography}
              color="dark"
              size="small"
            >
              <ShoppingCartIcon
                className="header__toolbar-cart-icon"
                fontSize="large"
              />
            </AppBadge>
          </AppIconButton>
          <AppButton>
            <AppTypography translationKey="login.label" />
          </AppButton>
        </AppBox>
      </AppBox>
    </AppContainer>
  );
};

export default HeaderToolbar;
