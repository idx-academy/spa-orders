import CloseIcon from "@mui/icons-material/Close";
import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppTypography from "@/components/app-typography/AppTypography";
import { useModalContext } from "@/context/ModalContext";

import "@/layouts/modals/auth/AuthModal.scss";

const AuthModal = () => {
  const { handleCloseModal } = useModalContext();

  return (
    <AppBox className="spa-auth-modal">
      <AppIconButton
        className="spa-auth-modal__close-icon"
        onClick={handleCloseModal}
      >
        <CloseIcon />
      </AppIconButton>
      <AppBox className="spa-auth-modal__wrapper">
        <AppTypography variant="h3" translationKey="authModal.signIn.title" />
      </AppBox>
    </AppBox>
  );
};

export default AuthModal;
