import { fireEvent, screen } from "@testing-library/react";
import HeaderToolbar from "@/layouts/header/components/header-toolbar/HeaderToolbar";
import { renderWithProviders } from "@/utils/test-utils";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import { logout, useIsAuthSelector } from "@/store/slices/userSlice";

jest.mock("@/store/slices/userSlice", () => ({
  __esModule: true,
  useIsAuthSelector: jest.fn(),
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
      (useIsAuthSelector as jest.Mock).mockReturnValue({
        isLoading: false,
        isAuthenticated: false
      });
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
      (useIsAuthSelector as jest.Mock).mockReturnValue({
        isLoading: false,
        isAuthenticated: true
      });
      renderWithProviders(<HeaderToolbar />);
      logoutButton = screen.getByTestId(/LogoutIcon/);
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

    const searchField = screen.getByTestId(/SearchIcon/);
    expect(searchField).toBeInTheDocument();
  });

  test("changes input value", () => {
    renderWithProviders(<HeaderToolbar />);

    const searchField = screen.getByRole("textbox");
    expect(searchField).toBeInTheDocument();

    fireEvent.change(searchField, { target: { value: "test" } });

    expect(searchField).toHaveValue("test");
  });

  test("clears input value when clear button is clicked", () => {
    renderWithProviders(<HeaderToolbar />);

    const searchField = screen.getByRole("textbox");
    const clearButton = screen.getAllByRole("button")[0];

    expect(searchField).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();

    fireEvent.change(searchField, { target: { value: "test" } });

    expect(searchField).toHaveValue("test");

    fireEvent.click(clearButton);

    expect(searchField).toHaveValue("");
  });
});
