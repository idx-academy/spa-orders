import { screen } from "@testing-library/react";

import { mockUser } from "@/containers/tables/users-table/UsersTable.constants";
import UsersTableBody from "@/containers/tables/users-table/components/users-table-body/UsersTableBody";

import useLongestTranslationLength from "@/hooks/use-longest-translation-length/useLongestTranslationLength";
import { ExtendedUserDetails } from "@/types/user.types";
import formatDate from "@/utils/format-date/formatDate";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/hooks/use-longest-translation-length/useLongestTranslationLength");

const renderWithUser = (user: ExtendedUserDetails) => {
  (useLongestTranslationLength as jest.Mock)
    .mockReturnValueOnce(10)
    .mockReturnValueOnce(20);

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
  test("renders correctly", () => {
    renderWithUser(mockUser);

    const name = screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`);
    expect(name).toBeInTheDocument();

    const email = screen.getByText(mockUser.email);
    expect(email).toBeInTheDocument();

    const role = screen.getByTestId("role-badge");
    expect(role).toBeInTheDocument();
    expect(role).toHaveStyle({ width: "10ch" });

    const status = screen.getByTestId("status-badge");
    expect(status).toBeInTheDocument();
    expect(status).toHaveStyle({ width: "20ch" });

    const date = screen.getByText(formatDate(mockUser.createdAt));
    expect(date).toBeInTheDocument();
  });
});
