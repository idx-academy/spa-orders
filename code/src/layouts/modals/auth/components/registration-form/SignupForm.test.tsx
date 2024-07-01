import { fireEvent, render, screen } from "@testing-library/react";
import SignupForm from "@/layouts/modals/auth/components/registration-form/SignupForm";

describe("SignupForm", () => {
  beforeEach(() => {
    render(<SignupForm />);
  });

  test("Should render SignupForm button", () => {
    const logInButton = screen.getByText("signup.button");
    expect(logInButton).toBeInTheDocument();
  });

  test("Should render FirstName, LastName, Email ad Passwords input fields", () => {
    const firstNameField = screen.getByLabelText("signup.firstname.field");
    expect(firstNameField).toBeInTheDocument();

    const lastNameField = screen.getByLabelText("signup.lastname.field");
    expect(lastNameField).toBeInTheDocument();

    const emailField = screen.getByLabelText("signup.email.field");
    expect(emailField).toBeInTheDocument();

    const passwordField = screen.getAllByText("signup.password.field");
    expect(passwordField).toHaveLength(2);
  });

  test("Should render visibility icon", () => {
    const visibilityOffIcons = screen.getAllByTestId("VisibilityOffIcon");
    expect(visibilityOffIcons).toHaveLength(2);
    fireEvent.click(visibilityOffIcons[0]);
    fireEvent.click(visibilityOffIcons[1]);
    const visibilityIcons = screen.getAllByTestId("VisibilityIcon");
    expect(visibilityIcons).toHaveLength(2);
  });
});
