import { screen } from "@testing-library/react";

import App from "@/App";

import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import { checkAuth } from "@/store/slices/userSlice";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  createBrowserRouter: jest.fn(),
  RouterProvider: () => <div>Router</div>
}));

jest.mock("@/components/app-snackbar/AppSnackbar", () => ({
  __esModule: true,
  default: () => <div>AppSnackbar</div>
}));

jest.mock("@/components/scroll-to-top-button/ScrollToTopButton", () => ({
  __esModule: true,
  default: () => <button>ScrollToTopButton</button>
}));

jest.mock("@/store/slices/userSlice", () => ({
  __esModule: true,
  checkAuth: jest.fn()
}));

jest.mock("@/hooks/use-redux/useRedux", () => ({
  __esModule: true,
  useAppDispatch: jest.fn()
}));

const mockDispatch = jest.fn();
(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

describe("App", () => {
  test("renders correctly", () => {
    renderWithProviders(<App />);

    const router = screen.getByText("Router");
    expect(router).toBeInTheDocument();

    const snackbar = screen.getByText("AppSnackbar");
    expect(snackbar).toBeInTheDocument();

    const scrollToTopButton = screen.getByText("ScrollToTopButton");
    expect(scrollToTopButton).toBeInTheDocument();
  });

  test("checks auth on initial render", () => {
    renderWithProviders(<App />);
    expect(mockDispatch).toHaveBeenCalledWith(checkAuth());
  });
});
