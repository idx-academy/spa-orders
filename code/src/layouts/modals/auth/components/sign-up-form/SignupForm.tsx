import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AppInput from "@/components/app-input/AppInput";
import AppBox from "@/components/app-box/AppBox";
import AppContainer from "@/components/app-container/AppContainer";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import useInputVisibility from "@/hooks/use-input-visibility/useInputVisibility";
import useSignUp from "@/hooks/use-sign-up/useSignUp";
import {
  SignUpValidationScheme,
  SignUpValidatorType
} from "@/utils/validators/signUpScheme";

import "@/layouts/modals/auth/components/sign-up-form/SignupForm.scss";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpValidatorType>({
    resolver: zodResolver(SignUpValidationScheme)
  });

  const [signUp, { isLoading }] = useSignUp();

  const {
    inputVisibility: passwordVisibility,
    shouldShowInputText: showPassword
  } = useInputVisibility();
  const {
    inputVisibility: confirmPasswordVisibility,
    shouldShowInputText: showConfirmPassword
  } = useInputVisibility();

  const onSubmit = ({
    email,
    firstName,
    lastName,
    password
  }: SignUpValidatorType) => {
    signUp({ email, firstName, lastName, password });
  };

  return (
    <AppContainer
      component="form"
      className="spa-signup__container"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AppBox className="spa-signup__name-fields">
        <AppInput
          {...register("firstName")}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName ? errors.firstName.message : ""}
          labelTranslationKey="signup.firstname.field"
        />
        <AppInput
          {...register("lastName")}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName ? errors.lastName.message : ""}
          labelTranslationKey="signup.lastname.field"
        />
      </AppBox>
      <AppBox className="spa-signup__email-password-container">
        <AppInput
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email ? errors.email.message : ""}
          labelTranslationKey="signup.email.field"
          fullWidth
        />
        <AppInput
          {...register("password")}
          InputProps={passwordVisibility}
          type={showPassword ? "text" : "password"}
          error={Boolean(errors.password)}
          helperText={errors.password ? errors.password.message : ""}
          labelTranslationKey="signup.password.field"
          fullWidth
        />
        <AppInput
          {...register("confirmPassword")}
          InputProps={confirmPasswordVisibility}
          type={showConfirmPassword ? "text" : "password"}
          error={Boolean(errors.confirmPassword)}
          helperText={
            errors.confirmPassword ? errors.confirmPassword.message : ""
          }
          labelTranslationKey="signup.confirmpassword.field"
          fullWidth
        />
      </AppBox>
      <AppButton
        size="large"
        className="spa-signup__button"
        fullWidth
        type="submit"
        isLoading={isLoading}
      >
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
