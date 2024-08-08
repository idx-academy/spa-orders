import { renderHook } from "@testing-library/react";

import { ROLES } from "@/constants/common";
import useGetCart from "@/hooks/use-get-cart/useGetCart";
import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import useSynchronizeCart from "@/hooks/use-synchronize-cart/useSynchronizeCart";
import { useAddToCartMutation } from "@/store/api/cartApi";
import {
  useIsFirstSessionAfterAuthSelector,
  useUserDetailsSelector
} from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";
import { UserRole } from "@/types/user.types";

jest.mock("@/hooks/use-get-cart/useGetCart");
jest.mock("@/hooks/use-snackbar/useSnackbar");
jest.mock("@/store/api/cartApi");
jest.mock("@/store/slices/userSlice");

jest.mock("@/hooks/use-redux/useRedux");

type ErrorLike = Record<string, unknown> | null;

type MockAndRender = {
  user: { id: number; role: UserRole } | null;
  isFirstSessionAfterAuth: boolean;
  items: Partial<CartItem>[];
  error: ErrorLike;
};

const defaultArgs: MockAndRender = {
  user: null,
  isFirstSessionAfterAuth: false,
  items: [{ productId: "1" }, { productId: "2" }, { productId: "3" }],
  error: null
};

const mockUser = { id: 1, role: ROLES.USER };

const mockAddToCart = jest.fn();
const mockSnackbarWithTimeout = jest.fn();

const mockUnwrap = jest.fn();
const mockDispatch = jest.fn(() => ({ unwrap: mockUnwrap }));

const mockAndRender = (paramsFromArgs: Partial<MockAndRender> = {}) => {
  const params = { ...defaultArgs, ...paramsFromArgs };

  (useGetCart as jest.Mock).mockReturnValue({ data: { items: params.items } });
  (useSnackbar as jest.Mock).mockReturnValue({
    openSnackbarWithTimeout: mockSnackbarWithTimeout
  });
  (useUserDetailsSelector as jest.Mock).mockReturnValue(params.user);
  (useIsFirstSessionAfterAuthSelector as jest.Mock).mockReturnValue(
    params.isFirstSessionAfterAuth
  );
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

  if (params.error) {
    mockAddToCart.mockImplementation(() => {
      throw params.error;
    });
  }

  (useAddToCartMutation as jest.Mock).mockReturnValue([mockAddToCart]);

  renderHook(() => useSynchronizeCart());
};

const renderWithAddToCartError = (errorLike: ErrorLike) => {
  mockAndRender({
    user: mockUser,
    isFirstSessionAfterAuth: true,
    error: errorLike
  });
};

describe("useSynchronizeCart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("does not synchronize cart when user is not authorized but isFirstSessionAfterAuth is true", () => {
    mockAndRender({ isFirstSessionAfterAuth: true });
    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  test("does not synchronize cart when user is authorized but isFirstSessionAfterAuth is false", () => {
    mockAndRender({ user: mockUser });
    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  test("does not synchronize cart when user is unauthorized and isFirstSessionAfterAuth is false", () => {
    mockAndRender();
    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  test("synchronizes cart by adding all items to cart", () => {
    mockAndRender({ user: mockUser, isFirstSessionAfterAuth: true });

    for (const item of defaultArgs.items) {
      expect(mockAddToCart).toHaveBeenCalledWith({
        productId: item.productId,
        userId: mockUser.id
      });
    }
  });

  test("Should send items only if user has role USER", () => {
    mockAndRender({
      user: { ...mockUser, role: ROLES.SHOP_MANAGER },
      isFirstSessionAfterAuth: true
    });

    expect(mockAddToCart).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
  });

  test("does not show error snackbar if error does not have status field", () => {
    renderWithAddToCartError({ message: "Test error" });
    expect(mockSnackbarWithTimeout).not.toHaveBeenCalled();
  });

  test("does not show error snackbar if error has status field with 409 status code", () => {
    renderWithAddToCartError({ status: 409 });
    expect(mockSnackbarWithTimeout).not.toHaveBeenCalled();
  });

  test("shows error snackbar if error has status with not 409 status code", () => {
    renderWithAddToCartError({ status: 400 });

    expect(mockSnackbarWithTimeout).toHaveBeenCalledWith({
      messageTranslationKey: "cart.itemAdditionToRemote.fail",
      variant: "error"
    });
  });
});
