import AppInput from "@/components/app-input/AppInput";
import AppBox from "@/components/app-box/AppBox";
import AppContainer from "@/components/app-container/AppContainer";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import useInputVisibility from "@/hooks/use-input-visibility/useInputVisibility";

import "@/layouts/modals/auth/components/signup-form/SignupForm.scss";

const SignupForm = () => {
  const {
    inputVisibility: passwordVisibility,
    shouldShowInputText: showPassword
  } = useInputVisibility();
  const {
    inputVisibility: confirmPasswordVisibility,
    shouldShowInputText: showConfirmPassword
  } = useInputVisibility();

  return (
    <AppContainer component="form" className="spa-signup__container">
      <AppBox className="spa-signup__name-fields">
        <AppInput labelTranslationKey="signup.firstname.field" />
        <AppInput labelTranslationKey="signup.lastname.field" />
      </AppBox>
      <AppBox className="spa-signup__email-password-container">
        <AppInput labelTranslationKey="signup.email.field" fullWidth />
        <AppInput
          InputProps={passwordVisibility}
          type={showPassword ? "text" : "password"}
          labelTranslationKey="signup.password.field"
          fullWidth
        />
        <AppInput
          InputProps={confirmPasswordVisibility}
          type={showConfirmPassword ? "text" : "password"}
          labelTranslationKey="signup.confirmpassword.field"
          fullWidth
        />
      </AppBox>
      <AppButton size="large" className="spa-signup__button" fullWidth>
        <AppTypography
          variant="subtitle2"
          translationKey="signup.button"
          fontWeight="extra-bold"
        />
      </AppButton>
    </AppContainer>
  );
};

export default SignupForm;
