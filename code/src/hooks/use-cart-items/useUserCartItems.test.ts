import { renderHook } from "@testing-library/react";

import useCartItems from "@/hooks/use-cart-items/useUserCartItems";
import useGetUserDetails from "@/hooks/use-get-user-details/useGetUserDetails";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import {
  useGetCartItemsQuery,
  useRemoveFromCartMutation
} from "@/store/api/cartApi";
import { CartItem } from "@/types/cart.types";

jest.mock("@/hooks/use-get-user-details/useGetUserDetails");
jest.mock("@/hooks/use-snackbar/useSnackbar");
jest.mock("@/store/api/cartApi");

const mockUseGetUserDetails = useGetUserDetails as jest.Mock;
const mockUseSnackbar = useSnackbar as jest.Mock;
const mockUseGetCartItemsQuery = useGetCartItemsQuery as jest.Mock;
const mockUseRemoveFromCartMutation = useRemoveFromCartMutation as jest.Mock;

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
  mockUseGetUserDetails.mockReturnValue({ id: "user1" });
  mockUseSnackbar.mockReturnValue({ openSnackbarWithTimeout: jest.fn() });
  mockUseGetCartItemsQuery.mockReturnValue({
    data,
    isLoading,
    error: error ? new Error("Failed to fetch") : null
  });
  mockUseRemoveFromCartMutation.mockReturnValue([jest.fn()]);

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
