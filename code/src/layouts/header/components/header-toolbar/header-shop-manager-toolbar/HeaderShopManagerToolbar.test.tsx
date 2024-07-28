import { fireEvent, screen } from "@testing-library/react";

import HeaderShopManagerToolbar from "@/layouts/header/components/header-toolbar/header-shop-manager-toolbar/HeaderShopManagerToolbar";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockDispatch = jest.fn();

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

describe("Test HeaderShopManagerToolbar component", () => {
  beforeEach(() => {
    renderWithProviders(<HeaderShopManagerToolbar />);
  });

  test("Should render orders button", () => {
    const dashboardButton = screen.getByTestId("header-dashboard-button");
    const logoutButton = screen.getByTestId("header-logout-button");

    expect(dashboardButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  test("Should call dispatch 3 times", () => {
    const logoutButton = screen.getByTestId("header-logout-button");

    fireEvent.click(logoutButton);

    expect(mockDispatch).toHaveBeenCalledTimes(3);
  });
});
