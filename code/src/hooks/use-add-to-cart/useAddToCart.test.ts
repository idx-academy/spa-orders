import { renderHook, waitFor } from "@testing-library/react";

import useAddToCart from "@/hooks/use-add-to-cart/useAddToCart";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useAddToCartMutation } from "@/store/api/cartApi";
import { addToLocalCart } from "@/store/slices/localCart";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";
import { UserDetails } from "@/types/user.types";

jest.mock("@/hooks/use-redux/useRedux");
jest.mock("@/hooks/use-snackbar/useSnackbar");
jest.mock("@/store/api/cartApi");
jest.mock("@/store/slices/localCart");
jest.mock("@/store/slices/userSlice");

const successSnackbarConfig = {
  variant: "success",
  messageTranslationKey: "cart.itemAddition.success"
};

const errorSnackbarConfig = {
  variant: "error",
  messageTranslationKey: "cart.itemAddition.fail"
};

const mockUnwrap = jest.fn();
const mockOpenSnackbarWithTimeout = jest.fn();

const mockDispatch = jest.fn(() => ({ unwrap: mockUnwrap }));
const mockAddToCartMutation = jest.fn(() => ({ unwrap: mockUnwrap }));

const renderAndMock = (user?: Partial<UserDetails>) => {
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  (useAddToCartMutation as jest.Mock).mockReturnValue([
    mockAddToCartMutation,
    {}
  ]);
  (useUserDetailsSelector as jest.Mock).mockReturnValue(user);
  (useSnackbar as jest.Mock).mockReturnValue({
    openSnackbarWithTimeout: mockOpenSnackbarWithTimeout
  });

  return renderHook(() => useAddToCart());
};

describe("useAddToCart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows success snackbar when adding to local cart is successful", async () => {
    const { result } = renderAndMock();

    const data = {
      productId: "1"
    } as unknown as CartItem;

    await waitFor(() => {
      result.current[0](data);
    });

    expect(mockDispatch).toHaveBeenCalledWith(addToLocalCart(data));

    expect(mockOpenSnackbarWithTimeout).toHaveBeenCalledWith(
      successSnackbarConfig
    );
  });

  test("shows success snackbar when adding to server cart is successful", async () => {
    const userId = 5;
    const productId = 1;
    const { result } = renderAndMock({ id: userId });

    await waitFor(() => {
      result.current[0]({
        productId
      } as unknown as CartItem);
    });

    expect(mockAddToCartMutation).toHaveBeenCalledWith({
      userId,
      productId
    });

    expect(mockOpenSnackbarWithTimeout).toHaveBeenCalledWith(
      successSnackbarConfig
    );
  });

  test("shows error snackbar when adding to server cart failed", async () => {
    mockUnwrap.mockImplementationOnce(() => {
      throw new Error("Error adding to cart");
    });

    const { result } = renderAndMock({ id: 5 });

    await waitFor(() => {
      result.current[0]({
        productId: "1"
      } as unknown as CartItem);
    });

    expect(mockOpenSnackbarWithTimeout).toHaveBeenCalledWith(
      errorSnackbarConfig
    );
  });
});
