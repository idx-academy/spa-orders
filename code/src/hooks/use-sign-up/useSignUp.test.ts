import { renderHook, act } from "@testing-library/react";
import { useSignUpMutation } from "@/store/api/authApi";
import { authenticate } from "@/store/slices/userSlice";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import useSignUp from "@/hooks/use-sign-up/useSignUp";
import { SignUpResponse } from "@/types/auth.types";

jest.mock("@/store/api/authApi");
jest.mock("@/store/slices/userSlice");
jest.mock("@/hooks/use-snackbar/useSnackbar");
jest.mock("@/hooks/use-redux/useRedux");

const mockSignUp = jest.fn();
const mockDispatch = jest.fn();
const mockOpenSnackbarWithTimeout = jest.fn();

const credentials = {
  email: "john@gmail.com",
  password: "password",
  firstName: "John",
  lastName: "Johnes"
};

const signUpResponse: SignUpResponse = {
  id: "1",
  token: "Test token",
  email: credentials.email,
  firstName: credentials.firstName,
  lastName: credentials.lastName,
  role: "ROLE_USER"
};

type MockReturnValueType = { error: string } | { data: Record<string, string> };

const setupWithMockSignInReturnValue = async (
  returnValue: MockReturnValueType
) => {
  mockSignUp.mockResolvedValue(returnValue);

  const { result } = renderHook(() => useSignUp());

  await act(async () => {
    result.current[0](credentials);
  });
};

describe("useSignIn", () => {
  beforeEach(() => {
    (useSignUpMutation as jest.Mock).mockReturnValue([mockSignUp, {}]);
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSnackbar as jest.Mock).mockReturnValue({
      openSnackbarWithTimeout: mockOpenSnackbarWithTimeout
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should sign up successfully and dispatch authenticate action", async () => {
    await setupWithMockSignInReturnValue({ data: signUpResponse });

    expect(mockSignUp).toHaveBeenCalledWith(credentials);
    expect(mockDispatch).toHaveBeenCalledWith(authenticate(signUpResponse));
    expect(mockOpenSnackbarWithTimeout).toHaveBeenCalledWith({
      message: "You successfully signed up",
      variant: "success"
    });
  });

  test("should handle sign-up error", async () => {
    await setupWithMockSignInReturnValue({ error: "Error" });

    expect(mockSignUp).toHaveBeenCalledWith(credentials);
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockOpenSnackbarWithTimeout).not.toHaveBeenCalled();
  });
});
