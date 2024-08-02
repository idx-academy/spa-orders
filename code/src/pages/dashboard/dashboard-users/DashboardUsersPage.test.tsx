import { screen } from "@testing-library/react";

import { mockUser } from "@/containers/tables/users-table/UsersTable.constants";

import DashboardUsersPage from "@/pages/dashboard/dashboard-users/DashboardUsersPage";
import { useGetUsersForAdminDashboardQuery } from "@/store/api/usersApi";
import { RTKQueryMockState } from "@/types/common";
import { GetUsersForAdminResponse } from "@/types/user.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/store/api/usersApi", () => ({
  useGetUsersForAdminDashboardQuery: jest.fn()
}));

const defaultArgs: RTKQueryMockState<GetUsersForAdminResponse> = {
  data: null,
  isError: false,
  isLoading: false
};

const mockAndRender = (
  args?: RTKQueryMockState<Partial<GetUsersForAdminResponse>>
) => {
  (useGetUsersForAdminDashboardQuery as jest.Mock).mockReturnValue({
    ...defaultArgs,
    ...args
  });

  renderWithProviders(<DashboardUsersPage />);
};

describe("UsersTab", () => {
  test("renders loading element by default", () => {
    mockAndRender({ isLoading: true });

    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders error element if we have error from server", () => {
    mockAndRender({ isError: true });

    const errorElement = screen.getByText("Error");
    expect(errorElement).toBeInTheDocument();
  });

  test("renders user table if we have data from server", () => {
    mockAndRender({
      data: { content: [mockUser] }
    });

    const email = screen.getByText(mockUser.email);
    expect(email).toBeInTheDocument();
  });

  test("renders table fallback when empty array is returned from backend", () => {
    mockAndRender();

    const fallback = screen.getByText("usersTable.fallback");
    expect(fallback).toBeInTheDocument();
  });
});
