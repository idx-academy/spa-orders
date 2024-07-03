import { screen, fireEvent, waitFor } from "@testing-library/react";
import SignInForm from "@/layouts/modals/auth/components/sign-in-form/SignInForm";
import { useModalContext } from "@/context/ModalContext";
import useSignIn from "@/hooks/use-sign-in/useSignIn";
import { renderWithProviders } from "@/utils/test-utils";
import typeIntoInput from "@/utils/typeIntoInput";

jest.mock("@/hooks/use-sign-in/useSignIn", () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock("@/context/ModalContext", () => ({
  ...jest.requireActual("@/context/ModalContext"),
  useModalContext: jest.fn()
}));

const mockCloseModal = jest.fn();
(useModalContext as jest.Mock).mockReturnValue({
  closeModal: mockCloseModal
});

const mockSignIn = jest.fn();

const mockFormValues = {
  email: "test@example.com",
  password: "Helloworld123!"
};

describe("SignInForm - Success Cases", () => {
  beforeEach(() => {
    (useSignIn as jest.Mock).mockReturnValue([
      mockSignIn,
      { isLoading: false, isSuccess: true }
    ]);
    renderWithProviders(<SignInForm />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form correctly", () => {
    const passwordInput = screen.getByLabelText(/signIn.password.field/i);
    const emailInput = screen.getByLabelText(/signIn.email.field/i);
    const submitButton = screen.getByRole("button", { name: /signIn.button/i });

    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("handles input changes and form submission", async () => {
    const emailInput = screen.getByLabelText(/signIn.email.field/);
    const passwordInput = screen.getByLabelText(/signIn.password.field/i);
    const submitButton = screen.getByRole("button", { name: /signIn.button/i });

    await typeIntoInput(emailInput, mockFormValues.email);
    await typeIntoInput(passwordInput, mockFormValues.password);

    await waitFor(() => {
      expect(emailInput).toHaveValue(mockFormValues.email);
      expect(passwordInput).toHaveValue(mockFormValues.password);
    });

    fireEvent.click(submitButton);

    await waitFor(async () => {
      expect(mockSignIn).toHaveBeenCalledWith(mockFormValues);
      expect(mockCloseModal).toHaveBeenCalled();
    });
  });

  test("toggles password visibility", async () => {
    const hideVisibilityIcon = screen.getByTestId("VisibilityOffIcon");
    expect(hideVisibilityIcon).toBeInTheDocument();
    fireEvent.click(hideVisibilityIcon);
    const showVisibilityIcon = screen.getByTestId("VisibilityIcon");
    expect(showVisibilityIcon).toBeInTheDocument();
  });
});

describe("SignInForm - Failure Cases", () => {
  beforeEach(() => {
    (useSignIn as jest.Mock).mockReturnValue([
      mockSignIn,
      { isLoading: false, isSuccess: false }
    ]);
    renderWithProviders(<SignInForm />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays validation errors", async () => {
    const submitButton = screen.getByRole("button", { name: /signIn.button/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const emailErrorMessage = screen.getByText(
        "Please provide a valid email address"
      );
      const passwordErrorMessage = screen.getByText(
        "Password must be at least 8 characters long"
      );
      expect(emailErrorMessage).toBeInTheDocument();
      expect(passwordErrorMessage).toBeInTheDocument();
    });
  });

  test("handles unsuccessful sign-in", async () => {
    const emailInput = screen.getByLabelText(/signIn.email.field/);
    const passwordInput = screen.getByLabelText(/signIn.password.field/i);
    const submitButton = screen.getByRole("button", { name: /signIn.button/i });

    await typeIntoInput(emailInput, mockFormValues.email);
    await typeIntoInput(passwordInput, mockFormValues.password);

    fireEvent.click(submitButton);

    await waitFor(async () => {
      expect(mockSignIn).toHaveBeenCalledWith(mockFormValues);
      expect(mockCloseModal).not.toHaveBeenCalled();
    });
  });
});
