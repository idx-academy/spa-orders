import { renderHook } from "@testing-library/react";

import useLogout from "@/hooks/use-logout/useLogout";

const mockDispatch = jest.fn();

jest.mock("@/store/slices/userSlice", () => ({
  logout: jest.fn()
}));

jest.mock("@/store/api/cartApi", () => ({
  __esModule: true,
  default: {
    util: {
      resetApiState: jest.fn()
    }
  }
}));

jest.mock("@/store/slices/localCart", () => ({
  endpoints: {
    getCartItems: {
      matchFulfilled: jest.fn()
    }
  },
  clearLocalCart: jest.fn()
}));

jest.mock("@/hooks/use-redux/useRedux", () => ({
  __esModule: true,
  useAppDispatch: () => mockDispatch
}));

describe("Test useLogout hook", () => {
  test("Should call dispatch 3 times", () => {
    const { result } = renderHook(() => useLogout());

    result.current();

    expect(mockDispatch).toHaveBeenCalledTimes(3);
  });
});
