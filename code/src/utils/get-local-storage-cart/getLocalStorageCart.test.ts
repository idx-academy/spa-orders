import { initialCart } from "@/constants/cart";
import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import getLocalStorageCart from "@/utils/get-local-storage-cart/getLocalStorageCart";

const mockCart = {
  totalPrice: 100,
  items: [{ productId: 1, quantity: 1 }]
};

const mockAndGetCart = (mockCart: unknown) => {
  jest
    .spyOn(Storage.prototype, "getItem")
    .mockImplementation(jest.fn(() => JSON.stringify(mockCart)));

  return getLocalStorageCart();
};

const mockJsonParse = jest.fn();

describe("Test getLocalStorageCart", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("Should get local storage cart and call local storage with the right param", () => {
    const result = mockAndGetCart(mockCart);

    expect(localStorage.getItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.localCart
    );
    expect(result).toEqual(mockCart);
  });

  test("Should return initial cart if local storage cart has no items property", () => {
    const result = mockAndGetCart({ totalPrice: mockCart.totalPrice });

    expect(result).toEqual(initialCart);
  });

  test("Should return initial cart if local storage cart has no totalPrice property", () => {
    const result = mockAndGetCart({ items: mockCart.items });

    expect(result).toEqual(initialCart);
  });

  test("Should return initial cart if local storage cart items property is not array", () => {
    const result = mockAndGetCart({
      totalPrice: mockCart.totalPrice,
      items: {}
    });

    expect(result).toEqual(initialCart);
  });

  test("Should return initial cart if there is no local storage value and do not use json parsing", () => {
    jest.spyOn(JSON, "parse").mockImplementationOnce(mockJsonParse);

    const result = getLocalStorageCart();

    expect(result).toEqual(initialCart);
    expect(mockJsonParse).not.toHaveBeenCalled();
  });
});
