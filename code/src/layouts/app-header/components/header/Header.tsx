import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AppBox from "@/components/app-box/AppBox";
import AppBadge from "@/components/app-badge/AppBadge";
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
          <AppBadge
            badgeContent={
              <AppTypography variant="caption-small">10</AppTypography>
            }
          >
            <ShoppingCartIcon fontSize="large" />
          </AppBadge>

          <AppButton>
            <AppTypography translationKey="login.label" />
          </AppButton>
        </AppBox>
      </AppBox>
    </AppBox>
  );
};

export default Header;
