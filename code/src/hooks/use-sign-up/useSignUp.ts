import { useSignUpMutation } from "@/store/api/authApi";
import { SignUpCredentials } from "@/types/auth.types";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { authenticate } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";

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

    dispatch(authenticate(userDetails));
    openSnackbarWithTimeout({
      message: "You successfully signed up",
      variant: "success"
    });
  };

  return [handleSignUp, options] as const;
};

export default useSignUp;
