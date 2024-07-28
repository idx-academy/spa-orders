import { fireEvent, screen } from "@testing-library/react";

import HeaderUserToolbar from "@/layouts/header/components/header-toolbar/header-user-toolbar/HeaderUserToolbar";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockDispatch = jest.fn();

jest.mock(
  "@/layouts/header/components/header-toolbar/header-cart-button/HeaderCartButton",
  () => () => <button data-testid="header-cart-button" />
);

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

jest.mock("@/hooks/use-redux/useRedux", () => ({
  __esModule: true,
  useAppDispatch: () => mockDispatch
}));

describe("Test HeaderUserToolbar component", () => {
  beforeEach(() => {
    renderWithProviders(<HeaderUserToolbar />);
  });

  test("Should render orders button", () => {
    const ordersButton = screen.getByTestId("header-orders-button");
    const cartButton = screen.getByTestId("header-cart-button");
    const logoutButton = screen.getByTestId("header-logout-button");

    expect(ordersButton).toBeInTheDocument();
    expect(cartButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  test("Should call dispatch 3 times", () => {
    const logoutButton = screen.getByTestId("header-logout-button");

    fireEvent.click(logoutButton);

    expect(mockDispatch).toHaveBeenCalledTimes(3);
  });
});
