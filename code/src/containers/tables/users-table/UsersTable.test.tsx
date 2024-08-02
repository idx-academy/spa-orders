import { screen } from "@testing-library/react";

import UsersTable from "@/containers/tables/users-table/UsersTable";
import {
  mockUser,
  usersTableColumns
} from "@/containers/tables/users-table/UsersTable.constants";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("UsersTable", () => {
  test("renders correctly", () => {
    const { container } = renderWithProviders(
      <UsersTable users={[mockUser]} />
    );

    usersTableColumns
      .filter((item) => item)
      .forEach((columnTitle) => {
        const columnElement = screen.getByText(columnTitle);
        expect(columnElement).toBeInTheDocument();
      });

    const tableCells = screen.getAllByRole("cell");

    const bodyElement = container.querySelector(".users-table__body");
    const containerElement = container.querySelector(".users-table");

    expect(tableCells.length).toBe(usersTableColumns.length);
    expect(bodyElement).toBeInTheDocument();
    expect(containerElement).toBeInTheDocument();
  });

  test("renders fallback correctly", () => {
    renderWithProviders(<UsersTable users={[]} />);

    const fallbackText = screen.getByText("usersTable.fallback");
    expect(fallbackText).toBeInTheDocument();

    const fallBackContainer = screen.getByTestId("table-fallback");
    expect(fallBackContainer).toHaveClass("users-table__fallback");
  });
});
