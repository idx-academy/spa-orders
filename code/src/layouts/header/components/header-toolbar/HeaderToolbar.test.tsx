import { fireEvent, screen } from "@testing-library/react";

import HeaderToolbar from "@/layouts/header/components/header-toolbar/HeaderToolbar";

import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import {
  logout,
  useIsAuthLoadingSelector,
  useIsAuthSelector
} from "@/store/slices/userSlice";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/store/slices/userSlice", () => ({
  __esModule: true,
  useIsAuthSelector: jest.fn(),
  useIsAuthLoadingSelector: jest.fn(),
  logout: jest.fn()
}));

jest.mock("@/layouts/modals/auth/AuthModal", () => ({
  __esModule: true,
  default: () => "ModalContent"
}));

jest.mock("@/hooks/use-redux/useRedux", () => ({
  __esModule: true,
  useAppDispatch: jest.fn()
}));

const mockDispatch = jest.fn();
(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

describe("HeaderToolbar", () => {
  describe("for guest users", () => {
    beforeEach(() => {
      (useIsAuthSelector as jest.Mock).mockReturnValue(false);
      (useIsAuthLoadingSelector as jest.Mock).mockReturnValue(false);
      renderWithProviders(<HeaderToolbar />);
    });

    test("renders the logo", () => {
      const logo = screen.getByAltText("App logo");
      expect(logo).toBeInTheDocument();
    });

    test("opens modal when login button is clicked", () => {
      const signInButton = screen.getByRole("button", { name: "signIn.label" });
      fireEvent.click(signInButton);

      const modalContent = screen.getByText("ModalContent");
      expect(modalContent).toBeInTheDocument();
    });
  });

  describe("for authenticated users", () => {
    let logoutButton: HTMLButtonElement;

    beforeEach(() => {
      (useIsAuthSelector as jest.Mock).mockReturnValue(true);
      (useIsAuthLoadingSelector as jest.Mock).mockReturnValue(false);
      renderWithProviders(<HeaderToolbar />);
      logoutButton = screen
        .getByTestId("LogoutButton")
        .closest("button") as HTMLButtonElement;
    });

    test("renders logout button correctly", () => {
      expect(logoutButton).toBeInTheDocument();
    });

    test("triggers logout after clicking logout button", () => {
      fireEvent.click(logoutButton);
      expect(mockDispatch).toHaveBeenCalledWith(logout());
    });
  });

  test("renders search field", () => {
    renderWithProviders(<HeaderToolbar />);

    const searchField = screen.getByPlaceholderText("Search...");
    expect(searchField).toBeInTheDocument();
  });

  test("changes input value", () => {
    renderWithProviders(<HeaderToolbar />);

    const searchField = screen.getByPlaceholderText("Search...");
    expect(searchField).toBeInTheDocument();

    fireEvent.change(searchField, { target: { value: "test" } });

    expect(searchField).toHaveValue("test");
  });

  test("clears input value when clear button is clicked", () => {
    renderWithProviders(<HeaderToolbar />);

    const searchField = screen.getByPlaceholderText("Search...");
    expect(searchField).toBeInTheDocument();

    const clearButton = screen
      .getByTestId("ClearIcon")
      .closest("button") as HTMLButtonElement;

    fireEvent.change(searchField, { target: { value: "Hello!" } });
    expect(searchField).toHaveValue("Hello!");

    fireEvent.click(clearButton);
    expect(searchField).toHaveValue("");
  });
});
