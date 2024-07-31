import { act, renderHook } from "@testing-library/react";

import useGetCart from "@/hooks/use-get-cart/useGetCart";
import useRemoveFromCart from "@/hooks/use-remove-from-cart/useRemoveFromCart";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import useUpdateCartItemQuantity from "@/hooks/use-update-cart-item-quantity/useUpdateCartItemQuantity";
import useUserCartItems from "@/hooks/use-user-cart-items/useUserCartItems";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";

jest.mock("@/store/slices/userSlice");
jest.mock("@/hooks/use-get-cart/useGetCart");
jest.mock("@/hooks/use-remove-from-cart/useRemoveFromCart");
jest.mock("@/hooks/use-update-cart-item-quantity/useUpdateCartItemQuantity");
jest.mock("@/hooks/use-snackbar/useSnackbar");

const mockUseUserDetailsSelector = useUserDetailsSelector as jest.Mock;
const mockUseGetCart = useGetCart as jest.Mock;
const mockUseRemoveFromCart = useRemoveFromCart as jest.Mock;
const mockUseUpdateCartItemQuantity = useUpdateCartItemQuantity as jest.Mock;
const mockOpenSnackbarWithTimeout = jest.fn();

const mockRemoveItem = jest.fn();
const mockUpdateQuantity = jest.fn();

type RenderWithMockParams = {
  data?: CartItem[] | null;
  isLoading?: boolean;
  isError?: boolean;
  updateError?: boolean;
  isUpdating?: boolean;
  user?: { id: string } | null;
};

const renderWithMockParams = ({
  data = null,
  isLoading = false,
  isError = false,
  updateError = false,
  isUpdating = false,
  user = { id: "user1" }
}: RenderWithMockParams) => {
  mockUseUserDetailsSelector.mockReturnValue(user);
  mockUseGetCart.mockReturnValue({
    data,
    isLoading,
    isError
  });
  mockUseRemoveFromCart.mockReturnValue([mockRemoveItem]);
  mockUseUpdateCartItemQuantity.mockReturnValue({
    updateQuantity: mockUpdateQuantity,
    isLoading: isUpdating,
    isError: updateError
  });
  (useSnackbar as jest.Mock).mockReturnValue({
    openSnackbarWithTimeout: mockOpenSnackbarWithTimeout
  });

  return renderHook(() => useUserCartItems());
};

const cartItems = [{ productId: "1", name: "Product 1" }] as CartItem[];
const product = { productId: "1" } as CartItem;

describe("useUserCartItems", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return loading state when fetching cart items", () => {
    const { result } = renderWithMockParams({ isLoading: true });

    const isCartItemsLoadingResult = result.current.isCartItemsLoading;
    expect(isCartItemsLoadingResult).toBe(true);
  });

  test("should return error state when fetching cart items fails", () => {
    const { result } = renderWithMockParams({ isError: true });

    const isErrorResult = result.current.isError;
    expect(isErrorResult).toBe(true);
  });

  test("should return cart items when fetching is successful", () => {
    const { result } = renderWithMockParams({ data: cartItems });

    const cartItemsResult = result.current.cartItems;
    expect(cartItemsResult).toEqual(cartItems);
  });

  test("should call removeItem when handleRemoveItem is invoked", () => {
    const { result } = renderWithMockParams({ data: cartItems });

    act(() => {
      result.current.handleRemoveItem(cartItems[0]);
    });

    expect(mockRemoveItem).toHaveBeenCalledWith(cartItems[0]);
  });

  test("should call updateQuantity when handleQuantityChange is invoked", () => {
    const { result } = renderWithMockParams({ data: cartItems });

    act(() => {
      result.current.handleQuantityChange(cartItems[0], 2);
    });

    expect(mockUpdateQuantity).toHaveBeenCalledWith({
      userId: "user1",
      productId: "1",
      quantity: 2
    });
  });

  test("should handle isUpdating state when updating quantity", () => {
    const { result } = renderWithMockParams({
      data: cartItems,
      isUpdating: true
    });

    const isUpdatingResult = result.current.isUpdating;
    expect(isUpdatingResult).toBe(true);
  });

  test("should handle update error state when updating quantity fails", () => {
    const { result } = renderWithMockParams({
      data: cartItems,
      updateError: true
    });

    const updateErrorResult = result.current.updateError;
    expect(updateErrorResult).toBe(true);
  });

  test("should handle removal of item", () => {
    const { result } = renderWithMockParams({ data: cartItems });

    result.current.handleRemoveItem(product);

    expect(mockRemoveItem).toHaveBeenCalledWith(product);
  });

  test("should not call updateQuantity if user is not logged in", () => {
    const { result } = renderWithMockParams({ data: cartItems, user: null });

    act(() => {
      result.current.handleQuantityChange(cartItems[0], 2);
    });

    expect(mockUpdateQuantity).not.toHaveBeenCalled();
  });

  test("should handle error when updateQuantity fails and call snackbar", async () => {
    mockUpdateQuantity.mockRejectedValue(new Error("Failed to update"));

    const { result } = renderWithMockParams({ data: cartItems });

    await act(async () => {
      await result.current.handleQuantityChange(cartItems[0], 2);
    });

    expect(mockOpenSnackbarWithTimeout).toHaveBeenCalledWith({
      messageTranslationKey: "cart.itemQuantityUpdate.fail",
      variant: "error"
    });
  });
});
