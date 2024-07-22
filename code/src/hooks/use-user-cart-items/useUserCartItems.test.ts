import { act, renderHook } from "@testing-library/react";

import useGetCart from "@/hooks/use-get-cart/useGetCart";
import useRemoveFromCart from "@/hooks/use-remove-from-cart/useRemoveFromCart";
import useUpdateCartItemQuantity from "@/hooks/use-update-cart-item-quantity/useUpdateCartItemQuantity";
import useUserCartItems from "@/hooks/use-user-cart-items/useUserCartItems";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";

jest.mock("@/store/slices/userSlice");
jest.mock("@/hooks/use-get-cart/useGetCart");
jest.mock("@/hooks/use-remove-from-cart/useRemoveFromCart");
jest.mock("@/hooks/use-update-cart-item-quantity/useUpdateCartItemQuantity");

const mockUseUserDetailsSelector = useUserDetailsSelector as jest.Mock;
const mockUseGetCart = useGetCart as jest.Mock;
const mockUseRemoveFromCart = useRemoveFromCart as jest.Mock;
const mockUseUpdateCartItemQuantity = useUpdateCartItemQuantity as jest.Mock;

const mockRemoveItem = jest.fn();
const mockUpdateQuantity = jest.fn();

type RenderWithMockParams = {
  data?: CartItem[] | null;
  isLoading?: boolean;
  isError?: boolean;
  updateError?: boolean;
  updating?: boolean;
  user?: { id: string } | null;
};

const renderWithMockParams = ({
  data = null,
  isLoading = false,
  isError = false,
  updateError = false,
  updating = false,
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
    isLoading: updating,
    isError: updateError
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

    const cartItemsLoadingResult = result.current.cartItemsLoading;
    expect(cartItemsLoadingResult).toBe(true);
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

  test("should call removeItem when handleRemoveItem is invoked", async () => {
    const { result } = renderWithMockParams({ data: cartItems });

    await act(async () => {
      await result.current.handleRemoveItem(cartItems[0]);
    });

    expect(mockRemoveItem).toHaveBeenCalledWith(cartItems[0]);
  });

  test("should call updateQuantity when handleQuantityChange is invoked", async () => {
    const { result } = renderWithMockParams({ data: cartItems });

    await act(async () => {
      await result.current.handleQuantityChange(cartItems[0], 2);
    });

    expect(mockUpdateQuantity).toHaveBeenCalledWith({
      userId: "user1",
      productId: "1",
      quantity: 2
    });
  });

  test("should handle updating state when updating quantity", () => {
    const { result } = renderWithMockParams({
      data: cartItems,
      updating: true
    });

    const updatingResult = result.current.updating;
    expect(updatingResult).toBe(true);
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

  test("should not call updateQuantity if user is not logged in", async () => {
    const { result } = renderWithMockParams({ data: cartItems, user: null });

    await act(async () => {
      await result.current.handleQuantityChange(cartItems[0], 2);
    });

    expect(mockUpdateQuantity).not.toHaveBeenCalled();
  });

  test("should handle error when updateQuantity fails", async () => {
    mockUpdateQuantity.mockRejectedValue(new Error("Failed to update"));
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const { result } = renderWithMockParams({ data: cartItems });

    await act(async () => {
      await result.current.handleQuantityChange(cartItems[0], 2);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to update cart item quantity:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
