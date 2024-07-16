import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import getLocalStorageCart from "@/utils/get-local-storage-cart/getLocalStorageCart";

describe("Test getLocalStorageCart", () => {
  beforeAll(() => {
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should get local storage cart", () => {
    getLocalStorageCart();

    expect(localStorage.getItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.localCart
    );
  });
});
