import { renderHook } from "@testing-library/react";

import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import useRemoveFromCart from "@/hooks/use-remove-from-cart/useRemoveFromCart";
import { useRemoveFromCartMutation } from "@/store/api/cartApi";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";
import { UserDetails } from "@/types/user.types";

jest.mock("@/hooks/use-redux/useRedux", () => ({
  __esModule: true,
  useAppDispatch: jest.fn(() => jest.fn(() => ({ unwrap: () => {} })))
}));

jest.mock("@/hooks/use-snackbar/useSnackbar", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    openSnackbarWithTimeout: jest.fn()
  }))
}));

jest.mock("@/store/api/cartApi", () => ({
  useRemoveFromCartMutation: jest.fn(() => [jest.fn(), {}])
}));

jest.mock("@/store/slices/localCart", () => ({
  __esModule: true,
  removeFromLocalCart: jest.fn(() => ({}))
}));

jest.mock("@/store/slices/userSlice", () => ({
  useUserDetailsSelector: jest.fn(() => ({}))
}));

const dispatch = jest.fn(() => ({ unwrap: () => {} }));
const removeFromCartMutation = jest.fn(() => ({ unwrap: () => {} }));

const renderAndMock = (user?: Partial<UserDetails>) => {
  (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

  (useRemoveFromCartMutation as jest.Mock).mockReturnValue([
    removeFromCartMutation,
    {}
  ]);

  (useUserDetailsSelector as jest.Mock).mockReturnValue(user);

  return renderHook(() => useRemoveFromCart());
};

describe("useAddToCart", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should call dispatch if there is no user", () => {
    const { result } = renderAndMock();

    result.current[0]({
      productId: "1"
    } as unknown as CartItem);

    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test("Should call useRemoveFromCartMutation if there is user", () => {
    renderAndMock({ id: 5 });

    expect(useRemoveFromCartMutation).toHaveBeenCalledTimes(1);
  });
});
