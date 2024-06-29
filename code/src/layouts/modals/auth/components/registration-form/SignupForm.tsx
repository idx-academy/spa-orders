import useInputVisibility from "@/hooks/use-input-visibility/useInputVisibility";
import AppInput from "@/components/app-input/AppInput";
import AppBox from "@/components/app-box/AppBox";
import AppContainer from "@/components/app-container/AppContainer";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/layouts/modals/auth/components/registration-form/SignupForm.scss";

const SignupForm = () => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility();
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility();
  return (
    <AppContainer component="form" className="spa-signup__container">
      <AppTypography
        variant="h3"
        translationKey="signup.form.title"
        fontWeight="extra-bold"
      />
      <AppBox className="spa-signup__name-fields">
        <AppInput label="First Name" placeholder="First Name" required />
        <AppInput label="Last Name" placeholder="Last Name" required />
      </AppBox>
      <AppBox className="spa-signup__email-password-container">
        <AppInput label="Email" placeholder="Email" fullWidth required />
        <AppInput
          InputProps={passwordVisibility}
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Password"
          fullWidth
          required
        />
        <AppInput
          InputProps={confirmPasswordVisibility}
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password"
          placeholder="Confirm Password"
          fullWidth
          required
        />
      </AppBox>
      <AppButton size="large" className="spa-signup__button" fullWidth>
        <AppTypography
          variant="subtitle2"
          translationKey="signup.form.title"
          fontWeight="extra-bold"
        />
      </AppButton>
    </AppContainer>
  );
};

export default SignupForm;
