import { renderHook } from "@testing-library/react";

import { useLazyGetCartItemsQuery } from "@/store/api/cartApi";
import { useLocalCartSelector } from "@/store/slices/localCart";
import {
  useIsAuthLoadingSelector,
  useUserDetailsSelector
} from "@/store/slices/userSlice";

import useGetCart from "./useGetCart";

jest.mock("@/store/api/cartApi", () => ({
  useLazyGetCartItemsQuery: jest.fn()
}));
jest.mock("@/store/slices/localCart", () => ({
  useLocalCartSelector: jest.fn()
}));
jest.mock("@/store/slices/userSlice", () => ({
  useUserDetailsSelector: jest.fn(),
  useIsAuthLoadingSelector: jest.fn()
}));

const mockFetchCart = jest.fn();

type ExtraParams = {
  id: number;
  isLoading: boolean;
  isUninitialized: boolean;
  isAuthLoading: boolean;
};

const renderAndMock = (params: Partial<ExtraParams> = {}) => {
  (useLazyGetCartItemsQuery as jest.Mock).mockReturnValueOnce([
    mockFetchCart,
    params
  ]);
  (useLocalCartSelector as jest.Mock).mockReturnValueOnce({});
  (useIsAuthLoadingSelector as jest.Mock).mockReturnValueOnce(
    params?.isAuthLoading || false
  );
  (useUserDetailsSelector as jest.Mock).mockReturnValueOnce(params);

  return renderHook(() => useGetCart());
};

describe("Test useGetCart", () => {
  test("Should return false if request is loading", () => {
    const { result } = renderAndMock({ isLoading: true });

    expect(result.current.isLoading).toBeTruthy();
  });

  test("Should return true if auth is loading", () => {
    const { result } = renderAndMock({ isAuthLoading: true });

    expect(result.current.isLoading).toBeTruthy();
  });

  test("Should return true if user is authorized and isUninitialized", () => {
    const { result } = renderAndMock({ isUninitialized: true, id: 5 });

    expect(result.current.isLoading).toBeTruthy();
  });

  test("Should return false if nothing is loading", () => {
    const { result } = renderAndMock();

    expect(result.current.isLoading).toBeFalsy();
  });

  test("Should call fetchCart when userId is available", () => {
    renderAndMock({ id: 5 });

    expect(mockFetchCart).toHaveBeenCalledWith({ userId: 5 });
  });

  test("Shouldn't call fetchCart when userId is unauthorized", () => {
    renderAndMock();

    expect(mockFetchCart).not.toHaveBeenCalledWith();
  });
});
