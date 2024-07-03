import { useSignInMutation } from "@/store/api/authApi";
import { authenticate } from "@/store/slices/userSlice";
import { SignInCredentials } from "@/types/auth.types";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";

const useSignIn = () => {
  const [signIn, options] = useSignInMutation();
  const { openSnackbarWithTimeout } = useSnackbar();
  const dispatch = useAppDispatch();

  const handleSignIn = async (credentials: SignInCredentials) => {
    const { data: userDetails, error } = await signIn(credentials);

    // Error is handled by the global middleware
    if (error) {
      return;
    }

    dispatch(authenticate(userDetails.token));
    openSnackbarWithTimeout({
      messageTranslationKey: "signIn.success",
      variant: "success"
    });
  };

  return [handleSignIn, options] as const;
};

export default useSignIn;
