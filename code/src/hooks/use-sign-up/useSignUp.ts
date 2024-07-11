import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useSignUpMutation } from "@/store/api/authApi";
import { authenticate } from "@/store/slices/userSlice";
import { SignUpCredentials } from "@/types/auth.types";

const useSignUp = () => {
  const [signUp, options] = useSignUpMutation();
  const { openSnackbarWithTimeout } = useSnackbar();
  const dispatch = useAppDispatch();

  const handleSignUp = async (credentials: SignUpCredentials) => {
    const { data: userDetails, error } = await signUp(credentials);

    // Error is handled by the global middleware
    if (error) {
      return;
    }

    dispatch(authenticate(userDetails.token));
    openSnackbarWithTimeout({
      messageTranslationKey: "signUp.success",
      variant: "success"
    });
  };

  return [handleSignUp, options] as const;
};

export default useSignUp;
