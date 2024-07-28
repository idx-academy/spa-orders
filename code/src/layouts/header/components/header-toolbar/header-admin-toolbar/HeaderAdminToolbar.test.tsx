import { fireEvent, screen } from "@testing-library/react";

import HeaderAdminToolbar from "@/layouts/header/components/header-toolbar/header-admin-toolbar/HeaderAdminToolbar";

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

describe("Test HeaderAdminToolbar component", () => {
  beforeEach(() => {
    renderWithProviders(<HeaderAdminToolbar />);
  });

  test("Should render orders and logout buttons", () => {
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
