import { render, screen } from "@testing-library/react";

import AppTableHead from "@/components/app-table/components/app-table-head/AppTableHead";

describe("AppTableHead", () => {
  test("renders column headers", () => {
    render(
      <table>
        <AppTableHead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </AppTableHead>
      </table>
    );
    const header = screen.getByText(/Header 1/);
    expect(header).toBeInTheDocument();
  });
});
