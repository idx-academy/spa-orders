import { screen } from "@testing-library/react";
import AuthModal from "@/layouts/modals/auth/AuthModal";
import { renderWithProviders } from "@/utils/test-utils";

describe("AuthModal", () => {
  test("renders AuthModal component", () => {
    renderWithProviders(<AuthModal />);

    const titleElement = screen.getByText("authModal.signIn.title");
    expect(titleElement).toBeInTheDocument();
  });
});
