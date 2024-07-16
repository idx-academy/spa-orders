import { screen } from "@testing-library/react";

import EmptyCart from "@/pages/cart/components/empty-cart/EmptyCart";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("EmptyCart", () => {
  test("renders empty view", () => {
    renderWithProviders(<EmptyCart />);
    const title = screen.getByTestId("emptyCartLabel");
    expect(title).toBeInTheDocument();

    const linkToProducts = screen.getByRole("link");
    expect(linkToProducts).toHaveAttribute("href", "/products");
  });
});
