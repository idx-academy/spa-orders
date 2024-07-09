import { ReactNode, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

import SignInForm from "@/layouts/forms/sign-in-form/SignInForm";
import SignUpForm from "@/layouts/forms/sign-up-form/SignUpForm";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppTypography from "@/components/app-typography/AppTypography";

import { useModalContext } from "@/context/modal/ModalContext";

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

  const toggleTextTranslationKey =
    activeTab === "signIn"
      ? "authModal.toSignUp.text"
      : "authModal.toSignIn.text";

  const toggleButtonTextTranslationKey =
    activeTab === "signIn"
      ? "authModal.toSignUp.button"
      : "authModal.toSignIn.button";

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
        <AppTypography
          component="span"
          translationKey={toggleTextTranslationKey}
        />
        <AppButton
          variant="text"
          size="small"
          onClick={toggleForm}
          data-cy="auth-toggle-tab"
        >
          <AppTypography
            translationKey={toggleButtonTextTranslationKey}
            component="span"
            fontWeight="extra-bold"
          />
        </AppButton>
      </AppBox>
    </AppBox>
  );
};

export default AuthModal;
