import { renderHook } from "@testing-library/react";

import useGetCart from "@/hooks/use-get-cart/useGetCart";
import useRemoveFromCart from "@/hooks/use-remove-from-cart/useRemoveFromCart";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import useUserCartItems from "@/hooks/use-user-cart-items/useUserCartItems";
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
const mockRemoveItem = jest.fn();

type RenderWithMockParams = {
  data?: CartItem[] | null;
  isLoading?: boolean;
  isError?: boolean;
};

const renderWithMockParams = ({
  data = null,
  isLoading = false,
  isError = false
}: RenderWithMockParams) => {
  mockUseUserDetailsSelector.mockReturnValue({ id: "user1" });
  mockUseSnackbar.mockReturnValue({ openSnackbarWithTimeout: jest.fn() });
  mockUseGetCart.mockReturnValue({
    data,
    isLoading,
    isError
  });
  (useRemoveFromCart as jest.Mock).mockReturnValue([mockRemoveItem]);

  return renderHook(() => useUserCartItems());
};

const cartItems = [{ productId: "1", name: "Product 1" }] as CartItem[];

describe("useUserCartItems", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return loading state when fetching cart items", () => {
    const { result } = renderWithMockParams({ isLoading: true });

    const loadingStateFetch = result.current.cartItemsLoading;
    expect(loadingStateFetch).toBe(true);
  });

  test("should return error state when fetching cart items fails", () => {
    const { result } = renderWithMockParams({ isError: true });

    const errorStateFetch = result.current.isError;
    expect(errorStateFetch).toBe(true);
  });

  test("should return cart items when fetching is successful", () => {
    const { result } = renderWithMockParams({ data: cartItems });

    const successStateFetch = result.current.cartItems;
    expect(successStateFetch).toEqual(cartItems);
  });

  test("removes item when handleRemoveItem in called", () => {
    const { result } = renderWithMockParams({ data: cartItems });

    const product = { productId: 1 } as unknown as CartItem;

    result.current.handleRemoveItem(product);
    expect(mockRemoveItem).toHaveBeenCalledWith(product);
  });
});
