import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppTypography from "@/components/app-typography/AppTypography";
import AppButton from "@/components/app-button/AppButton";

import SignUpForm from "@/layouts/modals/auth/components/sign-in-form/SignInForm";
import SignupForm from "@/layouts/modals/auth/components/sign-up-form/SignupForm";

import { useModalContext } from "@/context/ModalContext";

import "@/layouts/modals/auth/AuthModal.scss";

type AuthTab = "signIn" | "signup";

const AuthModal = () => {
  const { closeModal } = useModalContext();

  const [activeTab, setActiveTab] = useState<AuthTab>("signIn");

  const toggleForm = () => {
    setActiveTab((prevTab) => (prevTab === "signIn" ? "signup" : "signIn"));
  };

  const authModalContent =
    activeTab === "signIn" ? <SignUpForm /> : <SignupForm />;

  const toggleText =
    activeTab === "signIn" ? (
      <AppTypography translationKey="authModal.tosignUp.text" />
    ) : (
      <AppTypography translationKey="authModal.tosignIn.text" />
    );

  const toggleButtonText =
    activeTab === "signIn" ? (
      <AppTypography
        translationKey="authModal.tosignUp.button"
        fontWeight="extra-bold"
      />
    ) : (
      <AppTypography
        translationKey="authModal.tosignIn.button"
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
