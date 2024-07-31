import { screen } from "@testing-library/react";

import { mockUser } from "@/containers/tables/users-table/UsersTable.constants";
import UsersTableBody from "@/containers/tables/users-table/components/users-table-body/UsersTableBody";

import { ExtendedUserDetails } from "@/types/user.types";
import formatDate from "@/utils/format-date/formatDate";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const renderWithUser = (user: ExtendedUserDetails) => {
  renderWithProviders(
    <table>
      <tbody>
        <tr>
          <UsersTableBody user={user} />
        </tr>
      </tbody>
    </table>
  );
};

describe("Test ProductsTable", () => {
  test("Should be rendered correctly", () => {
    renderWithUser(mockUser);

    const name = screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`);
    expect(name).toBeInTheDocument();

    const email = screen.getByText(mockUser.email);
    expect(email).toBeInTheDocument();

    const role = screen.getByText("roles.admin");
    expect(role).toBeInTheDocument();

    const status = screen.getByText("user.status.active");
    expect(status).toBeInTheDocument();

    const date = screen.getByText(formatDate(mockUser.createdAt));
    expect(date).toBeInTheDocument();
  });
});
