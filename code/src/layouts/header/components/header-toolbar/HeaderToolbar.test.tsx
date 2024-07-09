import { fireEvent, screen } from "@testing-library/react";

import HeaderToolbar from "@/layouts/header/components/header-toolbar/HeaderToolbar";

import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import {
  logout,
  useIsAuthLoadingSelector,
  useIsAuthSelector,
  useUserRoleSelector
} from "@/store/slices/userSlice";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

jest.mock("@/store/slices/userSlice", () => ({
  __esModule: true,
  default: () => ({}),
  useIsAuthSelector: jest.fn(),
  useIsAuthLoadingSelector: jest.fn(),
  useUserRoleSelector: jest.fn(),
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

  describe("for shop maneger", () => {
    beforeEach(() => {
      (useIsAuthSelector as jest.Mock).mockReturnValue(true);
      (useIsAuthLoadingSelector as jest.Mock).mockReturnValue(false);
      (useUserRoleSelector as jest.Mock).mockReturnValue("ROLE_MANAGER");
      renderWithProviders(<HeaderToolbar />);
    });

    test("renders dashboard button", () => {
      const dashboardButton = screen.getByTestId("DashboardCustomizeIcon");
      expect(dashboardButton).toBeInTheDocument();
    });
  });

  test("renders search field", () => {
    renderWithProviders(<HeaderToolbar />);

    const searchField = screen.getByPlaceholderText("Search...");
    expect(searchField).toBeInTheDocument();
  });

  test("changes input value", async () => {
    renderWithProviders(<HeaderToolbar />);

    const searchField = screen.getByPlaceholderText("Search...");
    expect(searchField).toBeInTheDocument();

    await typeIntoInput(searchField, "test");

    expect(searchField).toHaveValue("test");
  });

  test("clears input value when clear button is clicked", async () => {
    renderWithProviders(<HeaderToolbar />);

    const searchField = screen.getByPlaceholderText("Search...");
    expect(searchField).toBeInTheDocument();

    const clearButton = screen
      .getByTestId("ClearIcon")
      .closest("button") as HTMLButtonElement;

    await typeIntoInput(searchField, "Hello!");
    expect(searchField).toHaveValue("Hello!");

    fireEvent.click(clearButton);
    expect(searchField).toHaveValue("");
  });
});
