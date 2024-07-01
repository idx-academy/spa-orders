import AppInput from "@/components/app-input/AppInput";
import AppBox from "@/components/app-box/AppBox";
import AppContainer from "@/components/app-container/AppContainer";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import useInputVisibility from "@/hooks/use-input-visibility/useInputVisibility";

import "@/layouts/modals/auth/components/login-form/LoginForm.scss";

const LoginForm = () => {
  const { inputVisibility: passwordVisibility, shouldShowInputText: showPassword } =
    useInputVisibility();

  return (
    <AppContainer component="form" className="spa-login__container">
      <AppBox className="spa-login__input-fields">
        <AppInput labelTranslationKey="login.emailInput" fullWidth />
        <AppInput
          InputProps={passwordVisibility}
          type={showPassword ? "text" : "password"}
          labelTranslationKey="login.passwordInput"
          fullWidth
        />
      </AppBox>
      <AppButton size="large" className="spa-login__button" fullWidth>
        <AppTypography
          variant="subtitle2"
          translationKey="login.button"
          fontWeight="extra-bold"
        />
      </AppButton>
    </AppContainer>
  );
};

export default LoginForm;
