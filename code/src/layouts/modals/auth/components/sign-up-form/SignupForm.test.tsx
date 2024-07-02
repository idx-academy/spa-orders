import {
  fireEvent,
  render,
  screen,
  waitFor,
  act
} from "@testing-library/react";
import SignupForm from "@/layouts/modals/auth/components/sign-up-form/SignupForm";
import useSignUp from "@/hooks/use-sign-up/useSignUp";

jest.mock("@/hooks/use-sign-up/useSignUp", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockSignUp = jest.fn();
(useSignUp as jest.Mock).mockReturnValue([mockSignUp, { isLoading: false }]);

const mockFormValues = {
  email: "test@example.com",
  password: "helloworld123",
  firstName: "Eugene",
  lastName: "Snow"
};

describe("SignupForm", () => {
  beforeEach(() => {
    render(<SignupForm />);
  });

  test("renders input fields", () => {
    const firstNameField = screen.getByLabelText(/signup.firstname.field/i);
    expect(firstNameField).toBeInTheDocument();
  });

  test("handles input changes and form submission", async () => {
    const emailInput = screen.getByLabelText(/signup.email.field/i);
    const passwordInput = screen.getByLabelText(/signup.password.field/i);
    const confirmPasswordInput = screen.getByLabelText(
      /signup.confirmpassword.field/i
    );
    const firstNameInput = screen.getByLabelText(/signup.firstname.field/i);
    const lastNameInput = screen.getByLabelText(/signup.lastname.field/i);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: mockFormValues.email } });
      fireEvent.change(passwordInput, {
        target: { value: mockFormValues.password }
      });
      fireEvent.change(confirmPasswordInput, {
        target: { value: mockFormValues.password }
      });
      fireEvent.change(firstNameInput, {
        target: { value: mockFormValues.firstName }
      });
      fireEvent.change(lastNameInput, {
        target: { value: mockFormValues.lastName }
      });
    });

    await waitFor(() => {
      expect(emailInput).toHaveValue(mockFormValues.email);
      expect(passwordInput).toHaveValue(mockFormValues.password);
      expect(firstNameInput).toHaveValue(mockFormValues.firstName);
      expect(lastNameInput).toHaveValue(mockFormValues.lastName);
      expect(confirmPasswordInput).toHaveValue(mockFormValues.password);
    });

    const submitButton = screen.getByText(/signup.button/i);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(mockFormValues);
    });
  });

  test("displays validation errors", async () => {
    const submitButton = screen.getByRole("button", { name: /signup.button/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const passwordErrors = screen.getAllByText(
        "Password must be at least 8 characters long"
      );
      const emailError = screen.getByText(
        "Please provide a valid email address"
      );
      expect(emailError).toBeInTheDocument();
      expect(passwordErrors).toHaveLength(2);
    });
  });

  test("renders visibility icon", () => {
    const hideVisibilityIcon = screen.getAllByTestId("VisibilityOffIcon");
    expect(hideVisibilityIcon).toHaveLength(2);

    hideVisibilityIcon.forEach((icon) => fireEvent.click(icon));

    const showVisibilityIcon = screen.getAllByTestId("VisibilityIcon");
    expect(showVisibilityIcon).toHaveLength(2);
  });
});
