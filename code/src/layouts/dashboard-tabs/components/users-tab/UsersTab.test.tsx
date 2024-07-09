import { screen } from "@testing-library/react";

import UsersTab from "@/layouts/dashboard-tabs/components/users-tab/UsersTab";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("UsersTab", () => {
  test("renders correctly", () => {
    renderWithProviders(<UsersTab />);

    const content = screen.getByText("UsersTab");
    expect(content).toBeInTheDocument();
  });
});
