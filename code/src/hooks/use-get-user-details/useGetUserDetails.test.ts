import { renderHook } from "@testing-library/react";

import { ROLES } from "@/constants/common";
import useGetUserDetails from "@/hooks/use-get-user-details/useGetUserDetails";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { UserDetails } from "@/types/user.types";

const mockUserDetails: UserDetails = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  role: ROLES.ADMIN,
  email: "john.doe@example.com",
  token: "test"
};

jest.mock("@/store/slices/userSlice", () => ({
  useUserDetailsSelector: jest.fn()
}));

const mockUseUserDetailsSelector = useUserDetailsSelector as jest.Mock;

describe("useGetUserDetails", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("returns user details when available", () => {
    mockUseUserDetailsSelector.mockReturnValue(mockUserDetails);

    const { result } = renderHook(() => useGetUserDetails());

    expect(result.current).toEqual(mockUserDetails);
  });

  test("throws an error when user details are not available", () => {
    mockUseUserDetailsSelector.mockReturnValue(null);

    jest.spyOn(console, "error").mockImplementation(() => {});

    const errorMessage = "User details are not available";

    const renderUseModalContextHookWrapper = () =>
      renderHook(() => useGetUserDetails());

    expect(renderUseModalContextHookWrapper).toThrow(errorMessage);
  });
});
