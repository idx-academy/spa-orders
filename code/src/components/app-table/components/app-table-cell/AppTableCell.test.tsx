import { render } from "@testing-library/react";

import AppTableCell from "@/components/app-table/components/app-table-cell/AppTableCell";

describe("AppTableCell", () => {
  test("renders with content", () => {
    const { getByText } = render(
      <table>
        <tbody>
          <tr>
            <AppTableCell>Test</AppTableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(getByText(/Test/)).toBeInTheDocument();
  });
});
