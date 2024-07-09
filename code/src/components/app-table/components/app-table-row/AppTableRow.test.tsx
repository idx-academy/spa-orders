import { render } from "@testing-library/react";

import AppTableRow from "@/components/app-table/components/app-table-row/AppTableRow";

describe("AppTableRow", () => {
  test("renders it with children", () => {
    const { getByText } = render(
      <table>
        <tbody>
          <AppTableRow>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </AppTableRow>
        </tbody>
      </table>
    );
    expect(getByText(/Cell 1/)).toBeInTheDocument();
    expect(getByText(/Cell 2/)).toBeInTheDocument();
  });
});
