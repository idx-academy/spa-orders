import { fireEvent, screen } from "@testing-library/react";
import AuthModal from "@/layouts/modals/auth/AuthModal";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import useSignUp from "@/hooks/use-sign-up/useSignUp";
import useSignIn from "@/hooks/use-sign-in/useSignIn";

jest.mock("@/hooks/use-sign-up/useSignUp", () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock("@/hooks/use-sign-in/useSignIn", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockSignIn = jest.fn();

(useSignIn as jest.Mock).mockReturnValue([mockSignIn, { isLoading: false }]);

const mockSignUp = jest.fn();
(useSignUp as jest.Mock).mockReturnValue([mockSignUp, { isLoading: false }]);

describe("AuthModal", () => {
  beforeEach(() => {
    renderWithProviders(<AuthModal />);
  });

  test("Should render modal close button", () => {
    const closeButton = screen.getByTestId(/CloseIcon/i);
    expect(closeButton).toBeInTheDocument();
  });

  test("Should render signIn modal title", () => {
    const signInTitle = screen.getByText("authModal.signIn.title");
    expect(signInTitle).toBeInTheDocument();
  });

  test("Should render signIn modal toggle text and button", () => {
    const signInToggleText = screen.getByText("authModal.tosignUp.text");
    expect(signInToggleText).toBeInTheDocument();

    const signInToggleButton = screen.getByText("authModal.tosignUp.button");
    expect(signInToggleButton).toBeInTheDocument();
  });

  test("Should witch to SignupForm when toggle button is clicked and back", () => {
    const signInToggleButton = screen.getByText("authModal.tosignUp.button");
    fireEvent.click(signInToggleButton);

    const signupTitle = screen.getByText("authModal.signUp.title");
    const signupFormInputs = screen.getAllByRole("textbox");

    expect(signupTitle).toBeInTheDocument();
    expect(signupFormInputs.length).toBe(3);

    const signupToggleText = screen.getByText("authModal.tosignIn.text");
    expect(signupToggleText).toBeInTheDocument();

    const signupToggleButton = screen.getByText("authModal.tosignIn.button");
    expect(signupToggleButton).toBeInTheDocument();

    fireEvent.click(signupToggleButton);

    const loginTitle = screen.getByText("authModal.logIn.title");
    const signinFormInputs = screen.getAllByRole("textbox");

    expect(loginTitle).toBeInTheDocument();
    expect(signinFormInputs.length).toBe(1);
  });
});
