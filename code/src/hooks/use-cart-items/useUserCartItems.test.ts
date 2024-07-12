import { renderHook } from "@testing-library/react";

import useCartItems from "@/hooks/use-cart-items/useUserCartItems";
import useGetCart from "@/hooks/use-get-cart/useGetCart";
import useRemoveFromCart from "@/hooks/use-remove-from-cart/useRemoveFromCart";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";

jest.mock("@/store/slices/userSlice");
jest.mock("@/hooks/use-snackbar/useSnackbar");
jest.mock("@/store/api/cartApi");
jest.mock("@/hooks/use-get-cart/useGetCart");
jest.mock("@/hooks/use-remove-from-cart/useRemoveFromCart");

const mockUseUserDetailsSelector = useUserDetailsSelector as jest.Mock;
const mockUseSnackbar = useSnackbar as jest.Mock;
const mockUseGetCart = useGetCart as jest.Mock;
const mockuseRemoveFromCart = useRemoveFromCart as jest.Mock;

type RenderWithMockParams = {
  data?: CartItem[] | null;
  isLoading?: boolean;
  error?: boolean;
};

const renderWithMockParams = ({
  data = null,
  isLoading = false,
  error = false
}: RenderWithMockParams) => {
  mockUseUserDetailsSelector.mockReturnValue({ id: "user1" });
  mockUseSnackbar.mockReturnValue({ openSnackbarWithTimeout: jest.fn() });
  mockUseGetCart.mockReturnValue({
    data,
    isLoading,
    error: error ? new Error("Failed to fetch") : null
  });
  mockuseRemoveFromCart.mockReturnValue([jest.fn()]);

  return renderHook(() => useCartItems());
};

const cartItems = [{ productId: "1", name: "Product 1" }] as CartItem[];

describe("useCartItems", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return loading state when fetching cart items", () => {
    const { result } = renderWithMockParams({ isLoading: true });

    const loadingStateFetch = result.current.cartItemsLoading;
    expect(loadingStateFetch).toBe(true);
  });

  test("should return error state when fetching cart items fails", () => {
    const { result } = renderWithMockParams({ error: true });

    const errorStateFetch = result.current.error;
    expect(errorStateFetch).toEqual(new Error("Failed to fetch"));
  });

  test("should return cart items when fetching is successful", () => {
    const { result } = renderWithMockParams({ data: cartItems });

    const successStateFetch = result.current.cartItems;
    expect(successStateFetch).toEqual(cartItems);
  });
});
