import { fireEvent, render, screen } from "@testing-library/react";

import HeaderUnauthorizedUserToolbar from "@/layouts/header/components/header-toolbar/header-unauthorized-user-toolbar/HeaderUnauthorizedUserToolbar";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockOpenModal = jest.fn();

jest.mock(
  "@/layouts/header/components/header-toolbar/header-cart-button/HeaderCartButton",
  () => () => <button data-testid="header-cart-button" />
);

jest.mock("@/context/modal/ModalContext", () => ({
  ...jest.requireActual("@/context/modal/ModalContext"),
  useModalContext: jest.fn(() => ({ openModal: mockOpenModal }))
}));

jest.mock("@/store/slices/userSlice", () => ({
  logout: jest.fn()
}));

jest.mock("@/store/api/cartApi", () => ({
  __esModule: true,
  default: {
    util: {
      resetApiState: jest.fn()
    }
  }
}));

jest.mock("@/store/slices/localCart", () => ({
  endpoints: {
    getCartItems: {
      matchFulfilled: jest.fn()
    }
  },
  clearLocalCart: jest.fn()
}));

describe("HeaderUnauthorizedUserToolbar", () => {
  beforeEach(() => {
    renderWithProviders(<HeaderUnauthorizedUserToolbar />);
  });

  test("renders two buttons with correct test ids", () => {
    const loginButton = screen.getByTestId("header-login-button");
    const cartButton = screen.getByTestId("header-cart-button");

    expect(loginButton).toBeInTheDocument();
    expect(cartButton).toBeInTheDocument();
  });

  test("opens modal when login button is clicked", () => {
    const loginButton = screen.getByTestId("header-login-button");
    fireEvent.click(loginButton);

    expect(mockOpenModal).toHaveBeenCalled();
  });
});
