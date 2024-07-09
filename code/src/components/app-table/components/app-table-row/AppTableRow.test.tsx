import { render, screen } from "@testing-library/react";

import AppTableRow from "@/components/app-table/components/app-table-row/AppTableRow";

describe("AppTableRow", () => {
  test("renders it with children", () => {
    render(
      <table>
        <tbody>
          <AppTableRow>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </AppTableRow>
        </tbody>
      </table>
    );
    const cellItem = screen.getByText(/Cell 1/);
    expect(cellItem).toBeInTheDocument();
  });
});
