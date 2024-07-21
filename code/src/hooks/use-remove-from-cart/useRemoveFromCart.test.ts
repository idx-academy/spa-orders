import { renderHook, waitFor } from "@testing-library/react";

import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useRemoveFromCartMutation } from "@/store/api/cartApi";
import { removeFromLocalCart } from "@/store/slices/localCart";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";
import { UserDetails } from "@/types/user.types";

import useRemoveFromCart from "./useRemoveFromCart";

jest.mock("@/hooks/use-redux/useRedux");
jest.mock("@/hooks/use-snackbar/useSnackbar");
jest.mock("@/store/api/cartApi");
jest.mock("@/store/slices/localCart");
jest.mock("@/store/slices/userSlice");

const successSnackbarConfig = {
  messageTranslationKey: "cart.itemDeletion.success",
  variant: "success"
};

const errorSnackbarConfig = {
  messageTranslationKey: "cart.itemDeletion.fail",
  variant: "error"
};

const mockUnwrap = jest.fn();
const mockOpenSnackbarWithTimeout = jest.fn();

const mockDispatch = jest.fn(() => ({ unwrap: mockUnwrap }));
const mockRemoveFromCart = jest.fn(() => ({ unwrap: mockUnwrap }));

const renderAndMock = (user?: Partial<UserDetails>) => {
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  (useRemoveFromCartMutation as jest.Mock).mockReturnValue([
    mockRemoveFromCart,
    {}
  ]);
  (useUserDetailsSelector as jest.Mock).mockReturnValue(user);
  (useSnackbar as jest.Mock).mockReturnValue({
    openSnackbarWithTimeout: mockOpenSnackbarWithTimeout
  });

  return renderHook(() => useRemoveFromCart());
};

describe("useRemoveFromCart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows success snackbar when removing from local cart is successful", async () => {
    const { result } = renderAndMock();

    const data = {
      productId: "1"
    } as unknown as CartItem;

    await waitFor(() => {
      result.current[0](data);
    });

    expect(mockDispatch).toHaveBeenCalledWith(removeFromLocalCart(data));

    expect(mockOpenSnackbarWithTimeout).toHaveBeenCalledWith(
      successSnackbarConfig
    );
  });

  test("shows success snackbar when removing from server cart successful", async () => {
    const userId = 5;
    const productId = 1;
    const { result } = renderAndMock({ id: userId });

    await waitFor(() => {
      result.current[0]({
        productId
      } as unknown as CartItem);
    });

    expect(mockRemoveFromCart).toHaveBeenCalledWith({
      userId,
      productId
    });

    expect(mockOpenSnackbarWithTimeout).toHaveBeenCalledWith(
      successSnackbarConfig
    );
  });

  test("shows error snackbar when removing from server cart failed", async () => {
    mockUnwrap.mockImplementationOnce(() => {
      throw new Error("Error removing from cart");
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
