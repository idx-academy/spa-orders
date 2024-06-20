import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";
import Logo from "@/assets/images/logo.jpeg";

import "@/layouts/app-header/components/header/Header.scss";

const Header = () => {
  return (
    <Box className="wrapper">
      <Box className="header">
        <Box className="header__logo">
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            className="header__logo-image"
          />
        </Box>
        <Box className="header__icons">
          <Badge badgeContent={10} color="primary">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
          <AppButton>
            <AppTypography translationKey="login.label" />
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
