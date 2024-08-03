import { act, renderHook } from "@testing-library/react";

import { useDrawerContext } from "@/context/drawer/DrawerContext";
import useAddToCartOrOpenDrawer from "@/hooks/use-add-to-cart-or-open-drawer/useAddToCartOrOpenDrawer";
import useAddToCart from "@/hooks/use-add-to-cart/useAddToCart";
import useGetCart from "@/hooks/use-get-cart/useGetCart";
import { Product } from "@/types/product.types";

jest.mock("@/hooks/use-add-to-cart/useAddToCart");
jest.mock("@/context/drawer/DrawerContext");
jest.mock("@/hooks/use-get-cart/useGetCart");

const baseProduct = {
  name: "Product 1",
  image: "image.jpg",
  price: 100
};

const productThatIsInCart = {
  ...baseProduct,
  id: "1"
};

const productThatInNotInCart = {
  ...baseProduct,
  id: "2"
};

const mockCartItems = [
  {
    ...baseProduct,
    productId: productThatIsInCart.id
  }
];

const mockAddToCart = jest.fn();
const mockOpenDrawer = jest.fn();

const renderAndMock = (product: Partial<Product>) => {
  (useGetCart as jest.Mock).mockReturnValue({
    data: {
      items: mockCartItems
    },
    isFetching: false
  });

  (useAddToCart as jest.Mock).mockReturnValue([mockAddToCart]);

  (useDrawerContext as jest.Mock).mockReturnValue({
    openDrawer: mockOpenDrawer
  });

  return renderHook(() => useAddToCartOrOpenDrawer(product as Product));
};

describe("useAddToCartOrOpenDrawer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("adds product to cart if it was not added before", () => {
    const { result } = renderAndMock(productThatInNotInCart);

    expect(result.current.isProductInCart).toBe(false);

    act(() => {
      result.current.addToCartOrOpenDrawer();
    });

    const { id, name, image, price } = productThatInNotInCart;

    expect(mockAddToCart).toHaveBeenCalledWith({
      productId: id,
      name,
      image,
      productPrice: price,
      quantity: 1,
      calculatedPrice: price
    });
  });

  test("opens drawer when item is already in cart", () => {
    const { result } = renderAndMock(productThatIsInCart);

    expect(result.current.isProductInCart).toBe(true);

    act(() => {
      result.current.addToCartOrOpenDrawer();
    });

    expect(mockOpenDrawer).toHaveBeenCalled();
    expect(mockAddToCart).not.toHaveBeenCalled();
  });
});
