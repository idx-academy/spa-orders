import { act, renderHook } from "@testing-library/react";

import { useDrawerContext } from "@/context/drawer/DrawerContext";
import useAddToCartOrOpenDrawer from "@/hooks/use-add-to-cart-or-open-drawer/useAddToCartOrOpenDrawer";
import useAddToCart from "@/hooks/use-add-to-cart/useAddToCart";
import useCheckItemInCartExistance from "@/hooks/use-item-in-cart-existance/useItemInCartExistance";

jest.mock("@/hooks/use-item-in-cart-existance/useItemInCartExistance");
jest.mock("@/hooks/use-add-to-cart/useAddToCart");
jest.mock("@/context/drawer/DrawerContext");

const product = {
  id: "1",
  name: "Product 1",
  image: "image.jpg",
  price: 100
};

const mockAddToCart = jest.fn();
const mockOpenDrawer = jest.fn();

const renderAndMock = (isInCart = false) => {
  const checkItemInCartExistance = jest.fn().mockReturnValue(isInCart);
  (useCheckItemInCartExistance as jest.Mock).mockReturnValue(
    checkItemInCartExistance
  );

  (useAddToCart as jest.Mock).mockReturnValue([mockAddToCart]);

  (useDrawerContext as jest.Mock).mockReturnValue({
    openDrawer: mockOpenDrawer
  });

  return renderHook(() => useAddToCartOrOpenDrawer(product as any));
};

describe("useAddToCartOrOpenDrawer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add product to cart if not in cart and open drawer if already in cart", () => {
    const { result } = renderAndMock(false);

    expect(result.current.isProductInCart).toBe(false);

    act(() => {
      result.current.addToCartOrOpenDrawer();
    });

    expect(mockAddToCart).toHaveBeenCalledWith({
      productId: product.id,
      name: product.name,
      image: product.image,
      productPrice: product.price,
      quantity: 1,
      calculatedPrice: product.price
    });
    expect(result.current.isProductInCart).toBe(true);

    act(() => {
      result.current.addToCartOrOpenDrawer();
    });

    expect(mockOpenDrawer).toHaveBeenCalled();
  });

  it("should set isProductInCart based on item existence in cart", () => {
    const { result } = renderAndMock(true);

    expect(result.current.isProductInCart).toBe(true);

    act(() => {
      result.current.addToCartOrOpenDrawer();
    });

    expect(mockOpenDrawer).toHaveBeenCalled();
    expect(mockAddToCart).not.toHaveBeenCalled();
  });
});
