import AuthModal from "@/containers/modals/auth/AuthModal";

import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import { useModalContext } from "@/context/modal/ModalContext";

const HeaderLoginButton = () => {
  const { openModal } = useModalContext();

  const handleOpenAuthModal = () => {
    openModal(<AuthModal />);
  };

  return (
    <AppButton
      onClick={handleOpenAuthModal}
      data-testid="header-login-button"
      data-cy="auth-button"
    >
      <AppTypography component="span" translationKey="signIn.label" />
    </AppButton>
  );
};

export default HeaderLoginButton;
