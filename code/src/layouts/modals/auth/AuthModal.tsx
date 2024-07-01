import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppTypography from "@/components/app-typography/AppTypography";
import AppButton from "@/components/app-button/AppButton";

import LoginForm from "@/layouts/modals/auth/components/login-form/LoginForm";
import SignupForm from "@/layouts/modals/auth/components/signup-form/SignupForm";

import { useModalContext } from "@/context/ModalContext";

import "@/layouts/modals/auth/AuthModal.scss";

const AuthModal = () => {
  const { closeModal } = useModalContext();

  const [isLoginPage, setIsLoginPage] = useState(true);

  const toggleForm = () => {
    setIsLoginPage(!isLoginPage);
  };

  const authModalContent = isLoginPage ? <LoginForm /> : <SignupForm />;

  const toggleText = isLoginPage ? (
    <AppTypography translationKey="authModal.tosignUp.text" />
  ) : (
    <AppTypography translationKey="authModal.tologIn.text" />
  );

  const toggleButtonText = isLoginPage ? (
    <AppTypography
      translationKey="authModal.tosignUp.button"
      fontWeight="extra-bold"
    />
  ) : (
    <AppTypography
      translationKey="authModal.tologIn.button"
      fontWeight="extra-bold"
    />
  );

  return (
    <AppBox className="spa-auth-modal">
      <AppIconButton
        className="spa-auth-modal__close-icon"
        onClick={closeModal}
      >
        <CloseIcon />
      </AppIconButton>
      <AppBox className="spa-auth-modal__wrapper">
        <AppTypography
          variant="h3"
          translationKey={
            isLoginPage ? "authModal.logIn.title" : "authModal.signUp.title"
          }
          className="spa-auth-modal__title"
        />
      </AppBox>
      {authModalContent}
      <AppBox className="spa-auth-modal__toggle">
        {toggleText}
        <AppButton variant="text" size="small" onClick={toggleForm}>
          {toggleButtonText}
        </AppButton>
      </AppBox>
    </AppBox>
  );
};

export default AuthModal;
