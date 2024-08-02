import { fireEvent, screen } from "@testing-library/react";

import useAddToCartOrOpenDrawer from "@/hooks/use-add-to-cart-or-open-drawer/useAddToCartOrOpenDrawer";
import BuyNowButton from "@/pages/product-details/components/buy-now-button/BuyNowButton";
import { Product } from "@/types/product.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/hooks/use-add-to-cart-or-open-drawer/useAddToCartOrOpenDrawer");

const mockUseAddToCartOrOpenDrawer = useAddToCartOrOpenDrawer as jest.Mock;

const productWithId = {
  id: "1",
  name: "Test Product",
  price: 100
};

const mockAddToCartOrOpenDrawer = jest.fn();

const renderAndMock = (isProductInCart = false) => {
  mockUseAddToCartOrOpenDrawer.mockReturnValue({
    isProductInCart,
    addToCartOrOpenDrawer: mockAddToCartOrOpenDrawer
  });

  renderWithProviders(
    <BuyNowButton productWithId={productWithId as Product} />
  );
};

describe("BuyNowButton", () => {
  test('calls "addToCartOrOpenDrawer" on button click', () => {
    renderAndMock();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockAddToCartOrOpenDrawer).toHaveBeenCalled();
  });

  test('displays "add to cart" text when isProductInCart is false', () => {
    renderAndMock();

    const addToCartTypography = screen.getByText(
      "productDetailsPage.addToCartButton"
    );
    expect(addToCartTypography).toBeInTheDocument();
  });

  test('displays "buy now" text when isProductInCart is true', () => {
    renderAndMock(true);

    const addToCartTypography = screen.getByText(
      "productDetailsPage.buyNowButton"
    );
    expect(addToCartTypography).toBeInTheDocument();
  });
});
