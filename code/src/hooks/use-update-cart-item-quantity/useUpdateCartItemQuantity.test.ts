import { act, renderHook } from "@testing-library/react";

import useUpdateCartItemQuantity from "@/hooks/use-update-cart-item-quantity/useUpdateCartItemQuantity";
import { useUpdateCartItemQuantityMutation } from "@/store/api/cartApi";
import { CartManagementPatchParams } from "@/types/cart.types";

jest.mock("@/store/api/cartApi");

const mockUseUpdateCartItemQuantityMutation =
  useUpdateCartItemQuantityMutation as jest.Mock;

const mockUnwrap = jest.fn();
const mockUpdateCartItemQuantity = jest.fn(() => ({
  unwrap: mockUnwrap
}));
const mockDataSuccess = { success: true };

const params: CartManagementPatchParams = {
  userId: 1,
  productId: "12345",
  quantity: 2
};

const renderAndMock = (
  mockParams?: Partial<{
    isLoading: boolean;
    isError: boolean;
    data: typeof mockDataSuccess;
    error: string;
  }>
) => {
  mockUseUpdateCartItemQuantityMutation.mockReturnValue([
    mockUpdateCartItemQuantity,
    {
      isLoading: mockParams?.isLoading || false,
      isError: mockParams?.isError || false,
      data: mockParams?.data || null,
      error: mockParams?.error || null
    }
  ]);

  return renderHook(() => useUpdateCartItemQuantity());
};

describe("useUpdateCartItemQuantity", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  test("should call updateCartItemQuantity with correct parameters and unwrap the result", async () => {
    const { result } = renderAndMock();
    mockUnwrap.mockResolvedValue(mockDataSuccess);

    await act(async () => {
      await result.current.updateQuantity(params);
    });

    expect(mockUpdateCartItemQuantity).toHaveBeenCalledWith(params);
    expect(mockUnwrap).toHaveBeenCalled();
  });

  test("should handle isLoading state correctly", () => {
    const { result } = renderAndMock({ isLoading: true });

    const isLoadingResult = result.current.isLoading;
    expect(isLoadingResult).toBe(true);
  });

  test("should handle isError state correctly", () => {
    const { result } = renderAndMock({ isError: true });

    const isErrorResult = result.current.isError;
    expect(isErrorResult).toBe(true);
  });

  test("should handle data state correctly", () => {
    const { result } = renderAndMock({ data: mockDataSuccess });

    const dataCurrentResult = result.current.data;
    expect(dataCurrentResult).toBe(mockDataSuccess);
  });

  test("should handle error state correctly when updateQuantity fails", async () => {
    const error = new Error("Failed to update");
    mockUnwrap.mockRejectedValue(error);

    const { result } = renderAndMock();

    await act(async () => {
      await result.current.updateQuantity(params);
    });

    expect(console.error).toHaveBeenCalledWith(
      "Failed to update cart item quantity:",
      error
    );
  });

  test("should handle error state from mutation correctly", () => {
    const { result } = renderAndMock({ error: "Error" });

    const errorResult = result.current.error;
    expect(errorResult).toBe("Error");
  });
});
