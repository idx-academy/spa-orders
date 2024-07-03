import { ReactNode, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppTypography from "@/components/app-typography/AppTypography";
import AppButton from "@/components/app-button/AppButton";

import SignInForm from "@/layouts/forms/sign-in-form/SignInForm";
import SignUpForm from "@/layouts/forms/sign-up-form/SignUpForm";

import { useModalContext } from "@/context/ModalContext";

import "@/layouts/modals/auth/AuthModal.scss";

type AuthTab = "signIn" | "signUp";

const authModalForms = {
  signIn: <SignInForm />,
  signUp: <SignUpForm />
};

const AuthModal = () => {
  const { closeModal } = useModalContext();

  const [activeTab, setActiveTab] = useState<AuthTab>("signIn");

  const toggleForm = () => {
    setActiveTab((prevTab) => (prevTab === "signIn" ? "signUp" : "signIn"));
  };

  const authModalContent = authModalForms[activeTab] as ReactNode;

  const toggleText =
    activeTab === "signIn" ? (
      <AppTypography translationKey="authModal.toSignUp.text" />
    ) : (
      <AppTypography translationKey="authModal.toSignIn.text" />
    );

  const toggleButtonText =
    activeTab === "signIn" ? (
      <AppTypography
        translationKey="authModal.toSignUp.button"
        fontWeight="extra-bold"
      />
    ) : (
      <AppTypography
        translationKey="authModal.toSignIn.button"
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
            activeTab === "signIn"
              ? "authModal.signIn.title"
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
