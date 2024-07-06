import { fireEvent, screen } from "@testing-library/react";

import AuthModal from "@/layouts/modals/auth/AuthModal";

import useSignIn from "@/hooks/use-sign-in/useSignIn";
import useSignUp from "@/hooks/use-sign-up/useSignUp";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

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
    const signInToggleText = screen.getByText("authModal.toSignUp.text");
    expect(signInToggleText).toBeInTheDocument();

    const signInToggleButton = screen.getByText("authModal.toSignUp.button");
    expect(signInToggleButton).toBeInTheDocument();
  });

  test("Should witch to SignupForm when toggle button is clicked and back", () => {
    const signInToggleButton = screen.getByText("authModal.toSignUp.button");
    fireEvent.click(signInToggleButton);

    const signUpTitle = screen.getByText("authModal.signUp.title");
    expect(signUpTitle).toBeInTheDocument();

    const signUpToggleText = screen.getByText("authModal.toSignIn.text");
    expect(signUpToggleText).toBeInTheDocument();

    const signUpToggleButton = screen.getByText("authModal.toSignIn.button");
    expect(signUpToggleButton).toBeInTheDocument();

    fireEvent.click(signUpToggleButton);

    const signInTitle = screen.getByText("authModal.signIn.title");
    expect(signInTitle).toBeInTheDocument();
  });
});
