import HeaderCartButton from "@/layouts/header/components/header-buttons/header-cart-button/HeaderCartButton";
import HeaderLogoutButton from "@/layouts/header/components/header-buttons/header-logout-button/HeaderLogoutButton";
import HeaderOrdersButton from "@/layouts/header/components/header-buttons/header-orders-button/HeaderOrdersButton";

const HeaderUserToolbar = () => {
  return (
    <>
      <HeaderOrdersButton />
      <HeaderCartButton />
      <HeaderLogoutButton />
    </>
  );
};

export default HeaderUserToolbar;
