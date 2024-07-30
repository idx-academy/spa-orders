import HeaderCartButton from "@/layouts/header/components/header-buttons/header-cart-button/HeaderCartButton";
import HeaderLoginButton from "@/layouts/header/components/header-buttons/header-login-button/HeaderLoginButton";

const HeaderUnauthorizedUserToolbar = () => {
  return (
    <>
      <HeaderCartButton />
      <HeaderLoginButton />
    </>
  );
};

export default HeaderUnauthorizedUserToolbar;
