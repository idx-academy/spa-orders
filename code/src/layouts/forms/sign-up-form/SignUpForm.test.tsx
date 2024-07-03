import { fireEvent, screen, waitFor } from "@testing-library/react";
import SignUpForm from "@/layouts/forms/sign-up-form/SignUpForm";
import { useModalContext } from "@/context/ModalContext";
import useSignUp from "@/hooks/use-sign-up/useSignUp";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

jest.mock("@/hooks/use-sign-up/useSignUp", () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock("@/context/ModalContext", () => ({
  ...jest.requireActual("@/context/ModalContext"),
  useModalContext: jest.fn()
}));

const mockSignUp = jest.fn();
(useSignUp as jest.Mock).mockReturnValue([mockSignUp, { isLoading: false }]);

const mockCloseModal = jest.fn();
(useModalContext as jest.Mock).mockReturnValue({
  closeModal: mockCloseModal
});

const mockFormValues = {
  email: "test@example.com",
  password: "Helloworld123!",
  firstName: "Eugene",
  lastName: "Snow"
};

describe("SignUpForm", () => {
  describe("Success Cases", () => {
    beforeEach(() => {
      (useSignUp as jest.Mock).mockReturnValue([
        mockSignUp,
        { isLoading: false, isSuccess: true }
      ]);
      renderWithProviders(<SignUpForm />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("renders input fields", () => {
      const firstNameField = screen.getByLabelText(/signUp.firstname.field/);
      expect(firstNameField).toBeInTheDocument();
    });

    test("handles input changes and form submission", async () => {
      const emailInput = screen.getByLabelText(/signUp.email.field/);
      const passwordInput = screen.getByLabelText(/signUp.password.field/);
      const confirmPasswordInput = screen.getByLabelText(
        /signUp.confirmpassword.field/
      );
      const firstNameInput = screen.getByLabelText(/signUp.firstname.field/);
      const lastNameInput = screen.getByLabelText(/signUp.lastname.field/);

      await typeIntoInput(emailInput, mockFormValues.email);
      await typeIntoInput(passwordInput, mockFormValues.password);
      await typeIntoInput(confirmPasswordInput, mockFormValues.password);
      await typeIntoInput(firstNameInput, mockFormValues.firstName);
      await typeIntoInput(lastNameInput, mockFormValues.lastName);

      await waitFor(() => {
        expect(emailInput).toHaveValue(mockFormValues.email);
        expect(passwordInput).toHaveValue(mockFormValues.password);
        expect(firstNameInput).toHaveValue(mockFormValues.firstName);
        expect(lastNameInput).toHaveValue(mockFormValues.lastName);
        expect(confirmPasswordInput).toHaveValue(mockFormValues.password);
      });

      const submitButton = screen.getByText(/signUp.button/);

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalledWith(mockFormValues);
        expect(mockCloseModal).toHaveBeenCalled();
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

  describe("Failure Cases", () => {
    beforeEach(() => {
      (useSignUp as jest.Mock).mockReturnValue([
        mockSignUp,
        { isLoading: false, isSuccess: false }
      ]);
      renderWithProviders(<SignUpForm />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("displays validation errors", async () => {
      const submitButton = screen.getByRole("button", {
        name: /signUp.button/
      });

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
    test("handles unsuccessful sign-up", async () => {
      const emailInput = screen.getByLabelText(/signUp.email.field/);
      const passwordInput = screen.getByLabelText(/signUp.password.field/);
      const confirmPasswordInput = screen.getByLabelText(
        /signUp.confirmpassword.field/
      );
      const firstNameInput = screen.getByLabelText(/signUp.firstname.field/);
      const lastNameInput = screen.getByLabelText(/signUp.lastname.field/);

      await typeIntoInput(emailInput, mockFormValues.email);
      await typeIntoInput(passwordInput, mockFormValues.password);
      await typeIntoInput(confirmPasswordInput, mockFormValues.password);
      await typeIntoInput(firstNameInput, mockFormValues.firstName);
      await typeIntoInput(lastNameInput, mockFormValues.lastName);

      await waitFor(() => {
        expect(emailInput).toHaveValue(mockFormValues.email);
        expect(passwordInput).toHaveValue(mockFormValues.password);
        expect(firstNameInput).toHaveValue(mockFormValues.firstName);
        expect(lastNameInput).toHaveValue(mockFormValues.lastName);
        expect(confirmPasswordInput).toHaveValue(mockFormValues.password);
      });

      const submitButton = screen.getByText(/signUp.button/);

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalledWith(mockFormValues);
        expect(mockCloseModal).not.toHaveBeenCalled();
      });
    });
  });
});
