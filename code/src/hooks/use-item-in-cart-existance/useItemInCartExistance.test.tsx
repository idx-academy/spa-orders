import { renderHook } from "@testing-library/react";

import useCheckItemInCartExistance from "@/hooks/use-item-in-cart-existance/useItemInCartExistance";

jest.mock("@/hooks/use-get-cart/useGetCart", () => ({
  __esModule: true,
  default: jest.fn(() => ({ data: { items: mockItems }, isFetching: false }))
}));

const mockItems = [{ productId: "1" }, { productId: "2" }];

describe("useCheckItemInCartExistance", () => {
  let checkItemInCartExistance: ReturnType<typeof useCheckItemInCartExistance>;

  beforeEach(() => {
    checkItemInCartExistance = renderHook(() => useCheckItemInCartExistance())
      .result.current;
  });
  test("returns true if product is in cart", () => {
    const isInCart = checkItemInCartExistance("1");
    expect(isInCart).toBe(true);
  });

  test("returns false if product is not in cart", () => {
    const isInCart = checkItemInCartExistance("1000");
    expect(isInCart).toBe(false);
  });
});
