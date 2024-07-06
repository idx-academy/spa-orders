import { fireEvent, screen } from "@testing-library/react";

import AppSnackbar from "@/components/app-snackbar/AppSnackbar";

import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { SnackbarConfigWithTimeout } from "@/types/snackbar.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/hooks/use-snackbar/useSnackbar", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockCloseSnackbar = jest.fn();

const mockUseSnackbar = {
  isOpen: true,
  config: {
    messageTranslationKey: "translation.key",
    variant: "success"
  } as SnackbarConfigWithTimeout,
  closeSnackbar: mockCloseSnackbar
};

describe("AppSnackbar", () => {
  beforeEach(() => {
    (useSnackbar as jest.Mock).mockReturnValueOnce(mockUseSnackbar);
    renderWithProviders(<AppSnackbar />);
  });

  test("renders correctly", () => {
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("translation.key");
  });

  test("closes snackbar when close button is clicked", () => {
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockCloseSnackbar).toHaveBeenCalled();
  });
});
