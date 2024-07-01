import { fireEvent, screen } from "@testing-library/react";
import AuthModal from "@/layouts/modals/auth/AuthModal";
import { renderWithProviders } from "@/utils/test-utils";

describe("AuthModal", () => {
  beforeEach(() => {
    renderWithProviders(<AuthModal />);
  });

  test("Should render modal close button", () => {
    const closeButton = screen.getByTestId(/CloseIcon/i);
    expect(closeButton).toBeInTheDocument();
  });

  test("Should render login modal title", () => {
    const loginTitle = screen.getByText("authModal.logIn.title");
    expect(loginTitle).toBeInTheDocument();
  });

  test("Should render login modal toggle text and button", () => {
    const loginToggleText = screen.getByText("authModal.tosignUp.text");
    expect(loginToggleText).toBeInTheDocument();

    const loginToggleButton = screen.getByText("authModal.tosignUp.button");
    expect(loginToggleButton).toBeInTheDocument();
  });

  test("Should witch to SignupForm when toggle button is clicked and back", () => {
    const loginToggleButton = screen.getByText("authModal.tosignUp.button");
    fireEvent.click(loginToggleButton);

    const signupTitle = screen.getByText("authModal.signUp.title");
    const signupFormInputs = screen.getAllByRole("textbox");

    expect(signupTitle).toBeInTheDocument();
    expect(signupFormInputs.length).toBe(3);

    const signupToggleText = screen.getByText("authModal.tologIn.text");
    expect(signupToggleText).toBeInTheDocument();

    const signupToggleButton = screen.getByText("authModal.tologIn.button");
    expect(signupToggleButton).toBeInTheDocument();

    fireEvent.click(signupToggleButton);

    const loginTitle = screen.getByText("authModal.logIn.title");
    const signinFormInputs = screen.getAllByRole("textbox");

    expect(loginTitle).toBeInTheDocument();
    expect(signinFormInputs.length).toBe(1);
  });
});
