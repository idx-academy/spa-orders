import CloseIcon from "@mui/icons-material/Close";
import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppTypography from "@/components/app-typography/AppTypography";
import { useModalContext } from "@/context/ModalContext";

import SignupForm from "@/layouts/modals/auth/components/registration-form/SignupForm";

import "@/layouts/modals/auth/AuthModal.scss";

const AuthModal = () => {
  const { closeModal } = useModalContext();

  return (
    <AppBox className="spa-auth-modal">
      <AppIconButton
        className="spa-auth-modal__close-icon"
        onClick={closeModal}
      >
        <CloseIcon />
      </AppIconButton>
      <AppBox className="spa-auth-modal__wrapper">
        <AppTypography variant="h3" translationKey="authModal.signIn.title" />
      </AppBox>
      <SignupForm />
    </AppBox>
  );
};

export default AuthModal;
