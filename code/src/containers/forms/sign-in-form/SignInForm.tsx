import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppContainer from "@/components/app-container/AppContainer";
import AppInput from "@/components/app-input/AppInput";
import AppTypography from "@/components/app-typography/AppTypography";

import { useModalContext } from "@/context/modal/ModalContext";
import useInputVisibility from "@/hooks/use-input-visibility/useInputVisibility";
import useSignIn from "@/hooks/use-sign-in/useSignIn";
import {
  SignInValidatorType,
  SignInVallidationScheme
} from "@/utils/validators/signInScheme";

import "@/containers/forms/sign-in-form/SignInForm.scss";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInValidatorType>({
    resolver: zodResolver(SignInVallidationScheme)
  });

  const [signIn, { isLoading, isSuccess }] = useSignIn();

  const { closeModal } = useModalContext();

  const {
    inputVisibility: passwordVisibility,
    shouldShowInputText: showPassword
  } = useInputVisibility({ isError: Boolean(errors.password) });

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  const onSubmit = async ({ email, password }: SignInValidatorType) => {
    await signIn({ email, password });
  };

  return (
    <AppContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="spa-sign-in__container"
    >
      <AppBox className="spa-sign-in__input-fields">
        <AppInput
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email ? errors.email.message : undefined}
          labelTranslationKey="signIn.email.field"
          fullWidth
          data-cy="auth-email"
        />
        <AppInput
          {...register("password")}
          InputProps={passwordVisibility}
          type={showPassword ? "text" : "password"}
          labelTranslationKey="signIn.password.field"
          error={Boolean(errors.password)}
          helperText={errors.password ? errors.password.message : undefined}
          fullWidth
          data-cy="auth-password"
        />
      </AppBox>
      <AppButton
        size="large"
        type="submit"
        className="spa-sign-in__button"
        fullWidth
        isLoading={isLoading}
        data-cy="auth-signin-submit"
      >
        <AppTypography
          variant="subtitle2"
          component="span"
          translationKey="signIn.button"
          fontWeight="extra-bold"
        />
      </AppButton>
    </AppContainer>
  );
};

export default SignInForm;
