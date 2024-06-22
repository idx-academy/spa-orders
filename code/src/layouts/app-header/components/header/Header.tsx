import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import Logo from "@/assets/images/logo.jpeg";

import "@/layouts/app-header/components/header/Header.scss";

const Header = () => {
  return (
    <AppBox className="wrapper">
      <AppBox className="header">
        <AppBox className="header__logo">
          <AppBox
            component="img"
            src={Logo}
            alt="Logo"
            className="header__logo-image"
          />
        </AppBox>
        <AppBox className="header__icons">
          <Badge badgeContent={10} color="primary">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
          <AppButton>
            <AppTypography translationKey="login.label" />
          </AppButton>
        </AppBox>
      </AppBox>
    </AppBox>
  );
};

export default Header;
