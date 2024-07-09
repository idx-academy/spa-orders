import { render } from "@testing-library/react";

import AppTableHead from "@/components/app-table/components/app-table-head/AppTableHead";

describe("AppTableHead", () => {
  test("renders column headers", () => {
    const { getByText } = render(
      <table>
        <AppTableHead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </AppTableHead>
      </table>
    );
    expect(getByText(/Header 1/)).toBeInTheDocument();
    expect(getByText(/Header 2/)).toBeInTheDocument();
  });
});
