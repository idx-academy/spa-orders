import { fireEvent, screen } from "@testing-library/react";

import HeaderLoginButton from "@/layouts/header/components/header-buttons/header-login-button/HeaderLoginButton";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockOpenModal = jest.fn();

jest.mock("@/context/modal/ModalContext", () => ({
  ...jest.requireActual("@/context/modal/ModalContext"),
  useModalContext: () => ({ openModal: mockOpenModal })
}));

jest.mock("@/containers/modals/auth/AuthModal", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("HeaderLoginButton", () => {
  beforeEach(() => {
    renderWithProviders(<HeaderLoginButton />);
  });

  it("should render the login button", () => {
    const loginButton = screen.getByTestId("header-login-button");
    expect(loginButton).toBeInTheDocument();
  });

  it("should call the function on click", () => {
    const loginButton = screen.getByTestId("header-login-button");
    fireEvent.click(loginButton);
    expect(mockOpenModal).toHaveBeenCalled();
  });
});
