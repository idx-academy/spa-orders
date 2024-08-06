import { act, renderHook } from "@testing-library/react";

import { useDrawerContext } from "@/context/drawer/DrawerContext";
import useAddToCartOrOpenDrawer from "@/hooks/use-add-to-cart-or-open-drawer/useAddToCartOrOpenDrawer";
import useAddToCart from "@/hooks/use-add-to-cart/useAddToCart";
import useGetCart from "@/hooks/use-get-cart/useGetCart";
import { CartItem } from "@/types/cart.types";
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

// isFetching, isLoading, expectedIsLoading
const loadingTests = [
  [true, false, true],
  [false, true, true],
  [false, false, false],
  [true, true, true]
];

const mockAddToCart = jest.fn();
const mockOpenDrawer = jest.fn();

type RenderAndMock = {
  product: Partial<Product>;
  cartItems: Partial<CartItem>[];
  isFetching?: boolean;
  isLoading?: boolean;
};

const defaultArgs: RenderAndMock = {
  product: productThatIsInCart,
  cartItems: mockCartItems,
  isFetching: false,
  isLoading: false
};

const renderAndMock = (args: Partial<RenderAndMock> = {}) => {
  const options = { ...defaultArgs, ...args };
  (useGetCart as jest.Mock).mockReturnValue({
    data: {
      items: options.cartItems
    },
    isFetching: options.isFetching,
    isLoading: options.isLoading
  });

  (useAddToCart as jest.Mock).mockReturnValue([
    mockAddToCart,
    {
      isLoading: false
    }
  ]);

  (useDrawerContext as jest.Mock).mockReturnValue({
    openDrawer: mockOpenDrawer
  });

  return renderHook(() => useAddToCartOrOpenDrawer(options.product as Product));
};

describe("useAddToCartOrOpenDrawer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("adds product to cart if it was not added before", () => {
    const { result } = renderAndMock({ product: productThatInNotInCart });

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
    const { result } = renderAndMock({ product: productThatIsInCart });

    expect(result.current.isProductInCart).toBe(true);

    act(() => {
      result.current.addToCartOrOpenDrawer();
    });

    expect(mockOpenDrawer).toHaveBeenCalled();
    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  test("returns isProductInCart as false when cart items array is empty", () => {
    const { result } = renderAndMock({ cartItems: [] });
    expect(result.current.isProductInCart).toBe(false);
  });

  test.each(loadingTests)(
    "returns isLoading as %p when isFetching is %p and isLoading is %p",
    (isFetching, isLoading, expectedIsLoading) => {
      const { result } = renderAndMock({ isFetching, isLoading });
      expect(result.current.isCartLoading).toBe(expectedIsLoading);
    }
  );
});
