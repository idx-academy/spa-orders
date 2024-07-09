import { render, screen } from "@testing-library/react";

import AppTableCell from "@/components/app-table/components/app-table-cell/AppTableCell";

describe("AppTableCell", () => {
  test("renders with content", () => {
    render(
      <table>
        <tbody>
          <tr>
            <AppTableCell>Test</AppTableCell>
          </tr>
        </tbody>
      </table>
    );

    const child = screen.getByText(/Test/);
    expect(child).toBeInTheDocument();
  });
});
