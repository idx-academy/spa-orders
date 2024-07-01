import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "@/layouts/modals/auth/components/login-form/LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  test("Should render LoginForm button", () => {
    const logInButton = screen.getByText("login.button");
    expect(logInButton).toBeInTheDocument();
  });

  test("Should render Email and Password input fields", () => {
    const emailField = screen.getByLabelText(/Email/i);
    expect(emailField).toBeInTheDocument();

    const passwordField = screen.getByLabelText(/Password/i);
    expect(passwordField).toBeInTheDocument();
  });

  test("Should render visibility icon", () => {
    const visibilityOffIcon = screen.getByTestId("VisibilityOffIcon");
    expect(visibilityOffIcon).toBeInTheDocument();
    fireEvent.click(visibilityOffIcon);
    const visibilityIcon = screen.getByTestId("VisibilityIcon");
    expect(visibilityIcon).toBeInTheDocument();
  });
});
