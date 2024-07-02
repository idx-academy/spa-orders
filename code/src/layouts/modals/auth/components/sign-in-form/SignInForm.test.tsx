import {
  render,
  screen,
  fireEvent,
  waitFor,
  act
} from "@testing-library/react";
import SignInForm from "@/layouts/modals/auth/components/sign-in-form/SignInForm";
import useSignIn from "@/hooks/use-sign-in/useSignIn";

jest.mock("@/hooks/use-sign-in/useSignIn", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockSignIn = jest.fn();
(useSignIn as jest.Mock).mockReturnValue([mockSignIn, { isLoading: false }]);

const mockFormValues = {
  email: "test@example.com",
  password: "helloworld123"
};

describe("SignInForm", () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  test("renders the form correctly", () => {
    const passwordInput = screen.getByLabelText(/signIn.password.field/i);
    const emailInput = screen.getByLabelText(/signIn.email.filed/i);
    const submitButton = screen.getByRole("button", { name: /signIn.button/i });

    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("handles input changes and form submission", async () => {
    const emailInput = screen.getByLabelText(/signIn.email.filed/);
    const passwordInput = screen.getByLabelText(/signIn.password.field/i);
    const submitButton = screen.getByRole("button", { name: /signIn.button/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: mockFormValues.email } });
      fireEvent.change(passwordInput, {
        target: { value: mockFormValues.password }
      });
    });

    await waitFor(() => {
      expect(emailInput).toHaveValue(mockFormValues.email);
      expect(passwordInput).toHaveValue(mockFormValues.password);
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(mockFormValues);
    });
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
  test("displays validation errors", async () => {
    const hideVisibilityIcon = screen.getByTestId("VisibilityOffIcon");
    expect(hideVisibilityIcon).toBeInTheDocument();

    fireEvent.click(hideVisibilityIcon);

    const showVisibilityIcon = screen.getByTestId("VisibilityIcon");
    expect(showVisibilityIcon).toBeInTheDocument();
  });
});
