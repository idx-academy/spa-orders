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

type AuthTab = "login" | "signup";

const AuthModal = () => {
  const { closeModal } = useModalContext();

  const [activeTab, setActiveTab] = useState<AuthTab>("login");

  const toggleForm = () => {
    setActiveTab((prevTab) => (prevTab === "login" ? "signup" : "login"));
  };

  const authModalContent =
    activeTab === "login" ? <LoginForm /> : <SignupForm />;

  const toggleText =
    activeTab === "login" ? (
      <AppTypography translationKey="authModal.tosignUp.text" />
    ) : (
      <AppTypography translationKey="authModal.tologIn.text" />
    );

  const toggleButtonText =
    activeTab === "login" ? (
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
            activeTab === "login"
              ? "authModal.logIn.title"
              : "authModal.signUp.title"
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
