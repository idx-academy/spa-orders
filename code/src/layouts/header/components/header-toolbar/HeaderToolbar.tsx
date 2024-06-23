import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

  return (
    <AppContainer maxWidth="xl" className="wrapper">
      <AppBox className="header">
        <AppBox className="header__logo">
          <AppLink to="/">
            <AppBox
              component="img"
              src={Logo}
              alt="Logo"
              className="header__logo-image"
            />
          </AppLink>
        </AppBox>
        <AppBox className="header__icons">
          <AppIconButton>
            <Badge
              badgeContent={
                <AppTypography variant="caption-small">
                  {itemsInCartCount}
                </AppTypography>
              }
              color="primary"
            >
              <ShoppingCartIcon
                className="header__cart-icon"
                fontSize="large"
              />
            </Badge>
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
