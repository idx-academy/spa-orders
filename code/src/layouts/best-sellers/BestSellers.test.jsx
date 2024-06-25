import { screen } from "@testing-library/react";

import { renderWithProviders } from "@/utils/test-utils";
import BestSellers from "@/layouts/best-sellers/BestSellers";

describe("BestSellers component", () => {
  beforeEach(() => {
    renderWithProviders(<BestSellers />);
  });

  test("Should render bestSellers header", () => {
    const bestSellersHeader = screen.getByText(/bestSellers.header/);

    expect(bestSellersHeader).toBeInTheDocument();
  });
});
