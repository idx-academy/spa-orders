import { FormattedMessage } from "react-intl";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
          <Button variant="contained" color="primary">
            <FormattedMessage id="login.label" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
