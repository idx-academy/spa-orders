import { renderHook, act } from "@testing-library/react";
import { useSignInMutation } from "@/store/api/authApi";
import { authenticate } from "@/store/slices/userSlice";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import useSignIn from "@/hooks/use-sign-in/useSignIn";
import { SignInResponse } from "@/types/auth.types";

jest.mock("@/store/api/authApi");
jest.mock("@/store/slices/userSlice");
jest.mock("@/hooks/use-snackbar/useSnackbar");
jest.mock("@/hooks/use-redux/useRedux");

const mockSignIn = jest.fn();
const mockDispatch = jest.fn();
const mockOpenSnackbarWithTimeout = jest.fn();

const credentials = {
  email: "john@gmail.com",
  password: "password"
};

const signInResponse: SignInResponse = {
  id: "1",
  token: "Test token",
  email: credentials.email,
  firstName: "John",
  lastName: "Johnes",
  role: "ROLE_USER"
};

type MockReturnValueType = { error: string } | { data: Record<string, string> };

const setupWithMockSignInReturnValue = async (
  returnValue: MockReturnValueType
) => {
  mockSignIn.mockResolvedValue(returnValue);

  const { result } = renderHook(() => useSignIn());

  await act(async () => {
    result.current[0](credentials);
  });
};

describe("useSignIn", () => {
  beforeEach(() => {
    (useSignInMutation as jest.Mock).mockReturnValue([mockSignIn, {}]);
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSnackbar as jest.Mock).mockReturnValue({
      openSnackbarWithTimeout: mockOpenSnackbarWithTimeout
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should sign in successfully and dispatch authenticate action", async () => {
    await setupWithMockSignInReturnValue({ data: signInResponse });

    expect(mockSignIn).toHaveBeenCalledWith(credentials);
    expect(mockDispatch).toHaveBeenCalledWith(authenticate(signInResponse));
    expect(mockOpenSnackbarWithTimeout).toHaveBeenCalledWith({
      message: "You successfully signed in",
      variant: "success"
    });
  });

  test("should handle sign-in error", async () => {
    await setupWithMockSignInReturnValue({ error: "Error" });

    expect(mockSignIn).toHaveBeenCalledWith(credentials);
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockOpenSnackbarWithTimeout).not.toHaveBeenCalled();
  });
});
