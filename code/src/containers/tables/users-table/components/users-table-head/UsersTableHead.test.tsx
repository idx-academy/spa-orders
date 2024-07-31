import { screen } from "@testing-library/react";

import UsersTableHead from "@/containers/tables/users-table/components/users-table-head/UsersTableHead";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("UsersTableHead", () => {
  test("renders correctly", () => {
    renderWithProviders(
      <table>
        <tbody>
          <tr>
            <UsersTableHead head="head" />
          </tr>
        </tbody>
      </table>
    );

    const headElement = screen.getByText("head");
    expect(headElement).toBeInTheDocument();
  });
});
