import { screen } from "@testing-library/react";

import NotFoundPage from "@/pages/not-found/NotFoundPage";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("NotFoundPage", () => {
  test("renders the 404 title correctly", () => {
    renderWithProviders(<NotFoundPage />);

    const errorCode = screen.getByText("404");

    expect(errorCode).toBeInTheDocument();
  });
});
