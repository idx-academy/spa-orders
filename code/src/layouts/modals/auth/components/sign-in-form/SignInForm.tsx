import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AppInput from "@/components/app-input/AppInput";
import AppBox from "@/components/app-box/AppBox";
import AppContainer from "@/components/app-container/AppContainer";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import useInputVisibility from "@/hooks/use-input-visibility/useInputVisibility";
import useSignIn from "@/hooks/use-sign-in/useSignIn";
import {
  SignInVallidationScheme,
  SignInVallidatorType
} from "@/utils/validators/signInScheme";

import "@/layouts/modals/auth/components/sign-in-form/SignInForm.scss";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInVallidatorType>({
    resolver: zodResolver(SignInVallidationScheme)
  });

  const [signIn, { isLoading }] = useSignIn();

  const {
    inputVisibility: passwordVisibility,
    shouldShowInputText: showPassword
  } = useInputVisibility();

  const onSubmit = ({ email, password }: SignInVallidatorType) => {
    signIn({ email, password });
  };

  return (
    <AppContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="spa-signIn__container"
    >
      <AppBox className="spa-signIn__input-fields">
        <AppInput
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email.message}
          labelTranslationKey="signIn.email.filed"
          fullWidth
        />
        <AppInput
          {...register("password")}
          InputProps={passwordVisibility}
          type={showPassword ? "text" : "password"}
          labelTranslationKey="signIn.password.field"
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password.message}
          fullWidth
        />
      </AppBox>
      <AppButton
        size="large"
        type="submit"
        className="spa-signIn__button"
        fullWidth
        isLoading={isLoading}
      >
        <AppTypography
          variant="subtitle2"
          translationKey="signIn.button"
          fontWeight="extra-bold"
        />
      </AppButton>
    </AppContainer>
  );
};

export default SignInForm;
