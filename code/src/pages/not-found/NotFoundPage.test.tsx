import { screen } from "@testing-library/react";

import useErrorPageRedirect from "@/hooks/use-error-page-redirect/useErrorPageRedirect";
import { ErrorPageState } from "@/hooks/use-error-page-redirect/useErrorPageRedirect.types";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const defaultState = {
  goBackPath: "/",
  goBackButtonTranslationKey: "notFoundLink",
  errorMessageTranslationKey: "notFoundDesc"
};

const mockState = {
  goBackPath: "/custom-go-back-path",
  goBackButtonTranslationKey: "custom.notFoundLink",
  errorMessageTranslationKey: "custom.errorMessage"
};

jest.mock("@/hooks/use-error-page-redirect/useErrorPageRedirect");

const renderAndMock = (state: ErrorPageState | null) => {
  (useErrorPageRedirect as jest.Mock).mockReturnValue({
    state
  });

  renderWithProviders(<NotFoundPage />);
};

describe("NotFoundPage", () => {
  test("renders the 404 title correctly with default values", () => {
    renderAndMock(null);
    const errorDescription = screen.getByText(
      defaultState.errorMessageTranslationKey
    );
    expect(errorDescription).toBeInTheDocument();

    const goBackLink = screen.getByRole("link");
    expect(goBackLink).toHaveAttribute("href", defaultState.goBackPath);
    expect(goBackLink).toHaveTextContent(
      defaultState.goBackButtonTranslationKey
    );
  });

  test("renders the 404 title correctly with state from redirect", () => {
    renderAndMock(mockState);
    const errorDescription = screen.getByText(
      mockState.errorMessageTranslationKey
    );
    expect(errorDescription).toBeInTheDocument();

    const goBackLink = screen.getByRole("link");
    expect(goBackLink).toHaveAttribute("href", mockState.goBackPath);
    expect(goBackLink).toHaveTextContent(mockState.goBackButtonTranslationKey);
  });
});
