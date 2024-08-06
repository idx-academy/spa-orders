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

type RenderAndMock = {
  isProductInCart?: boolean;
  isCartLoading?: boolean;
  isAddingToCart?: boolean;
};

const defaultArgs: RenderAndMock = {
  isProductInCart: false,
  isAddingToCart: false,
  isCartLoading: false
};

const renderAndMock = (args: Partial<RenderAndMock> = {}) => {
  const options = { ...defaultArgs, ...args };

  mockUseAddToCartOrOpenDrawer.mockReturnValue({
    isProductInCart: options.isProductInCart,
    addToCartOrOpenDrawer: mockAddToCartOrOpenDrawer,
    isCartLoading: options.isCartLoading,
    isAddingToCart: options.isAddingToCart
  });

  renderWithProviders(
    <BuyNowButton productWithId={productWithId as Product} />
  );
};

// isCartLoading, isAddingToCart, translationKey, isDisabled
const testCases = [
  [false, false, "productDetailsPage.addToCartButton", false],
  [true, false, "productDetailsPage.addToCartButton", true],
  [false, true, "productDetailsPage.addingToCartButton", true],
  [true, true, "productDetailsPage.addingToCartButton", true]
] as const;

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
    renderAndMock({ isProductInCart: true });

    const addToCartTypography = screen.getByText(
      "productDetailsPage.buyNowButton"
    );
    expect(addToCartTypography).toBeInTheDocument();
  });

  test.each(testCases)(
    "displays correct button state when isCartLoading is %p and isAddingToCart is %p",
    (isCartLoading, isAddingToCart, translationKey, isDisabled) => {
      renderAndMock({ isCartLoading, isAddingToCart });

      const buttonLabel = screen.getByText(translationKey);
      expect(buttonLabel).toBeInTheDocument();

      const buyNowButton = screen.getByRole("button");

      if (isDisabled) {
        expect(buyNowButton).toBeDisabled();
      } else {
        expect(buyNowButton).not.toBeDisabled();
      }
    }
  );
});
