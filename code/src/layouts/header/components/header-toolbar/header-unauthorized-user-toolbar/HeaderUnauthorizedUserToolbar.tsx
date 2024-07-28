import AuthModal from "@/containers/modals/auth/AuthModal";

import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import { useModalContext } from "@/context/modal/ModalContext";

import "@/layouts/header/components/header-toolbar/HeaderToolbar.scss";

import HeaderCartButton from "@/layouts/header/components/header-toolbar/header-cart-button/HeaderCartButton";

const HeaderUnauthorizedUserToolbar = () => {
  const { openModal } = useModalContext();

  const handleOpenAuthModal = () => {
    openModal(<AuthModal />);
  };

  return (
    <>
      <HeaderCartButton />
      <AppButton
        onClick={handleOpenAuthModal}
        data-testid="header-login-button"
        data-cy="auth-button"
      >
        <AppTypography component="span" translationKey="signIn.label" />
      </AppButton>
    </>
  );
};

export default HeaderUnauthorizedUserToolbar;
