import { fireEvent, screen, waitFor } from "@testing-library/react";

import SignInForm from "@/layouts/forms/sign-in-form/SignInForm";

import { useModalContext } from "@/context/modal/ModalContext";
import useSignIn from "@/hooks/use-sign-in/useSignIn";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

jest.mock("@/hooks/use-sign-in/useSignIn", () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock("@/context/modal/ModalContext", () => ({
  ...jest.requireActual("@/context/modal/ModalContext"),
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

describe("SignInForm", () => {
  describe("Success Cases", () => {
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
      const passwordInput = screen.getByLabelText(/signIn.password.field/);
      const emailInput = screen.getByLabelText(/signIn.email.field/);
      const submitButton = screen.getByRole("button", {
        name: /signIn.button/
      });

      expect(passwordInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    test("handles input changes and form submission", async () => {
      const emailInput = screen.getByLabelText(/signIn.email.field/);
      const passwordInput = screen.getByLabelText(/signIn.password.field/);
      const submitButton = screen.getByRole("button", {
        name: /signIn.button/
      });

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

  describe("Failure Cases", () => {
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
      const submitButton = screen.getByRole("button", {
        name: /signIn.button/
      });
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
      const passwordInput = screen.getByLabelText(/signIn.password.field/);
      const submitButton = screen.getByRole("button", {
        name: /signIn.button/
      });

      await typeIntoInput(emailInput, mockFormValues.email);
      await typeIntoInput(passwordInput, mockFormValues.password);

      fireEvent.click(submitButton);

      await waitFor(async () => {
        expect(mockSignIn).toHaveBeenCalledWith(mockFormValues);
        expect(mockCloseModal).not.toHaveBeenCalled();
      });
    });
  });
});
