import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import setLocalStorageCart from "@/utils/set-local-storage-cart/setLocalStorageCart";

describe("Test setLocalStorageCart", () => {
  beforeAll(() => {
    jest.spyOn(Storage.prototype, "setItem");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should set local storage cart", () => {
    const mockCart = { items: [], totalPrice: 0 };

    setLocalStorageCart(mockCart);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.localCart,
      JSON.stringify(mockCart)
    );
  });
});
