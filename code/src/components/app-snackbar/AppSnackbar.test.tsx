import { screen, fireEvent } from "@testing-library/react";
import AppSnackbar from "@/components/app-snackbar/AppSnackbar";
import { renderWithProviders } from "@/utils/test-utils";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";

jest.mock("@/hooks/use-snackbar/useSnackbar", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockCloseSnackbar = jest.fn();

const mockUseSnackbar = {
  isOpen: true,
  config: { message: "Test message", variant: "success" },
  closeSnackbar: mockCloseSnackbar
};

describe("AppSnackbar", () => {
  test("renders correctly", () => {
    (useSnackbar as jest.Mock).mockReturnValueOnce(mockUseSnackbar);
    renderWithProviders(<AppSnackbar />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Test message");
  });

  test("closes snackbar when close button is clicked", () => {
    (useSnackbar as jest.Mock).mockReturnValueOnce(mockUseSnackbar);
    renderWithProviders(<AppSnackbar />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockCloseSnackbar).toHaveBeenCalled();
  });
});
